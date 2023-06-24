import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "./Provider.tsx";
import { FakeAuthGateway } from "./lib/auth/infra/fake-auth.gateway.ts";
import { FakeTimelineGateway } from "./lib/timelines/infra/fake-timeline.gateway.ts";
import { createStore } from "./lib/create-store.ts";
import { createRouter } from "./router.tsx";

// root composition.
// this is where we put our deps together.

const authGateway = new FakeAuthGateway();
authGateway.authUser = "Alice";

const timelineGateway = new FakeTimelineGateway();
timelineGateway.timelinesByUser.set(authGateway.authUser, {
  id: "alice-timeline-id",
  user: "Alice",
  messages: [
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
  ],
});

const store = createStore({
  authGateway,
  timelineGateway,
});

const router = createRouter({ store });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider router={router} store={store} />
  </React.StrictMode>
);
