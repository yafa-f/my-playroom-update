import React from "react";

export const fatchGetUsers = () => {

    return fetch('http://localhost:5000/userRoutes').then
        (
            data => {
                console.log("data ", data);

                if (data.ok) {
                    return data.json().then(
                        user => {
                            return user;
                        }
                    )
                }
                else
                    alert("not defined")
            }
        ).catch(e => {
            return null;
        });
}