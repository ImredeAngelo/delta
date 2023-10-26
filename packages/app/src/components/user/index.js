import React, { useEffect, useState } from 'react'
import { context as UserContext } from './useUser';
import api, { endpoints } from '~api';

export default function User(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // TODO: Load user from local store + cookie
        api.get(endpoints.users.loginWithToken)
            .then(r => {
                if(r.status === "success") {
                    setUser({
                        name:r.user.name + " (" + r.user.id + ")",
                        ...r.user
                    });
                }
            })
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
