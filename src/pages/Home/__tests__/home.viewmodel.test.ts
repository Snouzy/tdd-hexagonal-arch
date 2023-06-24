import { createTestStore } from "@/lib/create-store";
import { describe, test, expect } from "vitest";
import { HomeViewModelType, selectHomeViewModel } from "../home.viewmodel";

const getNow = () => "2023-05-17T11:21:00Z";

describe("Home view model", () => {
  test("Example: there is no timeline in the store", () => {
    const store = createTestStore();

    const homeViewModel = selectHomeViewModel(store.getState(), getNow);

    expect(homeViewModel).toEqual({
      timeline: {
        type: HomeViewModelType.NO_TIMELINE,
      },
    });

    expect(true).toBe(true);
  });

  test("Example: there is no messages in the timeline", () => {
    const store = createTestStore(
      {},
      {
        timelines: {
          ids: ["alice-timeline-id"],
          entities: {
            "alice-timeline-id": {
              id: "alice-timeline-id",
              messages: [],
              user: "Alice",
            },
          },
        },
      }
    );
    const homeViewModel = selectHomeViewModel(store.getState(), getNow);

    expect(homeViewModel).toEqual({
      timeline: {
        type: HomeViewModelType.EMPTY_TIMELINE,
        info: "There is no messages yet",
      },
    });
  });

  test("Example: there is one message in the timeline", () => {
    const now = "2023-06-01T12:06:00Z";

    const store = createTestStore(
      {},
      {
        timelines: {
          ids: ["alice-timeline-id"],
          entities: {
            "alice-timeline-id": {
              id: "alice-timeline-id",
              messages: ["msg1-id"],
              user: "Alice",
            },
          },
        },
        messages: {
          ids: ["msg1-id"],
          entities: {
            "msg1-id": {
              id: "msg1-id",
              text: "Hello, it's Bob",
              author: "Bob",
              publishedAt: "2023-05-17T10:55:00Z",
            },
          },
        },
      }
    );
    const homeViewModel = selectHomeViewModel(store.getState(), getNow);

    expect(homeViewModel).toEqual({
      timeline: {
        type: HomeViewModelType.TIMELINE_WITH_MESSAGES,
        messages: [
          {
            id: "msg1-id",
            userId: "Bob",
            username: "Bob",
            profilePictureUrl: "https://picsum.photos/200?random=Bob",
            publishedAt: "26 minutes ago",
            text: "Hello, it's Bob",
          },
        ],
      },
    });
  });

  test("Example: there is multiple messages in the timeline", () => {
    const store = createTestStore(
      {},
      {
        timelines: {
          ids: ["alice-timeline-id"],
          entities: {
            "alice-timeline-id": {
              id: "alice-timeline-id",
              messages: ["msg1-id", "msg2-id"],
              user: "Alice",
            },
          },
        },
        messages: {
          ids: ["msg1-id", "msg2-id", "msg3-id"],
          entities: {
            "msg1-id": {
              id: "msg1-id",
              text: "Hello, it's Bob",
              author: "Bob",
              publishedAt: "2023-05-17T10:55:00Z",
            },
            "msg2-id": {
              id: "msg2-id",
              author: "Alice",
              text: "Hi bob !",
              publishedAt: "2023-05-17T10:59:00Z",
            },
            "msg3-id": {
              id: "msg3-id",
              author: "Charles",
              text: "Charles message !",
              publishedAt: "2023-05-17T11:00:00Z",
            },
          },
        },
      }
    );
    const homeViewModel = selectHomeViewModel(store.getState(), getNow);

    expect(homeViewModel).toEqual({
      timeline: {
        type: HomeViewModelType.TIMELINE_WITH_MESSAGES,
        messages: [
          {
            id: "msg1-id",
            userId: "Bob",
            username: "Bob",
            profilePictureUrl: "https://picsum.photos/200?random=Bob",
            publishedAt: "26 minutes ago",
            text: "Hello, it's Bob",
          },
          {
            id: "msg2-id",
            userId: "Alice",
            username: "Alice",
            profilePictureUrl: "https://picsum.photos/200?random=Alice",
            text: "Hi bob !",
            publishedAt: "22 minutes ago",
          },
        ],
      },
    });
  });
});
