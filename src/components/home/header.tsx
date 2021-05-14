import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Flex, Icon, IconButton, Input, Heading, Spinner } from "@chakra-ui/react";
import { AiOutlineSearch, AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

import { getGitHubUser } from "../../apis/github";
import { User } from "../../contexts/WatchContext";
import { GitHubUserList } from "../GitHubUserList";

const Container = styled.div`
    width: 100%auto;
    background-color: #30475e;
`;

const Wrapper = styled(Flex)`
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-direction: column;
    padding-top: 48px;
    padding-bottom: 48px;
    color: white;

    input {
        color: #000;
        background: #fff;
    }
`;

const SearchIcon = () => <Icon as={AiOutlineSearch} />;
const CaretUpIcon = () => <Icon as={AiFillCaretUp} />;
const CaretDownIcon = () => <Icon as={AiFillCaretDown} />;

export const Header = () => {
    const [searchValue, setSearchValue] = useState("");
    const [isSearching, setSearching] = useState(false);
    const [searchResult, setSearchResult] = useState<User[]>([]);
    const [isResultShowing, setResultShowing] = useState(true);

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
            const ghUsers: User[] = users.map((u) => {
                return {
                    uid: u.id,
                    name: u.login,
                    profileImageUrl: u.avatar_url,
                }
            }).slice(0, 15);
            setSearchResult(ghUsers);
        } catch (err) {
            console.log(err);
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
    const toggleResultShowing = useCallback(() => {
        setResultShowing(!isResultShowing);
    }, [isResultShowing]);

    return (
        <Container>
            <Wrapper px={["24px", "24px", 0]}>
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
                {isSearching ? <Spinner mt="16px" /> : null}
                <GitHubUserList users={searchResult} show={!isSearching && isResultShowing && !!searchResult.length} />
                {searchResult.length ? (
                    <IconButton
                        colorScheme="transparent"
                        mb="-40px" size="xs" variant="ghost"
                        icon={isResultShowing ? <CaretUpIcon /> : <CaretDownIcon />}
                        aria-label="show / hide"
                        onClick={toggleResultShowing} />
                ) : null}
            </Wrapper>
        </Container>
    );
};
