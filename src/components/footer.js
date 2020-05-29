import React from 'react'

const socialList = [
  { href: "https://www.facebook.com", className: "facebook", icon: "fab fa-2x fa-facebook-f" },
  { href: "https://www.facebook.com", className: "twitter", icon: "fab fa-2x fa-twitter" },
  { href: "https://www.facebook.com", className: "instagram", icon: "fab fa-2x fa-instagram" },
  { href: "https://www.facebook.com", className: "linkedin", icon: "fab fa-2x fa-google" },
]

export default class Footer extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.getFooterPostionStyle()
    },100)
  }

  UNSAFE_componentWillReceiveProps() {
    setTimeout(() => {
      this.getFooterPostionStyle()
    },100)
  }

  getFooterPostionStyle = () => {
    this.footer.classList.remove("footerPosi")
    let hei = window.innerHeight //整个窗口的高度
    let footerTop = this.footer.offsetTop //底部footer相对于顶部的距离
    let footerHei = this.footer.offsetHeight
    if (footerTop+footerHei>hei) {
      this.footer.classList.remove("footerPosi")
    }else {
      this.footer.classList.add("footerPosi")
    }
  }

  render() {
    return (
      <div className="site-footer" ref={(o)=>this.footer=o}>
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