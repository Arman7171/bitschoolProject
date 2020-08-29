import React from 'react'

const UserInfo = props => {
    var users = props.users
    return(
        <div style={{display: 'flex', margin: '80px'}}>
            {users.map((userInfo, index) => {
                return(
                    <div style={{margin: '40px'}} key={index}>
                        <p>userName: <span>{userInfo.userName}</span></p>
                        <p>password: <span>{userInfo.password}</span></p>
                        <p>email: <span>{userInfo.email}</span></p>
                    </div>
                );
            })}
        </div>
    );
}

export default UserInfo