// React
import React from "react"

// Material
import { Grid, makeStyles, Paper } from "@material-ui/core"

// Nivo
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
