//Page that allows the user to link their account to an oasis account
//Have a "confirm link" button that will send a request to the server to link the accounts
//Have a "cancel" button that will take the user back to the home page

import { useHistory } from "react-router-dom";

// import React from "react";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
// import { Redirect } from "react-router-dom";

export default function LinkOasis({ token }) {
    console.log("LINK OASIS TOKEN: " + token);

    let history = useHistory();
    console.log(token);
    if (token === null) {
        console.log("REDIRECT");
        history.push("/");
    }
    const closeTab = () => {
        console.log("CLOSING TAB");
        window.opener = null;
        window.open("", "_self");
        window.close();
        history.push("/");
    };


    let handleSubmit = (e) => {
        e.preventDefault();



        fetch("https://ecranked.ddns.net/api/v2/auth/oasis/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("AUTHORIZATION_TOKEN"),
            },
            body: JSON.stringify({
                token: token,
            }),
        }).then(
            (response) => {
                if (response.ok) {
                    closeTab();
                } else {
                    alert("Session timed out. Please try again. #LinkOasis")
                    closeTab();

                }
            }

        ).catch((error) => {
            console.error("There was an error!", error);
            alert("There was an error. Please contact a moderator immediately. #LinkOasis");
            return;
        });
    };
    let handleCancel = (e) => {
        history.push("/");
    };
    return (
        <div>
            <div>
                <div className="list padded rounded m-48">
                    <h2>Link To ECHO OASIS</h2>
                    <div className="padded rounded border button" onClick={handleSubmit}>
                        Link Account
                    </div>
                    <div className="padded rounded border button" onClick={handleCancel}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    );
}
