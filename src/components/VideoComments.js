import React from 'react';

import { Grid } from '@material-ui/core';

import VideoCommentItem from './VideoCommentItem';

const VideoComments = () => {
  // const listOfVideos = videos.map(() => <VideoCommentItem />)

  return (
    // <Grid container spacing={2}>
    // {listOfVideos}
    // </Grid>
    <VideoCommentItem />
  );
}

export default VideoComments;
