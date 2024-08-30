import React, { useState } from 'react'
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from 'components/Header';
import PieChartComponent from 'components/PieChartComponent';

const PieChart = () => {
  const [view, setView] = useState("pestle");
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="PIE CHART"
        subTitle="Displaying the count of pestles, topics, sector"
      />
      <Box height="75vh" >
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select 
            sx={{
              width:'10rem'
            }}
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="pestle">Pestle</MenuItem>
            <MenuItem value="sector">Sector</MenuItem>
          </Select>
          </FormControl>
          <PieChartComponent isDashboard={false} view={view}/>
        </Box>  
    </Box>
  );
}

export default PieChart