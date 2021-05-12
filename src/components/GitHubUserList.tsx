import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Flex, Image, Text } from "@chakra-ui/react";
import { display, DisplayProps } from "styled-system";

import { User, WatchContext } from "../contexts/WatchContext";


const GitHubUser: React.FC<User> = (props) => {
    const { name, profileImageUrl } = props;
    return (
        <Flex minWidth="33%" alignItems="center" px="12px" py="8px" cursor="pointer" _hover={{ backgroundColor: "#eee" }}>
            <Image src={profileImageUrl} boxSize="35px" borderRadius="full" />
            <Text ml="12px" fontSize="14px" fontFamily="Teko" color="#000">@{name.toUpperCase()}</Text>
        </Flex>
    );
};

const Wrapper = styled.div<DisplayProps>`
    ${display}
    width: 100%;
    padding: 8px 6px;
    margin-top: 8px;
    flex-wrap: wrap;
    background-color: #fff;
    border-radius: 4px;
    > div {
        transition: background 0.15s ease-in;
    }
`;

interface Props {
    users: User[];
    show?: boolean;
}

export const GitHubUserList: React.FC<Props> = ({ users, show }) => {
    const watch = useContext(WatchContext);

    return (
        <Wrapper display={show ? "flex" : "none"}>
            {users.map((u) => (
                <GitHubUser key={u.id} name={u.name} id={u.id} profileImageUrl={u.profileImageUrl} />
            ))}
        </Wrapper>
    );
};
