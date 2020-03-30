import React from "react"

// Context
import { useWindowSize } from "@reach/window-size"

// Components
import { Bar as NivoBar } from "@nivo/bar"
import BarComponent from "./bar_component"

import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  wrapper: { height: ({ height }) => height * 0.7, minHeight: "30vh" },
})

const Bar = ({
  atLeastOneToDisplay,
  data: groupedData,
  display,
  setDisplay,
}) => {
  const { height, width } = useWindowSize()
  const classes = useStyles({ height })

  const { data } = groupedData
  return (
    <div id="needs fixed height" className={classes.wrapper}>
      {atLeastOneToDisplay ? (
        <NivoBar
          width={width * 0.9}
          height={height * 0.7}
          layout="horizontal"
          margin={{ top: 25, right: 120, bottom: 100, left: 220 }}
          data={data}
          indexBy="id"
          keys={["value"]}
          colors={{ scheme: "spectral" }}
          colorBy="indexValue"
          borderColor={{ from: "color", modifiers: [["darker", 2.6]] }}
          enableGridX
          enableGridY={false}
          axisBottom={{
            legend: display,
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
        <h1 style={{ height: height * 0.7 || "30vh" }}>
          No Cases Reported For This Date
        </h1>
      )}
    </div>
  )
}
export default Bar
