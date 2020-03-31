import { useEffect, useRef, useState, useMemo } from "react"
import _ from "lodash"
import { format } from "date-fns"

const getByDisplay = ({ data, display, startDate }) => {
  const formatedStateDate = format(startDate, "yyyy-MM-dd")

  return _.compact(
    _.map(data, (values, date) => {
      if (date >= formatedStateDate) {
        return {
          date,
          data: _.slice(
            _.map(values, (value, key) => ({
              id: value.state,
              value: value[display],
              state: value.state,
            })).sort((a, b) => b.value - a.value),
            0,
            10
          ).reverse(),
        }
      }
    })
  )
}

export const useTimer = ({ data, display, startDate }) => {
  const [current, setCurrent] = useState(0)
  const byDisplay = useMemo(() => getByDisplay({ data, display, startDate }), [
    data,
    display,
    startDate,
  ])

  const startDateRef = useRef(format(startDate, "yyyy/MM/dd"))

  useEffect(() => {
    const formattedStartDate = format(startDate, "yyyy/MM/dd")
    let timer

    console.log("StartDate: ", formattedStartDate)
    console.log(startDateRef.current)
    if (current === _.size(byDisplay) - 1) {
      console.log("current === end, last date")
      startDateRef.current = formattedStartDate
      // If it's the last index, pause before restart
      timer = setTimeout(() => {
        setCurrent(0)
      }, 1200)
    } else if (startDateRef.current !== formattedStartDate) {
      console.log("date change")
      startDateRef.current = formattedStartDate
      // If it's the last index, pause before restart, otherwise, next-tick
      timer = setTimeout(() => {
        setCurrent(-1)
      }, 0)
    } else {
      console.log("same same next tick")
      timer = setTimeout(() => {
        setCurrent(current + 1)
      }, 800)
    }
    return () => clearTimeout(timer)
  }, [current, data, byDisplay, startDate])
  console.log(_.get(byDisplay, `${current}`))
  return _.get(byDisplay, `${current}`, byDisplay[0])
}
