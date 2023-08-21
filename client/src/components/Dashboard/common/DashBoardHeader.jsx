import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./dashboardHeader.css";

function Example({ ontoggleNav }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      <span className="hmbger" onClick={ontoggleNav}>
        &#9776;
      </span>
      <Link to="/">
        <img
          src={logo}
          alt=""
          style={{ marginTop: "10px", paddingLeft: "10px", width: "60px" }}
        />
      </Link>
    </div>
  );
}

export default Example;
