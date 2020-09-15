import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from "./Style/Card.js";
import CardHeader from "./Style/CardHeader.js";
import CardBody from "./Style/CardBody.js";
import { usePromiseTracker, trackPromise } from 'react-promise-tracker'
import Loader from 'react-loader-spinner'
import { Paper, Box, Grid } from "@material-ui/core";
const styles = ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: -1,
  },
});


class TwitterTrendsPage extends Component {
  state = {
    twitterPosts: [],
    isLoading: true,
  }

  componentWillMount() {
    const script = document.createElement("script");

    script.src = 'https://hashtagify.me/assets/hashtagify/embed.js';
    script.async = true;

    document.body.appendChild(script);
  }

  LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
      promiseInProgress &&
      <span className="loader">

        <Loader type="ThreeDots" height={100} width={100} />
      </span>
    );
  }



  render() {
    const { classes } = this.props
    return (
      <div>
        <Card>
        <CardHeader color="info">
          <h2>Twitter Trends</h2>
        </CardHeader>
        <CardBody>
        <Box my={2}>
          <Paper elevation={3}>

            <div className="hastagify_embed" data-hashtag="Disease" data-width="max" data-mode="table">
              <div>
                <a href="http://hashtagify.me/"></a>
              </div>
            </div>
          </Paper>
        </Box>
        </CardBody >
        </Card>
      </div >);
  }
}
export default withStyles(styles)(TwitterTrendsPage);
