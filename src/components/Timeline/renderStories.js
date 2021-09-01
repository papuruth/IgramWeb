import Stories from '@/components/Stories';
import {
  fetchStoriesItemsAction,
  markAsSeenStoryAction,
} from '@/redux/timeline/timelineAction';
import { Close } from '@material-ui/icons';
import * as moment from 'moment';
import React from 'react';
import {
  StoriesContainer,
  StoriesContainerCloseButton,
  StoriesContainerContent,
} from './styles';

export default class RenderStories extends React.PureComponent {
  constructor(props) {
    super(props);
    const { storyUserId, dispatch, storyPosition } = this.props;
    this.state = {
      storyPosition,
    };
    dispatch(fetchStoriesItemsAction(storyUserId));
  }

  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) {
        const { closeStoryContainer } = this.props;

        closeStoryContainer();
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', () => {
      console.log('Listener removed');
    });
  }

  storyContent = (item) => {
    const { userPk } = this.props;
    return item.map(
      ({
        taken_at,
        user,
        image_versions2,
        viewers,
        video_versions,
        video_duration,
        link_text,
        story_cta,
      }) => {
        if (video_versions) {
          return {
            url: video_versions[0].url,
            seeMore: link_text && story_cta[0].links[0].webUri,
            type: 'video',
            duration: video_duration,
            header: {
              heading: user.pk === userPk ? 'Your Story' : user.username,
              subheading: moment.unix(taken_at).fromNow(),
              profileImage: user.profile_pic_url,
            },
            viewers: user.pk === userPk ? viewers : '',
          };
        }
        return {
          url: image_versions2.candidates[0].url,
          seeMore: link_text && story_cta[0].links[0].webUri,
          header: {
            heading: user.pk === userPk ? 'Your Story' : user.username,
            subheading: moment.unix(taken_at).fromNow(),
            profileImage: user.profile_pic_url,
          },
          viewers: user.pk === userPk ? viewers : '',
        };
      },
    );
  };

  closeStoryContainer = () => {
    const { closeStoryContainer } = this.props;
    closeStoryContainer();
  };

  changeStory = (userReels) => {
    const { userPk, userStoriesItems } = this.props;
    const doc = document.getElementById('stories-container');
    doc.classList.add('T4LL3');
    const reelLength = userReels.length;
    const { storyPosition } = this.state;
    const { dispatch, closeStoryContainer } = this.props;
    if (
      storyPosition < reelLength &&
      !(userPk === userStoriesItems[0].user.pk)
    ) {
      setTimeout(() => {
        const userId = userReels[storyPosition].user.pk;
        dispatch(fetchStoriesItemsAction(userId));
        this.setState((state) => {
          return {
            storyPosition: state.storyPosition + 1,
          };
        });
      }, 500);
    } else {
      closeStoryContainer();
    }
  };

  switchPreviousStory = (userReels) => {
    const doc = document.getElementById('stories-container');
    doc.classList.add('T4LL3');
    const reelLength = userReels.length;
    const { storyPosition } = this.state;
    const { dispatch, closeStoryContainer } = this.props;
    if (storyPosition > 1 && storyPosition < reelLength) {
      const userId = userReels.filter(
        (item) => item.ranked_position === storyPosition - 1,
      )[0].user.pk;
      dispatch(fetchStoriesItemsAction(userId));
      this.setState((state) => {
        return {
          storyPosition: state.storyPosition - 1,
        };
      });
    } else {
      closeStoryContainer();
    }
  };

  changeSeen = () => {
    const doc = document.getElementById('stories-container');
    doc.classList.remove('T4LL3');
  };

  storyEnd = (id, allStory) => {
    const { dispatch } = this.props;
    dispatch(markAsSeenStoryAction(allStory[id]));
  };

  render() {
    const { userStoriesItems, userReels, currentIndex } = this.props;
    console.log(currentIndex, userStoriesItems);
    return (
      <StoriesContainer>
        <StoriesContainerCloseButton
          onKeyPress={this.closeStoryContainer}
          onClick={this.closeStoryContainer}
          type="submit">
          <Close style={{ fontSize: '40px' }} />
        </StoriesContainerCloseButton>
        {userStoriesItems.length > 0 && (
          <StoriesContainerContent id="stories-container">
            <Stories
              stories={this.storyContent(userStoriesItems)}
              defaultInterval={5000}
              width={window.innerWidth}
              height={window.innerWidth < 570 ? window.innerHeight - 50 : 839}
              currentIndex={
                currentIndex && currentIndex + 1 < userStoriesItems?.length
                  ? currentIndex + 1
                  : 0
              }
              onPreviousStory={() => this.switchPreviousStory(userReels)}
              onStoryStart={this.changeSeen}
              onStoryEnd={(storyId) => this.storyEnd(storyId, userStoriesItems)}
              onAllStoriesEnd={() => this.changeStory(userReels)}
            />
          </StoriesContainerContent>
        )}
      </StoriesContainer>
    );
  }
}
