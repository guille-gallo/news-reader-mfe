import styled from 'styled-components';

const StoryDetails = styled.div`
  padding: 20px 16px 16px 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: 576px) { 
    width: 342px;
  }
    
`;

export default StoryDetails;