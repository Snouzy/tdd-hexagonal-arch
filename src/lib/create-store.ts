import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import { reducer as timelinesReducer } from "./timelines/reducer";
import { AuthGateway } from "./auth/infra/fake-auth.gateway";
import { TimelineGateway } from "./timelines/model/timeline.gateway";

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

export const createStore = (dependencies: Dependencies) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }),
  });

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>;
