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
  const [display, setDisplay] = useState("cases")
  useEffect(() => {
    let timer
    if (current === data.length - 2) {
      timer = setTimeout(() => {
        setCurrent(0)
      }, 1400)
    } else {
      timer = setTimeout(() => {
        setCurrent(current + 1)
      }, 1400)
    }
    return () => clearTimeout(timer)
  }, [current, setCurrent, data.length, display])

  const byDisplay = _.map(data, (values, key) => {
    return {
      date: key,
      total_deaths: values.reduce((a, b) => a + b.deaths),
      total_cases: values.reduce((a, b) => a + b.cases),
      data: _.slice(
        _.map(values, (value, key) => ({
          id: value.state,
          value: value[display],
          state: value.state,
        })).sort((a, b) => b.value - a.value),
        0,
        10
      ).reverse(),
    }
  })
  console.log(display)

  const atLeastOneToDisplay =
    byDisplay[current].data.reduce((r, c) => r + parseInt(c.value), 0) > 0
  return (
    <Bar
      atLeastOneToDisplay={atLeastOneToDisplay}
      data={byDisplay[current]}
      display={display}
      setDisplay={setDisplay}
    />
  )
}

const BarRace = ({ display }) => {
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
        return (
          <BarDataWrapper data={_.groupBy(data.allUsStatesCsv.nodes, "date")} />
        )
      }}
    />
  )
}

export default BarRace
