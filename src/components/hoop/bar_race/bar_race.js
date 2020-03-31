// React
import React, { useState } from "react"

// Gatsby
import { StaticQuery, graphql } from "gatsby"

// Components
import Bar from "./bar"
import TopPanel, {
  DatePicker,
  ToggleContainer,
  TypographyPanel,
} from "./top_panel"

// Material
import { Grid, Typography } from "@material-ui/core"

// Custom Hooks
import { useTimer } from "./utils/hooks"

// Libraries
import _ from "lodash"

// Utils
import { fiveDaysAgo, parseHumanDate } from "./utils"

const BarDataWrapper = ({ data }) => {
  const [display, setDisplay] = useState("cases")
  const [startDate, setStartDate] = useState(fiveDaysAgo)
  const currentDisplay = useTimer({ data, startDate, display })

  // Do we at least have some data to showp?
  const atLeastOneToDisplay = _.size(currentDisplay)

  return (
    <Grid alignItems="center" container direction="column" justify="center">
      <TopPanel>
        <ToggleContainer display={display} setDisplay={setDisplay} />
        <DatePicker startDate={startDate} setStartDate={setStartDate} />
        <TypographyPanel>
          <Typography variant="subtitle1">
            {`${_.startCase(display)} By State By Date: `}
          </Typography>
          <Typography variant="subtitle1">
            {`${parseHumanDate(currentDisplay)}`}
          </Typography>
        </TypographyPanel>
      </TopPanel>
      <Bar
        atLeastOneToDisplay={atLeastOneToDisplay}
        data={currentDisplay}
        display={display}
        setDisplay={setDisplay}
      />
    </Grid>
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
