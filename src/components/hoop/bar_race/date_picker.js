import { format } from "date-fns"
import React from "react"
import DateFnsUtils from "@date-io/date-fns"

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"

const DatePicker = ({ startDate, setStartDate }) => {
  const handleSetStartDate = date => {
    setStartDate(date)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        format="yyyy-MM-dd"
        margin="normal"
        id="start-date-picker"
        minDate={"2020-01-21"}
        maxDate={new Date()}
        label="Start Date"
        value={startDate}
        onChange={handleSetStartDate}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker
