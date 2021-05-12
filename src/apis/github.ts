import axios from "axios";

const GITHUB_API = "https://api.github.com/search/users";

interface GitHubResponse {
    total_count: number;
    incomplete_results: boolean;
    items: any[];
}

interface UserResponse extends GitHubResponse {
    items: {
        login: string;
        id: number;
        avatar_url: string;
        type: string;
    }[];
}

export const getGitHubUser = async (name: string) => {
    const res = await axios.get<UserResponse>(`${GITHUB_API}/search/users`, {
        params: {
            q: name,
        },
    });
    if (res.status !== 200) {
        throw new Error(res.statusText);
    }

    const users = res.data.items.filter((u) => u.type === "User");
    return users;
};
