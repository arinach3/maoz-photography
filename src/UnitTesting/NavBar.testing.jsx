import React from 'react';
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/NavBar.jsx";

test("renders navigation links", () => {
    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );
    // expect(screen.getByText("בית")).toBeInTheDocument();
    expect(screen.getByText("אודות")).toBeInTheDocument();
    expect(screen.getByText("צילומי תדמית")).toBeInTheDocument();
    expect(screen.getByText("צור קשר")).toBeInTheDocument();
})