import * as React from "react";
import { TextField, Stack, Autocomplete } from "@mui/material";

// temporary mock data
import mockData from "../../mock-data/progressboard-team-only.json";

const ProgressSearch = () => {
  return (
    <Autocomplete
      sx={{
        "& .MuiOutlinedInput-root": {
          padding: "6px 6px",
        },
      }}
      freeSolo
      id="progress-search"
      disableClearable
      options={mockData.map((option) => option["team-name"])}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          slotProps={{
            input: {
              ...params.InputProps,
              type: "search",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "var(--c4c-green)",
              fontSize: ".9rem",

              "&:hover input": {
                color: "var(--c4c-light-blue)",
              },
              "&.Mui-focused input": {
                color: "var(--c4c-teal)",
              },
              "& fieldset": {
                borderColor: "var(--c4c-green)",
              },
              "&:hover fieldset": {
                borderColor: "var(--c4c-light-blue)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--c4c-teal)",
              },
            },
            "& .MuiInputLabel-root": {
              color: "var(--c4c-green)",
              fontSize: ".9rem",
            },
            "&:hover .MuiInputLabel-root": {
              color: "var(--c4c-light-blue)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--c4c-teal)",
            },
            "& input::placeholder": {
              color: "var(--c4c-green)",
              opacity: 1,
            },
          }}
        />
      )}
    />
  );
};

export default ProgressSearch;
