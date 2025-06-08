import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";

const TableHeaderRow = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => (
          <TableCell
            key={column.id}
            align={
              index === 0
                ? "left"
                : index === columns.length - 1
                ? "right"
                : "center"
            }
            sx={{
              minWidth: column.minWidth,
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "uppercase",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaderRow;
