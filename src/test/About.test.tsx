import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import About from "../routes/About";

global.fetch = jest.fn();

describe("About Component", () => {
  const mockUserData = {
    avatar_url: "https://avatars.githubusercontent.com/u/126157630?v=4",
    name: "Anas Mallick",
    bio: "Software Engineer",
    followers: 0,
    public_repos: 22,
    html_url: "https://github.com/anasmallick35",
    repos_url: "https://api.github.com/users/anasmallick35/repos",
  };

  const mockReposData = [
    {
      name: "ai-interview",
      html_url: "https://github.com/anasmallick35/ai-interview",
      description: "Ace your Interview with CrackTogether where you get JobTitle wise Questions and feedback",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", () => {
    render(<About />);
    expect(screen.queryByText(/Error loading GitHub data/i)).toBeNull();
  });

  test("renders error message on fetch failure", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));
    render(<About />);
    await waitFor(() => {
      expect(screen.getByText(/Error loading GitHub data/i)).toBeInTheDocument();
    });
  });

  test("renders repository list correctly", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUserData),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockReposData),
      });
    render(<About />);
    await waitFor(() => {
      expect(screen.getByText(mockReposData[0].name)).toBeInTheDocument();
      expect(screen.getByText(mockReposData[0].description)).toBeInTheDocument();
    });
  });

  test("handles empty repository list", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUserData),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });

    render(<About />);

    await waitFor(() => {
      expect(screen.queryByText(/No repositories found/i)).toBeNull();
    });
  });

  test("handles missing bio", async () => {
    const userDataWithoutBio = { ...mockUserData, bio: "" };
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(userDataWithoutBio),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockReposData),
      });

    render(<About />);

    await waitFor(() => {
      expect(screen.getByText(/No bio available/i)).toBeInTheDocument();
    });
  });
});