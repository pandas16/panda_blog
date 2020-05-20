import React from 'react'
import {
  Badge,
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody
} from 'reactstrap'
import { Link } from 'gatsby'
import { slugify } from '../util/utilityFunctions'

const Post = ({ title, author, slug, date, body, tags }) => (
  <Card>
    <CardBody>
      <CardTitle>
        <Link to={slug}>{title}</Link>
      </CardTitle>
      <CardSubtitle>
        <span className="text-info">{date}</span> by{' '}
        <span className="text-info">{author}</span>
      </CardSubtitle>
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

export default Post