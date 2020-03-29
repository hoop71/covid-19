// React
import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import Slider from "@material-ui/core/Slider"
import moment from 'moment'

import TreeMap from './TreeMap'

const Wrapper = ({ marks }) => {
  const [date, setDate] = useState(marks[0].label)

  function valueLabelFormat(value) {
    return marks[value].label
  }

  return (
    <div>
      <h3>Covid-19 Cases by County (Grouped by State)</h3>
      <Slider
        // getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="on"
        valueLabelFormat={valueLabelFormat}
        defaultValue={0}
        min={0}
        step={1}
        onChange={(e, value) => {
          setDate(marks[value].label)
        }}
        // valueLabelDisplay ={(a, b) => {
        //   debugger
        //   return <div>HI</div>
        // }}
        max={marks.length}
      />
      <TreeMap date={date} />
    </div>
  )
}

const App = () => (
  <StaticQuery
    query={graphql`
      {
        allUsCountiesCsv {
          distinct(field: date)
        }
      }
    `}
    render={data => {
      const marks = data.allUsCountiesCsv.distinct.map(string => {
        return ({
          value: +moment(string, 'YYYY-MM-DD').format('X'),
          label: string
        })
      })

      return (
        <Wrapper marks={marks} />
      )
    }}
  />
)

export default App
