import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { Row, Col } from 'reactstrap'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Post from '../components/post'
import PaginationLinks from '../components/paginationLinks'

const postsPerPage = 4
let numberOfPages = 1

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <StaticQuery
        query={indexQuery}
        render={data => {
          numberOfPages = Math.ceil(
            data.allMarkdownRemark.totalCount / postsPerPage
          )
          return (
            <Row>
              {data.allMarkdownRemark.edges.map(({ node },index) => {
                return (
                  <Col lg="6" md="6" sm="12" xs="12">
                    <Post
                      index={index}
                      key={node.id}
                      title={node.frontmatter.title}
                      slug={node.fields.slug}
                      author={node.frontmatter.author}
                      body={node.excerpt}
                      date={node.frontmatter.date}
                      tags={node.frontmatter.tags}
                      featuredimage={node.frontmatter.featuredimage}
                    />
                  </Col>
                )
              })}
            </Row>
          )
        }}
      />
      <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
    </Layout>
  )
}

const indexQuery = graphql`
  query indexQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 4
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            author
            tags
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 500, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage