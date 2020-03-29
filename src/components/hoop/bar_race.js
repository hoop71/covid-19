// React
import React, { useEffect, useState } from "react"

import { Bar as NivoBar } from "@nivo/bar"
import { StaticQuery, graphql } from "gatsby"

import _ from "lodash"

const BarComponent = props => {
  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <rect
        x={-3}
        y={7}
        width={props.width}
        height={props.height}
        fill="rgba(0, 0, 0, .07)"
      />
      <rect width={props.width} height={props.height} fill={props.color} />
      <rect
        x={props.width - 5}
        width={5}
        height={props.height}
        fill={props.borderColor}
        fillOpacity={0.2}
      />
      <text
        x={props.width - 16}
        y={props.height / 2 - 8}
        textAnchor="end"
        dominantBaseline="central"
        fill="black"
        style={{
          fontWeight: 900,
          fontSize: 15,
        }}
      >
        {props.data.indexValue}
      </text>
      <text
        x={props.width - 16}
        y={props.height / 2 + 10}
        textAnchor="end"
        dominantBaseline="central"
        fill={props.borderColor}
        style={{
          fontWeight: 400,
          fontSize: 13,
        }}
      >
        {props.data.value}
      </text>
    </g>
  )
}

const Bar = ({ data: d }) => {
  const { data, date } = d
  return (
    <React.Fragment>
      <h2 style={{ marginLeft: 60, fontWeight: 400, color: "#555" }}>
        Cases By State By Date:
        <strong style={{ color: "black", fontWeight: 900 }}>{date}</strong>
      </h2>
      <NivoBar
        width={800}
        height={500}
        layout="horizontal"
        margin={{ top: 26, right: 120, bottom: 26, left: 60 }}
        data={data}
        indexBy="id"
        keys={["cases"]}
        colors={{ scheme: "spectral" }}
        colorBy="indexValue"
        borderColor={{ from: "color", modifiers: [["darker", 2.6]] }}
        enableGridX
        enableGridY={false}
        axisTop={{
          format: "~s",
        }}
        axisBottom={{
          format: "~s",
        }}
        axisLeft={null}
        padding={0.3}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
        isInteractive={false}
        barComponent={BarComponent}
        motionStiffness={170}
        motionDamping={26}
      />
    </React.Fragment>
  )
}

const BarDataWrapper = ({ data }) => {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    let timer
    if (current === data.length) {
      timer = setTimeout(() => {
        setCurrent(0)
      }, 1400)
    } else {
      timer = setTimeout(() => {
        setCurrent(current + 1)
      }, 1400)
    }
    return () => clearTimeout(timer)
  }, [current, setCurrent])

  const sorted = data[current].data.sort((a, b) => b.cases - a.cases)
  const sliced = _.slice(sorted, 0, 10)
  const ordered = sliced.reverse()

  return <Bar data={{ ...data[current], data: ordered }} />
}

const BarRace = () => {
  return (
    <StaticQuery
      query={graphql`
        query barRace {
          allUsStatesCsv {
            nodes {
              id
              date
              state
              deaths
              cases
            }
          }
        }
      `}
      render={data => {
        const byDate = _.groupBy(data.allUsStatesCsv.nodes, "date")

        return (
          <BarDataWrapper
            data={_.map(byDate, (date, key) => {
              return {
                date: key,
                data: date.map(d => ({
                  id: d.state,
                  cases: d.cases,
                  value: d.cases,
                  deaths: d.deaths,
                })),
              }
            })}
          />
        )
      }}
    />
  )
}

export default BarRace
