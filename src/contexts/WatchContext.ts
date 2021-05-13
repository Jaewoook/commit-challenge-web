import React from "react";

export type User = {
    id?: string;
    uid: number;
    name: string;
    profileImageUrl: string;
};

interface IWatchContext {
    users: User[];
    addUser: (user: User) => void;
    loadUsers: () => void;
}

export const WatchContext = React.createContext<IWatchContext>({
    users: [],
    addUser: () => {},
    loadUsers: () => {},
});
