'use client';
import { useState } from 'react';
import Login from "./Login";
import Signup from "./Signup";

export default function AuthForm() {
    const [toggle, setToggle] = useState(true);

    return (
        <div className='content-block'>
           {toggle ? <Login /> : <Signup />}
           {toggle ? 
            <p><a onClick={() => setToggle(false)}>Create an account</a></p> : 
            <p><a onClick={() => setToggle(true)}>Sign into account</a></p>}
        </div>
    );
}
