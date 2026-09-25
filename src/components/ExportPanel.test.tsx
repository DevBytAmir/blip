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

test("lets the user pick a preset resolution before downloading a PNG", async () => {
  const user = userEvent.setup();
  render(<TestHarness />);
  await user.selectOptions(screen.getByLabelText(/resolution/i), "1024");
  expect((screen.getByLabelText(/resolution/i) as HTMLSelectElement).value).toBe("1024");
  expect(screen.getByRole("button", { name: /download png/i })).toBeInTheDocument();
});

test("exposes an SVG download button and no image-clipboard-copy button", () => {
  render(<TestHarness />);
  expect(screen.getByRole("button", { name: /download svg/i })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /copy/i })).toBeNull();
});

test("choosing Custom reveals a number input for an exact resolution", async () => {
  const user = userEvent.setup();
  render(<TestHarness />);

  await user.selectOptions(screen.getByLabelText(/resolution/i), "custom");
  const customInput = screen.getByLabelText(/custom resolution/i) as HTMLInputElement;
  await user.clear(customInput);
  await user.type(customInput, "777");

  expect(customInput.value).toBe("777");
});

test("clamps a custom resolution below the minimum up to 64", async () => {
  const user = userEvent.setup();
  render(<TestHarness />);

  await user.selectOptions(screen.getByLabelText(/resolution/i), "custom");
  const customInput = screen.getByLabelText(/custom resolution/i) as HTMLInputElement;
  await user.clear(customInput);
  await user.type(customInput, "0");
  await user.tab();

  expect(customInput.value).toBe("64");
});

test("clamps a custom resolution above the maximum down to 4096", async () => {
  const user = userEvent.setup();
  render(<TestHarness />);

  await user.selectOptions(screen.getByLabelText(/resolution/i), "custom");
  const customInput = screen.getByLabelText(/custom resolution/i) as HTMLInputElement;
  await user.clear(customInput);
  await user.type(customInput, "99999");
  await user.tab();

  expect(customInput.value).toBe("4096");
});

test("when onShare is provided, the Share button sits in the same row as the download buttons", () => {
  const ref = createRef<SVGSVGElement>();
  render(
    <ExportPanel svgRef={ref} onShare={() => {}} shareStatus="idle" />
  );
  const shareButton = screen.getByRole("button", { name: /^share/i });
  const downloadButton = screen.getByRole("button", { name: /download png/i });
  expect(shareButton.parentElement).toBe(downloadButton.parentElement);
});

test("shows a confirmation message when shareStatus is copied", () => {
  const ref = createRef<SVGSVGElement>();
  render(<ExportPanel svgRef={ref} onShare={() => {}} shareStatus="copied" />);
  expect(screen.getByText(/copied/i)).toBeInTheDocument();
});

test("does not render a Share button when onShare is not provided", () => {
  render(<TestHarness />);
  expect(screen.queryByRole("button", { name: /^share/i })).toBeNull();
});
