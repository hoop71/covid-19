// React
import React, { useEffect, useState } from "react"
import { StaticQuery, graphql } from "gatsby"

// Nivo
import { ResponsiveLine } from "@nivo/line"

// Utils
import { state_data } from "../../utils"
import _ from "lodash"

const getWindowWidth = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth
  } else {
    return 1001
  }
}

const useWindowWidth = () => {
  const [width, setWidth] = useState(getWindowWidth())

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  return width
}

const getStateValueByKey = (key, value, result) => {
  const state_obj = state_data.find(s => _.toLower(s[key]) === _.toLower(value))
  if (state_obj) {
    return state_obj[result]
  }
}

const Line = () => {
  const width = useWindowWidth()
  return (
    <StaticQuery
      query={graphql`
        query line {
          allUsStatesCsv(filter: { date: { gte: "2020-03-27" } }) {
            nodes {
              state
              cases
            }
          }
        }
      `}
      render={data => {
        const nivoData = [
          {
            id: "Cases By State",
            data: data.allUsStatesCsv.nodes.map(n => {
              return {
                x: getStateValueByKey("name", n.state, "abbreviation"),
                y: n.cases,
                id: n.id,
              }
            }),
          },
        ]
        return <MyResponsiveLine data={nivoData} width={width} />
      }}
    />
  )
}

export default Line

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ data, width }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    enablePoints={width > 1000}
    pointBorderWidth={1}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Total Cases",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Cases",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    colors={{ scheme: "nivo" }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabel={"me"}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
)
