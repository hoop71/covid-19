// React
import React from "react"
import { useWindowSize } from "@reach/window-size"

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
    height: ({ height }) => {
      console.log("Styles height", height)
      return { height: height - 50 }
    },
    width: ({ width }) => {
      console.log("Styles width", width)
      return { width: width - width * 0.1 }
    },
  },
})

const Hoop = () => {
  const { height, width } = useWindowSize()
  const classes = useStyles({ height, width })
  return (
    <div className={classes.wrapper}>
      <BarRace />
    </div>
  )
}

export default Hoop
