import React, { useCallback, useContext, useMemo } from "react";
import styled from "@emotion/styled";
import { Flex, Image, Icon, Text } from "@chakra-ui/react";
import { display, DisplayProps } from "styled-system";
import { AiFillCheckCircle, AiOutlinePlusCircle } from "react-icons/ai";

import { User, WatchContext } from "../contexts/WatchContext";
import { createWatchUser } from "../apis/watch";

const CardWrapper = styled(Flex)`
    min-width: 33%;
    align-items: center;
    cursor: ${({ exist }) => exist ? "not-allowed" : "pointer"};
    > #add_icon {
        display: none;
    }

    :hover {
        background-color: #eee;

        > #add_icon {
            display: inline-block;
        }
    }
`;

const GitHubUserCard: React.FC<User> = (props) => {
    const watch = useContext(WatchContext);
    const { uid, name, profileImageUrl } = props;
    const exist = useMemo<boolean>(() => {
        return watch.users.map((u) => u.uid).includes(uid);
    }, [uid, watch.users]);

    const handleClick = useCallback(async () => {
        if (exist) {
            return;
        }

        watch.addUser(props);
        try {
            await createWatchUser(props);
            watch.loadUsers();
        } catch (err) {
            console.log(err);
        }
    }, [props, watch]);

    return (
        <CardWrapper px="12px" py="8px" exist={exist} onClick={handleClick}>
            <Image src={profileImageUrl} boxSize="35px" borderRadius="full" />
            <Text ml="12px" flex="1" fontSize="14px" fontFamily="Teko" color="#000">@{name.toUpperCase()}</Text>
            {exist ? <Icon color="#4aa96c" as={AiFillCheckCircle} /> : <Icon id="add_icon" color="#aaa" as={AiOutlinePlusCircle} />}
        </CardWrapper>
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
                <GitHubUserCard key={i} name={u.name} uid={u.uid} profileImageUrl={u.profileImageUrl} />
            ))}
        </Wrapper>
    );
};
