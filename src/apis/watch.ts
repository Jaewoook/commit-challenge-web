import axios from "axios";
import { User } from "../contexts/WatchContext";

const JAEWOOK_API = "https://api.jaewook.me/commit-challenge";

export const getWatchUser = async (): Promise<User[]> => {
    try {
        const res = await axios.get(`${JAEWOOK_API}/user`);
        if (res.data.status != "OK") {
            throw new Error(res.data.error);
        } else {
            return res.data.data;
        }
    } catch (err) {
        return [];
    }
};

export const createWatchUser = async (user: User) => {
    const res = await axios.post(`${JAEWOOK_API}/user`, {
        ...user,
    });
    if (res.data.status !== "OK") {
        throw new Error(res.data.error);
    }
};
