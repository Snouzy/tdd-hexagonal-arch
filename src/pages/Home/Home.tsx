import { PostList } from "@/components/PostList";
import { TimelineDivider } from "@/components/TimelineDivider";
import { RootState } from "@/lib/create-store";
import { Text, PropsOf } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { HomeViewModelType, selectHomeViewModel } from "./home.viewmodel";
import { exhaustiveGuard } from "@/lib/commons/utils/exhaustive-guard";

const fakeMessages: PropsOf<typeof PostList>["messages"] = [
  {
    id: "msg1",
    userId: "user1",
    username: "Alice",
    profilePictureUrl: "https://picsum.photos/200?random=user1",
    publishedAt: "5 minutes ago",
    text: "Hi everyone ! I'm Alice and I have also many things to say !",
  },
  {
    id: "msg2",
    userId: "user2",
    username: "Bob",
    profilePictureUrl: "https://picsum.photos/200?random=user2",
    publishedAt: "17 minutes ago",
    text: "Hey there ! I'm Bob and I have many things to say hehe !",
  },
  {
    id: "msg3",
    userId: "user3",
    username: "Charles",
    profilePictureUrl: "https://picsum.photos/200?random=user3",
    publishedAt: "1 hour ago",
    text: "What's up here ?",
  },
];

export const Home = () => {
  const viewModel = useSelector<
    RootState,
    ReturnType<typeof selectHomeViewModel>
  >((rootState) =>
    selectHomeViewModel(rootState, () => new Date().toISOString())
  );

  const timelineNode: React.ReactNode = (() => {
    switch (viewModel.timeline.type) {
      case HomeViewModelType.NO_TIMELINE:
        return <TimelineDivider text="No timeline" />;

      case HomeViewModelType.EMPTY_TIMELINE:
        return <Text></Text>;

      case HomeViewModelType.TIMELINE_WITH_MESSAGES:
        const messages = viewModel.timeline.messages;
        return <PostList messages={viewModel.timeline.messages} />;

      default:
        return exhaustiveGuard(viewModel.timeline);
    }
  })();

  return (
    <>
      <TimelineDivider text="For you" />
      {timelineNode}
    </>
  );
};
