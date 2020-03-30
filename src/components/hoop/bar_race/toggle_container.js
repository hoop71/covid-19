import React from "react"

// Material
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"

// Library
import _ from "lodash"

const ToggleContainer = ({ display, setDisplay }) => {
  const handleSetDisplay = (e, v) => {
    setDisplay(_.toLower(e.target.innerText))
  }

  return (
    <div>
      <Tooltip title="Show Cases" placement="top">
        <Button
          onClick={e => handleSetDisplay(e)}
          id="cases"
          value="cases"
          style={{ background: display === "cases" ? "#a8a8a8" : "" }}
        >
          Cases
        </Button>
      </Tooltip>
      <Tooltip title="Show Deaths" placement="top">
        <Button
          onClick={handleSetDisplay}
          value="deaths"
          style={{ background: display === "deaths" ? "#a8a8a8" : "" }}
        >
          Deaths
        </Button>
      </Tooltip>
    </div>
  )
}

export default ToggleContainer
