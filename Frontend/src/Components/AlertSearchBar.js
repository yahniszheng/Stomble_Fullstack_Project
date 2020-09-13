import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { ButtonGroup } from "@material-ui/core";

// To Do
// Css, connection of buttons, checkboxs

export default class AlertSearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      start_date: this.props.start_date,
      end_date: this.props.end_date,
      country: this.props.country,
    };

    this.onCountryChange = this.onCountryChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.fillLastWeek = this.fillLastWeek.bind(this);
    this.fillLastMonth = this.fillLastMonth.bind(this);
    this.fillLastTwoMonth = this.fillLastTwoMonth.bind(this);
    this.fillFortnight = this.fillFortnight.bind(this);
    this.setPreviousDaysPeriod = this.setPreviousDaysPeriod.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onStartDateChange(evt) {
    this.setState({ start_date: evt.target.value });
  }

  onEndDateChange(evt) {
    this.setState({ end_date: evt.target.value });
  }

  onCountryChange(evt) {
    this.setState({ country: evt.target.value });
  }

  setPreviousDaysPeriod(numOfDate) {
    const today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    const todayString = `${yyyy}-${mm}-${dd}`;

    today.setDate(today.getDate() - numOfDate);
    dd = String(today.getDate()).padStart(2, '0');
    mm = String(today.getMonth() + 1).padStart(2, '0');
    yyyy = today.getFullYear();
    const previousString = `${yyyy}-${mm}-${dd}`;
    this.setState({
      start_date: previousString,
      end_date: todayString
    });
  }

  fillLastWeek() {
    this.setPreviousDaysPeriod(7);
  }

  fillFortnight() {
    this.setPreviousDaysPeriod(14);
  }

  fillLastMonth() {
    this.setPreviousDaysPeriod(30);
  }

  fillLastTwoMonth() {
    this.setPreviousDaysPeriod(60);
  }

  onFormSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit(this.state);
  }

  // User should able to use checkbox to represent start date and end date, or enter start date end date themselves.
  render() {
    return (
      <Box m={4}>
        <form className="{classes.root}" noValidate autoComplete="on" onSubmit={this.onFormSubmit}>
          <div>
            <Grid container spacing={3}>
              <Grid item xs>
                <FormControl fullWidth className="{classes.margin}">
                  <TextField
                    required
                    id="country"
                    label="Outbreak Country"
                    type="search"
                    value={this.state.country}
                    onChange={this.onCountryChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl fullWidth className="{classes.margin}">
                  <TextField
                    required
                    id="from-date"
                    label="From Date"
                    type="date"
                    value={this.state.start_date}
                    className="{classes.textField}"
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.onStartDateChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl fullWidth className="{classes.margin}">
                  <TextField
                    required
                    id="to-date"
                    label="To Date"
                    type="date"
                    value={this.state.end_date}
                    className="{classes.textField}"
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.onEndDateChange}
                  />
                </FormControl>
              </Grid>
              <Grid md={4}>
                <FormControl fullWidth>
                  <ButtonGroup variant="text" color="primary" aria-label="text primary button group" style={{ marginTop: "1.5rem" }}>
                    <Button onClick={this.fillLastWeek}>Last 7 Days</Button>
                    <Button onClick={this.fillFortnight}>Last 14 Days</Button>
                    <Button onClick={this.fillLastMonth}>Last 30 Days</Button>
                    <Button onClick={this.fillLastTwoMonth}>Last 60 Days</Button>
                  </ButtonGroup>
                </FormControl>
              </Grid>
              </Grid>
          </div>
          <br />
          <br />
          <div style = {{display: 'flex', justifyContent: 'center'}}>
          <Button variant="contained" color="primary" type="submit" style={{ minWidth: '90px', minHeight: '20px', fontSize: '18px'}}>
            Go
          </Button>
          </div>
        </form>
      </Box>
    );
  }
}
