/**
 * 边侧栏,暂时引用静态数据
 */
import React from 'react'
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
} from 'reactstrap'
import author from '../const/authors'

const socialList = [
  { className: "facebook", icon: "fab fa-2x fa-facebook-f" },
  { className: "twitter", icon: "fab fa-2x fa-twitter" },
  { className: "instagram", icon: "fab fa-2x fa-instagram" },
  { className: "linkedin", icon: "fab fa-2x fa-google" },
]

const Sidebar = () => {
  let currentAuthor = author[0];
  return (
    <div>
      <Card>
        <img 
          // className="card-image-top" 
          style={{width:"100%"}}
          src={"https://s1.ax1x.com/2020/05/22/YOwuX8.jpg"} 
          alt={'header'}/>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            {currentAuthor.name}
          </CardTitle>
          <CardText>{currentAuthor.bio}</CardText>
          <div className="author-social-links text-center">
            <ul>
              {socialList.map((item, index) => {
                let hrefLabel = currentAuthor[item.className];
                console.log('===hrefLabel===',hrefLabel);
                return (
                  <li key={`socialId${index}`}>
                    <a {...item} target="_blank" rel="noopener noreferrer" href={hrefLabel}>
                      <i className={item&&item.icon}/>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Sidebar