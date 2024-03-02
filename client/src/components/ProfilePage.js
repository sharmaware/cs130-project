import React from 'react';
import { useEffect, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Avatar from '@radix-ui/react-avatar';
import * as Dialog from '@radix-ui/react-dialog';
const exerciseList = [
    "Deadlift",
    "Squat",
    "Bench Press",
    "Pull-Up",
    "Push-Up",
    "Bent-Over Row",
    "Overhead Press",
    "Lunges",
    "Plank",
    "Leg Press",
    "Barbell Curl",
    "Tricep Dip",
    "Shoulder Press",
    "Lat Pull-Down",
    "Russian Twist",
    "Burpees"
];


export default function ProfilePage() {
    const [user, setUser] = useState({});
    const [pals, setPals] = useState(["Test Pal1", "Test Pal2", "Test Pal3"]);
    const [visibleExercises, setVisibleExercises] = useState(1);
    const [currPalName, setCurrPalName] = useState("");
    useEffect(() => {

        fetch('/api/user')
            .then(response => response.json())
            .then(data => {
                setUser(data);
            });

        //fetch myPals

        //fetch pinnedWorkoutsf
        //fetch personalRecords
    })

    const addPal = () => {
        console.log(currPalName)
        //send currPalName to backend
        setPals([...pals, currPalName])
    }

    return (
        <div>
            <Avatar.Root className="AvatarRoot">
                <Avatar.Image
                    className="AvatarImage"
                    src="https://filestore.community.support.microsoft.com/api/images/8a86b79d-4e94-4c61-ace1-837ffd763978?upload=true"
                    alt="Avatar Image"
                />
                <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                    Avatar Image Loading...
                </Avatar.Fallback>
            </Avatar.Root>
            <h1>{user.firstName + " " + user.lastName}</h1>
            <Tabs.Root className="TabsRoot" defaultValue="tab1">
                <Tabs.List className="TabsList" aria-label="Profile Tabs">
                    <Tabs.Trigger className="TabsTrigger" value="tab1">
                        Pinned Workouts
                    </Tabs.Trigger>
                    <Tabs.Trigger className="TabsTrigger" value="tab2">
                        Personal Records
                    </Tabs.Trigger>
                    <Tabs.Trigger className="TabsTrigger" value="tab3">
                        My Pals
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className="TabsContent" value="tab1">
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <button className="Button violet">Add workout</button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="DialogOverlay" />
                            <Dialog.Content className="DialogContent">
                                <Dialog.Title className="DialogTitle">Add workout</Dialog.Title>
                                <WorkoutModal />
                                <Dialog.Close asChild>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="tab2">
                    <p>Personal Records</p>
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="tab3">
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <button className="IconButton" aria-label="Update dimensions">
                                Add Pal
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Content className="" sideOffset={5}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    <p className="Text" style={{ marginBottom: 10 }}>
                                        Add a Pal!
                                    </p>
                                    <fieldset className="Fieldset">
                                        <label className="Label" htmlFor="width">
                                            Name
                                        </label>
                                        <input
                                            className="Input"
                                            placeholder="Pal Name"
                                            value={currPalName}
                                            onChange={(e) => setCurrPalName(e.target.value)}
                                        />
                                    </fieldset>


                                </div>
                                <Dialog.Close asChild>
                                    <button className="Button green" onClick={addPal}>Save</button>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                    {pals.map(pal => {
                        return (
                            <div>
                                <p>{pal}</p>
                            </div>
                        )
                    })}
                </Tabs.Content>
            </Tabs.Root>
        </div>
    )
}

const ExerciseInput = ({ exerciseList, exercise, setExercise }) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <select
            className="Select"
            value={exercise.name}
            onChange={e => setExercise({ ...exercise, name: e.target.value })}
        >
            {exerciseList.map((ex) => (
                <option key={ex} value={ex}>
                    {ex}
                </option>
            ))}
        </select>
        <input
            className="Input"
            placeholder="# Sets"
            value={exercise.sets}
            onChange={e => setExercise({ ...exercise, sets: e.target.value })}
        />
        <input
            className="Input"
            placeholder="# Reps"
            value={exercise.reps}
            onChange={e => setExercise({ ...exercise, reps: e.target.value })}
        />
    </div>
);


const WorkoutModal = () => {
    const [workoutName, setWorkoutName] = useState('');
    const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '' }]);

    const addExercise = () => {
        if (exercises.length < 8) {
            setExercises([...exercises, { name: '', sets: '', reps: '' }]);
        }
    };

    const setExerciseData = (index, data) => {
        const newExercises = [...exercises];
        newExercises[index] = data;
        setExercises(newExercises);
    };

    const saveNewWorkout = () => {
        const data = {
            workoutName,
            exercises: exercises.map(exercise => ({
                exerciseName: exercise.name || undefined,
                reps: exercise.reps ? parseInt(exercise.reps, 10) : 0,
                sets: exercise.sets ? parseInt(exercise.sets, 10) : 0
            })).concat(Array(8 - exercises.length).fill({
                exerciseName: undefined,
                reps: 0,
                sets: 0
            }))
        };
        console.log(data);
        return;

        // Send data to the backend
        fetch('/api/workout', {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle success response
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error response
            });
    };

    return (
        <div>
            {/* Component UI elements */}
            <fieldset className="Fieldset">
                <label className="Label" htmlFor="workoutName">
                    Workout Name
                </label>
                <input
                    className="Input"
                    id="workoutName"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                />
            </fieldset>
            {exercises.map((exercise, index) => (
                <ExerciseInput
                    key={index}
                    exerciseList={exerciseList}
                    exercise={exercise}
                    setExercise={(data) => setExerciseData(index, data)}
                />
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="Button" onClick={addExercise}>+</button>
            </div>
            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>

                <Dialog.Close asChild>
                    <button className="Button green" onClick={saveNewWorkout}>Save</button>
                </Dialog.Close>
            </div>
        </div>
    );
};

