import React from "react";
import { TextField } from "@mui/material";
import FlexBetween from "./FlexBetween";

import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";

const DataGridCustomToolbar = ({ searchInput, setSearch, setSearchInput }) => {
  return (
  <GridToolbarContainer>
    <FlexBetween width="100%">
      <FlexBetween>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </FlexBetween>
      <TextField
        label="Search..."
        sx={{
          mb: "0.5rem",
          width: "15rem",
        }}
        onChange={(e) => {
          setSearchInput(e.target.value)
          setSearch(e.target.value)
        }}
        value={searchInput}
        variant="standard"
      />
    </FlexBetween>
  </GridToolbarContainer>)
};

export default DataGridCustomToolbar;
