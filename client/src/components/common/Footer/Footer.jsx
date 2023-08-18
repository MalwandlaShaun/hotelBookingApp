import { Col, Row } from "antd";
import React from "react";
import logo from "../../../assets/logo.png";
import "./footer.css";
const Footer = () => {
  return (
    <>
   

      <div className="footer">
        <div className="fLists">
          <Row>
            <Col md={{ span: 8 }} lg={{ span: 6 }} xs={{ span: 12 }}>
              <img
                src={logo}
                alt=""
              />
            
            </Col>

            <Col md={{ span: 8 }} lg={{ span: 6 }} xs={{ span: 12 }}>
              <h4>About</h4>
              <div className="list">
                <ul className="fList">
                  <li className="fListItem">About Mashler </li>
                 
                </ul>
             
              </div>
            </Col>

            <Col md={{ span: 8 }} lg={{ span: 6 }} xs={{ span: 12 }}>
              <h4>Partner with us</h4>
              <div className="list">
                <ul className="fList">
                  <li className="fListItem">About Mashler </li>
                 
                </ul>
             
              </div>
            </Col>
              <Col md={{ span: 8 }} lg={{ span: 6 }} xs={{ span: 12 }}>
              <h4>Support</h4>
              <div className="list">
                <ul className="fList">
                  <li className="fListItem">About Mashler </li>
                 
                </ul>
             
              </div>
            </Col>
            <div className="fText">
               &copy; {new Date().getFullYear()} Mashler HOTEL incorporated
            </div>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Footer;
