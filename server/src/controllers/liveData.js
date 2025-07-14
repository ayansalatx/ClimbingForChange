import config from "../utils/config.js"
import { bibToTeamMap } from "../utils/serverState.js"

import Passing from '../models/passing.js'
import Lap from '../models/lap.js'
import Team from '../models/team.js'

export const getLiveData = async (request, response) => {
    let apiBaseUrl;
    let lastIndex = request.query.lastIndex || 0;

    if (config.API_MODE === 'mock') {
        apiBaseUrl = `http://localhost:${config.PORT}/mock-api`;
        
        try {
            const response = await fetch(`${apiBaseUrl}/getpassings?fromIndex=${lastIndex}`);
            const data = await response.json(); // { passings: [...], lastIndex: X }

            console.log("🚀 ~ getLiveData ~ data:", data)
            // This is where you calculate laps, elevation, etc.
            const processedLeaderboard = processNewPassings(data.passings);

            res.json({
                leaderboard: processedLeaderboard,
                lastIndex: data.lastIndex // Pass the new index back to the frontend
            });

        } catch (error) {
            response.status(500).json({ error: 'Failed to fetch from mock endpoint.' });
        }

    } else {
        // --- LIVE MODE ---
        // The URL for the real API
        apiBaseUrl = 'https://rest.devices.raceresult.com';
        
        // Your logic for getting the access token and calling the real API would go here
        // const accessToken = await getRealAccessToken();
        // const response = await fetch(`${apiBaseUrl}/...`, { headers: { 'Authorization': `Bearer ${accessToken}` } });
        // ... etc.
        response.json({ message: "Live mode is not implemented yet." });
    }
}

export const processNewPassings = async (newPassings) => {
    // --- Define the critical LoopIDs for your course ---
    // This configuration is key to your event's logic.
    const START_LOOP_ID = 1;
    const LAP_POINT_LOOP_ID = 2; 
  
    for (const passingData of newPassings) {
      const bib = passingData.Code;
      const teamId = bibToTeamMap.get(bib);
  
      if (!teamId) {
        console.warn(`[Processing] Received passing for an unmapped Bib: ${bib}. Skipping.`);
        continue;
      }
  
      try {
        // --- Step 1: Save the Raw Passing Data ---
        const existingPassing = await Passing.findOne({
          Code: bib,
          LoopID: passingData.LoopID,
          PassingNo: passingData.PassingNo
        });
  
        if (existingPassing) {
          // We've already processed this exact hit, so we can skip it.
          continue;
        }
        
        const savedPassing = await Passing.create({
          ...passingData,
          team: teamId
        });
        console.log(`[Passing Saved] Bib: ${bib}, LoopID: ${savedPassing.LoopID}, RealTime: ${savedPassing.RealTime.toISOString()}`);
  
  
        // --- Step 2: Analyze the Sequence to Detect a Completed Lap ---
        // For this example, a "lap" is completed every time a team passes the LAP_POINT_LOOP_ID.
        if (savedPassing.LoopID === LAP_POINT_LOOP_ID) {
          
          // This passing represents a lap completion. The lap number is the PassingNo at this loop.
          const lapJustCompleted = savedPassing.PassingNo;
  
          // Find the previous passing at this *same* lap point to calculate lap time.
          const previousLapPointPassing = await Passing.findOne({
            team: teamId,
            LoopID: LAP_POINT_LOOP_ID,
            PassingNo: lapJustCompleted - 1
          });
  
          // The start time of this lap is the realTime of the previous lap point passing.
          // If it's the first lap, the start time is the realTime of the START_LOOP_ID passing.
          let lapStartTime;
          if (previousLapPointPassing) {
              lapStartTime = previousLapPointPassing.RealTime;
          } else {
              // This is the first lap, so find the team's start time.
              const startPassing = await Passing.findOne({ team: teamId, LoopID: START_LOOP_ID });
              if (startPassing) {
                  lapStartTime = startPassing.RealTime;
              } else {
                  console.warn(`[Lap Logic] Could not find a start passing for Team ID ${teamId} to calculate Lap 1.`);
                  continue; // Cannot calculate lap without a start time
              }
          }
          
          // Calculate the duration of this specific lap.
          const lapDurationMs = savedPassing.RealTime.getTime() - lapStartTime.getTime();
  
          // Get the team to find the RFID tag ID
          const team = await Team.findById(teamId).populate('rfidTag');
          if (!team || !team.rfidTag) {
            console.warn(`[Lap Logic] Could not find RFID tag for Team ID ${teamId}. Skipping lap creation.`);
            continue;
          }

          // Create the official Lap document
          await Lap.create({
            team: teamId,
            rfidTag: team.rfidTag._id, // Use the actual RFID tag ObjectId
            startDateTime: lapStartTime,
            endDateTime: savedPassing.RealTime,
            lapDuration: lapDurationMs,
            lapNumber: lapJustCompleted
          });
          
          console.log(`✅ [Lap Recorded] Team ${teamId} completed Lap ${lapJustCompleted} in ${lapDurationMs / 1000}s.`);
        }
  
      } catch (error) {
        console.error(`[Processing Error] Failed to process passing for Bib ${bib}.`, error.message);
      }
    }
  }