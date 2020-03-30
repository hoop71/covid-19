import React from "react"

// Context
import { useWindowSize } from "@reach/window-size"

// Components
import { Bar as NivoBar } from "@nivo/bar"
import BarComponent from "./bar_component"

const Bar = ({
  atLeastOneToDisplay,
  data: groupedData,
  display,
  setDisplay,
}) => {
  const { height, width } = useWindowSize()
  console.log(`Height: ${height} and Width: ${width}`)
  const { data } = groupedData
  return (
    <div
      id="needs fixed height"
      style={{ height: height * 0.7, minHeight: "30vh" }}
    >
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
        <h1 style={{ height: height - height * 0.3 }}>
          No Cases Reported For This Date
        </h1>
      )}
    </div>
  )
}
export default Bar
