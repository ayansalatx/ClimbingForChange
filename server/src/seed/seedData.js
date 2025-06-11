
export const dummyParticipantsAndTeams = [
  {
    teamName: 'Alberta SPCA',
    isSoloTeam: false,
    eventLookup: { name: 'Charity Mountain Hike', locationName: 'Rocky Ridge Park' },
    physicalMountainName: 'Rabbit Hill', // Assigned to this physical mountain
    targetMountainName: 'Mont Blanc', // Chosen target mountain (was 'Mount Rainier' in original, changed to a known target)
    startDateTime: new Date('2025-07-12T09:30:00Z'), // Team start time
    participants: [
      { firstName: 'Justine', lastName: 'Pelletier', rfidSerialNumber: 'RFID001' },
      { firstName: 'Aimee', lastName: 'Winegarden', rfidSerialNumber: 'RFID002' },
    ],
  },
  {
    teamName: 'BIMbros',
    isSoloTeam: false,
    eventLookup: { name: 'City Skyline Climb', locationName: 'City Skyline Trail' },
    physicalMountainName: 'Groove Climb',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-08-05T07:15:00Z'),
    participants: [
      { firstName: 'Jason', lastName: 'Laser', rfidSerialNumber: 'RFID003' },
      { firstName: 'Michael', lastName: 'Gilligan', rfidSerialNumber: 'RFID004' },
      { firstName: 'Robert', lastName: 'Simunkovic', rfidSerialNumber: 'RFID005' },
      { firstName: 'Katherine', lastName: 'Simunkovic', rfidSerialNumber: 'RFID006' },
      { firstName: 'Linda', lastName: 'de Jong', rfidSerialNumber: 'RFID007' },
    ],
  },
  {
    teamName: 'Glenrose Human Ability',
    isSoloTeam: true, // Example of a solo team
    eventLookup: { name: 'Whistler Alpine Challenge', locationName: 'Whistler Summit' },
    physicalMountainName: 'Small Kilimanjaro',
    targetMountainName: 'Mount Everest',
    startDateTime: new Date('2025-09-01T07:00:00Z'),
    participants: [
      { firstName: 'Blake', lastName: 'Schafer', rfidSerialNumber: 'RFID008' },
    ],
  },
  {
    teamName: 'HIBCO Generals',
    isSoloTeam: false,
    eventLookup: { name: 'Lakeside Ascent Run', locationName: 'Lakeside Loop' },
    physicalMountainName: 'The Mount',
    targetMountainName: 'Mont Blanc',
    startDateTime: new Date('2025-07-25T08:10:00Z'),
    participants: [
      { firstName: 'Moe', lastName: 'Barzagar', rfidSerialNumber: 'RFID009' },
      { firstName: 'Michel', lastName: 'Hetu', rfidSerialNumber: 'RFID010' },
      { firstName: 'Blair', lastName: 'Anthony', rfidSerialNumber: 'RFID011' },
      { firstName: 'Cherry', lastName: 'Pagtalunan', rfidSerialNumber: 'RFID012' },
      { firstName: 'Amira', lastName: 'Aissiou', rfidSerialNumber: 'RFID013' },
    ],
  },
  {
    teamName: 'Hill Billies',
    isSoloTeam: false,
    eventLookup: { name: 'Prairie Peak Expedition', locationName: 'Prairie Plains Course' },
    physicalMountainName: 'Rabbit Hill',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-06-20T06:30:00Z'),
    participants: [
      { firstName: 'Booker', lastName: 'Zaytsoff' }, // participant that don't yet have a RFID tag
      { firstName: 'Lisa', lastName: 'Zaytsoff', rfidSerialNumber: 'RFID015' },
      { firstName: 'Tyler', lastName: 'Brooks', rfidSerialNumber: 'RFID016' },
      { firstName: 'Navpreet', lastName: 'Waraich', rfidSerialNumber: 'RFID017' },
      { firstName: 'Quinn', lastName: 'Parent', rfidSerialNumber: 'RFID018' },
    ],
  },
  {
    teamName: 'KEEN Team',
    isSoloTeam: false,
    eventLookup: { name: 'City Skyline Climb', locationName: 'City Skyline Trail' }, // Example for KEEN Team joining an existing event
    physicalMountainName: 'Groove Climb',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-08-05T07:20:00Z'),
    participants: [
      { firstName: 'Matt', lastName: 'Aubin', rfidSerialNumber: 'RFID019' },
      { firstName: 'Jennifer', lastName: 'Xu', rfidSerialNumber: 'RFID020' },
    ],
  },
  {
    teamName: 'Like A Boss',
    isSoloTeam: false,
    eventLookup: { name: 'Prairie Peak Expedition', locationName: 'Prairie Plains Course' }, // Example for Like A Boss joining an existing event
    physicalMountainName: 'Rabbit Hill',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-06-20T06:40:00Z'),
    participants: [
      { firstName: 'Lindsay', lastName: 'Cooper', rfidSerialNumber: 'RFID021' },
      { firstName: 'Shawn', lastName: 'Cooper', rfidSerialNumber: 'RFID022' },
    ],
  },
  {
    teamName: 'Rabbit Hill',
    isSoloTeam: false,
    eventLookup: { name: 'Charity Mountain Hike', locationName: 'Rocky Ridge Park' }, // Example for Rabbit Hill joining an existing event
    physicalMountainName: 'Rabbit Hill',
    targetMountainName: 'Mont Blanc',
    startDateTime: new Date('2025-07-12T09:45:00Z'),
    participants: [
      { firstName: 'Derek', lastName: 'Look', rfidSerialNumber: 'RFID023' },
      { firstName: 'Leah', lastName: 'Chodzicki', rfidSerialNumber: 'RFID024' },
      { firstName: 'Cheryl', lastName: 'Haniak', rfidSerialNumber: 'RFID025' },
    ],
  },
  {
    teamName: 'Springboks',
    isSoloTeam: false,
    eventLookup: { name: 'Charity Mountain Hike', locationName: 'Rocky Ridge Park' },
    physicalMountainName: 'Rabbit Hill',
    targetMountainName: 'Mont Blanc',
    startDateTime: new Date('2025-07-12T09:45:00Z'),
    participants: [
      { firstName: 'Barend', lastName: 'Lottering', rfidSerialNumber: 'RFID026' },
      { firstName: 'Lottering', lastName: 'Lottering', rfidSerialNumber: 'RFID027' },
    ],
  },
  {
    teamName: 'STARS',
    isSoloTeam: false,
    eventLookup: { name: 'City Skyline Climb', locationName: 'City Skyline Trail' }, // Example for KEEN Team joining an existing event
    physicalMountainName: 'Groove Climb',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-08-05T07:20:00Z'),
    participants: [
      { firstName: 'Brittany', lastName: 'Foy', rfidSerialNumber: 'RFID028' },
      { firstName: 'Adam', lastName: 'Perry', rfidSerialNumber: 'RFID029' },
      { firstName: 'Justin', lastName: 'Mazzolini', rfidSerialNumber: 'RFID030' },
      { firstName: 'Angela', lastName: 'Mazzolini', rfidSerialNumber: 'RFID031' },
      { firstName: 'Erica', lastName: 'Kirkman', rfidSerialNumber: 'RFID032' },
      { firstName: 'Sarah', lastName: 'Saunders', rfidSerialNumber: 'RFID033' },
    ],
  },
  {
    teamName: 'Team Order',
    isSoloTeam: false,
    eventLookup: { name: 'City Skyline Climb', locationName: 'City Skyline Trail' }, // Example for KEEN Team joining an existing event
    physicalMountainName: 'Groove Climb',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-08-05T07:20:00Z'),
    participants: [
      { firstName: 'Lauren', lastName: 'Guillette', rfidSerialNumber: 'RFID034' },
      { firstName: 'Ryan', lastName: 'Batty', rfidSerialNumber: 'RFID035' },
      { firstName: 'Nick', lastName: 'Green', rfidSerialNumber: 'RFID036' },
    ],
  },
  {
    teamName: 'United Nations',
    isSoloTeam: false,
    eventLookup: { name: 'City Skyline Climb', locationName: 'City Skyline Trail' },
    physicalMountainName: 'Groove Climb',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-08-05T07:20:00Z'),
    participants: [
      { firstName: 'Andrew', lastName: 'Wilkie', rfidSerialNumber: 'RFID037' },
      { firstName: 'Rogers', lastName: 'Bryce', rfidSerialNumber: 'RFID038' },
      { firstName: 'Viet', lastName: 'Ngo', rfidSerialNumber: 'RFID039' },
      { firstName: 'Andrew', lastName: 'Gillese', rfidSerialNumber: 'RFID040' },
      { firstName: 'Adrianne', lastName: 'Gillese', rfidSerialNumber: 'RFID041' },
    ],
  },
  {
    teamName: 'Solo Team Williamson',
    isSoloTeam: true,
    eventLookup: { name: 'Lakeside Ascent Run', locationName: 'Lakeside Loop' },
    physicalMountainName: 'Groove Climb',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-08-05T07:20:00Z'),
    participants: [
      { firstName: 'Luke', lastName: 'Williamson', rfidSerialNumber: 'RFID042' },

    ],
  },
  {
    teamName: 'Solo Team Wyllie',
    isSoloTeam: true,
    eventLookup: { name: 'Lakeside Ascent Run', locationName: 'Lakeside Loop' },
    physicalMountainName: 'Groove Climb',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-08-05T07:20:00Z'),
    participants: [
      { firstName: 'Stewart', lastName: 'Wyllie', rfidSerialNumber: 'RFID043' },

    ],
  },
  {
    teamName: 'Solo Team McDaniel',
    isSoloTeam: true,
    eventLookup: { name: 'Lakeside Ascent Run', locationName: 'Lakeside Loop' },
    physicalMountainName: 'Groove Climb',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-08-05T07:20:00Z'),
    participants: [
      { firstName: 'Andrew', lastName: 'McDaniel' },

    ],
  },
  {
    teamName: 'Solo Team Chorney',
    isSoloTeam: true,
    eventLookup: { name: 'Lakeside Ascent Run', locationName: 'Lakeside Loop' },
    physicalMountainName: 'Groove Climb',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-08-05T07:20:00Z'),
    participants: [
      { firstName: 'Devon', lastName: 'Chorney', rfidSerialNumber: 'RFID045' },

    ],
  },
  {
    teamName: 'Solo Team Baetjer',
    isSoloTeam: true,
    eventLookup: { name: 'Lakeside Ascent Run', locationName: 'Lakeside Loop' },
    physicalMountainName: 'Groove Climb',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-08-05T07:20:00Z'),
    participants: [
      { firstName: 'Nelson', lastName: 'Baetjer', rfidSerialNumber: 'RFID046' },

    ],
  },
  {
    teamName: 'Solo Team Gerretsen',
    isSoloTeam: true,
    eventLookup: { name: 'Lakeside Ascent Run', locationName: 'Lakeside Loop' },
    physicalMountainName: 'Groove Climb',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-08-05T07:20:00Z'),
    participants: [
      { firstName: 'Jeff', lastName: 'Gerretsen', rfidSerialNumber: 'RFID047' },

    ],
  },
  	{
    teamName: 'Solo Team Douglas',
    isSoloTeam: true,
    eventLookup: { name: 'Lakeside Ascent Run', locationName: 'Lakeside Loop' },
    physicalMountainName: 'Groove Climb',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-08-05T07:20:00Z'),
    participants: [
      { firstName: 'Bennett', lastName: 'Douglas', rfidSerialNumber: 'RFID048' },

    ],
  },
	{
    teamName: 'Solo Team Dampf',
    isSoloTeam: true,
    eventLookup: { name: 'Lakeside Ascent Run', locationName: 'Lakeside Loop' },
    physicalMountainName: 'Groove Climb',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-08-05T07:20:00Z'),
    participants: [
      { firstName: 'Mike', lastName: 'Dampf', rfidSerialNumber: 'RFID049' },

    ],
  },
	{
    teamName: 'Solo Team Hamel',
    isSoloTeam: true,
    eventLookup: { name: 'Lakeside Ascent Run', locationName: 'Lakeside Loop' },
    physicalMountainName: 'Groove Climb',
    targetMountainName: 'Denali',
    startDateTime: new Date('2025-08-05T07:20:00Z'),
    participants: [
      { firstName: 'Jen', lastName: 'Hamel', rfidSerialNumber: 'RFID050' },

    ],
  },
]

export const dummyLocations = [
  {
    name: 'Rocky Ridge Park',
    address: '123 Mountain Road',
    city: 'Banff',
    provState: 'Alberta',
    country: 'Canada',

  },
  {
    name: 'City Skyline Trail',
    address: '456 Downtown Ave',
    city: 'Edmonton',
    provState: 'Alberta',
    country: 'Canada',
  },
  {
    name: 'Whistler Summit',
    address: '789 Alpine Way',
    city: 'Whistler',
    provState: 'British Columbia',
    country: 'Canada',
  },
  {
    name: 'Lakeside Loop',
    address: '101 Lakeview Drive',
    city: 'Kelowna',
    provState: 'British Columbia',
    country: 'Canada',
  },
  {
    name: 'Prairie Plains Course',
    address: '202 Wheatfield Road',
    city: 'Saskatoon',
    provState: 'Saskatchewan',
    country: 'Canada',
  },
]

export const dummyEvents = [
  {
    name: 'Charity Mountain Hike',
    locationName: 'Rocky Ridge Park',
    startDateTime: new Date('2025-07-12T09:00:00Z'),
    endDateTime: new Date('2025-07-12T12:30:00Z'),
    physicalMountainNames: ['Rabbit Hill', 'Summer Hill'],
    active: true,
  },
  {
    name: 'City Skyline Climb',
    locationName: 'City Skyline Trail',
    startDateTime: new Date('2025-08-05T07:00:00Z'),
    endDateTime: new Date('2025-08-05T09:00:00Z'),
    physicalMountainNames: ['Groove Climb'],
    active: true,
  },
  {
    name: 'Whistler Alpine Challenge',
    locationName: 'Whistler Summit',
    startDateTime: new Date('2025-09-01T06:30:00Z'),
    endDateTime: new Date('2025-09-01T11:00:00Z'),
    physicalMountainNames: ['Small Kilimanjaro'],
    active: false,
  },
  {
    name: 'Lakeside Ascent Run',
    locationName: 'Lakeside Loop',
    startDateTime: new Date('2025-07-25T08:00:00Z'),
    endDateTime: new Date('2025-07-25T10:15:00Z'),
    physicalMountainNames: ['The Mount', 'Rabbit Hill'],
    active: true,
  },
  {
    name: 'Prairie Peak Expedition',
    locationName: 'Prairie Plains Course',
    startDateTime: new Date('2025-06-20T06:00:00Z'),
    endDateTime: new Date('2025-06-20T11:00:00Z'),
    physicalMountainNames: ['Rabbit Hill'],
    active: true,
  },
]

export const dummyPhysicalMountains = [
  {
    name: 'Rabbit Hill',
    elevationPerLap: 50.0,
  },
  {
    name: 'Summer Hill',
    elevationPerLap: 45.6,
  },
  {
    name: 'Groove Climb',
    elevationPerLap: 51.2,
  },
  {
    name: 'Small Kilimanjaro',
    elevationPerLap: 55.0,
  },
  {
    name: 'The Mount',
    elevationPerLap: 40.3,
  }
]

export const dummyTargetMountains = [
  {
    name: 'Mount Everest',
    totalElevation: 8848,
  },
  {
    name: 'K2',
    totalElevation: 8611,
  },
  {
    name: 'Denali',
    totalElevation: 6190,
  },
  {
    name: 'Mount Kilimanjaro',
    totalElevation: 5895,
  },
  {
    name: 'Mont Blanc',
    totalElevation: 4808,
  }
]

export const dummyRFIDTags = [
  { serialNumber: 'RFID001' },
  { serialNumber: 'RFID002' },
  { serialNumber: 'RFID003' },
  { serialNumber: 'RFID004' },
  { serialNumber: 'RFID005' },
  { serialNumber: 'RFID006' },
  { serialNumber: 'RFID007' },
  { serialNumber: 'RFID008' },
  { serialNumber: 'RFID009' },
  { serialNumber: 'RFID010' },
  { serialNumber: 'RFID011' },
  { serialNumber: 'RFID012' },
  { serialNumber: 'RFID013' },
  { serialNumber: 'RFID014' },
  { serialNumber: 'RFID015' },
  { serialNumber: 'RFID016' },
  { serialNumber: 'RFID017' },
  { serialNumber: 'RFID018' },
  { serialNumber: 'RFID019' },
  { serialNumber: 'RFID020' },
  { serialNumber: 'RFID021' },
  { serialNumber: 'RFID022' },
  { serialNumber: 'RFID023' },
  { serialNumber: 'RFID024' },
  { serialNumber: 'RFID025' },
  { serialNumber: 'RFID026' },
  { serialNumber: 'RFID027' },
  { serialNumber: 'RFID028' },
  { serialNumber: 'RFID029' },
  { serialNumber: 'RFID030' },
  { serialNumber: 'RFID031' },
  { serialNumber: 'RFID032' },
  { serialNumber: 'RFID033' },
  { serialNumber: 'RFID034' },
  { serialNumber: 'RFID035' },
  { serialNumber: 'RFID036' },
  { serialNumber: 'RFID037' },
  { serialNumber: 'RFID038' },
  { serialNumber: 'RFID039' },
  { serialNumber: 'RFID040' },
  { serialNumber: 'RFID041' },
  { serialNumber: 'RFID042' },
  { serialNumber: 'RFID043' },
  { serialNumber: 'RFID044' },
  { serialNumber: 'RFID045' },
  { serialNumber: 'RFID046' },
  { serialNumber: 'RFID047' },
  { serialNumber: 'RFID048' },
  { serialNumber: 'RFID049' },
  { serialNumber: 'RFID050' },
  { serialNumber: 'RFID051' },
  { serialNumber: 'RFID052' },
  { serialNumber: 'RFID053' },
  { serialNumber: 'RFID054' },
  { serialNumber: 'RFID055' },
]