import React from 'react'
import { Box, useTheme } from '@mui/material'
import { useGetGeographyQuery } from 'state/api'
import { ResponsiveChoropleth } from '@nivo/geo'
import Header from 'components/Header'
import geoData from 'state/geoData'



const Geography = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyQuery();

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='GEOGRAPGHY' subTitle='Find from where you are getting news.'/>
      <Box
        mt='40px'
        height='75vh'
        width='75vw'
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius='4px'
      >
        {data ? <ResponsiveChoropleth
          data={data}
          theme={{
            axis:{
              domain:{
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
          features={geoData.features}
          margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
          domain={[0, 120]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionTranslation={[0.45, 0.6]}
          projectionRotation={[0, 0, 0]}
          graticuleLineColor="#dddddd"
          borderWidth={1.3}
          borderColor="#ffffff"
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: true,
              translateX: 0,
              translateY: -120,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: 'left-to-right',
              itemTextColor: theme.palette.secondary[200],
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: theme.palette.background.alt,
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}  
        /> : <>Loading...</>}
      </Box>
    </Box>
  )
}

export default Geography;