import { createAppAsyncThunk } from "@/lib/create-app-thunk";

export const getAuthUserTimeline = createAppAsyncThunk(
  "timelines/getAuthUserTimeline",
  async (_, { extra: { authGateway, timelineGateway } }) => {
    const authUser = authGateway.getAuthUser();
    const { timeline } = await timelineGateway.getAuthUserTimeline({
      userId: authUser,
    });
    return timeline;
  }
);
