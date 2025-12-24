import { render, screen, fireEvent } from "@testing-library/react";
import Events from "../components/Events";

test("opens lightbox and navigates images", () => {
  render(<Events />);

  // 1. thumbnails exist
  const thumbButtons = screen.getAllByRole("button");
  expect(thumbButtons.length).toBeGreaterThan(0);

  // 2. click first thumbnail
  fireEvent.click(thumbButtons[0]);

  // 3. lightbox appears
  const lightbox = screen.getByTestId("lightbox");
  expect(lightbox).toBeInTheDocument();

  // 4. image inside lightbox
  const lightboxImage = screen.getByTestId("lightbox-image");
  expect(lightboxImage.src).toContain("events1.jpg");

  // 5. go next
  fireEvent.click(screen.getByLabelText("Next"));
  expect(lightboxImage.src).toContain("events2.jpg");

  // 6. go previous
  fireEvent.click(screen.getByLabelText("Previous"));
  expect(lightboxImage.src).toContain("events1.jpg");
});
