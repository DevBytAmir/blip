import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExportPanel from "./ExportPanel";

function TestHarness() {
  const ref = createRef<SVGSVGElement>();
  return (
    <>
      <svg ref={ref} data-testid="avatar-svg" viewBox="0 0 400 400">
        <circle r={10} cx={10} cy={10} />
      </svg>
      <ExportPanel svgRef={ref} />
    </>
  );
}

test("lets the user pick a resolution before downloading a PNG", async () => {
  const user = userEvent.setup();
  render(<TestHarness />);
  await user.selectOptions(screen.getByLabelText(/resolution/i), "1024");
  expect((screen.getByLabelText(/resolution/i) as HTMLSelectElement).value).toBe("1024");
  expect(screen.getByRole("button", { name: /download png/i })).toBeInTheDocument();
});

test("exposes an SVG download button and a copy button", () => {
  render(<TestHarness />);
  expect(screen.getByRole("button", { name: /download svg/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
});
