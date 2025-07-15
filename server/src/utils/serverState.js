import Team from '../models/team.js';
import config from './config.js';
import { initializeMockData } from '../mock/mock.router.js';
import { processNewPassings } from '../controllers/leaderboard.js';

export const bibToTeamMap = new Map();
let lastReceivedIndex = 0;
let isPolling = false;
export const initializeServerState = async () => {
    console.log('Initializing server state...');

    try {
        const teams = await Team.find({}).populate('rfidTag');
        teams.forEach(team => {
            if (team.rfidTag) {
                bibToTeamMap.set(team.rfidTag.serialNumber, team._id);
                console.log(`[Initialization] Mapped bib ${team.rfidTag.serialNumber} (type: ${typeof team.rfidTag.serialNumber}) to team ${team._id}`);
            }
        });
        console.log(`[Initialization] Bib-to-Team map created with ${bibToTeamMap.size} entries.`);

        if (config.API_MODE === 'mock') {
            await initializeMockData();
        }

        console.log('Initialization complete. Starting continuous data polling...');
        setInterval(pollForNewData, 2000); // Poll every 5 seconds

    } catch (error) {
        console.error('FATAL: Could not initialize server state. Polling will not start.', error);
        process.exit(1);
    }
}

export async function pollForNewData() {
    if (isPolling) {
      console.log('[Polling] Skipping poll - already processing data');
      return;
    }
    isPolling = true;
  
    try {
      if (process.env.API_MODE === 'mock') {
        console.log(`[Polling] Fetching passings from index ${lastReceivedIndex}...`);
        const mockApiUrl = `http://localhost:${config.PORT}/mock-api/getpassings?fromIndex=${lastReceivedIndex}`;
        const response = await fetch(mockApiUrl);
        const data = await response.json();
  
        if (data.passings && data.passings.length > 0) {
          console.log(`[Polling] Received ${data.passings.length} new passings. Processing...`);
          await processNewPassings(data.passings);
        } else {
          console.log(`[Polling] No new passings available (lastIndex: ${data.lastIndex})`);
        }
        lastReceivedIndex = data.lastIndex;
      }
    } catch (error) {
      console.error('[Polling] Error during poll cycle:', error);
    } finally {
      isPolling = false;
    }
  }