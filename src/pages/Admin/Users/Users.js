import React, {useState, useEffect} from 'react';

import { getAccessTokenApi } from "../../../api/auth";
import { getUsersActiveApi } from "../../../api/user";

import ListUsers from "../../../components/Admin/Users/ListUsers";

import './Users.scss';

export default function Users() {

    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersIUnactive] = useState([]);
    const token = getAccessTokenApi();

    useEffect(() => {
        getUsersActiveApi(token, true).then(resp => {
            setUsersActive(resp.users);
        });
        getUsersActiveApi(token, false).then(resp => {
            setUsersIUnactive(resp.users);
        });
    }, [token]);

    return (
        <div className="users">
            <ListUsers usersActive={usersActive} usersInactive={usersInactive} />
        </div>
    );
}