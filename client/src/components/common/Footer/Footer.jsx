import { Col, Row } from "antd";
import { Link } from "react-router-dom";

import logo from "../../../assets/logo.png";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="fLists">
          <Row>
            <Col md={{ span: 8 }} lg={{ span: 6 }} xs={{ span: 12 }}>
              <img src={logo} alt="" />
            </Col>

            <Col md={{ span: 8 }} lg={{ span: 6 }} xs={{ span: 12 }}>
              <h4>About</h4>
              <div className="list">
                <ul className="fList">
                  <Link
                    to="/About"
                    style={{
                      fontSize: 14,
                      margin: 0,
                      padding: 0,
                      color: "white",
                    }}
                    className="fListItem"
                  >
                    About Mashler{" "}
                  </Link>
                </ul>
              </div>
            </Col>

            <Col md={{ span: 8 }} lg={{ span: 6 }} xs={{ span: 12 }}>
              <h4>Partner with us</h4>
              <div className="list">
                <ul className="fList">
                  <Link
                    to="/About"
                    style={{
                      fontSize: 14,
                      margin: 0,
                      padding: 0,
                      color: "white",
                    }}
                    className="fListItem"
                  >
                    Partner with Mashler{" "}
                  </Link>
                </ul>
              </div>
            </Col>
            <Col md={{ span: 8 }} lg={{ span: 6 }} xs={{ span: 12 }}>
              <h4>Support</h4>
              <div className="list">
                <ul className="fList">
                  <Link
                    to="/Contact"
                    style={{
                      fontSize: 14,
                      margin: 0,
                      padding: 0,
                      color: "white",
                    }}
                    className="fListItem"
                  >
                    Contact Mashler{" "}
                  </Link>
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
