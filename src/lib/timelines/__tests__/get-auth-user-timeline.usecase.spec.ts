import { createStore } from "@/lib/create-store";
import { describe, it, expect } from "vitest";
import { getAuthUserTimeline } from "../usecases/get-auth-user-timeline.usecase";
import { FakeTimelineGateway } from "../infra/fake-timeline.gateway";
import { FakeAuthGateway } from "@/lib/auth/infra/fake-auth.gateway";

describe("Feature: Retrieving authenticaed user's timeline", () => {
  it("Example: Alice is authenticated and can see her tiemline", async ({
    expect,
  }) => {
    // arange (given)
    givenAuthenticatedUserIs("Alice");
    givenExistingTimeline({
      user: "Alice",
      messages: [
        {
          text: "Hello, it's Bob",
          author: "Bob",
          publishedAt: "2023-05-01T12:06:00Z",
        },
        {
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
      user: "Alice",
      messages: [
        {
          text: "Hello, it's Bob",
          author: "Bob",
          publishedAt: "2023-05-01T12:06:00Z",
        },
        {
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
  user: string;
  messages: {
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
  user: string;
  messages: {
    text: string;
    author: string;
    publishedAt: string;
  }[];
}) {
  // vérifier que notre state a bien la bonne forme
  const authUserTimeline = store.getState();
  expect(authUserTimeline).toEqual(expectedTimeline);
}
