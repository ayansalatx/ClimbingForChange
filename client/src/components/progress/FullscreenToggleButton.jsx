import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const FullscreenToggleButton = ({ sx }) => {
  const navigate = useNavigate();

  // Navigate to fullscreen page for large onsite display
  const handleClick = () => {
    navigate("/progress/fullscreen");
  };

  return (
    <Tooltip title="Fullscreen">
      <IconButton onClick={handleClick} sx={sx}>
        <Fullscreen />
      </IconButton>
    </Tooltip>
  );
};

export default FullscreenToggleButton;
