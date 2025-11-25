
import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Events from "../components/Events.jsx";

    test("opens lightbox and navigates images", () => {
        render(<Events />);

            // 1. check thumbnails exist
        const thumbnails = screen.getAllByRole("img");
        expect(thumbnails.length).toBeGreaterThan(0);

        // 2. click the first thumbnail
        fireEvent.click(thumbnails[0]);

        // 3. lightbox should appear
        expect(screen.getByTestId("lightbox")).toBeInTheDocument();

        // 4. Next button goes to next image
        fireEvent.click(screen.getByText("Next"));
        expect(screen.getByTestId("lightbox-image").src)
          .toContain("image2.jpg");

        // 5. Previous button returns to first image
        fireEvent.click(screen.getByText("Prev"));
        expect(screen.getByTestId("lightbox-image").src)
          .toContain("image1.jpg");
});
