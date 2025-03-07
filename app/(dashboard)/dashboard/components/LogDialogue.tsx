"use client";

type Logs = {
    Id: string;
    Date: string;
    Severity: string;
    UserId: string;
    Name: string;
    ShortOverview: string;
    Type: string;
};

type User = {
    Id: string;
    Name: string;
};

type LogDialogueProp = {
    log: Logs;
    user: User | undefined;
};

const LogDialogue: React.FC<LogDialogueProp> = ({ log, user }) => {
    return (
        <tr>
            <td className="text-sm p-2 py-4 border whitespace-nowrap">{new Date(log.Date).toLocaleString()}</td>
            <td className="text-sm p-2 py-4 border whitespace-nowrap">{log.Severity}</td>
            <td className="text-sm p-2 py-4 border whitespace-nowrap">{user?.Name ?? "Unknown"}</td>
            <td className="text-sm p-2 py-4 border whitespace-nowrap">{log.Name}</td>
            <td className="text-sm p-2 py-4 border whitespace-nowrap">{log.ShortOverview}</td>
            <td className="text-sm p-2 py-4 border whitespace-nowrap">{log.Type}</td>
        </tr>
    );
};

export default LogDialogue;
