import { add2, dumbell, threedots, timer, trash } from "../../assets/SVG"
import React, { useState, useEffect } from 'react';
import AddExercises from "./AddExercises";
import AddExercisesUpdate from "./AddExercisesUpdate";
import setType from "../../assets/Others/SetType"
import ShowTimer from "../../assets/Others/ShowTimer"
import ShowEditExercise from "../../assets/Others/ShowEditExercise"

import { doc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../FireBase/Firebase"

const EditRoutine = ({ setEditRoutineIndex, routineToEdit, setRoutine, routineName }) => {
    const [showAddExercise, setShowAddExercise] = useState(false);
    const [showTimerPicker, setShowTimerPicker] = useState(false);
    const [showSetType, setShowSetType] = useState(false);
    const [showOption, setShowOption] = useState(false);
    const [routineTitle, setRoutineTitle] = useState('');
    const [replaceExerciseIndex, setReplaceExerciseIndex] = useState(-1);
    // Option index, Action
    const [optionIndex, setOptionIndex] = useState([-1, -1]);
    const [restTime, setRestTime] = useState(0);
    const [key, setKey] = useState(0);
    const [del, setDelete] = useState(false);

    const [bounce, setBouonce] = useState(false);

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
            const updatedWorkoutList = [...routineToEdit];
            updatedWorkoutList[outerIndex].setInfo[innerIndex].items[0].value = list[currentIndex] === 3 ? (innerIndex + 1) : list[currentIndex].toString();
            setCurrentIndex((currentIndex + 1) % list.length);
            setDelete(!del);
        }
    }

    const removeSet = (outerIndex, indexToRemove) => {
        const updatedWorkoutList = [...routineToEdit[outerIndex].setInfo];

        updatedWorkoutList.splice(indexToRemove, 1);

        updatedWorkoutList.forEach((item, index) => {
            const numericValue = parseFloat(item.items[0].value);
            item.items[0].value = Number.isNaN(numericValue) ? item.items[0].value : index + 1;
        })

        routineToEdit[outerIndex].setInfo = updatedWorkoutList;

        setDelete(!del);
    };

    const addSet = (index) => {
        // Create a new item with default values
        const newItem = {
            items: [
                { subLabel: 'Sets', value: routineToEdit[index].setInfo.length + 1 },
                { subLabel: 'Lbs', value: '-' },
                { subLabel: 'Reps', value: '-' },
            ],
        };

        const updatedWorkoutList = [...routineToEdit[index].setInfo];
        const updatedList = [...updatedWorkoutList, newItem];

        routineToEdit[index].setInfo = updatedList;
        setDelete(!del);
    };

    const handleInputChange = (outerIndex, innerIndex, index, newValue) => {
        const updatedWorkoutList = [...routineToEdit];
        updatedWorkoutList[outerIndex].setInfo[innerIndex].items[index].value = newValue;
    };

    const [FinalRoutine, setFinalRoutine] = useState([]);

    const SaveRouine = async () => {
        if (routineTitle === "") {
            setBouonce(true)
            return
        }

        const collectionRef = collection(db, "Fitness/Routine/" + routineName);
        const querySnapshot = await getDocs(collectionRef);

        // Iterate through all documents in the collection and delete them
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref)
                .then(() => {
                    console.log(`Document with ID ${doc.id} deleted successfully.`);
                })
                .catch((error) => {
                    console.error(`Error deleting document with ID ${doc.id}: `, error);
                });
        });

        const batch = [];

        // Assuming "Fitness" is the collection name
        const fitnessCollection = collection(db, 'Fitness', "Routine", routineName);

        routineToEdit.forEach((exercise, index) => {
            const exerciseDocRef = doc(fitnessCollection, index.toString()); // You can adjust the document path as needed
            const exerciseData = {
                ...exercise,
                // If you want to add any additional data or modify the exercise data before storing it in Firestore
            };

            batch.push(setDoc(exerciseDocRef, exerciseData, { merge: false }));
        });

        // Committing the batch write
        await Promise.all(batch);

        setEditRoutineIndex(-1);
    };

    useEffect(() => {
        if (FinalRoutine.length > 0) {
            localStorage.setItem("R-" + routineTitle, JSON.stringify(FinalRoutine));
            // console.log(FinalRoutine);
        }
    }, [FinalRoutine]);

    // bg-red-500 
    return (
        <div className='absolute inset-0 z-10 bg-white '>

            {/* Header */}
            <div className="flex items-center justify-center justify-between mr-5 ml-5 mt-5">
                <button className="text-[#2E62EC] font-medium" onClick={() => setEditRoutineIndex(-1)}>
                    Cancel
                </button>

                <p className='text-black font-semibold flex item-center justify-center'>
                    Edit Routine
                </p>

                <button className="text-[#2E62EC] font-medium"
                    onClick={() => SaveRouine()}>
                    Update
                </button>
            </div>

            <div className="border-[1px] border-gray-200 mt-2"></div>

            {/* Get started by adding an exercise to your routine */}
            <div className="flex flex-col items-center justify-center mt-5 gap-4">
                {routineToEdit.length == 0 ? (
                    <div className="flex flex-col items-center justify-center mb-5">
                        <img src={dumbell} className='w-8' alt="add" />
                        <p className="text-sm font-semibold text-gray-400">
                            Get started by adding an exercise to your routine
                        </p>
                    </div>
                ) : null}
            </div>


            {routineToEdit.map((exercise, index) => (
                <div className="flex flex-col mt-5">
                    {/* <li key={index}>{exercise.name}</li> */}
                    {/* Exercise button with three dots */}
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
                        placeholder="Add routine notes here"
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

            {showAddExercise ? <AddExercises setShowAddExercise={setShowAddExercise}
                setRoutine={setRoutine} replaceExerciseIndex={-2}
                setReplaceExerciseIndex={setReplaceExerciseIndex} routineName={routineName} /> : <></>}

            {showTimerPicker && (
                <ShowTimer setRestTime={setRestTime} setTimerPicker={setShowTimerPicker} />
            )}

            {showSetType && (
                <ShowSetType setShowSetType={setShowSetType} />
            )}

            {showOption && (
                <ShowEditExercise setShowOption={setShowOption} setOptionIndex={setOptionIndex} />
            )}
        </div>
    )
}


const ShowSetType = ({ ssetShowSetType }) => {

    return (
        // absolute inset-0 bottom-0 
        <div className="overflow-y-auto h-60 bg-blue-700 fixed bottom-0 left-0 right-0 flex items-center justify-center flex-col rounded-lg">

            <p className='text-white font-bold mt-2 text-sm'>
                Select Set Type
            </p>

            <div className="flex flex-col gap-5 mt-5">
                {setType.map((setTypeItem, index) => (

                    <button className="flex flex-col justify-between w-full px-5">
                        <div className="flex flex-row gap-4 font-bold text-sm">
                            <p className={`text-${setTypeItem.color} w-5`}> {setTypeItem.logo} </p>
                            <p className="text-white "> {setTypeItem.type} </p>
                        </div>
                    </button>
                ))}
            </div>


            <button className='text-white font-bold text-sm mt-5' onClick={() => setShowSetType(false)}>
                Cancel
            </button>

        </div>
    )
}

export default EditRoutine
