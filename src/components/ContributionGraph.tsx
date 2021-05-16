import React from "react";
import styled from "@emotion/styled";
import { Center, Flex, Icon, Image, Link, Spinner, Text, FlexProps } from "@chakra-ui/react";
import { BiLinkExternal } from "react-icons/bi";

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

const NameText = styled(Text)`
    transition: all 0.15s linear;
    :hover {
        color: #2978b5;
    }
    > a {
        text-decoration: underline;
        text-decoration-color: transparent;
    }
    > a > svg {
        margin-left: 4px;
        font-size: 14px;
    }
`;

const LinkSymbol = () => <Icon as={BiLinkExternal} />;

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

const getUserGitHubUrl = (name: string) => `https://github.com/${name}`;

export const ContributionGraph: React.FC<Props> = ({ userId, profileImageUrl, ...rest }) => {
    return (
        <Wrapper {...rest}>
            <Flex mt="12px" alignItems="center">
                <Image
                    borderRadius="full"
                    boxSize="45px"
                    src={profileImageUrl}
                    fallbackSrc="https://avatars.githubusercontent.com/u/583231?v=4" />
                <NameText ml="12px" fontSize="2xl">
                    <Link href={getUserGitHubUrl(userId)} isExternal>
                        @{userId.toUpperCase()}
                        <LinkSymbol />
                    </Link>
                </NameText>
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
