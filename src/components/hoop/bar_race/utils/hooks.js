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
    if (
      current === _.size(byDisplay) - 1 ||
      startDateRef.current !== formattedStartDate
    ) {
      startDateRef.current = formattedStartDate
      timer = setTimeout(
        () => {
          setCurrent(0)
        },
        // If it's the last index, pause before restart, otherwise, next-tick
        current === _.size(byDisplay) - 1 ? 1200 : 1
      )
    } else {
      timer = setTimeout(() => {
        setCurrent(current + 1)
      }, 800)
    }
    return () => clearTimeout(timer)
  }, [current, data, byDisplay, startDate])

  return _.get(byDisplay, `${current}`, byDisplay[0])
}
