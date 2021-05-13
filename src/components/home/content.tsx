import React, { useContext } from "react";
import styled from "@emotion/styled";

import { WatchContext } from "../../contexts/WatchContext";
import { ContributionGraph } from "../../components";

const Wrapper = styled.div`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    flex: 1;
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 16px 0;

    @media (min-width: 900px) {
        width: 920px;
    }

    @media (min-width: 1200px) {
        width: 1100px;
    }
`;

export const Content = () => {
    const watch = useContext(WatchContext);
    return (
        <Wrapper>
            <>{watch?.users.map((u) => (
                <ContributionGraph key={u.uid}
                    m="16px 4px"
                    userId={u.name}
                    profileImageUrl={u.profileImageUrl} />
            ))}</>
        </Wrapper>
    )
};
