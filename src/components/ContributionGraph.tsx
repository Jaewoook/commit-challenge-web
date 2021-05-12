import React from "react";
import styled from "@emotion/styled";
import { Flex, Image, Text } from "@chakra-ui/react";

const Wrapper = styled.div`
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

interface Props {
    userId?: string;
}

export const ContributionGraph: React.FC<Props> = ({ userId }) => {
    return (
        <Wrapper>
            <Flex mt="12px" alignItems="center">
                <Image borderRadius="full" boxSize="45px" fallbackSrc="https://avatars.githubusercontent.com/u/583231?v=4" />
                <Text ml="12px" fontSize="2xl">@{userId?.toUpperCase()}</Text>
            </Flex>
            <img src={`https://ghchart.rshah.org//${userId}`} alt="contribution graph" />
        </Wrapper>
    );
};
