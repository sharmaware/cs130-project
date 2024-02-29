import React from 'react';
import { useEffect, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Avatar from '@radix-ui/react-avatar';
import * as Dialog from '@radix-ui/react-dialog';

export default function ProfilePage() {
    const [user, setUser] = useState({});

    useEffect(() => {

        fetch('/api/user')
            .then(response => response.json())
            .then(data => {
                setUser(data);
            });
        
        //fetch myPals

        //fetch pinnedWorkouts
        //fetch personalRecords
    })

    const saveNewWorkout = () => {

    }

    return (
        <div>
            <Avatar.Root className="AvatarRoot">
                <Avatar.Image
                    className="AvatarImage"
                    src=""
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
                                <Dialog.Description className="DialogDescription">
                                    Add a pinned workout to your profile
                                </Dialog.Description>
                                <fieldset className="Fieldset">
                                    <label className="Label" htmlFor="name">
                                        Name
                                    </label>
                                    <input className="Input" id="name" defaultValue="" />
                                </fieldset>
                                <fieldset className="Fieldset">
                                    <label className="Label" htmlFor="username">
                                        Username
                                    </label>
                                    <input className="Input" id="username" defaultValue="@peduarte" />
                                </fieldset>
                                <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                                    <Dialog.Close asChild>
                                        <button className="Button green" onClick={saveNewWorkout}>Save</button>
                                    </Dialog.Close>
                                </div>
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
                    <p>My Pals</p>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    )
}