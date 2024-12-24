import React, { useState } from "react";
import "./navbar.css";

type Props = {};

const Navbar = (props: Props) => {
  const [clickCount, setClickCount] = useState(0);

  const handleNavbarSingleClick = () => {
    setClickCount(clickCount + 1);
    alert("You should maybe click it like 2 to three times");
  };

  const handleNavbarDoubleOrTripleClick = () => {
    setClickCount(clickCount + 1);
    alert("You have clicked it like 2 to three times");
  };

  return (
    <>
      <div
        className="navbar sticky top-4 mx-4 sm:mx-8 md:mx-16 lg:mx-20 rounded-lg cursor-pointer transition-all hover:scale-105 bg-white/5 my-2 backdrop-blur-md shadow-md blur-[0.2px] shadow-black p-4 text-center"
        onDoubleClick={handleNavbarDoubleOrTripleClick}
      >
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-poppins"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Welcome to the castle <span className="text-green-500">Delsgade</span>
        </h1>
      </div>

      {/* <br /> */}
    </>
  );
};

export default Navbar;
