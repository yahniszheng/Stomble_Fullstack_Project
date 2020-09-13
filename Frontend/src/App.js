import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import HomePage from './Components/Home'
// import SocialMedia from './Components/SocialMedia'
import CssBaseline from '@material-ui/core/CssBaseline';
import Sidebar from './Components/Sidebar'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Map from './Components/Map'
import Alerts from './Components/Alerts'
import GoogleTrendsPage from './Components/GoogleTrendsPage'
import HealthCare from './Components/HealthCare'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ArticleListPage from './Components/ArticleListPage';
import StockMarketPage from './Components/StockMarketPage';
import TwitterTrendsPage from './Components/TwitterTrendsPage'
import ArticleStoragePage from './Components/ArticleStoragePage';
import Cov19Page from './Components/Cov19Page';

const drawerWidth = 240;

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
            <Route path="/map" component={Map} />
            <Route path="/alerts" component={Alerts} />
            <Route path="/article-list" component={ArticleListPage} />
            <Route path="/social-impacts/twitter-trends" component={TwitterTrendsPage} />
            <Route path="/social-impacts/trends" component={GoogleTrendsPage} />
            <Route path="/social-impacts/stocks" component={StockMarketPage} />
            <Route path="/health-care" component={HealthCare} />
            <Route path="/cov19" component={Cov19Page} />
            <Route path="/" component={Home} />

          </Switch>


        </main>
      </BrowserRouter>
    </div >
  );
}