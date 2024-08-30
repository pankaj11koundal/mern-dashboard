import React, { useState } from 'react'
import { Box  } from "@mui/material";
import Header from "components/Header";
import DailyBarChart from 'components/DailyBarChart';

const Daily = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="DAILY BAR CHART"
        subTitle="Displaying Intensity, relevance and Likelihood corresponding to pestles"
      />
      <Box height="75vh" width='75vw'>
        <DailyBarChart  />
      </Box>
    </Box>
  );
}

export default Daily