import axios from "axios";
import React, { Component, ReactPropTypes } from "react";
import Cookies from "universal-cookie";
import { NextRouter, withRouter } from "next/router";
import { API } from "@/constants/constant";

interface MyState {
    user: {
        username: string;
        password: string;
    };
}
interface WithRouterProps {
    router: NextRouter;
}

interface MyProps extends WithRouterProps {}
class Login extends Component<MyProps, MyState> {
    cookies = new Cookies();
    constructor(props: MyProps) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: "",
            },
        };
    }

    // It runs when an input is changed, setting user state
    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState((prevstate) => ({
            user: {
                ...prevstate.user,
                [name]: value,
            },
        }));
    };

    handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        // Prevents the page from reloading when the form is submitted
        event.preventDefault();
        try {
            // Sends the user state to the server
            const { data } = await axios.post(`${API}/auth`, this.state.user);
            // set the auth token in cookies
            this.cookies.set("access_token", data.access_token, { path: "/" });
            // redirect to home notes page
            this.props.router.push("/notes");
        } catch (error) {
            alert("Something went wrond, try again");
        }
    };

    render() {
        return (
            <div>
                <form action="" onSubmit={(e) => this.handleSubmitForm(e)}>
                    <input
                        type="text"
                        name="username"
                        id="name"
                        placeholder="username"
                        onChange={(e) => this.handleInputChange(e)}
                    />
                    <input
                        type="text"
                        name="password"
                        id="pass"
                        placeholder="password"
                        onChange={(e) => this.handleInputChange(e)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);
