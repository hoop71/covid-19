
// React
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import _ from 'lodash'
import { ResponsiveTreeMap } from "@nivo/treemap"

const TreeMap = ({ date }) => (
  <StaticQuery
    query={graphql`
      {
        allUsCountiesCsv {
          nodes {
            county
            state
            date
            cases
            deaths
          }
        }
      }
    `}
    render={data => {
      const { nodes } = data.allUsCountiesCsv
      const filteredNodes = nodes.filter(node => node.cases > 10 && node.date === date)
      const byState = _.groupBy(filteredNodes, "state")

      const root = {
        name: "United States",
        children: _.map(byState, (children, state) => ({
          name: state,
          children: children.map(county => ({
            name: county.county,
            loc: +county.cases,
            state,
            id: county.county
          }))
        }))
      }
      return (
        <div style={{ height: 700, width: 1700 }}>
          <ResponsiveTreeMap
            root={root}
            identity="name"
            value="loc"
            innerPadding={3}
            outerPadding={3}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            label={county => `${county.name}, ${county.state} (${county.loc})`}
            labelSkipSize={25}
            labelTextColor="black"
            colors={{ scheme: "nivo" }}
            borderColor={{ theme: "background" }}
            animate={true}
            motionStiffness={90}
            motionDamping={11}
          />
        </div>
      )
    }}
  />
)

export default TreeMap