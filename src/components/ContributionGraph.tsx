import React from "react";
import styled from "@emotion/styled";
import { Center, Flex, Image, Spinner, Text, FlexProps } from "@chakra-ui/react";

const Wrapper = styled(Flex)`
    min-width: 300px;
    display: flex;
    flex-direction: column;
    padding: 8px 16px;
    background-color: #fff;
    border-radius: 2px;

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

interface Props extends FlexProps {
    userId: string;
    profileImageUrl: string;
}

export const ContributionGraph: React.FC<Props> = ({ userId, profileImageUrl, ...rest }) => {
    return (
        <Wrapper {...rest}>
            <Flex mt="12px" alignItems="center">
                <Image
                    borderRadius="full"
                    boxSize="45px"
                    src={profileImageUrl}
                    fallbackSrc="https://avatars.githubusercontent.com/u/583231?v=4" />
                <Text ml="12px" fontSize="2xl">@{userId.toUpperCase()}</Text>
            </Flex>
            <Image
                htmlWidth="100%" mt="20px"
                minHeight="35px"
                src={`https://ghchart.rshah.org//${userId}`}
                alt="contribution graph"
                fallback={<Loading />} />
        </Wrapper>
    );
};
