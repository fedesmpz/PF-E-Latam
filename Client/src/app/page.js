'use client'
import Link from "next/link";
import { changeName } from "../redux/slice/slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Landing from "@/pages/Landing";

export default function App() {

  return (
    <div>

      <Landing></Landing>
      
    </div>
  )
}
