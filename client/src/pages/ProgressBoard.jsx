import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import ProgressTable from "../components/progress/ProgressTable";
import C4CHorizontalGreenLogo from "../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png";

// temporary mock data
import mockData from "../mock-data/progressboard-team-only.json";

// Define columns for full width screen
const fullColumns = [
  { id: "team-name", label: "Team", minWidth: 200 },
  { id: "mountain", label: "Mountain", minWidth: 115 },
  { id: "elevation", label: "Elevation", minWidth: 60 },
  { id: "current-elevation", label: "Current Elevation", minWidth: 60 },
  { id: "total-laps", label: "Total Laps", minWidth: 40 },
  { id: "laps-completed", label: "Laps Completed", minWidth: 70 },
  { id: "laps-to-go", label: "Laps To Go", minWidth: 40 },
  { id: "best-lap", label: "Best Lap", minWidth: 40 },
  { id: "time-elapsed", label: "Time Elapsed", minWidth: 60 },
];

const medColumns = [
  { id: "team-name", label: "Team", minWidth: 200 },
  { id: "mountain", label: "Mountain", minWidth: 115 },
  { id: "elevation", label: "Elevation", minWidth: 60 },
  { id: "current-elevation", label: "Current Elevation", minWidth: 60 },
  { id: "total-laps", label: "Total Laps", minWidth: 40 },
  { id: "laps-completed", label: "Laps Completed", minWidth: 70 },
  { id: "laps-to-go", label: "Laps To Go", minWidth: 40 },
  { id: "best-lap", label: "Best Lap", minWidth: 40 },
  { id: "time-elapsed", label: "Time Elapsed", minWidth: 60 },
];

const rows = mockData;

const ProgressBoard = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: "95vw",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >

      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <a href="https://www.climbingforchange.ca/" target="_blank">
          <img
            src={C4CHorizontalGreenLogo}
            alt="Climbing for Change Logo"
            style={{ maxWidth: 275, width: "auto" }}
          />
        </a>
      </Box>

      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <ProgressTable columns={fullColumns} rows={rows} />
      </Box>
    </Container>
  );
};

export default ProgressBoard;
