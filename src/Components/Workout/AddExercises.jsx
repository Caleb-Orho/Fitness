import { search } from "../../assets/SVG"
import React, { useState, useEffect } from 'react';
import bicepExercises from "../../assets/Exercises/Biceps";
import MuscleGroups from "../../assets/Exercises/MuscleGroups";
import gymEquipment from "../../assets/Exercises/Equipment";
import Popup from 'reactjs-popup';

const AddExercises = ({ setShowAddExercise, setSelectedExercisesSend, replaceExerciseIndex, setReplaceExerciseIndex, setRoutine, routineName }) => {
    const [targetedMuscle, setTargetedMuscle] = useState('');
    const [equipment, setEquipment] = useState('');
    const [openAllMuscle, setOpenAllMuscle] = useState(false);
    const [openAllEquipment, setOpenAllEquipment] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExercises, setFilteredExercises] = useState([]);

    const allExercises = [...bicepExercises];

    useEffect(() => {
        const filteredExercises = allExercises
            .filter((exercise) => {
                // Exclude exercises with targetMuscle "All Muscles"
                if (targetedMuscle === "All Muscles") {
                    return true;
                }

                // Filter by targetedMuscle if it's not empty
                if (equipment && equipment !== "All Equipment") {
                    if (equipment && equipment !== "") {
                        return (exercise.equipment.toLowerCase() === equipment.toLowerCase()) && (exercise.targetMuscle.toLowerCase() === targetedMuscle.toLowerCase())
                    }
                } else if (targetedMuscle && targetedMuscle !== "") {
                    return exercise.targetMuscle.toLowerCase() === targetedMuscle.toLowerCase();
                }

                return true; // If targetedMuscle is empty, include all exercises
            })
            .filter((exercise) =>
                exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

        setFilteredExercises(filteredExercises);
    }, [targetedMuscle]);

    useEffect(() => {
        const filteredExercises = allExercises
            .filter((exercise) => {
                // Exclude exercises with targetMuscle "All Muscles"
                if (equipment === "All Equipment") {
                    return true;
                }

                if (targetedMuscle && targetedMuscle !== "All Muscles") {
                    if (equipment && equipment !== "") {
                        return (exercise.equipment.toLowerCase() === equipment.toLowerCase()) && (exercise.targetMuscle.toLowerCase() === targetedMuscle.toLowerCase())
                    }
                } else if (equipment && equipment !== "") {
                    return exercise.equipment.toLowerCase() === equipment.toLowerCase();
                }



                return true; // If targetedMuscle is empty, include all exercises
            })
            .filter((exercise) =>
                exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

        setFilteredExercises(filteredExercises);
    }, [equipment]);

    const [selectedExercises, setSelectedExercises] = useState([]);

    const handleExerciseClick = (index) => {
        if (replaceExerciseIndex != -1 && replaceExerciseIndex != -2) {
            replaceExercise(index)
            console.log("here")
            return
        }

        // Check if the exercise is already selected
        if (selectedExercises.includes(index)) {
            // Remove the exercise from the selected list
            setSelectedExercises(selectedExercises.filter((item) => item !== index));
            // setSelectedExercisesSend(selectedExercises.map(selectedIndex => allExercises[selectedIndex]));
        } else {
            // Add the exercise to the selected list
            setSelectedExercises(prevSelected => [...prevSelected, index]);
        }
    };

    const replaceExercise = (index) => {
        const selectedExerciseDetails = (() => {
            const { name, photoLink } = allExercises[index];
            const uniqueSetInfo = [
                {
                    items: [
                        { subLabel: 'Sets', value: 1 },
                        { subLabel: 'Lbs', value: "-" },
                        { subLabel: 'Reps', value: "-" }
                    ]
                },
                {
                    items: [
                        { subLabel: 'Sets', value: 2 },
                        { subLabel: 'Lbs', value: "-" },
                        { subLabel: 'Reps', value: "-" }
                    ]
                }
            ];

            return { name, photoLink, setInfo: uniqueSetInfo };
        })();

        setSelectedExercisesSend(prevSelectedExercises => prevSelectedExercises.map((item, i) => i === replaceExerciseIndex ? selectedExerciseDetails : item));
        setReplaceExerciseIndex(-1)
        setShowAddExercise(false)
    }

    const handleAdd = () => {
        const selectedExerciseDetails = selectedExercises.map(selectedIndex => {
            const { name, photoLink } = allExercises[selectedIndex];
            const uniqueSetInfo = [
                {
                    items: [
                        { subLabel: 'Sets', value: 1 },
                        { subLabel: 'Lbs', value: "-" },
                        { subLabel: 'Reps', value: "-" }
                    ]
                },
                {
                    items: [
                        { subLabel: 'Sets', value: 2 },
                        { subLabel: 'Lbs', value: "-" },
                        { subLabel: 'Reps', value: "-" }
                    ]
                }
            ];

            return { name, photoLink, setInfo: uniqueSetInfo };
        });


        if (replaceExerciseIndex == -2) {
            setRoutine(prevRoutine => ({
                ...prevRoutine,
                [routineName]: [...prevRoutine[routineName], ...selectedExerciseDetails],
            }));

            setShowAddExercise(false)
            return
        }

        setSelectedExercisesSend(prevSelectedExercises => [
            ...prevSelectedExercises,
            ...selectedExerciseDetails
        ]);
        setShowAddExercise(false)
    }

    // console.log("Selected Exercises:", selectedExercises.map(selectedIndex => allExercises[selectedIndex].name));

    // const send = selectedIndices.map(selectedIndex => allExercises[selectedIndex]);
    // 
    // bg-red-500 
    return (
        <div className='absolute inset-0 z-10 bg-white '>

            {/* Header */}
            <div className="flex items-center justify-center justify-between mr-5 ml-5 mt-5">
                <button className="text-[#2E62EC] font-medium" onClick={() => setShowAddExercise(false)}>
                    Cancel
                </button>

                <p className='text-black font-semibold flex item-center justify-center'>
                    Add Exercise
                </p>

                <button disabled className="text-[#2E62EC] font-medium opacity-0">
                    Save
                </button>
            </div>

            <div className="border-[1px] border-gray-200 mt-2"></div>

            {/* Search Input */}
            <div className="w-full mt-5 px-5">
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <img src={search} className='w-5' alt="search" />
                    </div>
                    <input type="text" name="price" id="price" class="bg-gray-100 rounded py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-sm placeholder:text-gray-400 
                    placeholder:font-normal sm:text-sm sm:leading-6 w-full"
                        placeholder="   Search exercise"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ outline: 'none' }}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className='px-5 flex flex-row w-full h-8 mt-3 items-center gap-4'>
                <button className='border-[1px] border-gray-200 rounded-md flex items-center justify-center flex-1 rounded gap-2 h-full'
                    onClick={() => setOpenAllEquipment(true)}>
                    <p className='text-black font-medium text-sm'> {equipment == '' ? "All Equipment" : equipment}  </p>
                </button>

                <button className='border-[1px] border-gray-200 rounded-md flex items-center justify-center flex-1 rounded gap-2 h-full'
                    onClick={() => setOpenAllMuscle(true)}>
                    <p className='text-black font-medium text-sm'> {targetedMuscle == '' ? "All Muscles" : targetedMuscle} </p>
                </button>
            </div>

            <p className="text-gray-400 text-sm ml-5 mt-4">Popular Exercises</p>

            <div className="mt-2">
                {searchQuery === '' ? (
                    // Display all exercises when there's no search query
                    filteredExercises.map((exercise, index) => (
                        <div key={index}>
                            <button className="w-full px-5 flex flex-row gap-3 items-center"
                                onClick={() => handleExerciseClick(index)}>
                                <div className={`border-l-4 ${selectedExercises.includes(index) ? 'border-blue-700 ml-5 h-14' : ''} rounded`} />
                                <img src={exercise.photoLink} alt={exercise.name} className="w-14 h-14 rounded-full flex-shrink-0" />
                                <div className="flex flex-col items-start">
                                    <p className="text-black text-sm font-semibold">{exercise.name}</p>
                                    <p className="text-gray-400 text-xs">{exercise.targetMuscle}</p>
                                </div>
                            </button>
                            <div className="border-[1px] border-gray-200 mt-1 mb-1 ml-5 mr-5" />
                        </div>
                    ))
                ) : (
                    // Display filtered exercises when there's a search query
                    filteredExercises.map((exercise, index) => (
                        <div key={index}>
                            <button className="w-full px-5 flex flex-row gap-3 items-center"
                                onClick={() => handleExerciseClick(index)}>
                                <div className={`border-l-4 ${selectedExercises.includes(index) ? 'border-blue-700 ml-5 h-14' : ''} rounded`} />
                                <img src={exercise.photoLink} alt={exercise.name} className="w-14 h-14 rounded-full flex-shrink-0" />
                                <div className="flex flex-col items-start">
                                    <p className="text-black text-sm font-semibold">{exercise.name}</p>
                                    <p className="text-gray-400 text-xs">{exercise.targetMuscle}</p>
                                </div>
                            </button>
                            <div className="border-[1px] border-gray-200 mt-1 mb-1 ml-5 mr-5" />
                        </div>
                    ))
                )}
            </div>

            {selectedExercises.length !== 0 && (
                <div className="fixed bottom-0 left-0 right-0 px-5 mb-2 flex items-center justify-center">
                    <div className="w-full flex items-center justify-center">
                        <button className="text-white text-sm font-semibold bg-blue-700 w-full rounded h-7"
                            onClick={() => handleAdd()} >
                            Add {selectedExercises.length} exercises
                        </button>
                    </div>
                </div>
            )}

            {/* {selectedExercises.length !== 0 && (
    <div className="fixed bottom-0 left-0 right-0 px-5 flex items-center justify-center">
        <div className="w-full flex items-center justify-center">
            <button
                className="text-white text-sm font-semibold bg-blue-700 w-full rounded h-7"
                onClick={() => handleAdd()}
            >
                Add {selectedExercises.length} exercises
            </button>
        </div>
    </div>
)} */}

            <Popup
                open={openAllMuscle}
                onClose={() => setOpenAllMuscle(false)}
                modal
                nested
            >
                <div className='bg-blue-700 p-4 overflow-y-auto rounded shadow-lg h-96 w-80'>
                    <div className=''>
                        <MuscleGroup setOpenAllMuscle={setOpenAllMuscle} setTargetedMuscle={setTargetedMuscle} />
                    </div>
                </div>
            </Popup>

            <Popup
                open={openAllEquipment}
                onClose={() => setOpenAllEquipment(false)}
                modal
                nested
            >
                <div className='bg-blue-700 p-4 overflow-y-auto rounded shadow-lg h-96 w-80'>
                    <div className=''>
                        <AllEqupment setOpenAllEquipment={setOpenAllEquipment} setEquipment={setEquipment} />
                    </div>
                </div>
            </Popup>

        </div>
    )
}

const MuscleGroup = ({ setOpenAllMuscle, setTargetedMuscle }) => {
    return (
        // absolute inset-0 bottom-0 
        <div className="bg-white rounded w-full">
            {
                Object.values(MuscleGroups).map((muscleGroup, index) => (
                    <div key={index}>
                        <button className="w-full px-5 flex flex-row gap-3 items-center"
                            onClick={() => {
                                setOpenAllMuscle(false);
                                setTargetedMuscle(muscleGroup.name);
                            }}>
                            <img src={muscleGroup.photoLink} alt={muscleGroup.name} className="w-14 h-14 rounded-full flex-shrink-0" />
                            <div className="flex flex-col items-start">
                                <p className="text-black text-sm font-semibold">{muscleGroup.name}</p>

                            </div>
                        </button>
                        <div className="border-[1px] border-gray-200 mt-1 mb-1 ml-5 mr-5" />
                    </div>
                ))
            }
        </div>
    )
}

const AllEqupment = ({ setOpenAllEquipment, setEquipment }) => {
    return (
        // absolute inset-0 bottom-0 
        <div className="bg-white rounded w-full">
            {
                Object.values(gymEquipment).map((gymEquipment, index) => (
                    <div key={index}>
                        <button className="w-full px-5 flex flex-row gap-3 items-center"
                            onClick={() => {
                                setOpenAllEquipment(false);
                                setEquipment(gymEquipment.name);
                            }}>
                            <img src={gymEquipment.photoLink} alt={gymEquipment.name} className="w-14 h-14 rounded-full flex-shrink-0" />
                            <div className="flex flex-col items-start">
                                <p className="text-black text-sm font-semibold">{gymEquipment.name}</p>

                            </div>
                        </button>
                        <div className="border-[1px] border-gray-200 mt-1 mb-1 ml-5 mr-5" />
                    </div>
                ))
            }
        </div>
    )
}
export default AddExercises
