// React
import React from "react"

// Material
import { makeStyles } from "@material-ui/core"

// Libraries
import ReactTextTransition from "react-text-transition"

const useTypographyPanelStyles = makeStyles({
  wrapper: {
    width: "100%",
    textAlign: "center",
    marginTop: "1em",
  },
})

export const TypographyPanel = ({ children, displayDate }) => {
  const classes = useTypographyPanelStyles()
  return (
    <div className={classes.wrapper}>
      {children}
      <ReactTextTransition
        direction="down"
        style={{ display: "inline" }}
        text={displayDate}
        order={1}
        spring={{ stiffness: 50, damping: 20 }}
      />
    </div>
  )
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
