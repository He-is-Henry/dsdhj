import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaChartBar,
  FaSignOutAlt,
  FaUser,
  FaRegUser,
  FaFileAlt,
  FaBars,
  FaTimes,
  FaReply,
  FaBook,
} from "react-icons/fa";
import { useAuth } from "../context/UserContext";
import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";

const Header = () => {
  const timeoutRef = useRef(null);
  const { user, setChecked, setUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const rightRef = useRef(null);
  const navigate = useNavigate();
  const dropdownLinks = [];
  const [showMenu, setShowMenu] = useState(false);
  const [isWide, setIsWide] = useState(window.innerWidth > 768);
  useEffect(() => {
    const handleResize = () => setIsWide(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/contact", label: "Contact" },
    { to: "/issue", label: "Current Issue" },
    { to: "/archive", label: "Archives" },
    { to: "/author-guidelines", label: "Guidelines" },
    { to: "/reviews", label: "Reviews" },
  ];

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const logout = async () => {
    try {
      const response = await axios.post("users/logout");
      console.log(response);
      toast.success("Successfully logged out");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
    setUser(null);
    setChecked(true);
  };
  if (user) {
    dropdownLinks.push(
      { to: "/profile", icon: <FaUser size={16} />, label: "Profile" },
      { to: "/dashboard", icon: <FaChartBar size={16} />, label: "Dashboard" }
    );
  } else {
    dropdownLinks.push(
      { to: "/signup", icon: <FaRegUser size={16} />, label: "Sign up" },
      { to: "/login", icon: <FaUser size={16} />, label: "Login" }
    );
  }
  if (user?.roles?.includes("admin") || user?.roles?.includes("editor"))
    dropdownLinks.push(
      {
        to: "/manuscripts",
        icon: <FaFileAlt size={16} />,
        label: "Review Manuscripts",
      },
      {
        to: "/audit-reviews",
        icon: <FaReply size={16} />,
        label: "Audit Reviews",
      }
    );
  if (user?.roles?.includes("admin"))
    dropdownLinks.push(
      {
        to: "/issuing",
        icon: <FaBook size={16} />,
        label: "Issuing",
      },
      {
        to: "/users",
        icon: <FaUser />,
        label: "Users",
      }
    );
  if (user) {
    dropdownLinks.push({
      isButton: true,
      onClick: logout,
      icon: <FaSignOutAlt size={16} />,
      label: "Logout",
    });
  }
  const toggleShowDropdown = () => setShowDropdown((prev) => !prev);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rightRef.current.contains(event.target)) return;
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearDropdownTimeout();
    };
  }, [showDropdown]);

  const clearDropdownTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const delayedHideDropdown = () => {
    clearDropdownTimeout();
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 1000);
  };

  return (
    <header className="site-header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <img src="/logo.jpg" alt="DSDHJ" width={50} height={50} />
        </Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          {!isWide && <FaBars size={20} />}
        </button>

        {showMenu && (
          <div
            className="mobile-drawer-overlay"
            onClick={() => setShowMenu(false)}
          >
            <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
              <button
                className="drawer-close"
                onClick={() => setShowMenu(false)}
              >
                <FaTimes size={20} />
              </button>
              <nav className="drawer-links">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setShowMenu(false)}
                    className="drawer-link"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {showDropdown && (
          <div
            className={`logo-dropdown ${!user ? "high" : ""}`}
            ref={dropdownRef}
            onMouseEnter={() => {
              clearDropdownTimeout();
              window.innerWidth >= 768 && setShowDropdown(true);
            }}
            onMouseLeave={() => {
              window.innerWidth >= 768 && delayedHideDropdown();
            }}
          >
            {dropdownLinks.map((item, index) =>
              item.isButton ? (
                <button
                  key={index}
                  className="dropdown-item logout-btn"
                  onClick={item.onClick}
                >
                  {item.icon} <span>{item.label}</span>
                </button>
              ) : (
                <Link key={index} to={item.to} className="dropdown-item">
                  {item.icon} <span>{item.label}</span>
                </Link>
              )
            )}
          </div>
        )}
      </div>
      <div className="header-right">
        {isWide && (
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div
          className="profile-trigger"
          ref={rightRef}
          onClick={toggleShowDropdown}
          onMouseEnter={() => {
            clearDropdownTimeout();
            window.innerWidth >= 768 && setShowDropdown(true);
          }}
          onMouseLeave={() => {
            window.innerWidth >= 768 && delayedHideDropdown();
          }}
        >
          {user?.avatar ? (
            <img src={user.avatar} alt="Profile" className="avatar-img" />
          ) : (
            <FaUserCircle size={28} className="avatar-icon" />
          )}
          {user?.firstname && (
            <span className="user-firstname">
              {user.firstname.length > 10
                ? user.firstname.slice(0, 10) + "..."
                : user.firstname}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
