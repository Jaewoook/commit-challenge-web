import React, { useCallback, useContext, useMemo } from "react";
import styled from "@emotion/styled";
import { Flex, Image, Icon, Text } from "@chakra-ui/react";
import { display, DisplayProps } from "styled-system";
import { AiFillCheckCircle } from "react-icons/ai";

import { User, WatchContext } from "../contexts/WatchContext";

const GitHubUserCard: React.FC<User> = (props) => {
    const watch = useContext(WatchContext);
    const { id, name, profileImageUrl } = props;
    const exist = useMemo(() => {
        console.log(watch.users?.map((u) => u.id));
        return watch.users?.map((u) => u.id).includes(id);
    }, [id, watch.users]);

    const handleClick = useCallback(() => {
        watch.addUser(props);
    }, [props, watch]);

    return (
        <Flex minWidth="33%" alignItems="center" px="12px" py="8px" cursor="pointer" _hover={{ backgroundColor: "#eee" }} onClick={handleClick}>
            <Image src={profileImageUrl} boxSize="35px" borderRadius="full" />
            <Text ml="12px" flex="1" fontSize="14px" fontFamily="Teko" color="#000">@{name.toUpperCase()}</Text>
            {exist ? <Icon color="#4aa96c" as={AiFillCheckCircle} /> : null}
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
    return (
        <Wrapper display={show ? "flex" : "none"}>
            {users.map((u, i) => (
                <GitHubUserCard key={i} name={u.name} id={u.id} profileImageUrl={u.profileImageUrl} />
            ))}
        </Wrapper>
    );
};
