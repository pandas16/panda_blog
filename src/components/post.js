import React from 'react'
import {
  Row,
  Col,
  Badge,
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody
} from 'reactstrap'
import { Link } from 'gatsby'
import { slugify } from '../util/utilityFunctions'
import PreviewCompatibleImage from './previewCompatibleImage'

const Post = ({ title, author, slug, date, body, tags, featuredimage, index }) => {
  // let fluid = featuredimage?featuredimage.childImageSharp.fluid:null
  return (
    <Card body outline style={{marginRight:10, backgroundColor: index%2===0?"#f5f5f5":"rgba(214,64,0,.2)"}}>
      <CardBody>
        <Row>
          {featuredimage&&
            <Col>
              <PreviewCompatibleImage
                imageInfo={{
                  image: featuredimage,
                  alt: `featured image thumbnail for post ${title}`,
                }}
              />
            </Col>
          }
          <Col className={"my-card-top"}>
            <CardTitle className="my-card-title">
              <Link to={slug}>{title}</Link>
            </CardTitle>
            <CardSubtitle>
              <span className="text-info">{date}</span> by{' '}
              <span className="text-info">{author}</span>
            </CardSubtitle>
          </Col>
        </Row>
        <CardText>{body}</CardText>
        <ul className="post-tags">
          {tags.map(tag => (
            <li key={tag}>
              <Link to={`/tag/${slugify(tag)}`}>
                <Badge color="primary">
                  {tag}
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to={slug}
          className="btn btn-outline-primary float-right text-uppercase"
        >
          查看详情
        </Link>
      </CardBody>
    </Card>
  )
}

export default Post

// {
//   backgroundColor: 'red'
// }