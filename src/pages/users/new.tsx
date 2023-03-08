import { API } from "@/constants/constant";
import { User } from "@/dataTypes/user";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

function newUser() {
    const router = useRouter(); // This is the hook to use next router

    // User state to create and send to server
    const [NewUser, setNewUser] = useState<User>({
        username: "",
        password: "",
    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = event.target;
        setNewUser({ ...NewUser, [name]: value });
    };

    const handleSubmitForm = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault(); // Prevents page refresh
        try {
            const response = await axios.post(`${API}/users`, NewUser, {
                withCredentials: true,
            });
            alert("User created successfully! Now, you can login");
            router.push("/users/login");
        } catch (error) {
            alert("Something went wrong, try again");
            router.push("/");
        }
    };

    return (
        <div>
            <form onSubmit={(e) => handleSubmitForm(e)}>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username: "
                    onChange={(e) => handleInputChange(e)}
                />
                <input
                    type="text"
                    name="password"
                    id="password"
                    placeholder="Password: "
                    onChange={(e) => handleInputChange(e)}
                />
                <button type="submit">Create User</button>
            </form>
        </div>
    );
}

export default newUser;
