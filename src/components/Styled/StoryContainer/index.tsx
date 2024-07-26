import styled from 'styled-components';

const StoryContainer = styled.div`
  font-family: 'Inter', regular;
  color: rgba(0 0 0 / 100%);

  cursor: pointer;
  max-height: 90px;
  min-height: 90px;
  
  :hover * {
    cursor: pointer;
    color: rgba(255 102 0 / 100%);
  }
  :hover .story-index {
    font-size: 52px;
    padding: 8px 0px;
    color: rgba(255 102 0 / 100%);
  }
  .item {
    display: flex;
  }
  .story-index {
    font-size: 48px;
    width: 90px; 
    padding: 10px 0px;
    color: rgba(255 102 0 / 30%);
  }
`;
export default StoryContainer;

