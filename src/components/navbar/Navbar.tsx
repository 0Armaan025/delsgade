import React from "react";
import "./navbar.css";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <div className="navbar sticky top-4 mx-20 rounded-lg cursor-pointer transition-all hover:scale-105 bg-white/5 my-2 backdrop-blur-md shadow-md blur-[0.2px] shadow-black p-4 text-center">
        <h1
          className="text-3xl font-bold text-white font-poppins"
          style={{ fontFamily: "Poppins,sans-serif" }}
        >
          Welcome to the castle <span className="text-green-500">Delsgade</span>
        </h1>
      </div>
      <br />
    </>
  );
};

export default Navbar;