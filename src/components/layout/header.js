import React from "react";
import { Link } from "react-router-dom";
import background from "../../img/bg.jpg";
import SearchBar from "../searchBar";

const Header = () => {
  return (
    <>
      <div className="header bg-gray-900 fixed w-screen z-50">
        <ul>
          <li>
            <Link to="/">
              <span className="text-3xl border-b-2 border-b-red-600">
                Search Book App
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div
        className=" !bg-cover max-[600px]:h-[300px] max-[768px]:h-[300px]  xl:p-40 sm:p-0"
        style={{
          background: `url(${background})`,
        }}
      >
        <SearchBar />
      </div>
    </>
  );
};

export default Header;
