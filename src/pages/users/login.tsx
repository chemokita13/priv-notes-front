import axios from "axios";
import React, { Component, ReactPropTypes } from "react";
import Cookies from "universal-cookie";
import { NextRouter, withRouter } from "next/router";
import { API } from "@/constants/constant";
import Link from "next/link";

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
                <h1 className="mb-5 text-4xl text-white md:text-8xl md:font-bold md:mb-10">
                    Log in
                </h1>
                <form
                    className="flex flex-col items-center justify-center w-3/4 bg-blue-400 outline outline-white rounded-xl h-3/4 md:w-1/2 md:h-1/2"
                    onSubmit={(e) => this.handleSubmitForm(e)}
                >
                    <input
                        type="text"
                        name="username"
                        id="name"
                        placeholder="Username:"
                        onChange={(e) => this.handleInputChange(e)}
                        className="p-2 m-1 border border-blue-300 rounded-md w-52 h-7 md:text-center md:rounded-lg md:h-8 md:w-72 placeholder:text-left md:p-3"
                    />
                    <input
                        type="password"
                        name="password"
                        id="pass"
                        placeholder="Password:"
                        onChange={(e) => this.handleInputChange(e)}
                        className="p-2 m-1 border border-blue-300 rounded-md w-52 h-7 md:text-center md:rounded-lg md:h-8 md:w-72 placeholder:text-left md:p-3"
                    />
                    <button
                        type="submit"
                        className="px-8 font-bold text-white underline transition-all duration-100 bg-blue-300 md:rounded-xl md:px-16 md:py-2 outline outline-white md:m-5 hover:bg-white hover:text-blue-400 hover:outline-blue-500 hover:scale-105 py-0.5 m-2 rounded-lg"
                    >
                        Log in
                    </button>
                    <span className="text-white cursor-pointer hover:underline">
                        <Link href={"/users/new"}>Or create an account</Link>
                    </span>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);
