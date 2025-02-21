import axios from "axios";
import { WebzService } from "../webzService";

jest.mock("axios");
jest.mock("../../config/dbConnection", () => ({
  pool: {
    query: jest.fn(), // Mock pool.query
  },
}));

describe("WebzService", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("fetchAndStorePosts", () => {
    test("should fetch and store posts without making actual network calls", async () => {
      // Mock axios.get to return a predefined response
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: {
          posts: [
            {
              title: "Test Post 1",
              text: "This is a test post",
              language: "en",
              author: "Test Author",
              sentiment: "positive",
            },
          ],
          totalResults: 1,
          moreResultsAvailable:0
        },
      });

      // Define a mock callback function
      const mockCallback = jest.fn();

      // Call the method under test
      await WebzService.fetchAndStorePosts(mockCallback);

      // Assertions
      expect(axios.get as jest.Mock).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith({
        retrievedCount: 1,
        remainingCount: 0,
      });
    });
    

    test("should handle a network error in the catch block", async () => {
      // Mock axios.get to throw an error
      (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

      // Define a mock callback function
      const mockCallback = jest.fn();

      // Call the method under test
      try {
        await WebzService.fetchAndStorePosts(mockCallback);
      } catch (error:unknown) {
        // Assertions for error handling
        expect(axios.get as jest.Mock).toHaveBeenCalledTimes(1);
        expect(error).toBeInstanceOf(Error);
        expect(error instanceof Error ? error.message : String(error)).toBe("Network Error");
      }
    });

  });
});
