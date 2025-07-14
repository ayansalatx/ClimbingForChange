import express from 'express'
import path from 'path'
import csv from 'csvtojson'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import Team from '../models/team.js'
import Event from '../models/event.js'
import RFIDTag from '../models/rfidTag.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

const SIMULATED_LAPS = 10
const LAP_TIME_VARIATION = 0.2

let allSimulatedPassings = []
let nextPassingIndex = 0

const loadCsv = async (filePath) => {
    try {
      const jsonArray = await csv().fromFile(filePath);
      console.log(`Successfully loaded ${jsonArray.length} rows from ${path.basename(filePath)}`);
      return jsonArray;
    } catch (error) {
      console.error(`Error loading or parsing CSV from ${filePath}:`, error);
      throw error; // Propagate the error to be caught by the initialization function
    }
  };


const generateFullPassingHistory = (participantsData, overallResultsData) => {
    const passings = [];
    const simulatedEventStartTime = new Date();

    // Create a mapping of bib numbers to RFID tags
    const bibToRfidMap = new Map();
    participantsData.forEach((participant, index) => {
        const bib = participant.Bib;
        // Use the bib number as the RFID tag for simplicity
        bibToRfidMap.set(bib, bib);
    });

    overallResultsData.forEach(result => {
        const bib = result.Bib;
        const chipTimeStr = result.ChipTime;
        const status = result.Place;

        if (status === 'DNS' || !chipTimeStr) return;

        const startOffsetMs = (parseInt(bib) % 30) * 1000;
        const simulatedStartTime = new Date(simulatedEventStartTime.getTime() + startOffsetMs);
        passings.push({ "Code": bib, "LoopID": 1, "RealTime": simulatedStartTime.toISOString(), "PassingNo": 1, "RunTime": 0, "FileNo": parseInt(bib) });

        if (status === 'DNF') return;

        const chipTimeParts = chipTimeStr.split(':').map(Number);
        let totalChipTimeMs;
        
        // Handle both HH:MM:SS and MM:SS formats
        if (chipTimeParts.length === 3) {
            // HH:MM:SS format
            totalChipTimeMs = (chipTimeParts[0] * 3600 + chipTimeParts[1] * 60 + chipTimeParts[2]) * 1000;
        } else if (chipTimeParts.length === 2) {
            // MM:SS format
            totalChipTimeMs = (chipTimeParts[0] * 60 + chipTimeParts[1]) * 1000;
        } else {
            console.warn(`[Mock] Invalid time format for bib ${bib}: ${chipTimeStr}`);
            return;
        }
        
        const numberOfLaps = SIMULATED_LAPS;
        const averageLapTimeMs = totalChipTimeMs / numberOfLaps;
        let cumulativeTimeMs = 0;

        for (let lapNum = 1; lapNum < numberOfLaps; lapNum++) {
            const variation = (Math.random() - 0.5) * LAP_TIME_VARIATION;
            let currentLapTimeMs = Math.round(averageLapTimeMs * (1 + variation));
            currentLapTimeMs = Math.max(currentLapTimeMs, 1000);
            
            cumulativeTimeMs += currentLapTimeMs;
            const lapPassingTime = new Date(simulatedStartTime.getTime() + cumulativeTimeMs);
            passings.push({ "Code": bib, "LoopID": 2, "RealTime": lapPassingTime.toISOString(), "PassingNo": lapNum, "RunTime": cumulativeTimeMs, "FileNo": parseInt(bib) });
        }

        const finalLapPassingTime = new Date(simulatedStartTime.getTime() + totalChipTimeMs);
        passings.push({ "Code": bib, "LoopID": 2, "RealTime": finalLapPassingTime.toISOString(), "PassingNo": numberOfLaps, "RunTime": totalChipTimeMs, "FileNo": parseInt(bib) });
    });

    passings.sort((a, b) => new Date(a.RealTime) - new Date(b.RealTime));
    console.log(`[Mock] Generated a complete history of ${passings.length} simulated passings.`);
    return passings;
};

/**
 * Verify that teams and RFID tags exist for the bib numbers in the CSV data
 */
const verifyMockTeamsAndRFIDTags = async (participantsData) => {
    try {
        // Check if we have teams with RFID tags that match the bib numbers
        const teams = await Team.find({}).populate('rfidTag');
        const bibToTeamMap = new Map();
        
        teams.forEach(team => {
            if (team.rfidTag) {
                bibToTeamMap.set(team.rfidTag.serialNumber, team._id);
            }
        });

        // Check which bib numbers from CSV have corresponding teams
        const missingBibs = [];
        participantsData.forEach(participant => {
            const bib = participant.Bib;
            if (!bibToTeamMap.has(bib)) {
                missingBibs.push(bib);
            }
        });

        if (missingBibs.length > 0) {
            console.warn(`[Mock] Warning: The following bib numbers don't have corresponding teams: ${missingBibs.join(', ')}`);
            console.warn('[Mock] Please run the seed script first to create teams and RFID tags.');
        } else {
            console.log(`[Mock] All ${participantsData.length} bib numbers have corresponding teams.`);
        }
    } catch (error) {
        console.error('[Mock] Error verifying teams and RFID tags:', error);
    }
};

/**
 * This function initializes all the mock data and starts the simulation timer.
 * It should be called once when the main server starts in mock mode.
 */
const initializeMockData = async () => {
    try {
        const participants = await loadCsv(path.join(__dirname, 'data', 'Sample_Participant_list.csv'));
        const overallResults = await loadCsv(path.join(__dirname, 'data', 'Sample_results.csv'));
        
        // Verify that teams and RFID tags exist for the bib numbers
        await verifyMockTeamsAndRFIDTags(participants);
        
        allSimulatedPassings = generateFullPassingHistory(participants, overallResults);

        // Simulate new passings becoming "available" over time
        setInterval(() => {
            if (nextPassingIndex < allSimulatedPassings.length) {
                const passingsToRelease = Math.floor(Math.random() * 5) + 1; // Release 1-5 passings
                nextPassingIndex = Math.min(nextPassingIndex + passingsToRelease, allSimulatedPassings.length);
            }
        }, 3000); // New data becomes available every 3 seconds

        console.log('[Mock] Data loaded and simulation timer started.');
    } catch (error) {
        console.error('[Mock] Fatal error loading mock data:', error);
    }
};

// --- Mock API Endpoint ---
// This endpoint will provide new passings based on the simulation timer.
router.get('/getpassings', (req, res) => {
    const fromIndex = req.query.fromIndex ? parseInt(req.query.fromIndex, 10) : 0;
    
    const data = getMockPassings(fromIndex);
    res.json(data);
});

// Function that can be called directly (for internal polling)
export const getMockPassings = (fromIndex = 0) => {
    // The passings that are "ready" are up to the current value of nextPassingIndex
    const newPassings = allSimulatedPassings.slice(fromIndex, nextPassingIndex);

    console.log(`[Mock] Request for passings from index ${fromIndex}. Sending ${newPassings.length} new passings.`);
    
    return {
        passings: newPassings,
        lastIndex: nextPassingIndex // The client should use this for the next 'fromIndex'
    };
};

// Export the router and the initialization function
export { router as mockRouter, initializeMockData }