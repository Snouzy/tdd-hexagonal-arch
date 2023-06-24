import { createStore } from "@/lib/create-store";
import { describe, it, expect } from "vitest";
import { getAuthUserTimeline } from "../usecases/get-auth-user-timeline.usecase";
import { FakeTimelineGateway } from "../infra/fake-timeline.gateway";
import { FakeAuthGateway } from "@/lib/auth/infra/fake-auth.gateway";
import { selectTimeline } from "../slices/timelines.slice";
import { selectMessage } from "../slices/messages.slice";

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
    await whenRetrievingAuthenticatedTimeline();
    // assert (then)
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

const store = createStore({
  authGateway,
  timelineGateway,
});
function givenAuthenticatedUserIs(user: string) {
  authGateway.authUser = user;
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
  timelineGateway.timelinesByUser.set("Alice", timeline);
}

async function whenRetrievingAuthenticatedTimeline() {
  // dispatch une action spécifique qui represnte notre usecase
  await store.dispatch(getAuthUserTimeline());
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
  const authUserTimeline = selectTimeline(
    expectedTimeline.id,
    store.getState()
  );
  expect(authUserTimeline).toEqual({
    id: expectedTimeline.id,
    user: expectedTimeline.user,
    messages: expectedTimeline.messages.map((m) => m.id),
  });

  expectedTimeline.messages.forEach((msg) => {
    expect(selectMessage(msg.id, store.getState())).toEqual(msg);
  });

  console.log("store.getState():", store.getState());
}
