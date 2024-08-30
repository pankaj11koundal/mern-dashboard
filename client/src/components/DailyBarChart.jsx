import React from 'react'
import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@emotion/react';
import { useGetDailyQuery } from 'state/api'

const DailyBarChart = () => {
  const { data, isLoading } = useGetDailyQuery();
  const theme = useTheme();
  
  return <>

  {!isLoading ? (
  <ResponsiveBar
    data={data}
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
    keys={[
      'Intensity',
      'Relevance',
      'Likelihood'
    ]}
    indexBy="pestle"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    groupMode="grouped"
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    enableGridY={false}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Pestle',
      legendPosition: 'middle',
      legendOffset: 32,
      truncateTickAt: 0
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Features',
      legendPosition: 'middle',
      legendOffset: -40,
      truncateTickAt: 0
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
  />) : <>Loading...</>
  }
  </>
}

export default DailyBarChart