"use client";
import React, { createContext, useState } from "react";

// 1: Create Context
const counterContext = createContext()

// 2: Create the parent Component

const Navbar = ({children}) => {
  return(
    <counterContext.Provider>
        <div style={{backgroundColor:' lightblue'}} className=" w-screen justify-between h-[60px] flex">{children}</div>
    </counterContext.Provider>
  )
};

// 3: Create the child components to help
// implementing the functions

function Start({children}){
    return(
        <h1>{children}</h1>
    )
}

function Center({children}){
    return(
        <h1 className="">{children}</h1>
    )
}

function End({children}){
    return(
        <h1 className=" self-end bg-primary">{children}</h1>
    )
}

function Blue({children}){
    return(
        <div className=" bg-blend-normal flex justify-between">

        </div>
    )
}
function Pink({children}){
    return(
        <div>
            {children}
        </div>
    )
}

// 4: Add child components as properties
// to the parent components

Navbar.Start = Start;
Navbar.Center = Center;
Navbar.End = End;

export default Navbar;
