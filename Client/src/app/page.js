'use client'

import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import { Router } from "next/router";
import SearchBar from "@/pages/SearchBar";

export default function App() {


  return (
      <div>
          <SearchBar/>
          <Home/>
          <Landing/>
      </div>
  )
}
