import "../StylingFiles/invoice-navbar.css";
import myInvoiceLogo from "../assets/logo.png";
import myInvioceSwitcher from "../assets/Path.png";
import darkmodeswitch from "../assets/darkmodeswitch.svg"
import invoiceProfilePics from "../assets/profilepics.svg";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function InvioceNavBar() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="nav-container">
      <img
        src={myInvoiceLogo}
        alt="Custom asset description"
        className="nav-logo"
      />
      <div className="switch-profilepic-container">
        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme mode"> 
          <img
            src={ isDark ? darkmodeswitch :  myInvioceSwitcher}
            alt={isDark ? "Switch to light moder" : "Switch to dark mode"}
            className="nav-themeswitch"
          />
        </button>
        <div className="nav-divisor"></div>
        <img
        className="profile-picture"
          src={invoiceProfilePics}
          alt="profilepics"
          style={{ marginRight: "30px" }}
        />
      </div>
    </div>
  );
}

export default InvioceNavBar;
