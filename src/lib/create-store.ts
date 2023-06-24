import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import { reducer as timelinesReducer } from "./timelines/reducer";
import { AuthGateway, FakeAuthGateway } from "./auth/infra/fake-auth.gateway";
import { TimelineGateway } from "./timelines/model/timeline.gateway";
import { FakeTimelineGateway } from "./timelines/infra/fake-timeline.gateway";

// export const store = configureStore({
//     reducer: timelineSlice.reducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//         thunk: {
//             extraArgument: {
//                 timelineGateway: ""
//             }
//         }
//     })
// })

export interface Dependencies {
  authGateway: AuthGateway;
  timelineGateway: TimelineGateway;
}

const rootReducer = timelinesReducer;

export const createStore = (
  dependencies: Dependencies,
  preloadedState?: Partial<ReturnType<typeof rootReducer>>
) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }),
    preloadedState,
  });

export const createTestStore = (
  {
    authGateway = new FakeAuthGateway(),
    timelineGateway = new FakeTimelineGateway(),
  }: Partial<Dependencies> = {},
  preloadedState?: Partial<ReturnType<typeof rootReducer>>
) =>
  createStore(
    {
      authGateway,
      timelineGateway,
    },
    preloadedState
  );

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>;
