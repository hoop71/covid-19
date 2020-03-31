import React from "react"

// Components
import { Bar as NivoBar } from "@nivo/bar"
import BarComponent from "./bar_component"

const Bar = ({
  atLeastOneToDisplay,
  data: groupedData,
  display,
  setDisplay,
}) => {
  const { data } = groupedData
  return (
    <div id="needs fixed height" style={{ height: "60vh" }}>
      {atLeastOneToDisplay ? (
        <NivoBar
          width={800}
          height={500}
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
        <h1 style={{ height: "30vh" }}>No Cases Reported For This Date</h1>
      )}
    </div>
  )
}
export default Bar
