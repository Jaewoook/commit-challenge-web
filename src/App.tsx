import React, { useCallback, useState } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Layout } from "./components";
import * as pages from "./pages";
import { User, WatchContext } from "./contexts/WatchContext";
import { theme } from "./theme";

const mockUsers: User[] = [{
    email: "ajw4586@gmail.com",
    name: "jaewoook",
}, {
    email: "octocat@github.com",
    name: "octocat",
}];

const App = () => {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const addUser = useCallback((user: User) => {
        if (users.map((u) => u.email).includes(user.email)) {
            return;
        }
        setUsers([...users, user]);
    }, [users]);
    const watchContext = {
        users,
        addUser,
    };

    return (
        <ChakraProvider theme={theme}>
            <WatchContext.Provider value={watchContext}>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route component={pages.Home} />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </WatchContext.Provider>
        </ChakraProvider>
    );
};

export default App;
