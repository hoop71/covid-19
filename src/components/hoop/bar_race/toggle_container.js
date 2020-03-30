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
})

const ToggleContainer = ({ display, setDisplay }) => {
  const classes = useStyles()

  const handleOnClick = displayName => {
    setDisplay(displayName)
  }

  return (
    <ButtonGroup className={classes.wrapper}>
      <Tooltip title="Show Cases" placement="top">
        <IconButton
          onClick={() => handleOnClick("cases")}
          id="cases"
          value="cases"
          style={{ background: display === "cases" ? "#a8a8a8" : "" }}
        >
          <GiPlagueDoctorProfile />
        </IconButton>
      </Tooltip>
      <Tooltip title="Show Deaths" placement="top">
        <IconButton
          onClick={() => handleOnClick("deaths")}
          value="deaths"
          style={{ background: display === "deaths" ? "#a8a8a8" : "" }}
        >
          <GiDeathSkull />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  )
}

export default ToggleContainer
