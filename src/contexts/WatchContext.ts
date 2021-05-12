import React from "react";

export type User = {
    email: string;
    name: string;
    profileImageUrl?: string;
};

interface IWatchContext {
    users?: User[];
    addUser?: (user: User) => void;
    removeUser?: (index: number) => void;
}

export const WatchContext = React.createContext<IWatchContext>({
    users: [],
});
