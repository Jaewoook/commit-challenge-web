import React from "react";
import styled from "@emotion/styled";
import { space, SpaceProps } from "styled-system";
import { Center, Flex, Image, Spinner, Text } from "@chakra-ui/react";

const Wrapper = styled.div<SpaceProps>`
    ${space}
    min-width: 300px;
    max-width: 45%;
    display: flex;
    flex-direction: column;
    padding: 8px 16px;
    background-color: #fff;
    border-radius: 2px;

    > img {
        margin-top: 8px;
    }

    > div > p {
        font-weight: 500;
        font-family: 'Teko', sans-serif;
    }
`;

const Loading = () => (
    <Center p="16px">
        <Spinner
            thickness="2px"
            speed="0.35s"
            emptyColor="gray.200"
            color="blue.500" />
    </Center>
);

interface Props extends SpaceProps {
    userId?: string;
}

export const ContributionGraph: React.FC<Props> = ({ userId, ...rest }) => {
    return (
        <Wrapper {...rest}>
            <Flex mt="12px" alignItems="center">
                <Image borderRadius="full" boxSize="45px" fallbackSrc="https://avatars.githubusercontent.com/u/583231?v=4" />
                <Text ml="12px" fontSize="2xl">@{userId?.toUpperCase()}</Text>
            </Flex>
            <Image width="100%" src={`https://ghchart.rshah.org//${userId}`} alt="contribution graph" fallback={<Loading />} />
        </Wrapper>
    );
};
