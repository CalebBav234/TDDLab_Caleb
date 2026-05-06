import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FeatureScreenLayout from "../../../src/shared/components/FeatureScreenLayout";

describe("FeatureScreenLayout", () => {
  it("renders children inside a main element", () => {
    render(
      <FeatureScreenLayout>
        <p>Content</p>
      </FeatureScreenLayout>
    );

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies className when provided", () => {
    render(
      <FeatureScreenLayout className="my-layout">
        <span>Child</span>
      </FeatureScreenLayout>
    );

    const main = screen.getByRole("main");
    expect(main).toHaveClass("my-layout");
  });

  it("renders without className when not provided", () => {
    const { container } = render(
      <FeatureScreenLayout>
        <span>Child</span>
      </FeatureScreenLayout>
    );

    const main = container.querySelector("main");
    expect(main).not.toHaveAttribute("class");
  });
});

