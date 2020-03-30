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
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: "50px",
    height: ({ height }) => height - 50,
    width: ({ width }) => width - width * 0.1,
  },
})

const Hoop = () => {
  const { height, width } = useWindowSize()
  const classes = useStyles({ height, width })
  console.log(classes.wrapper)
  return (
    <div className={classes.wrapper}>
      <BarRace height={height} />
    </div>
  )
}

export default Hoop
