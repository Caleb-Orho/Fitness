import React, { useState, useEffect } from 'react';
import { timer } from "../../assets/SVG";

function StartWorkOut() {
    return (
        <div>
            {/* The Log Workout Heading */}
            <div className='flex justify-between items-center px-5 mt-5'>

                <div className='flex flex-row items-center'>
                    <p className='text-black font-semibold'>Log Workout</p>
                </div>

                <div className='flex flex-row items-center gap-4'>
                    <img src={timer} className='w-8' alt="timer" />
                    <button className='w-20 rounded-md rounded bg-blue-700 h-8'
                        onClick={() => ""}>
                        <p className='text-white font-medium text-sm'> Finish </p>
                    </button>

                </div>
            </div>

            <div className="border-[1px] border-gray-200 mt-2"></div>

            {/* The Duration, Volume, Sets */}
            <div className='flex gap-20 items-center px-5 mt-5'>

                <div className='flex flex-col'>
                    <p className='text-xs font-semibold text-gray-400'>Duration</p>
                    <p className='text-blue-700 font-semibold'>18min 2s</p>
                </div>

                <div className='flex flex-col'>
                    <p className='text-xs font-semibold text-gray-400'>Volume</p>
                    <p className='text-black font-semibold'>0 lbs</p>
                </div>

                <div className='flex flex-col'>
                    <p className='text-xs font-semibold text-gray-400'>Sets</p>
                    <p className='text-black font-semibold'>0</p>
                </div>
            </div>

            <div className="border-[0.2px] border-gray-200 mt-2"></div>

            <div></div>
            
            {/* Discard button */}
            <div className='px-5 rounded'>
                <div className='flex flex-row mt-3'>
                    <button className='border-[1px] border-gray-200 rounded-md flex items-center justify-center flex-1 rounded gap-2 h-8'>
                        <p className='text-red-500 font-medium text-sm'> Discard Workout </p>
                    </button>
                </div>
            </div>

        </div>
    )
}
export default StartWorkOut