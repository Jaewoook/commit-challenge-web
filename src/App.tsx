import React, { useCallback, useEffect, useState } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Layout } from "./components";
import * as pages from "./pages";
import { User, WatchContext } from "./contexts/WatchContext";
import { getWatchUser } from "./apis/watch";
import { theme } from "./theme";

const App = () => {
    const [users, setUsers] = useState<User[]>([]);
    const addUser = useCallback((user: User) => {
        if (users.map((u) => u.id).includes(user.id)) {
            return;
        }
        setUsers([...users, user]);
    }, [users]);
    const loadUsers = useCallback(async () => {
        const users = await getWatchUser();
        setUsers(users);
    }, []);
    const watchContext = {
        users,
        addUser,
        loadUsers,
    };

    useEffect(() => {
        loadUsers();
    //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
