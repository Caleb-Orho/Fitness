import React, { useState, useEffect } from 'react';
import { timer, trash, add2, threedots } from "../../assets/SVG";
import { useLocation } from 'react-router-dom';
import ShowEditExercise from "../../assets/Others/ShowEditExercise"
import AddExercises from "./AddExercises";

function StartWorkOut() {
    const [key, setKey] = useState(0);
    const location = useLocation();
    const [showAddExercise, setShowAddExercise] = useState(false);
    const [restTime, setRestTime] = useState(0);
    const [routineTitle, setRoutineTitle] = useState('');
    const [showOption, setShowOption] = useState(false);
    const [del, setDelete] = useState(false);
    const [optionIndex, setOptionIndex] = useState([-1, -1]);
    const [replaceExerciseIndex, setReplaceExerciseIndex] = useState(-1);

    const [routine, setRoutine] = useState(location.state && location.state.routineData);
    // const routine = location.state && location.state.routineData;
    // console.log(routine)

    const routineName = location.state && location.state.routineName;
    useEffect(() => {
        setKey((prevKey) => prevKey + 1);
    }, [del]);

    useEffect(() => {
        // console.log(routineToEdit)
        setRoutineTitle(routineName);
    }, []);

    useEffect(() => {
        if (optionIndex[1] !== 3) {

            if (optionIndex[1] == 2) {
                removeItem(optionIndex[0])
                setOptionIndex([-1, -1]);
            } else if (optionIndex[1] == 1) {
                setReplaceExerciseIndex(optionIndex[0])
                setShowAddExercise(true);
                setOptionIndex([-1, -1]);
            }

        }
        setDelete(!del);
        // console.log(optionIndex)
    }, [showOption == false]);

    const removeItem = (indexToRemove) => {
        setRoutine(prevRoutine => ({
            ...prevRoutine,
            [routineName]: prevRoutine[routineName].filter((_, index) => index !== indexToRemove),
        }));
    };

    const [list] = useState(['W', 'F', 'D', 3]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleSetClick = (outerIndex, innerIndex, index) => {
        if (index == 0) {
            const updatedWorkoutList = [...routine];
            updatedWorkoutList[outerIndex].setInfo[innerIndex].items[0].value = list[currentIndex] === 3 ? (innerIndex + 1) : list[currentIndex].toString();
            setCurrentIndex((currentIndex + 1) % list.length);
            setDelete(!del);
        }
    }

    const addSet = (index) => {
        // Create a new item with default values
        const newItem = {
            items: [
                { subLabel: 'Sets', value: routine[index].setInfo.length + 1 },
                { subLabel: 'Lbs', value: '-' },
                { subLabel: 'Reps', value: '-' },
            ],
        };

        const updatedWorkoutList = [...routine[index].setInfo];
        const updatedList = [...updatedWorkoutList, newItem];

        routine[index].setInfo = updatedList;
        setDelete(!del);
    };

    const removeSet = (outerIndex, indexToRemove) => {
        const updatedWorkoutList = [...routine[outerIndex].setInfo];

        updatedWorkoutList.splice(indexToRemove, 1);

        updatedWorkoutList.forEach((item, index) => {
            const numericValue = parseFloat(item.items[0].value);
            item.items[0].value = Number.isNaN(numericValue) ? item.items[0].value : index + 1;
        })

        routine[outerIndex].setInfo = updatedWorkoutList;

        setDelete(!del);
    };

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


            {routine.map((exercise, index) => (
                <div className="flex flex-col mt-5">
                    <div className="flex flex-row items-center">
                        <button className="w-full px-5 flex flex-row gap-3 items-center"
                            onClick={() => handleExerciseClick(exercise)}>
                            <img src={exercise.photoLink} alt={exercise.name} className="w-10 h-10 rounded-full flex-shrink-0" />
                            <p className="flex flex-col items-start text-blue-700 text-sm font-bold">{exercise.name}</p>
                        </button>
                        <button onClick={() => {
                            setShowOption(!showOption)
                            setOptionIndex(prevOptionIndex => [index, prevOptionIndex[1]]);
                        }}>
                            <img src={threedots} className='w-6 mr-5' alt="add" />
                        </button>
                    </div>

                    <input
                        type="text"
                        className="mt-3 outline:none ml-5 mr-5 text-gray-900 placeholder:text-gray-400 placeholder:font-medium placeholder:text-sm"
                        placeholder="Add notes here..."
                        style={{ outline: 'none' }}
                    />

                    {/* Exercise button with three dots */}
                    <div className="flex flex-row items-center mt-3">
                        <button className="w-full px-5 flex flex-row gap-1 items-center"
                            onClick={() => setShowTimerPicker(!showTimerPicker)}>
                            <img src={timer} alt={exercise.name} className="w-5 h-5" />
                            <p className="flex flex-col items-start text-blue-700 text-sm font-bold">Rest Timer: {restTime === 0 ? 'OFF' : `${restTime}s`}</p>
                        </button>
                    </div>

                    {/* Sets Div */}

                    <div>
                        <div className="flex flex-row gap-20 ml-5 mt-3 text-gray-400 font-medium text-xs">
                            <p className=""> SET </p>
                            <p className=""> LBS </p>
                            <p className=""> REPS </p>
                        </div>

                        {exercise.setInfo.map((exercise, innerIndex) => (
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row gap-16 ml-5 mt-2" key={innerIndex}>
                                    {/* <Text>{exercise.label}</Text> */}
                                    {exercise.items.map((item, itemIndex) => (
                                        <div className="">
                                            <input
                                                type={itemIndex === 0 ? '' : 'number'}
                                                key={`input-${key}-${itemIndex}`}
                                                className="w-10 outline:none text-black placeholder:text-gray-400 placeholder:font-medium font-bold"
                                                placeholder={item.value}
                                                style={{ outline: 'none' }}
                                                defaultValue={item.value !== '-' ? item.value : ''}
                                                readOnly={itemIndex === 0}
                                                onChange={(e) => handleInputChange(index, innerIndex, itemIndex, e.target.value)}
                                                onClick={() => handleSetClick(index, innerIndex, itemIndex)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => removeSet(index, innerIndex)}>
                                    <img src={trash} className='w-6 mr-5' alt="Delete" />
                                </button>
                            </div>
                        ))}


                    </div>
                    {/* Add set button */}
                    <div className="mt-8 mb-5 flex flex-col items-center justify-center gap-4">
                        {/* Add exercise button */}
                        <div className='px-5 rounded w-full'>
                            <button className='w-full rounded-md flex items-center justify-center flex-1 rounded gap-2 bg-gray-200 h-8'
                                onClick={() => addSet(index)}>
                                <img src={add2} className='w-7' alt="add" />
                                <p className='text-white font-medium text-sm'> Add Set </p>
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Add exercise button */}
            <div className="flex flex-col items-center justify-center gap-4 ">
                {/* Add exercise button */}
                <div className='px-5 rounded w-full'>
                    <button className='w-full rounded-md flex items-center justify-center flex-1 rounded gap-2 bg-blue-700 h-8'
                        onClick={() => setShowAddExercise(!showAddExercise)}>
                        <img src={add2} className='w-7' alt="add" />
                        <p className='text-white font-medium text-sm'> Add exercise </p>
                    </button>
                </div>
            </div>

            {/* Discard button */}
            <div className='px-5 rounded'>
                <div className='flex flex-row mt-3'>
                    <button className='border-[1px] border-gray-200 rounded-md flex items-center justify-center flex-1 rounded gap-2 h-8'>
                        <p className='text-red-500 font-medium text-sm'> Discard Workout </p>
                    </button>
                </div>
            </div>

            {showOption && (
                <ShowEditExercise setShowOption={setShowOption} setOptionIndex={setOptionIndex} />
            )}

            {showAddExercise ? <AddExercises setShowAddExercise={setShowAddExercise}
                setSelectedExercisesSend={setRoutine} replaceExerciseIndex={replaceExerciseIndex}
                setReplaceExerciseIndex={setReplaceExerciseIndex} /> : <></>}

        </div>
    )
}
export default StartWorkOut