import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  let { pathname } = useLocation();
  console.log(pathname);
  pathname = pathname.replace("blogs/", "");
  return (
    <nav className="navbar container">
      <ul className="navbar-list">
        <li className="nav-item">
          <Link className="link dir" to={"/"}>
            Home{pathname === "/" ? "" : pathname}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
