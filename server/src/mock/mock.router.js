import express from 'express'
import path from 'path'
import csv from 'csvtojson'

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
    // ... (This is the EXACT SAME 'generateSimulatedPassings' function from the previous answer)
    // ... (No changes needed inside this function)
    const passings = [];
    const simulatedEventStartTime = new Date();

    overallResultsData.forEach(result => {
        const bib = result.Bib;
        const chipTimeStr = result.ChipTime;
        const status = result.Place;

        if (status === 'DNS' || !chipTimeStr) return;

        const startOffsetMs = (parseInt(bib) % 30) * 1000;
        const simulatedStartTime = new Date(simulatedEventStartTime.getTime() + startOffsetMs);
        passings.push({ "Code": bib, "LoopID": 1, "RealTime": simulatedStartTime.toISOString(), "PassingNo": 1, "RunTime": 0 });

        if (status === 'DNF') return;

        const chipTimeParts = chipTimeStr.split(':').map(Number);
        const totalChipTimeMs = (chipTimeParts[0] * 3600 + chipTimeParts[1] * 60 + chipTimeParts[2]) * 1000;
        
        const numberOfLaps = SIMULATED_LAPS;
        const averageLapTimeMs = totalChipTimeMs / numberOfLaps;
        let cumulativeTimeMs = 0;

        for (let lapNum = 1; lapNum < numberOfLaps; lapNum++) {
            const variation = (Math.random() - 0.5) * LAP_TIME_VARIATION;
            let currentLapTimeMs = Math.round(averageLapTimeMs * (1 + variation));
            currentLapTimeMs = Math.max(currentLapTimeMs, 1000);
            
            cumulativeTimeMs += currentLapTimeMs;
            const lapPassingTime = new Date(simulatedStartTime.getTime() + cumulativeTimeMs);
            passings.push({ "Code": bib, "LoopID": 2, "RealTime": lapPassingTime.toISOString(), "PassingNo": lapNum, "RunTime": cumulativeTimeMs });
        }

        const finalLapPassingTime = new Date(simulatedStartTime.getTime() + totalChipTimeMs);
        passings.push({ "Code": bib, "LoopID": 2, "RealTime": finalLapPassingTime.toISOString(), "PassingNo": numberOfLaps, "RunTime": totalChipTimeMs });
    });

    passings.sort((a, b) => new Date(a.RealTime) - new Date(b.RealTime));
    console.log(`[Mock] Generated a complete history of ${passings.length} simulated passings.`);
    return passings;
};

/**
 * This function initializes all the mock data and starts the simulation timer.
 * It should be called once when the main server starts in mock mode.
 */
const initializeMockData = async () => {
    try {
        const participants = await loadCsv(path.join(__dirname, 'data', 'Participants List 123.csv'));
        const overallResults = await loadCsv(path.join(__dirname, 'data', 'Overall Results.csv'));
        
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
    
    // The passings that are "ready" are up to the current value of nextPassingIndex
    const newPassings = allSimulatedPassings.slice(fromIndex, nextPassingIndex);

    console.log(`[Mock] Request for passings from index ${fromIndex}. Sending ${newPassings.length} new passings.`);
    
    res.json({
        passings: newPassings,
        lastIndex: nextPassingIndex // The client should use this for the next 'fromIndex'
    });
});

// Export the router and the initialization function
module.exports = {
    mockRouter: router,
    initializeMockData: initializeMockData
};