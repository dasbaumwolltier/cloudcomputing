import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders tbd", () => {
  render(<App />)
  const linkElement = screen.getByText(/tbd/i)
  expect(linkElement).toBeInTheDocument()
})
