// React
import React from "react"

// Gatsby
import { graphql, Link } from "gatsby"

// Components
import Layout from "../components/layout"
import SEO from "../components/seo"

// Material
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
  linkWrapper: {
    display: "flex",
    justifyContent: "space-around",
  },
}))

const IndexPage = ({ data }) => {
  const classes = useStyles()
  return (
    <Layout>
      <SEO title="Home" />
      <div className={classes.linkWrapper}>
        <Link to="/elijah/" activeStyle={{ color: "red" }}>
          Elijah
        </Link>
        <Link to="/hoop/" activeStyle={{ color: "red" }}>
          Hoop
        </Link>
      </div>
    </Layout>
  )
}

export default IndexPage

export const index_query = graphql`
  query index_query {
    allUsCountiesCsv(
      filter: { date: { gte: "03/20/2020" }, state: { eq: "Colorado" } }
    ) {
      totalCount
    }
  }
`
