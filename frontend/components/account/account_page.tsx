import React from 'react';
import { useSelector } from 'react-redux';
import { State, User } from '../../my_types';

function AccountPage() {
    const currentUser: User = useSelector((state: State) => state.entities.user);

    console.log(currentUser)
    return (
        <div className="account-page">
            {currentUser.username}
        </div>
    );
}

export default AccountPage;