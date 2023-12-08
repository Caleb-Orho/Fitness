import React, { useState } from "react";
import { auth } from "../../FireBase/Firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const signUp = (e) => {
        // e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className=" h-full">

            <div className="px-5 fixed bottom-0 left-0 right-0 mb-10">
                <p className='text-black font-medium text-sm mb-10'>
                    Create Account
                </p>
                <form onSubmit={signUp} className="w-full">
                    <input
                        type="text"
                        className="outline:none text-gray-900 font-bold placeholder:text-gray-400 placeholder:font-medium sm:text-sm sm:leading-6 w-full"
                        placeholder="Email"
                        style={{ outline: 'none' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="border-[1px] border-gray-200 mt-2 mb-5" />

                    <input
                        type="text"
                        className="outline:none text-gray-900 font-bold placeholder:text-gray-400 placeholder:font-medium sm:text-sm sm:leading-6 w-full"
                        placeholder="Password"
                        style={{ outline: 'none' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="border-[1px] border-gray-200 mt-2 mb-5" />

                    <input
                        type="text"
                        className="outline:none text-gray-900 font-bold placeholder:text-gray-400 placeholder:font-medium sm:text-sm sm:leading-6 w-full"
                        placeholder="UserName"
                        style={{ outline: 'none' }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="border-[1px] border-gray-200 mt-2 " />
                </form>


                <button className='w-full rounded-md flex items-center justify-center rounded bg-blue-700 h-8 mt-5'
                    onClick={() => signUp()}>
                    <p className='text-white font-medium text-sm'> Sign Up </p>
                </button>

                <button className="text-black font-medium text-sm mt-5 flex" onClick={() => navigate('/SignIn')}>
                    Log In
                </button>


            </div>


        </div>
    )
}

export default SignUp;