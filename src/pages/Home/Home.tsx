import { PostList } from "@/components/Postlist";
import { TimelineDivider } from "@/components/TimelineDivider";

export const Home = () => {
    const fakeMessages = [{
        id: "msg1",
        userId: "user1",
        username: "Alice",
        profilePictureUrl: "https://picsum.photos/200?random=user1",
        publishedAt: "5 minutes ago",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    },
    {
        id: "msg2",
        userId: "user2",
        username: "Bob",
        profilePictureUrl: "https://picsum.photos/200?random=user2",
        publishedAt: "17 minutes ago",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    },
    {
        id: "msg3",
        userId: "user3",
        username: "Charles",
        profilePictureUrl: "https://picsum.photos/200?random=user3",
        publishedAt: "1 hours ago",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",

    }
]
  return (
    <>
      <TimelineDivider text="For you" />
      <PostList messages={fakeMessages} />
    </>
  );
};
