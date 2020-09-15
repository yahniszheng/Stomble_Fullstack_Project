import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArticleDialog from './ArticleDialog';
import { connect } from 'react-redux';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';

const mapState = (state) => {
  return {
    articles: state.articles
  };
}

class ArticleList extends React.Component {
  constructor() {
    super();
  }

  render() {
    const articles = this.props.articles.slice().sort((a,b) => parseInt(a.date_of_publication) < parseInt(b.date_of_publication) ? 1 : -1).map(function (data) {
      let d = new Date(parseInt(data.date_of_publication + "000"));
      return (
        <Box mb={1} key={data.headline}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {data.headline}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {d.getHours() + ":" + d.getMinutes() + "  " + d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()}
                <br />
                {data.main_text.substring(0, 800) + "..."}
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              <Button size="small" href={data.url} target="_blank" variant="outlined" color="primary">
                View Article
              </Button>
              &nbsp;
              <ArticleDialog article={data} />
            </CardActions>
          </Card>
        </Box>
      );
    });

    return (
      <List className="">
        {articles}
      </List>
    );
  }
}

export default connect(mapState)(ArticleList);