import { PostList } from "@/components/PostList";
import { TimelineDivider } from "@/components/TimelineDivider";
import { RootState } from "@/lib/create-store";
import { Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { HomeViewModelType, selectHomeViewModel } from "./home.viewmodel";
import { exhaustiveGuard } from "@/lib/commons/utils/exhaustive-guard";

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
        return <Text>{viewModel.timeline.info}</Text>;

      case HomeViewModelType.TIMELINE_WITH_MESSAGES:
        const messages = viewModel.timeline.messages;
        return <PostList messages={viewModel.timeline.messages} />;

      case HomeViewModelType.LOADING_TIMELINE:
        return <Text>{viewModel.timeline.info}</Text>;

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
