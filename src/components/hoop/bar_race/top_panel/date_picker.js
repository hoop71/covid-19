import "date-fns"
import React from "react"
import DateFnsUtils from "@date-io/date-fns"

import { makeStyles } from "@material-ui/core"
import { getNYTShortDate } from "../utils"

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"

const useStyles = makeStyles({
  wrapper: {
    marginTop: "1em",
  },
})

const DatePicker = ({ maxEndDate, startDate, setStartDate }) => {
  const classes = useStyles()

  const handleSetStartDate = date => {
    setStartDate(date)
  }
  return (
    <div className={classes.wrapper}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          format="yyyy-MM-dd"
          margin="normal"
          id="start-date-picker"
          minDate={"2020-01-21"}
          maxDate={getNYTShortDate(maxEndDate)}
          label="Choose Start Date"
          value={startDate}
          onChange={handleSetStartDate}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  )
}

export default DatePicker
