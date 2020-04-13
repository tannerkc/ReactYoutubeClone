import React from 'react';

import { Grid } from '@material-ui/core';

import { SearchBar, VideoList, VideoDetail, VideoComments } from './components';

import youtube from './api/youtube';

const YOUTUBE_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;


class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null,
  }

  componentDidMount(){
    this.handleSubmit('Build a YouTube Clone Application Using React');

    window.addEventListener('scroll', this.handleScroll);
  }

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video});
  }

  handleScroll = (event) => {
    let videoPlayer = document.querySelector('#videoPlayer');

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      videoPlayer.className = "PIP";
    } else {
      videoPlayer.className = "";
    }

  }

  handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: YOUTUBE_KEY,
        q: searchTerm
      }
    });

    const commentsResponse = await youtube.get('commentThreads', {
      params: {
        part: 'snippet,replies',
        // maxResults: 5,
        key: YOUTUBE_KEY,
        videoId: response.data.items[0].id.videoId
      }
    });


    console.log(commentsResponse);
    this.setState({ videos: response.data.items, selectedVideo: response.data.items[0], comments: commentsResponse.items })
  }

  render (){
    const { selectedVideo, videos } = this.state;

    return(
      <Grid justify="center" container spacing={2}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
              <VideoComments />
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default App;
