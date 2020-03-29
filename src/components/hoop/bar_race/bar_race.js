// React
import React, { useEffect, useState, useMemo } from "react"

// Gatsby
import { StaticQuery, graphql } from "gatsby"

// Components
import Bar from "./bar"

// Libraries
import _ from "lodash"

// const sortByDisplayValue = (a, b) => {
//   return sort((a, b) => b[display] - a[display])
// }

const BarDataWrapper = ({ data, width }) => {
  const [current, setCurrent] = useState(0)
  const [display, setDisplay] = useState("deaths")
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
  }, [current, setCurrent, data.length, display])

  const byDisplay = _.map(data, (values, key) => {
    return {
      date: key,
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

  // // sort by most cases
  console.log(byDisplay[current])
  return <Bar data={byDisplay[current]} display={display} width={width} />
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
