import React from 'react'
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
} from 'reactstrap'
import Layout from '../components/layout'
import SEO from '../components/seo'
import avatar from '../images/header1.jpg'
import author from '../const/authors'

const AboutPage = () => {
  let currentAuthor = author[0];

  return (
    <Layout pageTitle="关于作者">
      <SEO title="About" keywords={[`gatsby`, `application`, `react`]} />
      <Card>
        <img style={styles.myAvator} src={avatar} alt={'avatar'}/>
        <CardBody>
          <CardTitle className="text-uppercase mb-3">
            姓名：{currentAuthor.name}
          </CardTitle>
          <CardText>
            简介：{currentAuthor.bio}
          </CardText>
          <CardText>
            邮箱：1057095423@qq.com
          </CardText>
        </CardBody>
      </Card>
    </Layout>
  )
}

const styles = {
  myAvator: {
    width: "30%",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  }
};

export default AboutPage