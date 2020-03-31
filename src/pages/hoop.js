// React
import React from "react"

// Material
import { makeStyles } from "@material-ui/core"

// Components
// import LineGraph from "../components/hoop/line-graph"
import BarRace from "../components/hoop/bar_race"

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    padding: "2em",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
})

const Hoop = () => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <BarRace />
    </div>
  )
}

export default Hoop
