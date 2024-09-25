import NewsContext from '../../context/news.context.tsx';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Container from '../Styled/Container/index.tsx';
import StoryContainer from '../Styled/StoryContainer/index.tsx';
import Header from '../Styled/Header/index.tsx';
import StoryIndex from '../Styled/StoryIndex/index.tsx';
import StoryDetails from '../Styled/StoryDetails/index.tsx';
import StoryTitle from '../Styled/StoryTitle/index.tsx';
import StoryMeta from '../Styled/StoryMeta/index.tsx';
import StoryMetaItem from '../Styled/StoryMetaItem/index.tsx';
import LoadingContainer from '../Styled/LoadingContainer/index.tsx';
import LoadingBarTitle from '../Styled/LoadingBarTitle/index.tsx';
import LoadingBarMeta from '../Styled/LoadingBarMeta/index.tsx';
import StoryDetail from '../../interfaces/StoryDetail.ts';
import NewsContextType from '../../interfaces/NewsContextType.ts';

export default function ListComponent () {
    const BATCH_SIZE = 10;

    const newsContext = useContext(NewsContext) as NewsContextType;

    const [storyIds, setStoryIds] = useState<number[]>([]);
    const [storyDetails, setStoryDetails] = useState<StoryDetail[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [authorFilter, setAuthorFilter] = useState<string>('');
    const [titleFilter, setTitleFilter] = useState<string>('');
    const [bookmarkedStories, setBookmarkedStories] = useState<number[]>([]);

    const updateStoryDetails = useCallback(async (id: number) => {
        const details = await newsContext.fetchStoryDetails(id);
        setStoryDetails(prevDetails => [...prevDetails, details]);
    }, [newsContext]);

    const fetchNextBatch = useCallback(async () => {
        if (isLoading) return;
    
        setIsLoading(true);
        //console.log(' storyIds ', storyIds)
        //console.log(' currentIndex + BATCH_SIZE ', (currentIndex + BATCH_SIZE))
        const nextBatch = storyIds.slice(currentIndex, currentIndex + BATCH_SIZE);
   
        await Promise.all(nextBatch.map(id => updateStoryDetails(id)));
        setCurrentIndex(prevIndex => prevIndex + BATCH_SIZE);
        setIsLoading(false);
    }, [isLoading, currentIndex, storyIds, updateStoryDetails]);
      
    useEffect(() => {
        (async () => {
            const storyIds = await newsContext.fetchStoryIds();
            //console.log(' storyIds ', storyIds)
            setStoryIds(storyIds);
            await fetchNextBatch();
        })();
    }, [newsContext]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
          // Check if authorFilter or titleFilter is empty before fetching the next batch of stories:
          if (entries[0].isIntersecting && !isLoading && authorFilter === '' && titleFilter === '') {
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
      }, [storyIds, currentIndex, isLoading, authorFilter]);

    const getStoryTime = useCallback((time: number) => {
      const storyDate = new Date(time * 1000);
      const currentDate = new Date();
      const diffInSeconds = Math.abs(currentDate.getTime() - storyDate.getTime()) / 1000;

      //86400 is the number of seconds in a day (24 hours/day * 60 minutes/hour * 60 seconds/minute = 86400 seconds/day).
      //Dividing diffInSeconds by 86400 converts the total seconds into days.
      //Math.floor() is used to round down to the nearest whole number, giving the number of complete days.
      const days = Math.floor(diffInSeconds / 86400); 

      //This line calculates the number of hours that have passed, excluding complete days.
      //3600 is the number of seconds in an hour (60 minutes/hour * 60 seconds/minute = 3600 seconds/hour).
      //Dividing diffInSeconds by 3600 converts the total seconds into hours.
      //% 24 (modulus operation) is used to get the remainder when the total hours are divided by 24. 
      //This gives the hours remaining after accounting for complete days.
      const hours = Math.floor(diffInSeconds / 3600) % 24;

      //Dividing diffInSeconds by 60 converts the total seconds into minutes.
      //% 60 (modulus operation) is used to get the remainder when the total minutes are divided by 60. 
      //This gives the minutes remaining after accounting for complete hours.
      const minutes = Math.floor(diffInSeconds / 60) % 60;

      if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago `;
      if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago `;
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago `;
    }, []);

    const handleAuthorFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAuthorFilter(e.target.value);
    };

    const handleTitleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitleFilter(e.target.value);
    };

    const handleBookmarkedStory = (id: number) => {
      console.log('Bookmarking story with id:', id)
      setBookmarkedStories(prevBookmarkedStories => [...prevBookmarkedStories, id]);
    };

    const filteredStories = useMemo(() => storyDetails
    .filter(story => story.by.toLowerCase().includes((authorFilter.toLocaleLowerCase())))
    .filter(story => story.title.toLowerCase().includes(titleFilter.toLocaleLowerCase()))
    .sort((a, b) => b.time - a.time),
    [storyDetails, authorFilter, titleFilter]);

    //TODO: Add section for bookmarked stories.
    //TODO: Add clear filters buttons.



/*
To implement React.memo and useCallback in your component, you would wrap the components that are being re-rendered unnecessarily with React.memo. This will make sure that the component is not re-rendered unless its props have changed.
For the functions that are passed as props, you would wrap them with useCallback. This will return a memoized version of the function that only changes if one of the dependencies has changed.
For expensive calculations, you can use useMemo which will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.

Both useCallback and useMemo are used for memoization, but they are used in slightly different scenarios:
  useCallback is used to memoize functions. This is useful when you have a function that you pass as a prop to a child component, and you don't want that function to be recreated every time your component re-renders. By using useCallback, you ensure that the function is only recreated if its dependencies change.
  useMemo, on the other hand, is used to memoize any expensive computations. This is useful when you have a computation that relies on the component's props or state, and you don't want to perform that computation on every render. By using useMemo, you ensure that the computation is only performed if its dependencies change.
So, it's not accurate to say that useCallback is only for functions and useMemo is only for props. Rather, useCallback is for memoizing functions (which can be passed as props), and useMemo is for memoizing expensive computations (which can depend on props or state).
*/
    return (
      <>
        <Header><div className="content">Tech News Reader</div></Header>
        {/* TODO: move to component: */}
        <div className='filters' style={{textAlign: 'center', padding:'14px 0px 14px 0px' , boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <input
              type="text"
              placeholder='Filter by author'
              value={authorFilter}
              onChange={handleAuthorFilterChange}
            />
            <input
              type="text"
              placeholder='Filter by title'
              value={titleFilter}
              onChange={handleTitleFilterChange}
            />
          </div>
        <Container data-testid="story-container">
          {filteredStories.map((story, index) => (
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
              {/* <div style={{textAlign: 'right', position: 'relative'}}>
                <button key={story?.id || index} onClick={() => handleBookmarkedStory(story?.id)}>Bookmark</button>
              </div> */}
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
