import Team from '../models/team.js';
import config from './config.js';
import { getMockPassings, initializeMockData } from '../mock/mock.router.js'
import { processNewPassings } from '../controllers/liveData.js';

export const bibToTeamMap = new Map();
let lastReceivedIndex = 0;
export const initializeServerState = async () => {
    console.log('Initializing server state...');

    try {
        const teams = await Team.find({}).populate('rfidTag');
        teams.forEach(team => {
            if (team.rfidTag) {
                bibToTeamMap.set(team.rfidTag.serialNumber, team._id);
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

export const pollForNewData = async () => {
    if (config.API_MODE === 'mock') {
        try {            
            // Call the mock function directly
            const data = await getMockPassings(lastReceivedIndex);

            if (data.passings && data.passings.length > 0) {
                // It calls your processing function
                await processNewPassings(data.passings); 
            }
            
            lastReceivedIndex = data.lastIndex;

        } catch (error) {
            console.error('[Polling] Error fetching from mock API:', error.message);
        }
    } else {
        // Your real live API polling logic will go here
    }
}