import React from 'react'
import { ResponsivePie } from '@nivo/pie';
import { useTheme } from '@mui/material';
import { useGetPieChartQuery } from 'state/api'


const PieChartComponent = ({ view, isDashboard=true }) => {

  function getColor() {
    const hue = Math.floor(Math.random() * 360); // Random hue between 0 and 360
    return `hsl(${hue}, 70%, 50%)`;
  }
  const theme = useTheme();
  const { data, isLoading } = useGetPieChartQuery();
  const sectorCounts = data ? data.sectorCounts.map((item) => {
    return {
      id: item._id,               // Use the value of _id as id
      label: item._id,            // Use the value of _id as label
      value: item.value,          // Use the value of value as value
      color: getColor() // Fixed color for each object
    };
  }) : [];
  const pestleCounts = data ? data.pestleCounts.map((item) => {
    return {
      id: item._id,               // Use the value of _id as id
      label: item._id,            // Use the value of _id as label
      value: item.value,          // Use the value of value as value
      color: getColor() // Fixed color for each object
    };
  }) : [];

  const display = view === 'pestle' ? pestleCounts : sectorCounts;

  return (
    <>
      {!isLoading ? 
      (
        <ResponsivePie
        data={display}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200]
                  }
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200]
                  }
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1
                  },
                  text: {
                    fill: theme.palette.secondary[200]
                  }
                }
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200]
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main
                }
              }
            }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        sortByValue={true}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.secondary[800]}
        arcLinkLabelsThickness={2}
        arcLabelsSkipAngle={10}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      /> ) : <>Loading...</>}
    </>
  )
}

export default PieChartComponent