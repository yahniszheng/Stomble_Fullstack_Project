import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HomePage from './Components/Home'
// import SocialMedia from './Components/SocialMedia'
import CssBaseline from '@material-ui/core/CssBaseline';
import Sidebar from './Components/Sidebar'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import GoogleTrendsPage from './Components/GoogleTrendsPage'
import HealthCare from './Components/HealthCare'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ArticleListPage from './Components/ArticleListPage';
import TwitterTrendsPage from './Components/TwitterTrendsPage'
import ArticleStoragePage from './Components/ArticleStoragePage';
import Cov19Page from './Components/Cov19Page';

const drawerWidth = 240;

const initialState = {
  articles: []
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'UPDATE':
      return {
        articles: action.articles
      };
    case 'RESET':
      return {
        articles: []
      };
    default:
      return state;
  }
}

const store = createStore(reducer); // Just use it for requriment 6, Used for ArticleListPage and its child componenets

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));



export default function App() {
  const classes = useStyles();
  const [title, setTitle] = useState('Home');

  return (
    <Provider store={store}>
      <div className={classes.root}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar pageName={title} />
          <Sidebar />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route path="/article-storage" component={ArticleStoragePage} />
              <Route path="/article-list" component={ArticleListPage} />
              <Route path="/social-impacts/twitter-trends" component={TwitterTrendsPage} />
              <Route path="/social-impacts/trends" component={GoogleTrendsPage} />
              <Route path="/health-care" component={HealthCare} />
              <Route path="/cov19" component={Cov19Page} />
              <Route path="/" component={Home} />
            </Switch>
          </main>
        </BrowserRouter>
      </div >
    </Provider>
  );
}
