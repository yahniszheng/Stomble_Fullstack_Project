import React from "react";
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import {Grid } from '@material-ui/core';
import Card from "./Style/Card.js";
import CardHeader from "./Style/CardHeader.js";
import CardBody from "./Style/CardBody.js";
import { ApolloClient, InMemoryCache, gql} from '@apollo/client';
import ArticleSearchToolbar from "./ArticleSearchToolbar";
import ArticleList from "./ArticleList";

const mapState = (state) => {
  return {
    articles: state.articles
  };
}

class ArticleListPage extends React.Component {
  constructor() {
    super();

    this.state = {
      valid_search: true,
      client: new ApolloClient({
        uri: 'https://z0g6mpfqoa.execute-api.ap-southeast-2.amazonaws.com/beta/graphql',
        cache: new InMemoryCache()
      }),
      loading: true
    };

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.initValue = this.initValue.bind(this);
  }

  initValue = async () => {
    this.setState({ loading: true });
      const client = new ApolloClient({
        uri: 'https://z0g6mpfqoa.execute-api.ap-southeast-2.amazonaws.com/beta/graphql',
        cache: new InMemoryCache()
      })

      const lists = await client
      .query({
        query: gql`
          query {
            data (location_filter : "china",  keyword : "coronavirus") {
              url
              date_of_publication
              headline
              main_text
              reports {
                event_date
                locations {
                  google_id
                  address
                }
                diseases
                syndromes
              }
              keyword_location
              keyword_list
              keyword_frequency {
                name
                freqency
              }
            }
          }
        `
      })
      .then(res => {

        return res.data.data;
      });
    this.props.dispatch({ type: "UPDATE", articles : lists});
    this.setState({ valid_search: true, loading: false });
  };

  componentDidMount() {
    this.initValue();
  }

  //change to fetch later
  onSearchSubmit = async search_form => {
    this.setState({ loading: true });
    let start_date = Date.parse(search_form.start_date)/1000;
    let end_date = Date.parse(search_form.end_date)/1000;
    const lists = await this.state.client
    .query({
      query: gql`
        query ($loc : String, $str : Int, $end : Int, $keyword : String) {
          data (location_filter : $loc,  keyword : $keyword, start_data : $str, end_date : $end) {
            url
            date_of_publication
            headline
            main_text
            reports {
              event_date
              locations {
                google_id
                address
              }
              diseases
              syndromes
            }
            keyword_location
            keyword_list
            keyword_frequency {
              name
              freqency
            }
          }
        }
      `,
      variables: {
        'str': start_date,
        'end': end_date,
        'keyword': search_form.keyword.toLowerCase(),
        'loc': search_form.location.toLowerCase()
      }
    })
    .then(res => {

      return res.data.data;
    });
    if (Array.isArray(lists) == true && lists.length > 0) {
      this.props.dispatch({ type: "UPDATE", articles : lists});
      this.setState({ valid_search: true, loading: false });
    } else {
      this.setState({ valid_search: false, loading: false });
    }
  };

  render() {
    const validSearch = this.state.valid_search;
    let content;
    if (validSearch && !this.state.loading) {
      content = <ArticleList />;
    } else if (!validSearch) {
      content = (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Invalid Search!! Please try again...
        </Alert>
      );
    } else {

      content = 
      <Grid container justify="center" alignItems="center" >
        <Loader
        type="Ball-Triangle"
        color="#00BFFF"
        height={200}
        width={300}
        /> 
      </Grid>
    }
    return (
      <div>
        <Card>
          <CardHeader color="rose">
            <h2>Article List</h2>
          </CardHeader>
          <CardBody />
          <CardBody>
            <ArticleSearchToolbar onSubmit={this.onSearchSubmit} />
          </CardBody>

        </Card>
        {content}

      </div>
    );
  }
}

export default connect(mapState)(ArticleListPage);
