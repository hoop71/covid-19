import React from "react"

// Material
import { makeStyles } from "@material-ui/core"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"

// Icons
import { GiDeathSkull, GiPlagueDoctorProfile } from "react-icons/gi"

const useStyles = makeStyles({
  wrapper: {
    marginTop: "2em",
  },
  casesIconButton: ({ display }) => ({
    background: display === "cases" ? "#a8a8a8" : "",
    color: display === "cases" ? "#fff" : "#d4d4d4",
    "&:hover": {
      color: "#a8a8a8",
    },
  }),
  deathIconButton: ({ display }) => ({
    background: display === "deaths" ? "#a8a8a8" : "",
    color: display === "deaths" ? "#fff" : "#d4d4d4",
    "&:hover": {
      color: "#a8a8a8",
    },
  }),
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
