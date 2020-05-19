import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql, StaticQuery } from 'gatsby'
import Post from '../components/Post'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <StaticQuery
      query={indexQuery}
      render={data => {
        return (
          <div>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <Post
                title={node.frontmatter.title}
                path={node.frontmatter.path}
                author={node.frontmatter.author}
                body={node.excerpt}
                date={node.frontmatter.date}
                tags={node.frontmatter.tags}
              />
            ))}
          </div>
        )
      }}
    />
  </Layout>
)

const indexQuery = graphql`
  query indexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            author
            path
            tags
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage