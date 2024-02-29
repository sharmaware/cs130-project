import React from 'react';
import { useEffect, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';

export default function ProfilePage() {
    const [user, setUser] = useState({});

    useEffect(() => {

        fetch('/api/user')
            .then(response => response.json())
            .then(data => {
                setUser(data);
            });
    })

    return (
        <div>
            <h1>{user.username}</h1>
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
                    
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="tab2">
                   
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="tab3">
                   
                </Tabs.Content>
            </Tabs.Root>
        </div>
    )
}