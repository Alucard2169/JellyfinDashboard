"use client";

import { useState } from "react";

export default function Page() {
    function validateIPAddress(ip: string): boolean {
        const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipRegex.test(ip);
    }

    function validatePort(port: string): boolean {
        const portNumber = parseInt(port, 10);
        return Number.isInteger(portNumber) && portNumber > 0 && portNumber <= 65535;
    }

    const [error, setError] = useState<{ ip: string; port: string }>({ ip: "", port: "" });
    const [ip, setIp] = useState<string>("");
    const [port, setPort] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const ipError = validateIPAddress(ip) ? "" : "Invalid IP address.";
        const portError = validatePort(port) ? "" : "Invalid port number.";
        setError({ ip: ipError, port: portError });

        if (!ipError && !portError) {
            console.log("Valid IP and port submitted:", ip, port);
            // form submission logic here
        }
    };

    return (
        <main className="h-full w-full flex justify-center items-center">
            <section>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <label htmlFor="server" className="flex flex-col gap-3">
                        <span className="font-bold text-lg">Server</span>
                        <input
                            className="outline-none border p-2 rounded-md text-md"
                            type="text"
                            name="server"
                            id="server"
                            placeholder="Server IP"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            required
                        />
                        {error.ip && <p className="text-red-400 text-sm">{error.ip}</p>}
                    </label>
                    <label htmlFor="port" className="flex flex-col gap-3">
                        <span className="font-bold">Port</span>
                        <input
                            className="outline-none border p-2 rounded-md text-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            type="number"
                            name="port"
                            id="port"
                            placeholder="8080"
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                            required
                        />
                        {error.port && <p className="text-red-400 text-sm">{error.port}</p>}
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md font-bold py-2 hover:bg-blue-600 transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </section>
        </main>
    );
}
