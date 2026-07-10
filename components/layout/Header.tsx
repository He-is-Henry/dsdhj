"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaUserCircle,
  FaChartBar,
  FaSignOutAlt,
  FaUser,
  FaRegUser,
  FaFileAlt,
  FaTimes,
  FaReply,
  FaBook,
  FaArchive,
} from "react-icons/fa";
import { useAuth } from "../../context/UserContext";
import { ReactNode, useEffect, useRef, useState } from "react";
import axios from "../../lib/axios";
import toast from "react-hot-toast";
import { FaMessage } from "react-icons/fa6";
import MenuIcon from "../ui/MenuIcon";
import Image from "next/image";

const Header = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { user, setChecked, setUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dropdownLinks: {
    to: string,
    icon: ReactNode,
    label: string,
    isButton?: boolean,
    onClick?: () => void
  }[] = [];
  const [showMenu, setShowMenu] = useState(false);
  const [isWide, setIsWide] = useState(true); // safe default for SSR; corrected on mount below

  useEffect(() => {
    const handleResize = () => setIsWide(window.innerWidth > 900);
    handleResize(); // correct the SSR-safe default immediately on mount
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
    { to: "/editorial-board", label: "Editorial Board" },
    { to: "/recent-uploads", label: "Explore" },
  ];

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const logout = async () => {
    try {
      const response = await axios.post("users/logout");
      console.log(response);
      toast.success("Successfully logged out");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
    setUser(null);
    setChecked(true);
  };

  if (user) {
    dropdownLinks.push(
      { to: "/profile", icon: <FaUser size={16} />, label: "Profile" },
      { to: "/dashboard", icon: <FaChartBar size={16} />, label: "Dashboard" },
    );
  } else {
    dropdownLinks.push(
      { to: "/signup", icon: <FaRegUser size={16} />, label: "Sign up" },
      { to: "/login", icon: <FaUser size={16} />, label: "Login" },
    );
  }

  if (user?.roles?.includes("admin") || user?.roles?.includes("editor"))
    dropdownLinks.push(
      { to: "/manuscripts", icon: <FaFileAlt size={16} />, label: "Manuscripts" },
      { to: "/audit-reviews", icon: <FaReply size={16} />, label: "Audit Reviews" },
    );

  if (user?.roles?.includes("admin"))
    dropdownLinks.push(
      { to: "/issuing", icon: <FaBook size={16} />, label: "Issuing" },
      { to: "/users", icon: <FaUser />, label: "Users" },
      { to: "/messages", icon: <FaMessage />, label: "Messages" },
      { to: "/send-archive", icon: <FaArchive />, label: "Submit archive" },
    );

  if (user) {
    dropdownLinks.push({
      isButton: true,
      onClick: logout,
      icon: <FaSignOutAlt size={16} />,
      label: "Logout",
      to: ""
    });
  }

  const toggleShowDropdown = () => setShowDropdown((prev) => !prev);
  const clearDropdownTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rightRef.current?.contains(event.target as Node)) return;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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



  const delayedHideDropdown = () => {
    clearDropdownTimeout();
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 1000);
  };

  return (
    <header className="site-header">
      <div className="header-left">
        <Link href="/" className="logo-link">
          <Image src="/logo.jpg" alt="DSDHJ" width={50} height={50} />
        </Link>

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
                    href={link.to}
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
              if (isWide) setShowDropdown(true);
            }}
            onMouseLeave={() => {
              if (isWide) delayedHideDropdown();
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
                <Link key={index} href={item.to} className="dropdown-item">
                  {item.icon} <span>{item.label}</span>
                </Link>
              ),
            )}
          </div>
        )}
      </div>
      <div className="header-right">
        <button className="menu-toggle" onClick={toggleMenu}>
          {!isWide && <MenuIcon />}
        </button>

        {isWide && (
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <Link key={link.to} href={link.to} className="nav-link">
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
            if (window.innerWidth >= 768) setShowDropdown(true);
          }}
          onMouseLeave={() => {
            if (window.innerWidth >= 768) delayedHideDropdown();
          }}
        >
          {user?.avatar ? (
            <img src={user.avatar as string} alt="Profile" className="avatar-img" />
          ) : (
            <FaUserCircle size={28} className="avatar-icon" />
          )}
          {user?.firstname && (
            <span className="user-firstname">
              {user.firstname.length > 7
                ? user.firstname.slice(0, 6) + "..."
                : user.firstname}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;