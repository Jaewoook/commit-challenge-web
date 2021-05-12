import React, { useContext } from "react";
import styled from "@emotion/styled";

import { WatchContext } from "../../contexts/WatchContext";
import { ContributionGraph } from "../../components";

const Wrapper = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    padding: 16px 24px;
`;


export const Content = () => {
    const watch = useContext(WatchContext);
    return (
        <Wrapper>
            <>{watch?.users?.map((u) => <ContributionGraph key={u.email} userId={u.name} />)}</>
        </Wrapper>
    )
};
