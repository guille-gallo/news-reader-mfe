import NewsContext from '../../context/news.context';
import React, { useContext, useEffect, useState } from 'react';
import Container from '../Styled/Container/index';
import StoryContainer from '../Styled/StoryContainer/index';
import Header from '../Styled/Header/index';
import StoryIndex from '../Styled/StoryIndex/index';
import StoryDetails from '../Styled/StoryDetails/index';
import StoryTitle from '../Styled/StoryTitle/index';
import StoryMeta from '../Styled/StoryMeta/index';
import StoryMetaItem from '../Styled/StoryMetaItem/index';
import LoadingContainer from '../Styled/LoadingContainer/index';
import LoadingBarTitle from '../Styled/LoadingBarTitle/index';
import LoadingBarMeta from '../Styled/LoadingBarMeta/index';
import StoryDetail from '../../interfaces/StoryDetail';
import NewsContextType from '../../interfaces/NewsContextType';

export default function ListComponent () {
    const BATCH_SIZE = 10;

    const newsContext = useContext(NewsContext) as NewsContextType;

    const [storyIds, setStoryIds] = useState<number[]>([]);
    const [storyDetails, setStoryDetails] = useState<StoryDetail[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const updateStoryDetails = async (id: number) => {
        const details = await newsContext.fetchStoryDetails(id);
        setStoryDetails(prevDetails => [...prevDetails, details]);
    };

    const fetchNextBatch = async () => {
        if (isLoading) return;
    
        setIsLoading(true);
        const nextBatch = storyIds.slice(currentIndex, currentIndex + BATCH_SIZE);
        await Promise.all(nextBatch.map(id => updateStoryDetails(id)));
        setCurrentIndex(prevIndex => prevIndex + BATCH_SIZE);
        setIsLoading(false);
    };
      
    useEffect(() => {
        (async () => {
            const storyIds = await newsContext.fetchStoryIds();
            setStoryIds(storyIds);
            await fetchNextBatch();
        })();
    }, [newsContext]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && !isLoading) {
            fetchNextBatch();
          }
        }, { threshold: 1 });
    
        const target = document.querySelector('#end-of-list');
        if (target) {
          observer.observe(target);
        }
    
        return () => {
          if (target) {
            observer.unobserve(target);
          }
        };
      }, [storyIds, currentIndex, isLoading]);

    const getStoryTime = (time: number) => {
      const storyDate = new Date(time * 1000);
      const currentDate = new Date();
      const diffInSeconds = Math.abs(currentDate.getTime() - storyDate.getTime()) / 1000;

      const days = Math.floor(diffInSeconds / 86400);
      const hours = Math.floor(diffInSeconds / 3600) % 24;
      const minutes = Math.floor(diffInSeconds / 60) % 60;

      if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago `;
      if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago `;
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago `;
    };

    return (
      <>
        <Header><div className="content">News Reader</div></Header>
        <Container data-testid="story-container">
          {storyDetails?.sort((a, b) => b.time - a.time).map((story, index) => (
            <StoryContainer key={story?.id || index}>
              <div className="item" onClick={() => story?.url && window.open(story.url, '_blank')}>
                <StoryIndex>{index + 1}</StoryIndex>
                <StoryDetails>
                  <StoryTitle>{story?.title}</StoryTitle>
                  <StoryMeta>
                    <StoryMetaItem>{getStoryTime(story?.time)}</StoryMetaItem>
                    <StoryMetaItem> by {story?.by}</StoryMetaItem>
                  </StoryMeta>
                </StoryDetails>
              </div>
            </StoryContainer>
          ))}
          {isLoading &&
            <StoryContainer>
              <LoadingContainer>
                <StoryIndex>{'00'}</StoryIndex>
                <div className="loading-bar">
                  <LoadingBarTitle />
                  <LoadingBarMeta />
                </div>
              </LoadingContainer>
            </StoryContainer>
          }
          <div id="end-of-list"></div>
        </Container>
      </>
    );
}
