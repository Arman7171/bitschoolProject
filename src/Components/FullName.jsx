import React from 'react'

export default function GetFullName(props) {
    return(
        <div>
            <h1> {props.name} </h1>
            <h1> {props.lastName} </h1>
        </div>
    );
}