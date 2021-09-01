import styled from 'styled-components';

export const StyledContainer = styled.div`
  align-items: center;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  padding: 50px 0;
  width: 100%;
  background: '#111',
  position: 'relative'
`;

export const OverlayStyledContainer = styled.div`
  position: 'absolute',
  height: 'inherit',
  width: 'inherit',
  display: 'flex'
`;

export const PrevStory = styled.div``;
export const NextStory = styled.div``;

export const StoriesSeenContainer = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
`;

export const SeenText = styled.span`
  color: #fff;
  font-size: 10px;
  font-weight: 300;
  line-height: 12px;
`;
