import { RootState } from "@/lib/create-store";
import { selectMessages } from "@/lib/timelines/slices/messages.slice";
import { selectTimeline } from "@/lib/timelines/slices/timelines.slice";
import { format as timeAgo } from "timeago.js";

export enum HomeViewModelType {
  NO_TIMELINE = "NO_TIMELINE",
  EMPTY_TIMELINE = "EMPTY_TIMELINE",
  TIMELINE_WITH_MESSAGES = "TIMELINE_WITH_MESSAGES",
}

export type TimelineType =
  | {
      type: HomeViewModelType.NO_TIMELINE;
    }
  | {
      type: HomeViewModelType.EMPTY_TIMELINE;
      info: string;
    }
  | {
      type: HomeViewModelType.TIMELINE_WITH_MESSAGES;
      messages: {
        id: string;
        userId: string;
        username: string;
        profilePictureUrl: string;
        publishedAt: string;
        text: string;
      }[];
    };

export const selectHomeViewModel = (
  rootState: RootState,
  getNow: () => string
): { timeline: TimelineType } => {
  const now = getNow();
  const timeline = selectTimeline("alice-timeline-id", rootState);

  if (!timeline) {
    return {
      timeline: {
        type: HomeViewModelType.NO_TIMELINE,
      },
    };
  }

  if (timeline.messages.length === 0) {
    return {
      timeline: {
        type: HomeViewModelType.EMPTY_TIMELINE,
        info: "There is no messages yet",
      },
    };
  }

  const messages = selectMessages(timeline.messages, rootState).map((msg) => ({
    id: msg.id,
    userId: msg.author,
    username: msg.author,
    profilePictureUrl: `https://picsum.photos/200?random=${msg.author}`,
    publishedAt: timeAgo(msg.publishedAt, "", { relativeDate: now }),
    text: msg.text,
  }));

  return {
    timeline: {
      type: HomeViewModelType.TIMELINE_WITH_MESSAGES,
      messages,
    },
  };
};
