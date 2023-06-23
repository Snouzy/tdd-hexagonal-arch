export interface GetUserTimelineResponse {
    timeline: {
        user: string;
    messages: {
        text: string;
        author: string;
        publishedAt: string;       
    }[];
}
}
        
export interface TimelineGateway {
    getAuthUserTimeline({ userId }: { userId: string}): Promise<GetUserTimelineResponse>;
}