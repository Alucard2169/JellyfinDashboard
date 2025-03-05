"use client";

import { useState, MouseEvent } from "react";

export default function Page() {
    const [actionType, setActionType] = useState<"login" | "new">("login");

    const handleActionToggle = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setActionType((prev) => (prev === "login" ? "new" : "login"));
    };

    return (
        <main className="h-full flex justify-center items-center">
            <form className="flex flex-col gap-4 w-2/5">
                <h3 className="mb-4 font-bold text-xl">
                    {actionType === "login" ? "Login" : "Create New User"}
                </h3>

                <label htmlFor="username" className="flex flex-col gap-2">
                    <span className="font-bold text-md">Username</span>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="outline-none border border-white-1 p-1 rounded-md"
                    />
                </label>

                <label htmlFor="password" className="flex flex-col gap-2">
                    <span className="font-bold text-md">Password</span>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="outline-none border border-white-1 p-1 rounded-md"
                    />
                </label>

                <button
                    type="submit"
                    className="bg-blue-500 rounded-md font-semibold text-lg"
                >
                    Submit
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
