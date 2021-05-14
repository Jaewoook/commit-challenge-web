import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Flex, Wrap, Text, Spinner } from "@chakra-ui/react";

import { WatchContext } from "../../contexts/WatchContext";
import { ContributionGraph } from "../../components";

const Wrapper = styled(Wrap)`
    margin: 0 auto;
    flex: 1;
    padding: 20px 12px;

    @media (min-width: 900px) {
        width: 920px;
    }

    @media (min-width: 1200px) {
        width: 1100px;
    }
`;

const Loading = () => {
    return (
        <Flex flexDirection="column" alignItems="center">
            <Spinner mt="64px" size="xl" />
            <Text mt="20px" fontSize="lg">유저 정보 불러오는 중</Text>
        </Flex>
    );
};

export const Content = () => {
    const watch = useContext(WatchContext);
    return (
        <Wrapper spacing="14px" justify="center">
            <>{watch?.users.length ? watch?.users.map((u) => (
                <ContributionGraph key={u.uid}
                    m="16px 4px"
                    width={["100%", "100%", "45%"]}
                    userId={u.name}
                    profileImageUrl={u.profileImageUrl} />
            )) : <Loading />}</>
        </Wrapper>
    )
};
