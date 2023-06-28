import {
  ActionCreator,
  ActionCreatorWithPayload,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { Timeline, timelinesAdapter } from "./timelines/model/timeline.entity";
import { rootReducer } from "./root-reducer";
import { RootState } from "./create-store";
import { Message, messagesAdapter } from "./timelines/model/message.entity";

const initialState = rootReducer(undefined, createAction(""));

const withTimeline = createAction<Timeline>("withTimeline");
const withLoadingTimelineOf = createAction<{ user: string }>(
  "withLoadingTimelineOf"
);
const withNotLoadingTimelineOf = createAction<{ user: string }>(
  "withNotLoadingTimelineOf"
);

const withAuthUser = createAction<{ authUser: string }>("withAuthUser");

const withMessages = createAction<Message[]>("withMessages");

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(withAuthUser, (state, action) => {
      state.auth.authUser = action.payload.authUser;
    })

    .addCase(withTimeline, (state, action) => {
      timelinesAdapter.addOne(state.timelines.timelines, action.payload);
    })

    .addCase(withLoadingTimelineOf, (state, action) => {
      state.timelines.timelines.loadingTimelineByUser[action.payload.user] =
        true;
    })

    .addCase(withNotLoadingTimelineOf, (state, action) => {
      state.timelines.timelines.loadingTimelineByUser[action.payload.user] =
        false;
    })

    .addCase(withMessages, (state, action) => {
      messagesAdapter.addMany(state.timelines.messages, action.payload);
    });
});

export const stateBuilder = (baseState = initialState) => {
  //   const reduce =
  //     <P>(actionCreator: ActionCreatorWithPayload<P>) =>
  //     (payload: P) =>
  //       stateBuilder(reducer(baseState, actionCreator(payload)));

  return {
    withAuthUser: (authUser: { authUser: string }) => {
      return stateBuilder(reducer(baseState, withAuthUser(authUser)));
    },
    withTimeline(timeline: Timeline) {
      return stateBuilder(reducer(baseState, withTimeline(timeline)));
    },
    withLoadingTimelineOf(user: { user: string }) {
      return stateBuilder(reducer(baseState, withLoadingTimelineOf(user)));
    },
    withMessages(messages: Message[]) {
      return stateBuilder(reducer(baseState, withMessages(messages)));
    },
    withNotLoadingTimelineOf: (user: { user: string }) => {
      return stateBuilder(reducer(baseState, withNotLoadingTimelineOf(user)));
    },
    build(): RootState {
      return baseState;
    },
  };
};
