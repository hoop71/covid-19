// React
import React, { useEffect, useState } from "react"

// Gatsby
import { StaticQuery, graphql } from "gatsby"

// Components
import Bar from "./bar"

// Libraries
import _ from "lodash"

const BarDataWrapper = ({ data, width }) => {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    let timer
    if (current === data.length - 1) {
      timer = setTimeout(() => {
        setCurrent(0)
      }, 1400)
    } else {
      timer = setTimeout(() => {
        setCurrent(current + 1)
      }, 1400)
    }
    return () => clearTimeout(timer)
  }, [current, setCurrent, data.length])

  const sorted = data[current].data.sort((a, b) => b.cases - a.cases)
  const sliced = _.slice(sorted, 0, 10)
  const ordered = sliced.reverse()

  return <Bar data={{ ...data[current], data: ordered }} width={width} />
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
