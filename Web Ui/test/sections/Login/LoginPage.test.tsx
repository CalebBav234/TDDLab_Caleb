import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Login from "../../../src/sections/Login/LoginPage";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn((_, func) => {
    func(null);
    return jest.fn();
  }),
}));

jest.mock("../../../src/firebaseConfig", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../src/modules/User-Authentication/domain/authStates", () => ({
  useGlobalState: jest.fn(() => [{ userEmail: "" }, jest.fn()]),
}));

jest.mock(
  "../../../src/modules/User-Authentication/application/signInWithGithub",
  () => ({ handleSignInWithGitHub: jest.fn() })
);

jest.mock(
  "../../../src/modules/User-Authentication/application/signInWithGoogle",
  () => ({ handleSignInWithGoogle: jest.fn() })
);

jest.mock(
  "../../../src/modules/User-Authentication/application/checkIfUserHasAccount",
  () => ({
    CheckIfUserHasAccount: jest.fn().mockImplementation(() => ({
      userHasAnAccountWithToken: jest.fn().mockResolvedValue(null),
      userHasAnAccountWithGoogleToken: jest.fn().mockResolvedValue(null),
    })),
  })
);

jest.mock(
  "../../../src/modules/User-Authentication/application/setCookieAndGlobalStateForValidUser",
  () => ({ setCookieAndGlobalStateForValidUser: jest.fn() })
);

describe("LoginPage", () => {
  it("renders the TDDLab header", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /tddlab/i })).toBeInTheDocument();
  });

  it("renders the GitHub login button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /accede con github/i })).toBeInTheDocument();
  });

  it("renders the Google login button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /accede con google/i })).toBeInTheDocument();
  });

  it("renders welcome message", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText(/bienvenido a tddlab/i)).toBeInTheDocument();
  });
});

