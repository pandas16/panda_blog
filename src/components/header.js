import PropTypes from "prop-types"
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const Header = ({ siteTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);  

  return (
    <div>
      <Navbar fixed="top" light expand="sm">
          <div className="container">
            <NavbarBrand href="/">{siteTitle}</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/about">关于</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
    </div>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
