import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React from 'react';
import { WORKER_URL } from '@/utils/constants';
import { SeenText, StoriesSeenContainer } from './styles';

const styles = {
  avatar: {
    height: '20px',
    width: '20px',
  },
};

export default function Viewers({ viewers }) {
  return (
    <div>
      {viewers && (
        <StoriesSeenContainer>
          <AvatarGroup>
            {viewers.slice(0, 3).map(({ pk, profile_pic_url, username }) => (
              <Avatar
                key={pk}
                alt={username}
                src={`${WORKER_URL}${profile_pic_url}`}
                style={styles.avatar}
              />
            ))}
          </AvatarGroup>
          <SeenText>
            Seen by
            {' '}
            {viewers.length}
          </SeenText>
        </StoriesSeenContainer>
      )}
    </div>
  );
}
