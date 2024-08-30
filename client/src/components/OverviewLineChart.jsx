import React, { useMemo } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useTheme } from '@emotion/react';
import { useGetOverviewQuery } from "state/api";


const OverviewLineChart = ({ isDashboard = false, view }) => {
  const theme = useTheme()  
  const { data, isLoading } = useGetOverviewQuery();
  const [total2015Line, total2016Line, total2017Line] = useMemo(() => {

    const total2015Line = {
      id: 'total2015',
      color: theme.palette.secondary.main,
      data: []
    };
    const total2016Line = {
      id: 'total2016',
      color: theme.palette.secondary[600],
      data: []
    };
    const total2017Line = {
      id: 'total2017',
      color: theme.palette.secondary[200],
      data: []
    };

    if (data) {
      data.reduce((acc, { month, countOf2015, countOf2016, countOf2017 }) => {
        const cur2015Count = acc.total2015 + countOf2015;
        total2015Line.data = [
          ...total2015Line.data,
          { x: month, y: cur2015Count }
        ]

        const cur2016Count = acc.total2016 + countOf2016;
        total2016Line.data = [
          ...total2016Line.data,
          { x: month, y: cur2016Count }
        ]
        const cur2017Count = acc.total2017 + countOf2017;
        total2017Line.data = [
          ...total2017Line.data,
          { x: month, y: cur2017Count }
        ]

        return { total2015: cur2015Count, total2016: cur2016Count, total2017: cur2017Count }

      }, { total2015: 0, total2016: 0, total2017: 0 });
    }

    return [[total2015Line], [total2016Line], [total2017Line]];

  }, [data]);

  const display = view === '2017' ? total2017Line : (view === '2016' ? total2016Line : total2015Line )
  const leftLegent = view === '2017' ? '2017' : (view === '2016' ? '2016' : '2015')

  return (
    <> {
      !isLoading ? (
        <ResponsiveLine
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
          margin={{ top: 20, right: 50, bottom: 40, left: 70 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
          }}
          yFormat=" >-.2f"
          curve='catmullRom'
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: (v) => {
              if (isDashboard)
                return v.slice(0, 3);

              return v;
            },
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? "" : 'Month',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? "" : leftLegent,
            legendOffset: -60,
            legendPosition: 'middle',
            truncateTickAt: 0
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={
            isDashboard ? [
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ] : undefined}
        />
      ) : (<>Loading...</>)
    }
      
    </>
    
  )
}

export default OverviewLineChart