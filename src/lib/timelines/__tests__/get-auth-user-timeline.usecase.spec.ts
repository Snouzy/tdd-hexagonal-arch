import { AppStore, createStore } from "@/lib/create-store";
import { describe, it, expect } from "vitest";
import { getAuthUserTimeline } from "../usecases/get-auth-user-timeline.usecase";
import { FakeTimelineGateway } from "../infra/fake-timeline.gateway";
import { FakeAuthGateway } from "@/lib/auth/infra/fake-auth.gateway";
import {
  selectIsUserTimelineLoading,
  selectTimeline,
} from "../slices/timelines.slice";
import { selectMessage } from "../slices/messages.slice";
import { stateBuilder } from "@/lib/state-builder";

describe("Feature: Retrieving authenticaed user's timeline", () => {
  it("Example: Alice is authenticated and can see her tiemline", async ({
    expect,
  }) => {
    // arange (given)
    givenAuthenticatedUserIs("Alice");
    givenExistingTimeline({
      id: "alice-timeline-id",
      user: "Alice",
      messages: [
        {
          id: "msg1-id",
          text: "Hello, it's Bob",
          author: "Bob",
          publishedAt: "2023-05-01T12:06:00Z",
        },
        {
          id: "msg2-id",
          text: "Hello, it's Alice",
          author: "Alice",
          publishedAt: "2023-05-01T12:05:00Z",
        },
      ],
    });

    // act (when)
    const timelineRetrieving = whenRetrievingAuthenticatedTimeline();

    // assert (then)
    thenTheTimelineOfUserShouldBeLoading("Alice");
    await timelineRetrieving;

    thenTheReceivedTimelineShouldBe({
      id: "alice-timeline-id",
      user: "Alice",
      messages: [
        {
          id: "msg1-id",
          text: "Hello, it's Bob",
          author: "Bob",
          publishedAt: "2023-05-01T12:06:00Z",
        },
        {
          id: "msg2-id",
          text: "Hello, it's Alice",
          author: "Alice",
          publishedAt: "2023-05-01T12:05:00Z",
        },
      ],
    });
  });
});
const authGateway = new FakeAuthGateway();
const timelineGateway = new FakeTimelineGateway();
let testStateBuilder = stateBuilder();
let store: AppStore;

function givenAuthenticatedUserIs(user: string) {
  authGateway.authUser = user;
  testStateBuilder = testStateBuilder.withAuthUser({ authUser: user });
}

function givenExistingTimeline(timeline: {
  id: string;
  user: string;
  messages: {
    id: string;
    text: string;
    author: string;
    publishedAt: string;
  }[];
}) {
  timelineGateway.timelinesByUser.set(timeline.user, timeline);
}

async function whenRetrievingAuthenticatedTimeline() {
  store = createStore(
    { authGateway, timelineGateway },
    testStateBuilder.build()
  );
  // dispatch une action spécifique qui represnte notre usecase
  await store.dispatch(getAuthUserTimeline());
}

function thenTheTimelineOfUserShouldBeLoading(user: string) {
  const isUserTimelineLoading = selectIsUserTimelineLoading(
    user,
    store.getState()
  );
  expect(isUserTimelineLoading).toBe(true);
}

function thenTheReceivedTimelineShouldBe(expectedTimeline: {
  id: string;
  user: string;
  messages: {
    id: string;
    text: string;
    author: string;
    publishedAt: string;
  }[];
}) {
  // vérifier que notre state a bien la bonne forme
  const expectedState = stateBuilder()
    .withAuthUser({ authUser: expectedTimeline.user })
    .withTimeline({
      id: expectedTimeline.id,
      user: expectedTimeline.user,
      messages: expectedTimeline.messages.map((m) => m.id),
    })
    .withMessages(expectedTimeline.messages)
    .withNotLoadingTimelineOf({ user: expectedTimeline.user })
    .build();

  expect(store.getState()).toEqual(expectedState);
}
