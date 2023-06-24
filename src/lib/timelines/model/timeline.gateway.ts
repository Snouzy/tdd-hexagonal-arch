export interface GetUserTimelineResponse {
  timeline: {
    id: string;
    user: string;
    messages: {
      id: string;
      text: string;
      author: string;
      publishedAt: string;
    }[];
  };
}
        
export interface TimelineGateway {
    getAuthUserTimeline({ userId }: { userId: string}): Promise<GetUserTimelineResponse>;
}