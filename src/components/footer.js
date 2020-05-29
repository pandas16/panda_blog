import React from 'react'

const socialList = [
  { href: "https://www.facebook.com", className: "facebook", icon: "fab fa-2x fa-facebook-f" },
  { href: "https://www.facebook.com", className: "twitter", icon: "fab fa-2x fa-twitter" },
  { href: "https://www.facebook.com", className: "instagram", icon: "fab fa-2x fa-instagram" },
  { href: "https://www.facebook.com", className: "linkedin", icon: "fab fa-2x fa-google" },
]

export default class Footer extends React.Component {
  render() {
    return (
      <div className="site-footer">
        <p className="text-center">联系方式</p>
        <div className="footer-social-links">
          <ul className="social-links-list">
            {socialList.map((item, index) => {
              return (
                <li key={`socialId${index}`}>
                  <a {...item} target="_blank" rel="noopener noreferrer" >
                    <i className={item&&item.icon}/>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}