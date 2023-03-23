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
            console.log(error);
            alert("Something went wrond, try again");
        }
    };

    render() {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full bg-blue-500">
                <h1 className="text-white md:text-8xl md:font-bold md:mb-10">
                    Log in
                </h1>
                <form
                    className="flex flex-col items-center justify-center md:outline md:outline-white md:rounded-xl md:w-1/2 md:h-1/2 md:bg-blue-400"
                    onSubmit={(e) => this.handleSubmitForm(e)}
                >
                    <input
                        type="text"
                        name="username"
                        id="name"
                        placeholder="Username:"
                        onChange={(e) => this.handleInputChange(e)}
                        className="text-center border border-blue-300 rounded-lg md:h-8 md:w-72 placeholder:text-left md:p-3 md:m-1"
                    />
                    <input
                        type="text"
                        name="password"
                        id="pass"
                        placeholder="Password:"
                        onChange={(e) => this.handleInputChange(e)}
                        className="text-center border border-blue-300 rounded-lg md:h-8 md:w-72 placeholder:text-left md:p-3 md:m-1"
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);
