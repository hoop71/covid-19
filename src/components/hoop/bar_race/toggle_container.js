import React from "react"

// Material
import { makeStyles } from "@material-ui/core"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"

// Icons
import { GiDeathSkull, GiPlagueDoctorProfile } from "react-icons/gi"

const toggledOn = { background: "#a8a8a8", color: "white" }

const useStyles = makeStyles({
  wrapper: {
    marginTop: "2em",
  },
  casesIconButton: ({ display }) => {
    if (display === "cases") {
      return toggledOn
    }
  },
  deathIconButton: ({ display }) => {
    if (display === "deaths") {
      return toggledOn
    }
  },
})

const ToggleContainer = ({ display, setDisplay }) => {
  const classes = useStyles({ display })

  const handleOnClick = displayName => {
    setDisplay(displayName)
  }

  return (
    <ButtonGroup className={classes.wrapper}>
      <Tooltip title="Show Cases" placement="top">
        <IconButton
          className={classes.casesIconButton}
          onClick={() => handleOnClick("cases")}
          id="cases"
          value="cases"
        >
          <GiPlagueDoctorProfile />
        </IconButton>
      </Tooltip>
      <Tooltip title="Show Deaths" placement="top">
        <IconButton
          className={classes.deathIconButton}
          onClick={() => handleOnClick("deaths")}
          value="deaths"
        >
          <GiDeathSkull />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  )
}

export default ToggleContainer
