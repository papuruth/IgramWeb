/** @jsx jsx */
import { jsx } from '@emotion/core';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import {
  CarouselContentFollowButton,
  CarouselContentFullnameDiv,
  CarouselContentFullnameSpan,
  CarouselContentImg,
  CarouselContentInnerDiv,
  CarouselContentPictureContentAnchor,
  CarouselContentPictureWrapperDiv,
  CarouselContentUsernameAnchor,
  CarouselContentUsernameDiv,
  CarouselMainDivBtn,
  PrivateAccountBoxContent,
  PrivateAccountBoxContentDiv,
  PrivateAccountBoxContentH2,
  PrivateAccountBoxWrapper,
  PrivateAccountContainer,
  PrivateAccountSuggestedUserContent,
  PrivateAccountSuggestedUserWrapper,
  PrivateAccountWrapper,
  SuggestionForYouDiv,
  SuggestionForYouSpan,
} from './styles';
import { RenderUserHighlights } from './renderUserHighlights';
import { WORKER_URL } from '@/utils/constants';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 2,
  },
};
export const RenderPrivateAccount = ({
  suggestedUserData,
  privateUser,
  userHighlightsData,
  following,
  showPrivate,
}) => (
  <PrivateAccountWrapper>
    <PrivateAccountContainer>
      {privateUser && !following && (
        <PrivateAccountBoxWrapper>
          <PrivateAccountBoxContent>
            <PrivateAccountBoxContentH2>
              This Account is Private
            </PrivateAccountBoxContentH2>
            <PrivateAccountBoxContentDiv>
              Follow to see their photos and videos.
            </PrivateAccountBoxContentDiv>
          </PrivateAccountBoxContent>
        </PrivateAccountBoxWrapper>
      )}
      {userHighlightsData.length > 0 && (
        <RenderUserHighlights userHighlightsData={userHighlightsData} />
      )}
      {suggestedUserData && (showPrivate || !following) ? (
        <PrivateAccountSuggestedUserWrapper>
          <PrivateAccountSuggestedUserContent>
            <SuggestionForYouDiv>
              <SuggestionForYouSpan>Suggestions For You</SuggestionForYouSpan>
            </SuggestionForYouDiv>
            <Carousel
              slidesToSlide={3}
              responsive={responsive}
              containerClass="carousel-container"
              removeArrowOnDeviceType={['tablet', 'mobile']}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px">
              {suggestedUserData.map((user) => {
                const { pk, profile_pic_url, username, full_name } = user;
                return (
                  <CarouselMainDivBtn role="button" tabIndex="0" key={pk}>
                    <CarouselContentInnerDiv>
                      <CarouselContentPictureWrapperDiv>
                        <Link
                          css={CarouselContentPictureContentAnchor}
                          to={{
                            pathname: username,
                            state: user,
                          }}>
                          <CarouselContentImg
                            alt={`${username} profile pic`}
                            src={`${WORKER_URL}${profile_pic_url}`}
                          />
                        </Link>
                      </CarouselContentPictureWrapperDiv>
                      <CarouselContentUsernameDiv>
                        <Link
                          css={CarouselContentUsernameAnchor}
                          to={{
                            pathname: username,
                            state: user,
                          }}>
                          {username}
                        </Link>
                      </CarouselContentUsernameDiv>
                      <CarouselContentFullnameDiv>
                        <CarouselContentFullnameSpan title={full_name}>
                          {full_name}
                        </CarouselContentFullnameSpan>
                      </CarouselContentFullnameDiv>
                      <CarouselContentFollowButton type="button">
                        Follow
                      </CarouselContentFollowButton>
                    </CarouselContentInnerDiv>
                  </CarouselMainDivBtn>
                );
              })}
            </Carousel>
          </PrivateAccountSuggestedUserContent>
        </PrivateAccountSuggestedUserWrapper>
      ) : null}
    </PrivateAccountContainer>
  </PrivateAccountWrapper>
);
