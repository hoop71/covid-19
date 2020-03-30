// React
import React from "react"

// Material
import { makeStyles } from "@material-ui/core"

const useTypographyPanelStyles = makeStyles({
  wrapper: {
    width: "100%",
    textAlign: "center",
    marginTop: "1em",
  },
})

export const TypographyPanel = ({ children, displayDate }) => {
  const classes = useTypographyPanelStyles()
  return <div className={classes.wrapper}>{children}</div>
}

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerWrapper: {
    width: "250px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
})

const TopPanel = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <div className={classes.headerWrapper}>{children}</div>
    </div>
  )
}

export default TopPanel
