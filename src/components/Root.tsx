import { Container } from "@mui/material";
import React from "react";
import NavBar from "./ui/NavBar";
import { Outlet } from "react-router-dom";

export default function Root(): JSX.Element {
  return (
    <Container maxWidth='xl'>
      <NavBar />
      <Outlet />
    </Container>
  );
}
