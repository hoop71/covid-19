import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import BarRace from "../components/hoop/bar_race"

const useStyles = makeStyles(theme => ({
  layout: {},
  root: {
    padding: "1.5em",
    flexGrow: 1,
    height: "100%",
    background: "aliceblue",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}))

export default function FullWidthGrid() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <BarRace />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
