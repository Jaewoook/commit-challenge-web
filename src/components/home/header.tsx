import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Flex, Icon, IconButton, Input, Heading } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

import { getGitHubUser } from "../../apis/github";

const Container = styled.div`
    width: 100%auto;
    background-color: #30475e;
`;

const Wrapper = styled.div`
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-direction: column;
    padding: 48px 0;
    color: white;

    input {
        color: #000;
        background: #fff;
    }
`;

const SearchIcon = () => <Icon as={AiOutlineSearch} />;

export const Header = () => {
    const [searchValue, setSearchValue] = useState("");
    const [isSearching, setSearching] = useState(false);

    const handleUserIdInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }, []);
    const handleSearchClick = useCallback(async () => {
        if (isSearching) {
            return;
        }

        try {
            setSearching(true);
            const users = await getGitHubUser(searchValue)
        } catch (err) {

        } finally {
            setSearching(false);
        }
    }, [isSearching, searchValue]);
    const handleSearchKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (e.key !== "Enter") {
            return;
        }
        handleSearchClick();
    }, [handleSearchClick]);

    return (
        <Container>
            <Wrapper>
                <Heading>Commit Challenge</Heading>
                <Flex mt="48px" width="100%" flexDirection="row">
                    <Input
                        value={searchValue}
                        onChange={handleUserIdInputChange}
                        onKeyPress={handleSearchKeyPress}
                        placeholder="GitHub 유저 검색" />
                    <IconButton ml="6px"
                        colorScheme="blue"
                        aria-label="search button"
                        icon={<SearchIcon />}
                        onClick={handleSearchClick} />
                </Flex>

            </Wrapper>
        </Container>
    );
};
