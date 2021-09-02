/** @jsx jsx */
import { jsx } from '@emotion/core';
import Emoji from 'a11y-react-emoji';
import Carousel from 'react-multi-carousel';
import { WORKER_URL } from '@/utils/constants';
import 'react-multi-carousel/lib/styles.css';
import {
  HighlightCarouselItemCanvas, HighlightCarouselItemCaptionDiv, HighlightCarouselItemContentDiv, HighlightCarouselItemImageContentDiv, HighlightCarouselItemImageWrapperDiv, HighlightCarouselItemImg, HighlightCarouselItemWrapperDiv, HighlightContentContainerDiv, HighlightWrapperContainerDiv,
} from './styles';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};

export const RenderUserHighlights = ({ userHighlightsData }) => (
  <HighlightWrapperContainerDiv>
    <HighlightContentContainerDiv>
      <Carousel
        slidesToSlide={3}
        responsive={responsive}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {userHighlightsData.map((item) => {
          const { cover_media, id, title } = item;
          return (
            <HighlightCarouselItemWrapperDiv key={id}>
              <HighlightCarouselItemContentDiv>
                <HighlightCarouselItemImageWrapperDiv
                  aria-label="Open Stories"
                  role="button"
                  tabIndex="0"
                >
                  <HighlightCarouselItemCanvas height="87" width="87" />
                  <HighlightCarouselItemImageContentDiv>
                    <HighlightCarouselItemImg
                      src={cover_media.cropped_image_version ? `${WORKER_URL}${cover_media.cropped_image_version.url}` : ''}
                      alt="cover media"
                    />
                  </HighlightCarouselItemImageContentDiv>
                </HighlightCarouselItemImageWrapperDiv>
                <HighlightCarouselItemCaptionDiv role="menuitem" tabIndex="0">
                  <Emoji symbol={title} label="highlight title" />
                </HighlightCarouselItemCaptionDiv>
              </HighlightCarouselItemContentDiv>
            </HighlightCarouselItemWrapperDiv>
          );
        })}
      </Carousel>
    </HighlightContentContainerDiv>
  </HighlightWrapperContainerDiv>
);
