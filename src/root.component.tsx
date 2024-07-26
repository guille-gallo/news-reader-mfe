import { useFetchStory } from './hooks/useFetchStory'
import NewsContext from './context/news.context'
import ListComponent from './components/List/list.component' 

export default function Root(props) {


    const { fetchStoryIds, fetchStoryDetails } = useFetchStory(); 
  
    return (
      <NewsContext.Provider value={{fetchStoryIds, fetchStoryDetails}}>
        <ListComponent />
      </NewsContext.Provider>
    )
  
  
  //return <section>Hey! {props.name} is mounted!</section>;
}
