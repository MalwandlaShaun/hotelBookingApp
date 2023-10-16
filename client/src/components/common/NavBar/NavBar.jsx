import { Avatar, Dropdown, Menu, message, PageHeader } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import useAuth from "../../../hooks/useAuth";
import { useState, useEffect } from "react";
import "./NavBar.css";
const NavBar = () => {
  const { name, photo, isLogin } = useAuth();


  
  const navigate = useNavigate();
  const location = useLocation();

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    message.error("Log out successful..,");

    if (location.pathname === "/") {
      window.location.reload(false);
    }
  };

   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const isSmallScreen = windowWidth <= 860; // Define your breakpoint here

   useEffect(() => {
     const handleResize = () => {
       setWindowWidth(window.innerWidth);
     };

     window.addEventListener("resize", handleResize);

     return () => {
       window.removeEventListener("resize", handleResize);
     };
   }, []);



  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link to="#" style={{ color: "#313a45", fontWeight: "bold" }}>
              {name}
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link
              to="/dashboard/account"
              style={{ color: "green", fontWeight: "bold" }}
            >
              View Profile
            </Link>
          ),
        },
        {
          key: "7",
          label: (
            <a
              onClick={logOut}
              style={{ color: "#fe5d5d", fontWeight: "bold" }}
            >
              Log Out
            </a>
          ),
        },
      ]}
    />
  );
  return (
    <PageHeader
      style={{ background: "white", zIndex: 3 }}
      title={
        <span style={{ color: "white", padding: "0px !important" }}>
          <Link to="/">
            <img src={logo} style={{ width: 60 }} alt="" className="logo-nav" />
          </Link>
        </span>
      }
      subTitle={
        !isSmallScreen ? (

        <div
          className="centered-subtitle"
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "70vw",
          }}
        >
          <div
            className="items"
            style={{
              marginLeft: "32.5vw",
              marginRight: "32.5vw",
              textAlign: "center",
            }}
          >
            <Link
              style={{ fontSize: 20, margin: 0, padding: 0, color: "#EC1F46" }}
              to="/About"
            >
              About Us /
            </Link>

            <Link
              style={{ fontSize: 20, margin: 0, padding: 0, color: "#EC1F46" }}
              to="/Contact"
            >
              Contact Us
            </Link>
          </div>
        </div>
        ) : null
      }
      extra={[
        <>
          {isLogin ? (
            <Dropdown overlay={menu} placement="bottomLeft" arrow>
              <Avatar style={{ cursor: "pointer" }} size="large" src={photo} />
            </Dropdown>
          ) : (
            <>
              <Link to="/auth/register">
                <button className="btn-primary-full">Login</button>
              </Link>
              <Link to="/auth/register">
                <button className="btn-primary">Register</button>
              </Link>
            </>
          )}
        </>,
      ]}
    />
  );
};

export default NavBar;
