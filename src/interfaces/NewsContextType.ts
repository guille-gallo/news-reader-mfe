import StoryDetail from "./StoryDetail";

interface NewsContextType {
    fetchStoryIds: () => Promise<number[]>;
    fetchStoryDetails: (id: number) => Promise<StoryDetail>;
}

export default NewsContextType;