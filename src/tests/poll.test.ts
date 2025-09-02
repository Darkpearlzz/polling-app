import { createPoll as createPollLogic, PollData } from "../lib/pollService";
import { NextRequest, NextResponse } from "next/server";
import { POST as handlePolls } from "../app/polls/route";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

jest.mock("firebase/firestore");
jest.mock("firebase/auth");

const mockAddDoc = addDoc as jest.Mock;
mockAddDoc.mockResolvedValue({
  id: "mock-poll-id",
});

const mockCollection = collection as jest.Mock;
mockCollection.mockReturnValue({});

const mockGetAuth = getAuth as jest.Mock;
mockGetAuth.mockReturnValue({
  currentUser: {
    uid: "test-user-id",
  },
});

process.env.NEXT_PUBLIC_FIREBASE_CONFIG = JSON.stringify({
  apiKey: "mock-key",
  authDomain: "mock-domain",
  projectId: "mock-project",
});

const validPollData: PollData = {
  title: "Favorite Programming Language?",
  options: ["JavaScript", "Python", "Rust", "Go"],
};

const invalidPollData = {
  title: "",
  options: ["A", "B"],
};

describe("Poll Creation", () => {
  test("should successfully create a poll with valid data", async () => {
    const userId = "test-user-id";
    const result = await createPollLogic(validPollData, userId);

    expect(mockAddDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        title: validPollData.title,
        options: expect.arrayContaining(
          validPollData.options.map((option: string) => ({
            text: option,
            votes: 0,
          }))
        ),
        userId: userId,
        createdAt: expect.any(Date),
      })
    );

    expect(result).toEqual(
      expect.objectContaining({
        id: "mock-poll-id",
        ...validPollData,
      })
    );
  });

  test("should throw an error with invalid data", async () => {
    const userId = "test-user-id";
    await expect(
      createPollLogic(invalidPollData as any, userId)
    ).rejects.toThrow();
  });

  test("should handle a POST request and return a 201 status with the new poll", async () => {
    const mockRequest = new NextRequest("http://localhost:3000/polls", {
      method: "POST",
      body: JSON.stringify(validPollData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await handlePolls(mockRequest);

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.id).toBe("mock-poll-id");
    expect(data.title).toBe(validPollData.title);
  });
});
