// React
import React, { useState } from "react"

// Gatsby
import { StaticQuery, graphql } from "gatsby"

// Components
import Bar from "./bar"
import DatePicker from "./date_picker"
import ToggleContainer from "./toggle_container"

// Material
import { makeStyles } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"

// Custom Hooks
import { useTimer } from "./hooks"

// Libraries
import _ from "lodash"

const fiveDaysInMillisecons = 4.32e8
const fiveDaysAgo = new Date(new Date() - fiveDaysInMillisecons)

const useBarDataWrapperStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}))

const BarDataWrapper = ({ data, height }) => {
  const classes = useBarDataWrapperStyles({ height })
  const [display, setDisplay] = useState("cases")
  const [startDate, setStartDate] = useState(fiveDaysAgo)
  const currentDisplay = useTimer({ data, startDate, display })

  // Do we at least have some data to showp?
  const atLeastOneToDisplay = _.size(currentDisplay)
  console.log(`currentDisplay`)
  console.log(currentDisplay)
  return (
    <Paper>
      <div className={classes.wrapper}>
        <ToggleContainer display={display} setDisplay={setDisplay} />
        <DatePicker startDate={startDate} setStartDate={setStartDate} />
        <h2>
          {`${_.startCase(display)} By State By Date`}
          <strong style={{ color: "black", fontWeight: 900 }}>{` ${_.get(
            currentDisplay,
            "date"
          )}`}</strong>
        </h2>
      </div>
      <Bar
        atLeastOneToDisplay={atLeastOneToDisplay}
        data={currentDisplay}
        display={display}
        setDisplay={setDisplay}
      />
    </Paper>
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
