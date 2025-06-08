import React from "react";
import { IconButton, Tooltip } from '@mui/material';
import { Fullscreen, FullscreenExit } from "@mui/icons-material";

const FullscreenToggleButton = ({sx}) => {

    return (
        <Tooltip title="Fullscreen">
            <IconButton sx={sx}>
                <Fullscreen />
            </IconButton>
        </Tooltip>
    )

}

export default FullscreenToggleButton;