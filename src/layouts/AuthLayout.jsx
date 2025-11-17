import React from "react";
import Logo from "../components/Logo";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="w-11/12 mx-auto">
      <nav>
        <Logo></Logo>
      </nav>
      <main className="flex flex-col md:flex-row items-center bg-green-100">
        <div className="flex-1 ">
          <Outlet></Outlet>
        </div>
        <div className="flex-1 ">
           <img src={authImage} alt="" /> 
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
