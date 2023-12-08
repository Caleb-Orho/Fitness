import { add, folder, note, dumbell, profile, magnifyingglass, threedots, triangleright } from "../../assets/SVG";
import NewRoutine from './NewRoutine'
import EditRoutine from './EditRoutine'
import React, { useState, useEffect } from 'react';
import { collection, getDocs, getDoc, doc, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from "../../FireBase/Firebase"
import ShowEditRoutine from "../../assets/Others/ShowEditRoutine"
import { useNavigate } from 'react-router-dom';

function HomeScreen() {
    const [newRoutineToggled, setNewRoutineToggled] = useState(false);
    const [routine, setRoutine] = useState([])
    const [expandMyRoutine, setExpandMyRoutine] = useState(false)
    const [showOption, setShowOption] = useState(false);

    const [routineName, setRoutineName] = useState();
    const [editRoutineIndex, setEditRoutineIndex] = useState(-1);

    const navigate = useNavigate();

    useEffect(() => {
        // const addDocumentToCollection = async () => {
        //     const fitnessCollection = collection(db, 'Fitness', 'Routine', "Test", "Jan", '0');

        //     // Your data to be added to the document
        //     const data = {
        //         key1: 'value1',
        //         key2: 'value2',
        //         // Add other fields as needed
        //     };

        //     // Create a document reference with a custom ID
        //     const customDocRef = doc(fitnessCollection, 'customDocumentIDs');

        //     // Add the document to the specified collection
        //     try {
        //         await setDoc(customDocRef, data);
        //         console.log('Document written with ID: ', 'customDocumentID');
        //     } catch (error) {
        //         console.error('Error adding document: ', error);
        //     }
        // };

        // // Invoke the async function immediately
        // addDocumentToCollection();
    }, [])
    // bg-red-500 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(doc(db, 'Fitness', 'Routine'));
                const routineNamesData = docSnap.data()['RoutineNames'];

                const newRoutine = [];

                for (const name of routineNamesData) {
                    try {
                        const querySnapshot = await getDocs(collection(db, 'Fitness', 'Routine', name));

                        const exercises = [];
                        querySnapshot.forEach((doc) => {
                            exercises.push(doc.data());
                        });

                        // Append exercises to the newRoutine array
                        newRoutine[name] = exercises;
                    } catch (error) {
                        console.error('Error fetching exercises from Firestore: ', error);
                    }
                }

                // Update state with the newRoutine array
                setRoutine(newRoutine);
            } catch (error) {
                console.error('Error fetching routine data from Firestore: ', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const Change = async () => {
            if (editRoutineIndex !== 3) {
                if (editRoutineIndex === 1) {
                    const collectionRef = collection(db, "Fitness/Routine/" + routineName);
                    const docSnap = await getDoc(doc(db, 'Fitness', 'Routine'));
                    const routineNamesData = docSnap.data()['RoutineNames'];
                    try {
                        const updatedRoutineNamesData = routineNamesData.filter(element => element !== routineName);

                        await updateDoc(doc(db, 'Fitness', 'Routine'), { RoutineNames: updatedRoutineNamesData });

                        const querySnapshot = await getDocs(collectionRef);

                        querySnapshot.forEach(async (doc) => {
                            try {
                                await deleteDoc(doc.ref);
                                //console.log(`Document with ID ${doc.id} deleted successfully.`);
                            } catch (error) {
                                //console.error(`Error deleting document with ID ${doc.id}: `, error);
                            }
                        });
                    } catch (error) {
                        console.error("Error getting documents: ", error);
                    }
                }
            }
        };

        Change();

    }, [showOption == false]);

    return (
        <div className=''>
            <p className='text-black font-semibold flex item-center justify-center mt-5'>
                Workout
            </p>
            <div className="border-[1px] border-gray-200 mt-2"></div>

            <p className='text-black font-bold ml-5 mt-3'>
                Quick Start
            </p>

            {/* Start Empty Workout Button */}
            <div className='px-5 rounded w-full'>
                <div className='flex flex-row w-full mt-3'>
                    <button className='border-[1px] border-gray-200 rounded-md flex items-center flex-1 rounded gap-2'>
                        <img src={add} className='w-8' alt="add" />
                        <p className='text-black font-medium text-sm'> Start Empty Workout </p>
                    </button>
                </div>
            </div>

            {/* Routines and Folder Buttons */}
            <div className='mt-4 flex items-center justify-between ml-5 mr-5'>
                <p className='text-black font-bold'> Routines </p>
                {/* <img src={folder} className='w-8' alt="add" /> */}
            </div>

            {/* New Routine and Routines Buttons */}
            <div className='flex flex-row items-center justify-center gap-5 mt-2'>
                <button className='rounded-md border-[1px] border-gray-200 flex flex-col items-center justify-center w-full ml-5 h-20' onClick={() => setNewRoutineToggled(!newRoutineToggled)}>
                    <img src={note} className='w-8' alt="add" />
                    <p className='text-black font-medium text-sm'>
                        New Routine
                    </p>
                </button>

                <button className='rounded-md border-[1px] border-gray-200 flex flex-col items-center justify-center w-full mr-5 h-20'>
                    <img src={magnifyingglass} className='w-7' alt="add" />
                    <p className='text-black font-medium text-sm'>
                        Explore Routines
                    </p>
                </button>
            </div>

            <div className="px-5 mt-5 ">
                <button className="text-sm font-semibold text-gray-400 flex flex-row gap-1 w-full"
                    onClick={() => setExpandMyRoutine(!expandMyRoutine)}>
                    <img src={triangleright} className={`w-5 ${expandMyRoutine ? 'rotate-90' : ''}`} alt="add" />
                    My Routnies
                </button>

                {expandMyRoutine &&
                    Object.keys(routine).map((routineName) => (
                        <div className="rounded-md border-[1px] border-gray-200 mt-5">

                            <div className="flex flex-row justify-between px-5 mt-3">
                                <p className='text-black font-bold'>
                                    {routineName}
                                </p>

                                <button onClick={() => {
                                    setShowOption(!showOption)
                                    setRoutineName(routineName)
                                }}>
                                    <img src={threedots} className='rotate-90 w-6' alt="add" />
                                </button>

                            </div>

                            <div className='px-5 mb-3 ftext-sm font-semibold text-gray-400 text-xs mt-1'>

                                <div className="flex flex-row gap-1 truncate ">
                                    {routine[routineName].map((exercise, exerciseIndex) => (

                                        <React.Fragment key={exerciseIndex}>
                                            <p>{exercise.name}
                                                {exerciseIndex !== routine[routineName].length - 1 && <span>, </span>}
                                            </p>
                                        </React.Fragment>

                                    ))}
                                </div>

                                <div className='rounded w-full mt-3'>
                                    <button className='w-full rounded-md flex items-center justify-center flex-1 rounded gap-2 bg-blue-700 h-8'
                                        onClick={() => navigate('/StartWorkOut', { state: { routineData: routine[routineName], routineName: routineName } })}>
                                        <p className='text-white font-medium text-sm'> Start Routine </p>
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))
                }
                {/* {routine.length > 0 ? (routine.map((item, index) => (
                    <div className="rounded-md border-[1px] border-gray-200 mt-5">

                        <div className="flex flex-row justify-between px-5 mt-3">
                            <p className='text-black font-bold'>
                                {item.name}
                            </p>

                            <button onClick={() => {

                            }}>
                                <img src={threedots} className='rotate-90 w-6' alt="add" />
                            </button>

                        </div>

                        <div className='px-5 mb-3 ftext-sm font-semibold text-gray-400  mt-3'>

                            <div className="flex flex-row ">
                                {routineData[1].map((exercise, exerciseIndex) => (

                                    <p>{exercise.name} , </p>
                                ))}
                            </div>

                            <div className='rounded w-full mt-3'>
                                <button className='w-full rounded-md flex items-center justify-center flex-1 rounded gap-2 bg-blue-700 h-8'
                                    onClick={() => ''}>
                                    <p className='text-white font-medium text-sm'> Start Routine </p>
                                </button>
                            </div>
                        </div>

                    </div>
                ))) : null} */}



            </div>

            {/* Workout and Profile Button */}
            <div className='absolute inset-x-1 bottom-0'>
                <div className="border-[1px] border-gray-200 mt-2"></div>

                <div className='flex flex-row items-center justify-center gap-5 '>
                    <button className='flex flex-col items-center justify-center w-full ml-5 h-16 rounded'>
                        <img src={dumbell} className='w-8' alt="add" />
                        <p className='text-[#2E62EC] text-xs'>
                            Workout
                        </p>
                    </button>
                    <button className='flex flex-col items-center justify-center w-full mr-5 h-16 rounded'>
                        <img src={profile} className='w-7' alt="add" />
                        <p className='text-[#2E62EC] text-xs'>
                            Profile
                        </p>
                    </button>
                </div>
            </div>

            {newRoutineToggled ? <NewRoutine setNewRoutineToggled={setNewRoutineToggled} /> : <></>}

            {editRoutineIndex == 2 ?
                <EditRoutine setEditRoutineIndex={setEditRoutineIndex} routineToEdit={routine[routineName]} setRoutine={setRoutine} routineName={routineName} />
                : <></>}

            {showOption && (
                <ShowEditRoutine setShowOption={setShowOption} setEditRoutineIndex={setEditRoutineIndex} />
            )}
        </div>
    )
}

export default HomeScreen
