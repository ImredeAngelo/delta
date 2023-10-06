import React, { useEffect, useState } from 'react'
import { context as UserContext } from './useUser';

export default function User(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // TODO: Load user if in local store
    }, []);

    return (
        <UserContext.Provider value={{
            ...user,
            isLoggedIn: user != null,
            set: setUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
