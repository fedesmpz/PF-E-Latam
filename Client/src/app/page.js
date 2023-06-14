'use client'
import Link from "next/link";
import { changeName } from "../redux/slice/slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function App() {

    const name = useSelector(state => state.names.name)
    const [nameChanged, setNameChanged] = useState("")

    const dispatch = useDispatch();

    const modifyName = () => {
      dispatch(changeName(nameChanged))
    }
    const upload = (event) => {
      setNameChanged(event.target.value)
    }

  return (
    <div>

      <Link href="/Home/Home" >Home</Link>

      <input value={nameChanged} onChange={upload} type="name" />
        <button onClick={modifyName} >change name</button>
          <h1>
            {name}
          </h1>
    </div>
  )
}
