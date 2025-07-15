import connectDB from '../src/utils/db.js'
import Passing from '../src/models/passing.js'
import Team from '../src/models/team.js'

const queryPassings = async () => {
  try {
    console.log('Connecting to MongoDB...')
    await connectDB()
    console.log('Connected to MongoDB.')

    // Get all passings with team information
    const passings = await Passing.find({}).populate('team', 'name')
    
    console.log('\n=== DATABASE QUERY RESULTS ===')
    console.log(`Total passings in database: ${passings.length}`)
    
    if (passings.length === 0) {
      console.log('No passings found in database.')
      return
    }

    // Group passings by team
    const passingsByTeam = {}
    passings.forEach(passing => {
      const teamName = passing.team?.name || 'Unknown Team'
      if (!passingsByTeam[teamName]) {
        passingsByTeam[teamName] = []
      }
      passingsByTeam[teamName].push(passing)
    })

    console.log('\n=== PASSINGS BY TEAM ===')
    Object.entries(passingsByTeam).forEach(([teamName, teamPassings]) => {
      console.log(`\n${teamName}: ${teamPassings.length} passings`)
      teamPassings.forEach(passing => {
        console.log(`  - Bib: ${passing.Code}, LoopID: ${passing.LoopID}, PassingNo: ${passing.PassingNo}, Time: ${passing.RealTime.toISOString()}`)
      })
    })

    // Get all teams
    const teams = await Team.find({}).populate('rfidTag', 'serialNumber')
    console.log('\n=== ALL TEAMS ===')
    teams.forEach(team => {
      console.log(`- ${team.name} (RFID: ${team.rfidTag?.serialNumber || 'None'})`)
    })

  } catch (error) {
    console.error('Error querying database:', error)
  } finally {
    process.exit(0)
  }
}

queryPassings() 