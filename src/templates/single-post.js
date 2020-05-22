import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import { Badge, Card, CardBody, CardSubtitle } from 'reactstrap'
// import Img from 'gatsby-image'
import { slugify } from '../util/utilityFunctions'
import { DiscussionEmbed } from 'disqus-react'

const SinglePost = ({ data,pageContext }) => {
  const post = data.markdownRemark.frontmatter

  const baseUrl = 'https://gatsbytutorial.co.uk/'

  const disqusShortname = 'https-gatsbytutorial-co-uk'
  const disqusConfig = {
    identifier: data.markdownRemark.id,
    title: post.title,
    url: baseUrl + pageContext.slug,
  }

  return (
    <Layout pageTitle={post.title} isShowSider={true}>
      <SEO title="Home" keywords={[`react`]} />
      <Card>
        <CardBody>
          <CardSubtitle>
            <span className="text-info">{post.date}</span> by{' '}
            <span className="text-info">{post.author}</span>
          </CardSubtitle>
          <div
            dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
          />
          <ul className="post-tags">
            {post.tags.map(tag => (
              <li key={tag}>
                <Link to={`/tag/${slugify(tag)}`}>
                  <Badge color="primary">{tag}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </Layout>
  )
}

export const postQuery = graphql`
  query blogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        author
        date(formatString: "YYYY-MM-DD")
        tags
      }
    }
  }
`

export default SinglePost