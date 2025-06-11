import React from "react";
import { TableBody, TableRow, TableCell } from "@mui/material";
import Switch from "@mui/material/Switch";
import {Edit, Delete} from '@mui/icons-material';

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
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : typeof value  ===  "boolean" ? <Switch disabled defaultChecked = {value} /> : value} 
                  </TableCell>
                );
              })}
               <TableCell key={row} align={"right"}>
                                       <Edit/>
                                       <Delete/>
                                       </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default TableDataRows;
