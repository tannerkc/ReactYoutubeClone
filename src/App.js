import React from 'react';

import { Grid } from '@material-ui/core';

import { SearchBar, VideoList, VideoDetail } from './components';

import youtube from './api/youtube';

const YOUTUBE_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;


class App extends React.Component {
  state = {
    video: [],
    selectedVideo: null,
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


    // console.log(response.data.items);
    this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] })
  }

  render (){
    const { selectedVideo } = this.state;

    return(
      <Grid justify="center" container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
            </Grid>
            <Grid item xs={4}>
            { /* VIDEO LIST */ }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default App;
