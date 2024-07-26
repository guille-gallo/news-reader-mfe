import { API_URLS } from '../../config';

export const useFetchStory = () => {

  const fetchStoryIds = async () => {
      const response = await fetch(API_URLS.storyIds);
      const data = await response.json();
      return data;
  };

  const fetchStoryDetails = async (id: number) => {
      const response = await fetch(API_URLS.storyDetails(id));
      const data = await response.json();
      return data;
  };

  return {
    fetchStoryIds,
    fetchStoryDetails,
  };
}
