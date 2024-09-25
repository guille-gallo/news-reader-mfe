import styled from 'styled-components';

const StoryIndex = styled.div`
  font-size: 48px;
  min-width: 58px;
  padding: 10px 0px;
  color: rgba(255 102 0 / 30%);
  margin-right: 12px;

  @media (max-width: 768px) {
    padding: 10px 0px 10px 32px;
  }

  @media (max-width: 576px) {
    padding: 10px 0px 10px 16px;
    margin-right: 0;
  }

  :hover * {
    cursor: pointer;
    color: rgba(255 102 0 / 100%);
  }

  :hover .story-index {
    font-size: 52px;
    padding: 8px 0px;
    color: rgba(255 102 0 / 100%);
  }

`;
export default StoryIndex;