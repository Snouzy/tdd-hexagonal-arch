import { createTestStore } from "@/lib/create-store";
import { describe, test, expect } from "vitest";
import { HomeViewModelType, selectHomeViewModel } from "../home.viewmodel";
import { stateBuilder } from "@/lib/state-builder";

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
    const initialState = stateBuilder()
      .withTimeline({
        id: "alice-timeline-id",
        messages: [],
        user: "Alice",
      })
      .build();

    const store = createTestStore({}, initialState);
    const homeViewModel = selectHomeViewModel(store.getState(), getNow);

    expect(homeViewModel).toEqual({
      timeline: {
        type: HomeViewModelType.EMPTY_TIMELINE,
        info: "There is no messages yet",
      },
    });
  });

  test("Example: The timeline is loading", () => {
    const initialState = stateBuilder()
      .withLoadingTimelineOf({ user: "Alice" })
      .build();
    const store = createTestStore({}, initialState);
    const homeViewModel = selectHomeViewModel(store.getState(), getNow);

    expect(homeViewModel).toEqual({
      timeline: {
        type: HomeViewModelType.LOADING_TIMELINE,
        info: "Loading",
      },
    });
  });

  test("Example: there is one message in the timeline", () => {
    const now = "2023-06-01T12:06:00Z";

    const initialState = stateBuilder()
      .withTimeline({
        id: "alice-timeline-id",
        user: "Alice",
        messages: ["msg1-id"],
      })
      .withMessages([
        {
          id: "msg1-id",
          text: "Hello, it's Bob",
          author: "Bob",
          publishedAt: "2023-05-17T10:55:00Z",
        },
      ])
      .build();
    const store = createTestStore({}, initialState);
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
    const initialState = stateBuilder()
      .withTimeline({
        id: "alice-timeline-id",
        user: "Alice",
        messages: ["msg1-id", "msg2-id"],
      })
      .withMessages([
        {
          id: "msg1-id",
          text: "Hello, it's Bob",
          author: "Bob",
          publishedAt: "2023-05-17T10:55:00Z",
        },
        {
          id: "msg2-id",
          author: "Alice",
          text: "Hi bob !",
          publishedAt: "2023-05-17T10:59:00Z",
        },
        {
          id: "msg3-id",
          author: "Charles",
          text: "Charles message !",
          publishedAt: "2023-05-17T11:00:00Z",
        },
      ])
      .build();

    const store = createTestStore({}, initialState);
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
