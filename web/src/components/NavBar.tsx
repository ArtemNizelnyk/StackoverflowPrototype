import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React, { Component } from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

export interface INavBarProps {}
export interface INavBarState {}

export const NavBar: React.FC<INavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause:isServer(),
  });
  const [{fetching:logoutFetching},logout] = useLogoutMutation();
  let body = null;

  console.log("data", data);

  //data is loadding
  if (fetching) {
    //user not logged in
  } else if (!data?.me) {
    console.log(data?.me);
    body = (
      <>
        <NextLink href="login">
          <Link color="white" mr={2}>
            login
          </Link>
        </NextLink>

        <NextLink href="/register">
          <Link color="brown">register</Link>
        </NextLink>
      </>
    );
  } else {
    console.log(data.me);
    body = (
      <Box>
        <Box> {data.me?.username}</Box>
        <Button 
        onClick= {()=> {
          logout();
        }}
        isLoading={logoutFetching}
        variant="link">logout</Button>
      </Box>
    );
  }
  return (
    <Flex bg="tan" p={4}>
      {}
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
