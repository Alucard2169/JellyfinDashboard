"use client";


import { useRouter } from "next/navigation";
import { useState, MouseEvent } from "react";

export default function Page() {
    const [actionType, setActionType] = useState<"login" | "new">("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleActionToggle = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setActionType((prev) => (prev === "login" ? "new" : "login"));
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const endpoint = actionType === "login" ? "/api/login" : "/api/signup";

        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })

        if(res.ok){
            if(actionType === "login"){
                router.push("/dashboard");
            }
            else{
                router.push("/server");
            }   
        }
        else{
            console.log(res)
            setError("An error occurred");
        }
    }

    return (
        <main className="h-full flex justify-center items-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-2/5">
                <h3 className="mb-4 font-bold text-xl">
                    {actionType === "login" ? "Login" : "Create New User"}
                </h3>
                {error && <p className="text-red-500">{error}</p>}
                <label htmlFor="username" className="flex flex-col gap-2">
                    <span className="font-bold text-md">Username</span>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="outline-none border border-white-1 p-1 rounded-md"
                    />
                </label>

                <label htmlFor="password" className="flex flex-col gap-2">
                    <span className="font-bold text-md">Password</span>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="outline-none border border-white-1 p-1 rounded-md"
                    />
                </label>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                    {actionType === "login" ? "Login" : "Sign Up"}
                </button>

                <button
                    onClick={handleActionToggle}
                    className="mt-4 text-blue-500 mr-auto"
                    type="button"
                >
                    {actionType === "login" ? "Create new user?" : "Back to login"}
                </button>
            </form>
        </main>
    );
}
