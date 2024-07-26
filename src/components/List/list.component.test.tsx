
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListComponent from './list.component.tsx';
import NewsContext from '../../context/news.context.tsx';
import StoryDetail from '../../interfaces/StoryDetail.ts';
import React from 'react';

// Mock IntersectionObserver
class IntersectionObserverMock {
  root = null;
  rootMargin = '';
  thresholds = [];
  disconnect = jest.fn();
  takeRecords = jest.fn();
  observe = jest.fn();
  unobserve = jest.fn();
}
global.IntersectionObserver = IntersectionObserverMock;

describe('ListComponent', () => {
  beforeEach(() => {
    // Clear all mock calls before each test
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    // Mock story details data
    const storyDetailsData: StoryDetail[] = [];
  
      // Mock fetchStoryIds and fetchStoryDetails functions
      const fetchStoryIds = jest.fn().mockResolvedValue([1, 2]);
      const fetchStoryDetails = jest.fn().mockImplementation(async (id) => storyDetailsData.find((story) => story.id === id));
      await act(async () => {
        render(
          <NewsContext.Provider value={{ fetchStoryIds, fetchStoryDetails }}>
            <ListComponent />
          </NewsContext.Provider>
        );
      });
  });

  it('renders header with correct content', async () => {
    // Mock story details data
    const storyDetailsData: StoryDetail[] = [];
  
      // Mock fetchStoryIds and fetchStoryDetails functions
      const fetchStoryIds = jest.fn().mockResolvedValue([1, 2]);
      const fetchStoryDetails = jest.fn().mockImplementation(async (id) => storyDetailsData.find((story) => story.id === id));
      await act(async () => {
        render(
          <NewsContext.Provider value={{ fetchStoryIds, fetchStoryDetails }}>
            <ListComponent />
          </NewsContext.Provider>
        );
      });
    const headerElement = screen.getByText(/Hacker News/i);
    expect(headerElement).toBeInTheDocument();
  });

  it('renders story container when storyDetails is not empty', async () => {
    // Mock story details data
    const storyDetailsData = [
      { id: 1, title: 'Test Story 1', time: Date.now() / 1000, by: 'Test User 1', url: 'http://example.com/story1' }
    ];

    // Mock fetchStoryIds and fetchStoryDetails functions
    const fetchStoryIds = jest.fn().mockResolvedValue([1, 2]);
    const fetchStoryDetails = jest.fn().mockImplementation(async (id) => storyDetailsData.find((story) => story.id === id));

    await act(async () => {
      render(
        <NewsContext.Provider value={{ fetchStoryIds, fetchStoryDetails }}>
          <ListComponent />
        </NewsContext.Provider>
      );
    });

    // Wait for the story container to appear
    await waitFor(() => expect(screen.getByTestId('story-container')).toBeInTheDocument());

    // Assert that story containers are rendered
    const storyContainers = screen.getAllByTestId('story-container');
    expect(storyContainers.length).toBe(1);
  });
});
