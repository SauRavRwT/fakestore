import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-center py-4 mt-5">
      <div className="container">
        <p className="mb-0 fw-bold">
          Made with ❤️ by
          <a
            className="ms-1 fw-bold"
            href="https://SauRavRwT.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Balbheji
          </a>
        </p>
        <p className="m-1 fw-bold">
          <Link to="/about">About Us</Link>
        </p>
        <p>
          &copy; {new Date().getFullYear()} FakeStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
