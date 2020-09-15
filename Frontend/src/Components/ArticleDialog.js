import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Alert } from '@material-ui/lab';
import { Link, Divider } from '@material-ui/core';
import ArticleReport from './ArticleReport'


export default class ArticleDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      scroll: 'paper',
      report: props.article
    }
    this.onBoxOpen = this.onBoxOpen.bind(this);
    this.onBoxClose = this.onBoxClose.bind(this);
  }

  exportAsJson(json) {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(json)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "export.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  onBoxOpen() {
    this.setState({ open: true, scroll: 'paper' });
  }

  onBoxClose() {
    this.setState({ open: false });
  }

  renderReports(reports) {
    if (!reports) {
      return (<div></div>);
    }
    return <div>
      {reports.map((report, i) => (
        <ArticleReport report={report} index={i+1} />
      ))}
    </div>
  }


  render() {

    return (
      <React.Fragment>
        <Button onClick={this.onBoxOpen} size="small" variant="outlined" color="primary">
          View Report
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.onBoxClose}
          scroll={this.state.scroll}
          fullWidth={true}
          maxWidth="md"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle>{this.props.article.headline}</DialogTitle>
          <DialogContent dividers={this.state.scroll === 'paper'}>
            <DialogContentText
              ref={this.state.descriptionElementRef}
              tabIndex={-1}
            >
              <div>
                <Alert severity="success">
                  We found {(this.state.report.reports) ? this.state.report.reports.length : "0"} reports for this article.
                  <Link href={this.state.report.url} target="_blank">View the article</Link>
                </Alert>
                <br />
                {this.renderReports(this.state.report.reports)}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.exportAsJson(this.state.report.reports)}
              color="primary"
              variant="outlined"
            >
              Export As Json
            </Button>
            <Button onClick={this.onBoxClose} color="primary" variant="contained">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}