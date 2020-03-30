import React, { useContext } from "react"

// Context
import { DisplayContext } from "../../../pages/hoop"

// Components
import { Bar as NivoBar } from "@nivo/bar"
import BarComponent from "./bar_component"
import ToggleContainer from "./toggle_container"

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

const Bar = ({
  atLeastOneToDisplay,
  data: groupedData,
  display,
  setDisplay,
}) => {
  const { height, width } = useContext(DisplayContext)
  const classes = useStyles()
  const { data, date } = groupedData
  return (
    <div className={classes.wrapper}>
      <ToggleContainer display={display} setDisplay={setDisplay} />
      <h2>
        {`${_.startCase(display)} By State By Date`}
        <strong
          style={{ color: "black", fontWeight: 900 }}
        >{` ${date}`}</strong>
      </h2>
      <div>
        {atLeastOneToDisplay ? (
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
        ) : (
          <h1 style={{ height: height - height * 0.3 }}>
            No Cases Reported For This Date
          </h1>
        )}
      </div>
    </div>
  )
}
export default Bar
