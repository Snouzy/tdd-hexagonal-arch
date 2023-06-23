import { createAppAsyncThunk } from "@/lib/create-app-thunk";
import { timelineGateway } from "../infra/fake-timeline.gateway";
import { authGateway } from "@/lib/auth/infra/fake-auth.gateway";

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
