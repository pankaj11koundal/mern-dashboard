import React from 'react'
import { Email, Traffic } from '@mui/icons-material';
import { Box, useTheme, useMediaQuery, Typography } from '@mui/material';
import Header from 'components/Header';
import { useGetDashboardQuery } from 'state/api';
import StatBox from 'components/StatBox';
import OverviewLineChart from 'components/OverviewLineChart';
import PieChartComponent from 'components/PieChartComponent';

const Dashboard = () => {
  const theme = useTheme();
  // const isNonMediumScreens = useMediaQuery('(mid-width: 1200px)');
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)")
  const { data, isLoading } = useGetDashboardQuery();
  return (
    <Box m='1.5rem 2.5rem'>
      <Header title="DASHBOARD" subTitle="Welcome to your Dashboard" />
    
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="News Count in 2015"
          value={data && data.count2015}
          description="Count 2015"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="News Count in 2016"
          value={data && data.count2016}
          description="Count 2016"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewLineChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="News count in 2017"
          value={data && data.count2017}
          description="Count 2017"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Most Occurred Topic"
          value={data && data.topic.count}
          description={data && data.topic._id}
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* Row 2 */}
        <Box 
          gridColumn='span 8'
          gridRow='span 3'
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius='0.55rem'
        >
          <Typography variant='h6' sx={{ color: theme.palette.secondary[100]}}>
            Sales by Category
          </Typography>
          <PieChartComponent view='pestle' isDashboard={true} />
        </Box>

      </Box>
    </Box>
  )
};

export default Dashboard;