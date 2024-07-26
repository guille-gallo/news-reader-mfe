export const API_URLS = {
    storyIds: 'https://hacker-news.firebaseio.com/v0/newstories.json',
    storyDetails: (id: number) => `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
};