import React, { useContext } from "react"

// Context
import { DisplayContext } from "../../../pages/hoop"

// Components
import { Bar as NivoBar } from "@nivo/bar"
import BarComponent from "./bar_component"

// Material
import { makeStyles } from "@material-ui/core"

// Libraries
import _ from "lodash"

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
})

const Bar = ({ data: groupedData, display }) => {
  const { height, width } = useContext(DisplayContext)
  const classes = useStyles()
  const { data, date } = groupedData
  return (
    <div className={classes.wrapper}>
      <h2>
        {`${_.startCase(display)} By State By Date`}
        <strong
          style={{ color: "black", fontWeight: 900 }}
        >{` ${date}`}</strong>
      </h2>
      <div>
        <NivoBar
          width={width - width * 0.1}
          height={height - height * 0.3}
          layout="horizontal"
          margin={{ top: 26, right: 120, bottom: 26, left: 100 }}
          data={data}
          indexBy="id"
          keys={["value"]}
          colors={{ scheme: "spectral" }}
          colorBy="indexValue"
          borderColor={{ from: "color", modifiers: [["darker", 2.6]] }}
          enableGridX
          enableGridY={false}
          axisBottom={{
            legend: "cases",
          }}
          axisLeft={null}
          padding={0.3}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
          isInteractive={false}
          barComponent={BarComponent}
          motionStiffness={170}
          motionDamping={26}
        />
      </div>
    </div>
  )
}
export default Bar
