import React from "react";
import { TableBody, TableRow, TableCell } from "@mui/material";

const TableDataRows = ({ rows, columns, page, rowsPerPage }) => {
  return (
    <TableBody>
      {/* Slice the rows array to get only the rows for the current page. */}
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
              {/* For each column in the column definition, render a matching cell */}
              {columns.map((column, index) => {
                const value = row[column.id];
                const align =
                  index === 0
                    ? "left"
                    : index === columns.length - 1
                    ? "right"
                    : "center";
                return (
                  <TableCell key={column.id} align={align}>
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default TableDataRows;
