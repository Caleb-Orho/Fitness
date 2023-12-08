import React, { useState } from "react";
import { auth } from "../../FireBase/Firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const signIn = (e) => {
        // e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //console.log(userCredential);
                console.log(userCredential.user.uid)
                navigate('/HomeScreen')
            }).catch((error) => {
                //console.log(error)
            })
    }

    return (
        <div className="bg-black h-full">

            <div className="px-5 fixed bottom-0 left-0 right-0 mb-16">

                <form onSubmit={signIn}>
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
                    <div className="border-[1px] border-gray-200 mt-2 " />
                </form>


                <button className='w-full rounded-md flex items-center justify-center rounded bg-blue-700 h-8 mt-5'
                    onClick={() => signIn()}>
                    <p className='text-white font-medium text-sm'> Log In </p>
                </button>


            </div>


        </div>
    )
}

export default SignIn;