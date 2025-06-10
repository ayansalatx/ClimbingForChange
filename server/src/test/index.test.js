import Location from "../models/location.js";
import PhysicalMountain from "../models/physicalMountain.js";
import TargetMountain from "../models/targetMountain.js";
import RFIDTag from "../models/rfidTag.js";
import Event from "../models/event.js";
import Team from "../models/team.js";
import Participant from "../models/participant.js";
import Lap from "../models/lap.js";

export const emptyTestDB = async () => {
    await Promise.all([
        Location.deleteMany({}),
        PhysicalMountain.deleteMany({}),
        TargetMountain.deleteMany({}),
        RFIDTag.deleteMany({}),
        Event.deleteMany({}),
        Team.deleteMany({}),
        Participant.deleteMany({}),
        Lap.deleteMany({}),
      ]);
}