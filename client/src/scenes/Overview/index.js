import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "components/Header";
import OverviewLineChart from "components/OverviewLineChart";

const Overview = () => {
  const [view, setView] = useState("2015");

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="OVERVIEW"
        subTitle="Overview for News published each month"
      />
      <Box height="75vh" width='75vw'>
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="2015">2015</MenuItem>
            <MenuItem value="2016">2016</MenuItem>
            <MenuItem value="2017">2017</MenuItem>
          </Select>
        </FormControl>
        <OverviewLineChart view={view} />
      </Box>
    </Box>
  );
};

export default Overview;
