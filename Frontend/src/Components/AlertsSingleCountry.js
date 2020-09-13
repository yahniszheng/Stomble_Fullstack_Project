import React, { Component } from 'react';
import PieChart from './PieChart';
import LineChart from './LineChart';
import AlertMap from './AlertMap';
import AlertSearchBar from './AlertSearchBar';
import LineChart2 from './LineChart2';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { Label } from 'semantic-ui-react'

import Loader from 'react-loader-spinner'

import {
  StaticGoogleMap,
  Marker,
  Path,
} from 'react-static-google-map';
import { Typography, Grid } from '@material-ui/core';


export default class AlertsSingleCountry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            start_date : this.props.start_date,
            end_date : this.props.end_date,
            country : this.props.country,
            display_total : true,
            loading: true,
            second_country : "", // reserved for comparasion
            diseases_second : [], // reserved for comparasion
            colours : ["blue", "red", "green", "purple", "yellow", "ltblue", "pink", "orange"],
            marker_group : [],
            state_id: 0,
            diseases : [
              {
                "Name": "African Swine Fever / Swine Fever",
                "is_checked" : true,
                "Cases": [
                  {
                    "DateTime": "2020-04-02 04:29:00",
                    "Country": "China",
                    "City": "Gansu",
                    "Brief": "CHINA - China Reports New African Swine Fever Cases In Gansu Province"
                  },
                  {
                    "DateTime": "2020-04-10 00:08:00",
                    "Country": "Poland",
                    "City": "Wieckowice",
                    "Brief": "POLAND - African Swine Fever Outbreak Discovered In Poland"
                  },
                  {
                    "DateTime": "2020-04-11 01:53:00",
                    "Country": "South Korea",
                    "City": "Seoul",
                    "Brief": "SOUTH KOREA - 12 More Cases Of African Swine Fever Confirmed In Wild Boars"
                  },
                  {
                    "DateTime": "2020-04-21 22:47:00",
                    "Country": "China",
                    "City": "Sichuan",
                    "Brief": "CHINA - China Detects African Swine Fever In Another Pig Truck"
                  },
                  {
                    "DateTime": "2020-04-27 23:52:00",
                    "Country": "Namibia",
                    "City": "Windhoek",
                    "Brief": "NAMIBIA - African Swine Fever Kills 61 Pigs"
                  }
                ]
              },
              {
                "Name": "Coronavirus",
                "is_checked" : true,
                "Cases": [
                  {
                    "DateTime": "2020-04-02 03:22:00",
                    "Country": "Algeria",
                    "City": "Algiers",
                    "Brief": "ALGERIA - Algeria Reports 14 New Deaths From COVID - 19 - 847 Infections In Total"
                  },
                  {
                    "DateTime": "2020-04-02 03:22:00",
                    "Country": "France",
                    "City": "Paris",
                    "Brief": "FRANCE - France Reports 509 Coronavirus Deaths In Last 24 Hours - Total Cases Close To 57000"
                  },
                  {
                    "DateTime": "2020-04-02 03:22:00",
                    "Country": "Lebanon",
                    "City": "Beirut",
                    "Brief": "LEBANON - Philippine Ambassador To Lebanon Dies Of COVID-19"
                  },
                  {
                    "DateTime": "2020-04-02 04:50:00",
                    "Country": "Egypt",
                    "City": "Cairo",
                    "Brief": "EGYPT - Egypt Confirms 69 New Cases - 6 Deaths Of COVID - 19 - Ministry"
                  },
                  {
                    "DateTime": "2020-04-02 05:04:00",
                    "Country": "Indonesia",
                    "City": "Jakarta",
                    "Brief": "INDONESIA - Indonesias Cases Surge By 149 Amid Confusion Over Transport Restrictions"
                  },
                  {
                    "DateTime": "2020-04-02 05:11:00",
                    "Country": "United Kingdom",
                    "City": "Airedale Hospital",
                    "Brief": "UNITED KINGDOM - Seven More Coronavirus Deaths Recorded At Bradford District Hospitals"
                  },
                  {
                    "DateTime": "2020-04-02 05:13:00",
                    "Country": "Ireland",
                    "City": "Dublin",
                    "Brief": "IRELAND - 10 Women Who Attended Dublin Maternity Hospital Tested Positive For Coronavirus"
                  },
                  {
                    "DateTime": "2020-04-02 05:14:00",
                    "Country": "Singapore",
                    "City": "Singapore City",
                    "Brief": "SINGAPORE – Fourth Coronavirus Death In Singapore"
                  },
                  {
                    "DateTime": "2020-04-02 05:21:00",
                    "Country": "Israel",
                    "City": "Jerusalem",
                    "Brief": "ISRAEL - COVID-19 Death Toll Rises To 31 In Israel"
                  },
                  {
                    "DateTime": "2020-04-02 05:22:00",
                    "Country": "India",
                    "City": "New Delhi",
                    "Brief": "INDIA - India COVID - 19 Death Toll Rises To 50 As Total Cases Reach 1965"
                  },
                  {
                    "DateTime": "2020-04-02 05:24:00",
                    "Country": "Spain",
                    "City": "Madrid",
                    "Brief": "SPAIN - Spains Coronavirus Death Toll Surpasses 10000 After Another Record Daily Toll"
                  },
                  {
                    "DateTime": "2020-04-02 05:33:00",
                    "Country": "Philippines",
                    "City": "Manila",
                    "Brief": "PHILIPPINES - Philippines Reports 11 New Coronavirus Deaths - 322 More Infections"
                  },
                  {
                    "DateTime": "2020-04-02 05:36:00",
                    "Country": "Italy",
                    "City": "Rome",
                    "Brief": "ITALY - COVID - 19 Cases In Italy Reach 110574 - Death Toll At 13155"
                  },
                  {
                    "DateTime": "2020-04-02 05:38:00",
                    "Country": "Brazil",
                    "City": "Brasilia",
                    "Brief": "BRAZIL - Brazils COVID - 19 Death Toll Reaches 240 - With 6836 Infected"
                  },
                  {
                    "DateTime": "2020-04-02 05:39:00",
                    "Country": "Cyprus",
                    "City": "Nicosia",
                    "Brief": "CYPRUS - COVID - 19 Cases In Cyprus Climb To 320 - Death Toll At 9"
                  },
                  {
                    "DateTime": "2020-04-02 05:41:00",
                    "Country": "Greece",
                    "City": "Athens",
                    "Brief": "GREECE - Greeces COVID - 19 Death Toll Rises To 50 - Private Flights Banned"
                  },
                  {
                    "DateTime": "2020-04-03 02:18:00",
                    "Country": "United States",
                    "City": "Topeka, kS",
                    "Brief": "KANSAS - Coronavirus In Kansas 555 Confirmed Cases 13 Deaths"
                  },
                  {
                    "DateTime": "2020-04-03 02:28:00",
                    "Country": "Latvia",
                    "City": "Riga",
                    "Brief": "LATVIA - Latvia Reports First Death Of A COVID-19 Patient"
                  },
                  {
                    "DateTime": "2020-04-03 02:31:00",
                    "Country": "Libya",
                    "City": "Tripoli",
                    "Brief": "LIBYA - Libya Records 1st COVID - 19 Death"
                  },
                  {
                    "DateTime": "2020-04-03 02:37:00",
                    "Country": "Brazil",
                    "City": "Brasilia",
                    "Brief": "BRAZIL - COVID-19 Death Toll Hits 299 In Brazil -Infections Reach 7910"
                  },
                  {
                    "DateTime": "2020-04-03 02:43:00",
                    "Country": "Morocco",
                    "City": "Rabat",
                    "Brief": "MOROCCO - Moroccos Novel Coronavirus Cases Reach 691"
                  },
                  {
                    "DateTime": "2020-04-03 02:53:00",
                    "Country": "United States",
                    "City": "Columbia, SC",
                    "Brief": "SOUTH CAROLINA - 26 Total Deaths In SC - 210 New Cases Of Coronavirus - 5 New Cases In Horry County"
                  },
                  {
                    "DateTime": "2020-04-03 03:17:00",
                    "Country": "France",
                    "City": "Paris",
                    "Brief": "FRANCE - France Reports 471 New COVID - 19 Deaths In Hospitals"
                  },
                  {
                    "DateTime": "2020-04-03 03:19:00",
                    "Country": "Turkey",
                    "City": "Ankara",
                    "Brief": "TURKEY - COVID - 19 Cases In Turkey Rise To 18135 - With 356 Deaths"
                  },
                  {
                    "DateTime": "2020-04-03 03:21:00",
                    "Country": "Greece",
                    "City": "Athens",
                    "Brief": "GREECE - Greeces COVID - 19 Cases Exceed 1500 - Death Toll Climbs To 53"
                  },
                  {
                    "DateTime": "2020-04-03 04:24:00",
                    "Country": "Zambia",
                    "City": "Lusaka",
                    "Brief": "ZAMBIA - Zambia Records First Coronavirus Death - Health Minister"
                  },
                  {
                    "DateTime": "2020-04-03 04:30:00",
                    "Country": "United States",
                    "City": "Las Vegas, NV",
                    "Brief": "NEVADA - NLV Police Officer - Staffer Test Positive For Coronavirus"
                  },
                  {
                    "DateTime": "2020-04-03 04:39:00",
                    "Country": "Turkey",
                    "City": "Ankara",
                    "Brief": "TURKEY - COVID - 19 Cases In Turkey Rise To 18135 - With 356 Deaths"
                  },
                  {
                    "DateTime": "2020-04-03 04:48:00",
                    "Country": "Armenia",
                    "City": "Nork Infections Clinical Hospital",
                    "Brief": "ARMENIA - COVID-19 - 68-Year-Old Patient Dies In Armenia"
                  },
                  {
                    "DateTime": "2020-04-03 04:51:00",
                    "Country": "United States",
                    "City": "Washington DC",
                    "Brief": "DISTRICT OF COLUMBIA - US Hits A New World Record For The Most One-Day Coronavirus Deaths - At 1169"
                  },
                  {
                    "DateTime": "2020-04-03 04:53:00",
                    "Country": "United States",
                    "City": "Clark County, NV",
                    "Brief": "NEVADA - Coronavirus Deaths Hit 38 In Nevada, More Than 1400 Cases"
                  },
                  {
                    "DateTime": "2020-04-03 04:56:00",
                    "Country": "United States",
                    "City": "Berlin",
                    "Brief": "GERMANY - Germany Reports Over 1000 Deaths Of COVID-19"
                  },
                  {
                    "DateTime": "2020-04-03 05:12:00",
                    "Country": "India",
                    "City": "New Delhi",
                    "Brief": "INDIA - India COVID - 19 Death Toll Rises To 56 As Total Cases Reach 2301"
                  },
                  {
                    "DateTime": "2020-04-03 05:18:00",
                    "Country": "Germany",
                    "City": "Berlin",
                    "Brief": "GERMANY - Germany Reports Over 1000 Deaths Of COVID - 19"
                  },
                  {
                    "DateTime": "2020-04-03 05:19:00",
                    "Country": "Singapore",
                    "City": "Singapore City",
                    "Brief": "SINGAPORE - Singapore Reports 5th COVID - 19 Death"
                  },
                  {
                    "DateTime": "2020-04-04 01:44:00",
                    "Country": "Bangladesh",
                    "City": "Dhaka",
                    "Brief": "BANGLADESH - 2 More Coronavirus Patients Die In Bangladesh"
                  },
                  {
                    "DateTime": "2020-04-04 01:46:00",
                    "Country": "Switzerland",
                    "City": "Zurich",
                    "Brief": "SWITZERLAND - Switzerland Death Toll Rises To 540 As Confirmed Cases Top 20000"
                  },
                  {
                    "DateTime": "2020-04-04 01:48:00",
                    "Country": "Netherlands",
                    "City": "Amsterdam",
                    "Brief": "NETHERLANDS - Deaths In Netherlands Rise By 164 To 1651"
                  },
                  {
                    "DateTime": "2020-04-04 01:49:00",
                    "Country": "Kuwait",
                    "City": "Kuwait City",
                    "Brief": "KUWAIT - Kuwait Reports First Death"
                  },
                  {
                    "DateTime": "2020-04-04 01:51:00",
                    "Country": "India",
                    "City": "New Delhi",
                    "Brief": "INDIA - India COVID - 19 Death Toll Rises To 68 As Total Cases Reach 2902"
                  },
                  {
                    "DateTime": "2020-04-04 01:52:00",
                    "Country": "Pakistan",
                    "City": "Islamabad",
                    "Brief": "PAKISTAN - 37 Die - 2547 Test Positive For COVID-19 In Pakistan"
                  },
                  {
                    "DateTime": "2020-04-04 01:53:00",
                    "Country": "Vietnam",
                    "City": "Hanoi",
                    "Brief": "VIETNAM - Vietnams COVID - 19 Cases Increase To 239"
                  },
                  {
                    "DateTime": "2020-04-04 01:55:00",
                    "Country": "Afghanistan",
                    "City": "Kabul",
                    "Brief": "AFGHANISTAN - Afghanistan Reports 1 New Death From COVID - 19"
                  },
                  {
                    "DateTime": "2020-04-04 01:57:00",
                    "Country": "United States",
                    "City": "Riverside County, CA",
                    "Brief": "CALIFORNIA - Second Deputy Dies From Coronavirus In Riverside County"
                  },
                  {
                    "DateTime": "2020-04-04 01:58:00",
                    "Country": "United States",
                    "City": "Albuquerque, NM",
                    "Brief": "NEW MEXICO - 3 New COVID-19 Deaths Reported In New Mexico As Total Cases Rise To 495"
                  },
                  {
                    "DateTime": "2020-04-04 02:00:00",
                    "Country": "Sri Lanka",
                    "City": "Colombo",
                    "Brief": "SRI LANKA - Death Toll From COVID-19 In Sri Lanka Rises To 5"
                  },
                  {
                    "DateTime": "2020-04-04 02:06:00",
                    "Country": "Laos",
                    "City": "Vientiane",
                    "Brief": "LAOS - Laos Tests 53 Negative COVID-19 Cases"
                  },
                  {
                    "DateTime": "2020-04-04 02:07:00",
                    "Country": "Fiji",
                    "City": "Suva",
                    "Brief": "FIJI - Number Of Confirmed COVID - 19 Cases Rises To 12 In Fiji"
                  },
                  {
                    "DateTime": "2020-04-04 02:17:00",
                    "Country": "Japan",
                    "City": "Tokyo",
                    "Brief": "JAPAN - COVID - 19 Infections In Japan Rise To 3142"
                  },
                  {
                    "DateTime": "2020-04-04 02:19:00",
                    "Country": "Singapore",
                    "City": "Singapore City",
                    "Brief": "SINGAPORE - Singapore Reports 75 New Cases"
                  },
                  {
                    "DateTime": "2020-04-04 02:20:00",
                    "Country": "Portugal",
                    "City": "Lisbon",
                    "Brief": "PORTUGAL - Portugals Coronavirus Cases Surpass 10000 Mark"
                  },
                  {
                    "DateTime": "2020-04-04 02:21:00",
                    "Country": "Germany",
                    "City": "Berlin",
                    "Brief": "GERMANY - Germany Reports 6082 More Cases"
                  },
                  {
                    "DateTime": "2020-04-05 02:35:00",
                    "Country": "India",
                    "City": "Udhampur",
                    "Brief": "INDIA - 100-Year-Old Man Dies In Quarantine In JKs Udhampur"
                  },
                  {
                    "DateTime": "2020-04-05 02:48:00",
                    "Country": "India",
                    "City": "Chennai",
                    "Brief": "INDIA - Two COVID19 Patients Pass Away In Chennai"
                  },
                  {
                    "DateTime": "2020-04-05 03:08:00",
                    "Country": "India",
                    "City": "Surat",
                    "Brief": "INDIA - COVID-19 Patient Dies In Surat"
                  },
                  {
                    "DateTime": "2020-04-05 03:18:00",
                    "Country": "India",
                    "City": "Indore",
                    "Brief": "INDIA - Another Death Reported From Indore"
                  },
                  {
                    "DateTime": "2020-04-05 03:21:00",
                    "Country": "Albania",
                    "City": "Tirane",
                    "Brief": "ALBANIA - Albanias Now Has A Total Of 333 Cases And 18 Deaths Related To Covid-19"
                  },
                  {
                    "DateTime": "2020-04-05 03:24:00",
                    "Country": "Belarus",
                    "City": "Minsk",
                    "Brief": "BELARUS - Five People Have Died From The Disease The Belarusian Health Ministry Said"
                  },
                  {
                    "DateTime": "2020-04-05 03:31:00",
                    "Country": "United States",
                    "City": "Nashville, TN",
                    "Brief": "TENNESSEE - 3321 Confirmed COVID-19 Cases In Tennessee"
                  },
                  {
                    "DateTime": "2020-04-05 03:58:00",
                    "Country": "United States",
                    "City": "Frankfort, KY",
                    "Brief": "KENTUCKY - Kentucky Gov Andy Beshear Confirms 92 New COVID-19 Cases - Three New Deaths"
                  },
                  {
                    "DateTime": "2020-04-05 04:09:00",
                    "Country": "United States",
                    "City": "York County, SC",
                    "Brief": "SOUTH CAROLINA - A Clover Police Officer Has Tested Positive For Coronavirus - Chief Of Police Says"
                  },
                  {
                    "DateTime": "2020-04-05 04:13:00",
                    "Country": "United States",
                    "City": "Columbus, OH",
                    "Brief": "OHIO - Over 4K Cases - 119 Deaths Across State As Ohioans Prepare For Coronavirus Peak"
                  },
                  {
                    "DateTime": "2020-04-05 04:24:00",
                    "Country": "United States",
                    "City": "Washington DC",
                    "Brief": "DISTRICT OF COLUMBIA - Navy Captain Fired After Writing Letter Asking For Coronavirus Help Has Repor"
                  },
                  {
                    "DateTime": "2020-04-05 04:28:00",
                    "Country": "Israel",
                    "City": "Jerusalem",
                    "Brief": "ISRAEL - Number Of Corona Cases In Israel Exceeds 8000 As Death Toll Continues To Rise"
                  },
                  {
                    "DateTime": "2020-04-05 04:36:00",
                    "Country": "United States",
                    "City": "Collier County, FL",
                    "Brief": "FLORIDA - Two Infants Test Positive For Covid-19"
                  },
                  {
                    "DateTime": "2020-04-05 04:40:00",
                    "Country": "United States",
                    "City": "Asbury Park, NJ",
                    "Brief": "NEW JERSEY - 12 Positive Coronavirus Tests In Asbury Park In 2 Days"
                  },
                  {
                    "DateTime": "2020-04-05 04:43:00",
                    "Country": "United States",
                    "City": "Kern County, CA",
                    "Brief": "CALIFORNIA - Kern County Now Has 230 Coronavirus Cases"
                  },
                  {
                    "DateTime": "2020-04-05 04:52:00",
                    "Country": "United States",
                    "City": "Montpelier, VT",
                    "Brief": "VERMONT - Coronavirus Cases In Vermont Surpass 500 As Two More Die"
                  },
                  {
                    "DateTime": "2020-04-05 05:13:00",
                    "Country": "United States",
                    "City": "Austin, TX",
                    "Brief": "TEXAS - Coronavirus In Texas  - State Reports 6812 Cases And 127 Deaths"
                  },
                  {
                    "DateTime": "2020-04-05 05:16:00",
                    "Country": "Saudi Arabia",
                    "City": "Riyadh",
                    "Brief": "SAUDI ARABIA - Coronavirus Cases In Saudi Arabia Rise To 2402"
                  },
                  {
                    "DateTime": "2020-04-05 05:29:00",
                    "Country": "United States",
                    "City": "Jackson County, MI",
                    "Brief": "MICHIGAN - Jackson County Reports 10 More Confirmed Coronavirus Cases"
                  },
                  {
                    "DateTime": "2020-04-05 05:32:00",
                    "Country": "Canada",
                    "City": "Anjou",
                    "Brief": "CANADA - Coronavirus - 3 Costco Employees Test Positive In Anjou - Montreal"
                  },
                  {
                    "DateTime": "2020-04-05 05:35:00",
                    "Country": "Ireland",
                    "City": "Dublin",
                    "Brief": "IRELAND - Coronavirus - Seven Further Deaths And 91 New Covid-19 Cases Confirmed In Northern Ireland"
                  },
                  {
                    "DateTime": "2020-04-05 05:39:00",
                    "Country": "United States",
                    "City": "Jackson, MS",
                    "Brief": "MISSISSIPPI - Coronavirus In Mississippi - 183 New Cases - 8 More Deaths Reported Sunday"
                  },
                  {
                    "DateTime": "2020-04-06 00:28:00",
                    "Country": "United States",
                    "City": "Crest Hill, IL",
                    "Brief": "ILLINOIS - Stateville Correctional Center Inmate Dies Of COVID-19"
                  },
                  {
                    "DateTime": "2020-04-06 00:30:00",
                    "Country": "Malaysia",
                    "City": "Kuala Lumpur",
                    "Brief": "MALAYSIA - COVID-19 Cases Increase To 3662 In Malaysia - Death Toll At 61"
                  },
                  {
                    "DateTime": "2020-04-06 00:33:00",
                    "Country": "India",
                    "City": "New Delhi",
                    "Brief": "INDIA - India COVID-19 Death Toll Rises To 109 As Total Cases Reach 4067"
                  },
                  {
                    "DateTime": "2020-04-06 00:42:00",
                    "Country": "Ethiopia",
                    "City": "Addis Ababa",
                    "Brief": "ETHIOPIA - Ethiopia Reports Its First Death Of A COVID-19 Patient"
                  },
                  {
                    "DateTime": "2020-04-06 00:47:00",
                    "Country": "China",
                    "City": "Shanghai",
                    "Brief": "CHINA - Shanghai Reports 5 New Imported COVID-19 Cases"
                  },
                  {
                    "DateTime": "2020-04-06 02:15:00",
                    "Country": "United States",
                    "City": "Long Island, NY",
                    "Brief": "NEW YORK - Coronavirus News - Nurse At Long Island Hospital Dies From COVID-19"
                  },
                  {
                    "DateTime": "2020-04-06 02:18:00",
                    "Country": "Israel",
                    "City": "Jerusalem",
                    "Brief": "ISRAEL - Israels COVID-19 Death Toll Hits 54 As Total Cases Climb To 8611"
                  },
                  {
                    "DateTime": "2020-04-06 02:19:00",
                    "Country": "Iran",
                    "City": "Tehran",
                    "Brief": "IRAN - COVID-19 Death Toll Hits 3739 In Iran"
                  },
                  {
                    "DateTime": "2020-04-06 02:41:00",
                    "Country": "France",
                    "City": "Paris",
                    "Brief": "FRANCE - COVID - 19 Death Toll Tops 8000 In France"
                  },
                  {
                    "DateTime": "2020-04-06 02:58:00",
                    "Country": "Oman",
                    "City": "Muscat",
                    "Brief": "OMAN - Oman Announces 21 New COVID-19 Cases - 2 More Deaths"
                  },
                  {
                    "DateTime": "2020-04-06 03:37:00",
                    "Country": "Brazil",
                    "City": "Brasília",
                    "Brief": "BRAZIL - Brazil Registers 11130 COVID - 19 Cases - 486 Deaths"
                  },
                  {
                    "DateTime": "2020-04-06 03:38:00",
                    "Country": "Chile",
                    "City": "Santiago",
                    "Brief": "CHILE - Chile Confirms 4471 Cases Of Coronavirus - 34 Deaths"
                  },
                  {
                    "DateTime": "2020-04-06 04:50:00",
                    "Country": "United States",
                    "City": "Concord, NH",
                    "Brief": "NEW HAMPSHIRE - Corrections - Prison Employee Tests Positive For Virus"
                  },
                  {
                    "DateTime": "2020-04-06 04:51:00",
                    "Country": "United States",
                    "City": "Annapolis, MD",
                    "Brief": "MARYLAND - Maryland COVID-19 Cases Grow To At Least 288 Monday"
                  },
                  {
                    "DateTime": "2020-04-06 04:53:00",
                    "Country": "Russia",
                    "City": "Moscow",
                    "Brief": "RUSSIA - In single day - Over 900 Coronavirus Cases Confirmed In Russia"
                  },
                  {
                    "DateTime": "2020-04-06 04:54:00",
                    "Country": "South Korea",
                    "City": "Seoul",
                    "Brief": "SOUTH KOREA - S Korea Reports 47 More COVID - 19 Cases - 10284 In Total"
                  },
                  {
                    "DateTime": "2020-04-06 04:55:00",
                    "Country": "Germany",
                    "City": "Berlin",
                    "Brief": "GERMANY - Germany Reports Over 95000 Confirmed COVID - 19 Cases"
                  },
                  {
                    "DateTime": "2020-04-06 04:57:00",
                    "Country": "Kuwait",
                    "City": "Kuwait City",
                    "Brief": "KUWAIT - Kuwait Reports 77 New COVID - 19 Cases - 556 In Total"
                  },
                  {
                    "DateTime": "2020-04-07 00:57:00",
                    "Country": "United States",
                    "City": "Montgomery, AL",
                    "Brief": "ALABAMA - COVID-19 Cases In Alabama Now At 2035 With 39 Deaths Reported"
                  },
                  {
                    "DateTime": "2020-04-07 02:07:00",
                    "Country": "Algeria",
                    "City": "Algiers",
                    "Brief": "ALGERIA - Algerias COVID-19 Death Toll Hits 173 - Infections Surge To 1423"
                  },
                  {
                    "DateTime": "2020-04-07 02:12:00",
                    "Country": "India",
                    "City": "New Delhi",
                    "Brief": "INDIA - India COVID - 19 Death Toll Rises To 114 As Total Cases Reach 4421"
                  },
                  {
                    "DateTime": "2020-04-07 02:13:00",
                    "Country": "Belgium",
                    "City": "Brussels",
                    "Brief": "BELGIUM - Number Of COVID - 19 Deaths Exceeds 2000 In Belgium"
                  },
                  {
                    "DateTime": "2020-04-07 02:15:00",
                    "Country": "Indonesia",
                    "City": "Jakarta",
                    "Brief": "INDONESIA - Indonesias COVID - 19 Death Toll Rises To 221 - Total Cases To 2738"
                  },
                  {
                    "DateTime": "2020-04-07 02:25:00",
                    "Country": "United Kingdom",
                    "City": "London",
                    "Brief": "UNITED KINGDOM - Coronavirus Patient Deaths Rise By 439 Across The UK"
                  },
                  {
                    "DateTime": "2020-04-07 03:09:00",
                    "Country": "Iran",
                    "City": "Tehran",
                    "Brief": "IRAN - Irans COVID - 19 Death Toll Rises To 3872 With 62589 Infected In Total"
                  },
                  {
                    "DateTime": "2020-04-07 03:12:00",
                    "Country": "Ukraine",
                    "City": "Kyiv",
                    "Brief": "UKRAINE - Ukraine COVID - 19 Death Toll Rises To 45 As Total Infections Reach 1462"
                  },
                  {
                    "DateTime": "2020-04-07 03:14:00",
                    "Country": "Pakistan",
                    "City": "Islamabad",
                    "Brief": "PAKISTAN - Pakistan Confirms 3864 COVID - 19 Positive Cases - 54 Deaths"
                  },
                  {
                    "DateTime": "2020-04-07 03:25:00",
                    "Country": "Colombia",
                    "City": "Bogota",
                    "Brief": "COLUMBIA - Colombias Covid-19 Death Toll Rises By 11 - Total Infections At 1579"
                  },
                  {
                    "DateTime": "2020-04-07 03:28:00",
                    "Country": "United States",
                    "City": "Raleigh, NC",
                    "Brief": "NORTH CAROLINA - 46 Deaths In NC Blamed On Coronavirus - 3221 Total Cases - Cooper Says"
                  },
                  {
                    "DateTime": "2020-04-07 03:34:00",
                    "Country": "Azerbaijan",
                    "City": "Nagorno-Karabakh",
                    "Brief": "AZERBAIJAN - Azerbaijans Breakaway Nagorno-Karabakh Region Reports First Coronavirus Case"
                  },
                  {
                    "DateTime": "2020-04-07 03:35:00",
                    "Country": "Spain",
                    "City": "Madrid",
                    "Brief": "SPAIN - Coronavirus Infection Cases In Spain Reach 140510"
                  },
                  {
                    "DateTime": "2020-04-07 03:37:00",
                    "Country": "Russia",
                    "City": "Moscow",
                    "Brief": "RUSSIA - Number Of Confirmed COVID - 19 Cases In Russia Rises To 15862"
                  },
                  {
                    "DateTime": "2020-04-07 03:38:00",
                    "Country": "Kuwait",
                    "City": "Kuwait City",
                    "Brief": "KUWAIT - Kuwait Reports 78 New COVID-19 Cases - 743 In Total"
                  },
                  {
                    "DateTime": "2020-04-07 03:59:00",
                    "Country": "Brazil",
                    "City": "Brasilia",
                    "Brief": "BRAZIL - Assisi Confirms Death From Dengue And Has MoreThan 250 Cases"
                  },
                  {
                    "DateTime": "2020-04-07 23:29:00",
                    "Country": "United States",
                    "City": "Redondo Beach, CA",
                    "Brief": "CALIFORNIA - 4 Die At Redondo Beachs Kensington Senior Home Who Also Tested Positive For Coronavirus"
                  },
                  {
                    "DateTime": "2020-04-07 23:30:00",
                    "Country": "United States",
                    "City": "Montgomery County, PA",
                    "Brief": "PENNSYLVANIA - Montco Reports 160 New Coronavirus Cases - Death Toll Rises To 32"
                  },
                  {
                    "DateTime": "2020-04-08 00:15:00",
                    "Country": "United States",
                    "City": "Washington DC",
                    "Brief": "DISTRICT OF COLUMBIA - Updated - Nearly 2000 Coronavirus Deaths In US In Last 24 Hours"
                  },
                  {
                    "DateTime": "2020-04-08 00:17:00",
                    "Country": "United States",
                    "City": "Athens, AL",
                    "Brief": "ALABAMA - Four Alabama Hospital Employees Test Positive For COVID - 19"
                  },
                  {
                    "DateTime": "2020-04-08 00:20:00",
                    "Country": "United States",
                    "City": "Mercer County, WV",
                    "Brief": "WEST VIRGINIA - Mercer Countys 5th Case Of COVID-19 Result Of Community Transmission"
                  },
                  {
                    "DateTime": "2020-04-08 00:26:00",
                    "Country": "United States",
                    "City": "Gibsonia, PA",
                    "Brief": "PENNSYLVANIA - Coronavirus In Allegheny County - 2 People At St Barnabas Nursing Home Die From COVID"
                  },
                  {
                    "DateTime": "2020-04-08 00:45:00",
                    "Country": "Macedonia",
                    "City": "Skopje",
                    "Brief": "MACEDONIA - 45-Year-Old Coronavirus Patient From Skopje Dies On Way To Hospital"
                  },
                  {
                    "DateTime": "2020-04-08 00:51:00",
                    "Country": "United States",
                    "City": "Athens, GA",
                    "Brief": "KENTUCKY - Two New COVID - 19 Cases Reported In Marshall County"
                  },
                  {
                    "DateTime": "2020-04-08 00:56:00",
                    "Country": "United States",
                    "City": "Mecklenburg County, NC",
                    "Brief": "NORTH CAROLINA - Mecklenburg County Reports 805 Total COVID-19 Cases - With 8 Virus-Related Deaths"
                  },
                  {
                    "DateTime": "2020-04-08 01:00:00",
                    "Country": "Iran",
                    "City": "Tehran",
                    "Brief": "IRAN - Iran - Coronavirus Death Toll Surges To 20400 In 245 Cities"
                  },
                  {
                    "DateTime": "2020-04-08 01:04:00",
                    "Country": "France",
                    "City": "Paris",
                    "Brief": "FRANCE - France Is Fourth Country To Pass 10000 Coronavirus Deaths"
                  },
                  {
                    "DateTime": "2020-04-08 01:15:00",
                    "Country": "United States",
                    "City": "Saint Paul, MN",
                    "Brief": "MINNESOTA - 29 Deaths - 935 Confirmed Cases"
                  },
                  {
                    "DateTime": "2020-04-08 01:18:00",
                    "Country": "United States",
                    "City": "Breinigsville, PA",
                    "Brief": "PENNSYLVANIA - Employee Tests Positive For Coronavirus At Amazon In Breinigsville"
                  },
                  {
                    "DateTime": "2020-04-08 23:15:00",
                    "Country": "United States",
                    "City": "Denver, CO",
                    "Brief": "COLORADO - A third Avalanche Player Tests Positive For COVID - 19"
                  },
                  {
                    "DateTime": "2020-04-08 23:17:00",
                    "Country": "United States",
                    "City": "Sacramento, CA",
                    "Brief": "CALIFORNIA - California Crosses 16000 Cases - New Model Cuts Projected Death Total"
                  },
                  {
                    "DateTime": "2020-04-08 23:34:00",
                    "Country": "United Kingdom",
                    "City": "London",
                    "Brief": "UNITED KINGDOM - 224 More London Patients Die As UK Death Toll Climbs To Over 6000"
                  },
                  {
                    "DateTime": "2020-04-08 23:40:00",
                    "Country": "United Kingdom",
                    "City": "London",
                    "Brief": "UNITED KINGDOM - Total Of 16 Patients With Coronavirus Have Now Died At York Hospital"
                  },
                  {
                    "DateTime": "2020-04-09 02:45:00",
                    "Country": "United Kingdom",
                    "City": "Plymouth",
                    "Brief": "UNITED KINGDOM - Another Person Has Died After Testing Positive For Coronavirus In Plymouth"
                  },
                  {
                    "DateTime": "2020-04-09 02:48:00",
                    "Country": "Djibouti",
                    "City": "Djibouti",
                    "Brief": "DJIBOUTI - Djibouti Records Its First Coronavirus Death - Ministry Of Health"
                  },
                  {
                    "DateTime": "2020-04-09 02:55:00",
                    "Country": "Iran",
                    "City": "Tehran",
                    "Brief": "IRAN - Iran Coronavirus Death Toll Rises To 4110"
                  },
                  {
                    "DateTime": "2020-04-09 02:58:00",
                    "Country": "United Kingdom",
                    "City": "Wiltshire",
                    "Brief": "UNITED KINGDOM - Doctor Passes Away From Coronavirus In Wiltshire"
                  },
                  {
                    "DateTime": "2020-04-09 03:06:00",
                    "Country": "United States",
                    "City": "Albany, NY",
                    "Brief": "NEW YORK - U S Death Toll Approaches 15000 As New York Reports Deadliest Day"
                  },
                  {
                    "DateTime": "2020-04-09 03:08:00",
                    "Country": "Spain",
                    "City": "Madrid",
                    "Brief": "SPAIN - Spains Coronavirus Deaths Pass 14500 - But Real Toll May Be Bigger"
                  },
                  {
                    "DateTime": "2020-04-09 03:10:00",
                    "Country": "India",
                    "City": "Gujarat",
                    "Brief": "INDIA - Coronavirus Patient Dies In Ahmedabad - Toll Reaches 17"
                  },
                  {
                    "DateTime": "2020-04-09 03:13:00",
                    "Country": "Israel",
                    "City": "Jerusalem",
                    "Brief": "ISRAEL - Israels Coronavirus Death Toll Hits 86 - With Number Of Infected At 9968"
                  },
                  {
                    "DateTime": "2020-04-09 03:16:00",
                    "Country": "Mozambique",
                    "City": "Maputo",
                    "Brief": "MOZAMBIQUE - Coronavirus - Mozambique - World Health Organization - 17 Cases Of Covid-19 Confirmed I"
                  },
                  {
                    "DateTime": "2020-04-10 01:13:00",
                    "Country": "Zimbabwe",
                    "City": "Matabeleland",
                    "Brief": "ZIMBABWE - Six Malaria Deaths In Matabeleland South"
                  },
                  {
                    "DateTime": "2020-04-10 02:40:00",
                    "Country": "Ireland",
                    "City": "Belfast",
                    "Brief": "IRELAND - Coronavirus Northern Ireland: 10 More Deaths Takes NI Total To 92"
                  },
                  {
                    "DateTime": "2020-04-10 02:45:00",
                    "Country": "United Kingdom",
                    "City": "University Hospitals of Morecambe Bay NHS Foundation Trust",
                    "Brief": "UNITED KINGDOM - More Than 80 Coronavirus Patients Have Died At Morecambe Bay Hospitals Trust"
                  },
                  {
                    "DateTime": "2020-04-10 03:00:00",
                    "Country": "Nigeria",
                    "City": "Abuja",
                    "Brief": "NIGERIA - Nigerias Coronavirus Death Toll Rises To Seven"
                  },
                  {
                    "DateTime": "2020-04-10 03:03:00",
                    "Country": "Israel",
                    "City": "Jerusalem",
                    "Brief": "ISRAEL - Israels Coronavirus Death Toll Reaches 86 - With 9968 Confirmed Cases"
                  },
                  {
                    "DateTime": "2020-04-10 03:08:00",
                    "Country": "United States",
                    "City": "Wood County, WV",
                    "Brief": "WEST VIRGINIA - DHHR Reports 523 COVID - 19 Cases In W Va - 16 In Wood County"
                  },
                  {
                    "DateTime": "2020-04-10 03:20:00",
                    "Country": "United States",
                    "City": "Wyandot County, OH",
                    "Brief": "OHIO - First Wyandot County COVID - 19 Death Reported"
                  },
                  {
                    "DateTime": "2020-04-10 04:17:00",
                    "Country": "Zambia",
                    "City": "Lusaka",
                    "Brief": "ZAMBIA - Zambia Records 2nd COVID - 19 Death"
                  },
                  {
                    "DateTime": "2020-04-10 04:19:00",
                    "Country": "Pakistan",
                    "City": "Islamabad",
                    "Brief": "PAKISTAN - Pakistans Total COVID - 19 Cases Rise To 4601 - Death Toll At 66"
                  },
                  {
                    "DateTime": "2020-04-10 04:25:00",
                    "Country": "Kyrgyzstan",
                    "City": "Nookat",
                    "Brief": "KYRGYZSTAN - 87-Year-Old Patient Dies Of Coronavirus In Nookat District"
                  },
                  {
                    "DateTime": "2020-04-10 04:27:00",
                    "Country": "Belgium",
                    "City": "Brussels",
                    "Brief": "BELGIUM - COVID-19 Deaths In Belgium Surpass 3000"
                  },
                  {
                    "DateTime": "2020-04-10 04:29:00",
                    "Country": "Taiwan",
                    "City": "Taipei",
                    "Brief": "TAIWAN - Taiwan Two COVID-19 Cases - One Death"
                  },
                  {
                    "DateTime": "2020-04-10 04:38:00",
                    "Country": "Saudi Arabia",
                    "City": "Riyadh",
                    "Brief": "SAUDI ARABIA - Saudi Arabia Announces 364 New Coronavirus Cases - First Evacuation Flight Arrives In"
                  },
                  {
                    "DateTime": "2020-04-10 04:43:00",
                    "Country": "Belarus",
                    "City": "Minsk",
                    "Brief": "BELARUS - Belarus COVID - 19 Infections Near 2000"
                  },
                  {
                    "DateTime": "2020-04-11 02:32:00",
                    "Country": "United States",
                    "City": "Augusta, ME",
                    "Brief": "MAINE - Maine CDC Reports 1 More Coronavirus Death And 9 More Cases At Belfast Senior Facility"
                  },
                  {
                    "DateTime": "2020-04-11 02:33:00",
                    "Country": "Spain",
                    "City": "Madrid",
                    "Brief": "SPAIN - Spain Records 510 New Deaths - Continuing Downward Trend"
                  },
                  {
                    "DateTime": "2020-04-11 02:41:00",
                    "Country": "Indonesia",
                    "City": "Jakarta",
                    "Brief": "INDONESIA - Indonesia Reports 330 New Cases - 21 Deaths"
                  },
                  {
                    "DateTime": "2020-04-11 02:43:00",
                    "Country": "Nigeria",
                    "City": "Abuja",
                    "Brief": "NIGERIA - Anambra - Niger Record First Cases Of Coronavirus"
                  },
                  {
                    "DateTime": "2020-04-11 02:45:00",
                    "Country": "India",
                    "City": "Indore",
                    "Brief": "INDIA - Death Toll Reaches 30 In Indore"
                  },
                  {
                    "DateTime": "2020-04-11 02:48:00",
                    "Country": "India",
                    "City": "Dharavi",
                    "Brief": "INDIA - One More Death In Dharavi - Death Toll Now 4"
                  },
                  {
                    "DateTime": "2020-04-11 02:51:00",
                    "Country": "Philippines",
                    "City": "Manila",
                    "Brief": "PHILIPPINES - Philippines Reports 26 New Deaths - 233 More Infections"
                  },
                  {
                    "DateTime": "2020-04-11 02:52:00",
                    "Country": "Malaysia",
                    "City": "Kuala Lumpur",
                    "Brief": "MALAYSIA - Malaysia Reports 184 New Cases - Death Toll Rises By 3"
                  },
                  {
                    "DateTime": "2020-04-11 03:06:00",
                    "Country": "Nigeria",
                    "City": "Katsina",
                    "Brief": "NIGERIA - Wife - Children Of Dead Coronavirus Patient Test Positive In Katsina"
                  },
                  {
                    "DateTime": "2020-04-11 03:18:00",
                    "Country": "Turkey",
                    "City": "Ankara",
                    "Brief": "TURKEY - Coronavirus Death Toll Surpasses 1000 In Turkey - 4747 New Cases Announced"
                  },
                  {
                    "DateTime": "2020-04-11 03:26:00",
                    "Country": "Iran",
                    "City": "Tehran",
                    "Brief": "IRAN - Iran Says Total Number Of Infected Reaches 70029"
                  },
                  {
                    "DateTime": "2020-04-11 03:35:00",
                    "Country": "Armenia",
                    "City": "Tirana",
                    "Brief": "ALBANIA - 24th Coronavirus Victim In Albania Confirmed"
                  },
                  {
                    "DateTime": "2020-04-11 03:42:00",
                    "Country": "Yemen",
                    "City": "Sanaa",
                    "Brief": "YEMEN - Yemen Has 1st Confirmed Virus Case - More Than 10k In Israel"
                  },
                  {
                    "DateTime": "2020-04-12 00:49:00",
                    "Country": "Brazil",
                    "City": "Pindamonhangaba",
                    "Brief": "BRAZIL - Pindamonhangaba Registers 866 Dengue Cases"
                  },
                  {
                    "DateTime": "2020-04-12 03:05:00",
                    "Country": "India",
                    "City": "Pune",
                    "Brief": "INDIA - 2 More Death In Pune - Death Toll In District Now 31"
                  },
                  {
                    "DateTime": "2020-04-12 03:18:00",
                    "Country": "India",
                    "City": "Rajendra Institute of Medical Sciences, Rims Circle, Jora Talab",
                    "Brief": "INDIA - COVID19 Positive Man Dies In Ranchi"
                  },
                  {
                    "DateTime": "2020-04-12 03:21:00",
                    "Country": "Nepal",
                    "City": "Birgunj",
                    "Brief": "NEPAL - Three Indians Test Positive In Nepal"
                  },
                  {
                    "DateTime": "2020-04-12 03:22:00",
                    "Country": "Thailand",
                    "City": "Bangkok",
                    "Brief": "THAILAND - Thailand Reports 33 New Cases - Three New Deaths"
                  },
                  {
                    "DateTime": "2020-04-12 03:25:00",
                    "Country": "Guatemala",
                    "City": "Guatemala City",
                    "Brief": "GUATEMALA - Guatemala Registers 16 New Cases - Infections Rise To 153"
                  },
                  {
                    "DateTime": "2020-04-12 03:27:00",
                    "Country": "India",
                    "City": "Uttar Pradesh",
                    "Brief": "INDIA - Cases Rise To 480 In Uttar Pradesh"
                  },
                  {
                    "DateTime": "2020-04-12 03:35:00",
                    "Country": "United Kingdom",
                    "City": "London",
                    "Brief": "UNITED KINGDOM - Another 737 Dead As UK Coronavirus Death Toll Passes 10000"
                  },
                  {
                    "DateTime": "2020-04-12 03:39:00",
                    "Country": "United States",
                    "City": "Washington DC",
                    "Brief": "DISTRICT OF COLUMBIA - Confirmed US Covid-19 Death Toll Reaches 20000 - Highest In The World"
                  },
                  {
                    "DateTime": "2020-04-12 03:44:00",
                    "Country": "Spain",
                    "City": "Madrid",
                    "Brief": "SPAIN - Spains Overnight Coronavirus Death Toll Rises - Total At 16972"
                  },
                  {
                    "DateTime": "2020-04-12 03:47:00",
                    "Country": "France",
                    "City": "Paris",
                    "Brief": "FRANCE - Coronavirus Death Toll In France Nears 14400"
                  },
                  {
                    "DateTime": "2020-04-12 03:51:00",
                    "Country": "Germany",
                    "City": "Berlin",
                    "Brief": "GERMANY - Germanys Coronavirus Cases Rise By 2821 - Deaths By 129 - RKI"
                  },
                  {
                    "DateTime": "2020-04-12 03:55:00",
                    "Country": "Turkey",
                    "City": "Ankara",
                    "Brief": "TURKEY - Turkeys Coronavirus Cases Near 57000 With 480 Recoveries In Single Day"
                  },
                  {
                    "DateTime": "2020-04-12 03:59:00",
                    "Country": "Canada",
                    "City": "Ontario",
                    "Brief": "CANADA - Ontario Reports 401 New Coronavirus Cases - Including 21 Deaths As Total Cases Top 7000"
                  },
                  {
                    "DateTime": "2020-04-12 04:03:00",
                    "Country": "Russia",
                    "City": "Moscow",
                    "Brief": "RUSSIA - Coronavirus Case Tally In Russia Surpasses 15700"
                  },
                  {
                    "DateTime": "2020-04-12 04:07:00",
                    "Country": "Iraq",
                    "City": "Baghdad",
                    "Brief": "IRAQ - 1318 Coronavirus Cases - 72 Fatalities In Iraq"
                  },
                  {
                    "DateTime": "2020-04-12 04:11:00",
                    "Country": "Bangladesh",
                    "City": "Dhaka",
                    "Brief": "BANGLADESH - Bangladesh Reports 4 More Coronavirus Deaths - 139 New Cases In 24 Hrs"
                  },
                  {
                    "DateTime": "2020-04-13 01:43:00",
                    "Country": "United States",
                    "City": "Washington DC",
                    "Brief": "DISTRICT OF COLUMBIA - Sailor Assigned To Uss Theodore Roosevelt Dies Of Coronavirus Complications"
                  },
                  {
                    "DateTime": "2020-04-13 02:57:00",
                    "Country": "United Kingdom",
                    "City": "London",
                    "Brief": "UNITED KINGDOM - UK Coronavirus Death Toll Rises To 11329 - Up By 717"
                  },
                  {
                    "DateTime": "2020-04-13 02:59:00",
                    "Country": "United States",
                    "City": "Annapolis, MD",
                    "Brief": "MARYLAND - Nearly 9k COVID-19 Cases - 262 Deaths Reported In Maryland"
                  },
                  {
                    "DateTime": "2020-04-13 03:10:00",
                    "Country": "United States",
                    "City": "Cook County, IL",
                    "Brief": "ILLINOIS - 3rd Ill County Jail Inmate Dies From COVID-19"
                  },
                  {
                    "DateTime": "2020-04-13 04:19:00",
                    "Country": "United Arab Emirates",
                    "City": "Abu Dhabi",
                    "Brief": "UNITED ARAB EMIRATES - Coronavirus - UAE Reports Three More COVID-19-Related Deaths"
                  },
                  {
                    "DateTime": "2020-04-13 04:23:00",
                    "Country": "Turkey",
                    "City": "Ankara",
                    "Brief": "TURKEY - 3 Turkish Prisoners Die Out Of 17 Infected With Coronavirus"
                  },
                  {
                    "DateTime": "2020-04-13 04:26:00",
                    "Country": "Kazakhstan",
                    "City": "Astana",
                    "Brief": "KAZAKHSTAN - Coronavirus Claimed Life Of 11th Patient In Kazakhstan"
                  },
                  {
                    "DateTime": "2020-04-13 04:36:00",
                    "Country": "Iran",
                    "City": "Tehran",
                    "Brief": "IRAN - Iran Records 4585 Coronavirus Deaths As Restrictions Eased"
                  },
                  {
                    "DateTime": "2020-04-13 04:38:00",
                    "Country": "Armenia",
                    "City": "Yerevan",
                    "Brief": "ARMENIA - 67-Year-Old Coronavirus Patient Dies In Yerevan"
                  },
                  {
                    "DateTime": "2020-04-13 04:44:00",
                    "Country": "South Korea",
                    "City": "Seoul",
                    "Brief": "SOUTH KOREA - South Korea Reports More Recovered Coronavirus Patients Testing Positive Again"
                  },
                  {
                    "DateTime": "2020-04-13 04:46:00",
                    "Country": "India",
                    "City": "Maharashtra",
                    "Brief": "INDIA - 82 More COVID-19 Cases In Maharashtra - State Tally Reaches 2064"
                  },
                  {
                    "DateTime": "2020-04-13 04:56:00",
                    "Country": "Italy",
                    "City": "Rome",
                    "Brief": "ITALY - Italys Coronavirus Death Toll Tops 20000"
                  },
                  {
                    "DateTime": "2020-04-13 05:13:00",
                    "Country": "France",
                    "City": "Paris",
                    "Brief": "FRANCE - Coronavirus - France Death Toll 14400 Ahead Of Macron Speech On Lockdown"
                  },
                  {
                    "DateTime": "2020-04-13 05:29:00",
                    "Country": "Spain",
                    "City": "Madrid",
                    "Brief": "SPAIN - Spain Reports 3477 New Coronavirus Cases - 517 New Deaths"
                  },
                  {
                    "DateTime": "2020-04-14 04:06:00",
                    "Country": "United States",
                    "City": "Belmont County, OH",
                    "Brief": "OHIO - Coronavirus In Belmont County - Belmont County Health Department Confirms Death Due COVID-19"
                  },
                  {
                    "DateTime": "2020-04-14 04:08:00",
                    "Country": "India",
                    "City": "Mumbai",
                    "Brief": "INDIA - COVID-19 - Mumbai Reports 204 Cases 11 Deaths In One Day"
                  },
                  {
                    "DateTime": "2020-04-14 04:12:00",
                    "Country": "Ukraine",
                    "City": "Kiev",
                    "Brief": "UKRAINE - COVID-19 Death Toll Nears 100 In Ukraine"
                  },
                  {
                    "DateTime": "2020-04-14 04:13:00",
                    "Country": "Kuwait",
                    "City": "Kuwait City",
                    "Brief": "KUWAIT - Kuwait Reports 55 New Covid-19 Cases 1 More Death"
                  },
                  {
                    "DateTime": "2020-04-14 04:24:00",
                    "Country": "Palestinian Territory",
                    "City": "Palestinian",
                    "Brief": "PALESTINE - 10 New COVID-19 Cases Recorded In Palestine Totaling 320"
                  },
                  {
                    "DateTime": "2020-04-14 04:27:00",
                    "Country": "Iran",
                    "City": "Tehran",
                    "Brief": "IRAN - Coronavirus Death Toll Exceeds 27000 In 267 Cities"
                  },
                  {
                    "DateTime": "2020-04-14 04:29:00",
                    "Country": "Belgium",
                    "City": "Brussels",
                    "Brief": "BELGIUM - COVID-19 Deaths Exceed 4000 In Belgium"
                  },
                  {
                    "DateTime": "2020-04-14 04:33:00",
                    "Country": "Israel",
                    "City": "Jerusalem",
                    "Brief": "ISRAEL - 8-Day-Old Baby Infected With Coronavirus"
                  },
                  {
                    "DateTime": "2020-04-14 04:37:00",
                    "Country": "Indonesia",
                    "City": "Jakarta",
                    "Brief": "INDONESIA - Indonesia Reports Its Biggest Daily Jump In Coronavirus Deaths"
                  },
                  {
                    "DateTime": "2020-04-14 04:50:00",
                    "Country": "Nigeria",
                    "City": "Lagos",
                    "Brief": "NIGERIA - Lagos Confirms Sixth Coronavirus Death"
                  },
                  {
                    "DateTime": "2020-04-14 04:52:00",
                    "Country": "Belarus",
                    "City": "Minsk",
                    "Brief": "BELARUS - COVID-19 Cases In Belarus Rise To 3281"
                  },
                  {
                    "DateTime": "2020-04-14 04:54:00",
                    "Country": "Myanmar",
                    "City": "Rangoon",
                    "Brief": "MYANMAR - Myanmar Reports 21 New COVID-19 Cases In Single Day"
                  },
                  {
                    "DateTime": "2020-04-14 04:55:00",
                    "Country": "Egypt",
                    "City": "Alexandria",
                    "Brief": "EGYPT - Lecico Egypt Closes Borg El-Arab Factory After Coronavirus Case"
                  },
                  {
                    "DateTime": "2020-04-14 04:58:00",
                    "Country": "Japan",
                    "City": "Tokyo",
                    "Brief": "JAPAN - 16 People From All Japan Judo Federation Test Positive For COVID-19"
                  },
                  {
                    "DateTime": "2020-04-14 05:19:00",
                    "Country": "United States",
                    "City": "Midway Township, MN",
                    "Brief": "MINNESOTA - Small - Fixed-Wing Plane Makes Emergency Landing On Midway Road"
                  },
                  {
                    "DateTime": "2020-04-15 03:16:00",
                    "Country": "United Kingdom",
                    "City": "London",
                    "Brief": "UNITED KINGDOM - UK Hospital COVID-19 Death Toll Rises By 761 To 12868"
                  },
                  {
                    "DateTime": "2020-04-15 03:18:00",
                    "Country": "United States",
                    "City": "Columbiana County, OH",
                    "Brief": "OHIO - Columbiana County Records Jump In COVID-19 Cases - Related Deaths"
                  },
                  {
                    "DateTime": "2020-04-15 03:21:00",
                    "Country": "United States",
                    "City": "Little Rock, AR",
                    "Brief": "ARKANSAS - 2 More Arkansas COVID - 19 Deaths"
                  },
                  {
                    "DateTime": "2020-04-15 03:23:00",
                    "Country": "Sweden",
                    "City": "Stockholm",
                    "Brief": "SWEDEN - Sweden Records Its Highest Number Of Coronavirus Deaths In One Day With 170 Fatalities - Br"
                  },
                  {
                    "DateTime": "2020-04-15 03:25:00",
                    "Country": "Kyrgyzstan",
                    "City": "Astana",
                    "Brief": "KAZAKHSTAN - Coronavirus Claimed Life Of 15th Patient In Kazakhstan"
                  },
                  {
                    "DateTime": "2020-04-15 03:32:00",
                    "Country": "United States",
                    "City": "Providence, RI",
                    "Brief": "RHODE ISLAND - 9 Providence Police Officers Have Tested Positive For COVID-19 - 2 Have Recovered"
                  },
                  {
                    "DateTime": "2020-04-15 04:26:00",
                    "Country": "Kuwait",
                    "City": "Kuwait City",
                    "Brief": "KUWAIT - Kuwait Reports 55 New Coronavirus Cases"
                  },
                  {
                    "DateTime": "2020-04-15 04:28:00",
                    "Country": "Japan",
                    "City": "Tokyo",
                    "Brief": "JAPAN - Hospital-Acquired Coronavirus Infections Increasing In Japan"
                  },
                  {
                    "DateTime": "2020-04-15 04:30:00",
                    "Country": "United States",
                    "City": "Laredo, TX",
                    "Brief": "TEXAS - Over 50 Laredo Healthcare Professionals Confirmed Positive For Coronavirus"
                  },
                  {
                    "DateTime": "2020-04-16 03:25:00",
                    "Country": "United States",
                    "City": "Richmond, VA",
                    "Brief": "VIRGINIA - Virginias Coronavirus Death Toll Surpasses 200"
                  },
                  {
                    "DateTime": "2020-04-16 03:27:00",
                    "Country": "Germany",
                    "City": "Berlin",
                    "Brief": "GERMANY - COVID-19 Cases In Germany Rise To 130450 Death Toll At 3569"
                  },
                  {
                    "DateTime": "2020-04-16 03:41:00",
                    "Country": "Spain",
                    "City": "Madrid",
                    "Brief": "SPAIN - Spain Considers Summer School For Quarantined Children - Coronavirus Deaths Rise"
                  },
                  {
                    "DateTime": "2020-04-16 03:46:00",
                    "Country": "Spain",
                    "City": "Madrid",
                    "Brief": "SPAIN - Spain Considers Summer School For Quarantined Children - Coronavirus Deaths Rise"
                  },
                  {
                    "DateTime": "2020-04-16 03:48:00",
                    "Country": "United States",
                    "City": "Hanover Twp, PA",
                    "Brief": "PENNSYLVANIA - Another Adidas Employee Tests Positive For COVID-19"
                  },
                  {
                    "DateTime": "2020-04-16 03:53:00",
                    "Country": "United States",
                    "City": "Sioux Falls, SD",
                    "Brief": "SOUTH DAKOTA - Worker Dies Of COVID-19 At South Dakota Pork Factory Where 640 Tested Positive"
                  },
                  {
                    "DateTime": "2020-04-16 03:55:00",
                    "Country": "United Kingdom",
                    "City": "London",
                    "Brief": "UNITED KINGDOM - Coronavirus UK Death Toll Hits 13000 As Covid-19 Kills 870 In 24 Hours"
                  },
                  {
                    "DateTime": "2020-04-16 03:56:00",
                    "Country": "Russia",
                    "City": "Serbia",
                    "Brief": "RUSSIA - More Than 100 Deaths In Serbia From Coronavirus - In The Last 24 Hours - 4 More Have Died"
                  },
                  {
                    "DateTime": "2020-04-16 03:59:00",
                    "Country": "France",
                    "City": "Paris",
                    "Brief": "FRANCE - French Coronavirus Toll Jumps By Record 1438 Deaths"
                  },
                  {
                    "DateTime": "2020-04-16 05:36:00",
                    "Country": "Russia",
                    "City": "Serbia",
                    "Brief": "RUSSIA - More Than 100 Deaths In Serbia From Coronavirus: In The Last 24 Hours 4 More Have Died"
                  },
                  {
                    "DateTime": "2020-04-16 05:37:00",
                    "Country": "Ireland",
                    "City": "Belfast",
                    "Brief": "IRELAND - Eight Patients Die At Laois Care Centre As Dáil Discusses Nursing Homes - Todays COVID-19"
                  },
                  {
                    "DateTime": "2020-04-16 05:39:00",
                    "Country": "India",
                    "City": "Bengaluru",
                    "Brief": "INDIA - 66-Year-Old Coronavirus Patient Dies In Bengaluru"
                  },
                  {
                    "DateTime": "2020-04-16 05:40:00",
                    "Country": "Nigeria",
                    "City": "Kano",
                    "Brief": "NIGERIA - Kano Records First Death From Coronavirus - Confirmed Cases Now 21"
                  },
                  {
                    "DateTime": "2020-04-16 07:39:00",
                    "Country": "Philippines",
                    "City": "Manila",
                    "Brief": "PHILIPPINES - Philippines Reports 13 New Coronavirus Deaths - 207 More Infections"
                  },
                  {
                    "DateTime": "2020-04-16 07:40:00",
                    "Country": "United Arab Emirates",
                    "City": "Abu Dhabi",
                    "Brief": "UNITED ARAB EMIRATES - Coronavirus News Bulletin From Uae: 432 New Cases Confirmed - First Genome S"
                  },
                  {
                    "DateTime": "2020-04-16 07:41:00",
                    "Country": "Russia",
                    "City": "Moscow",
                    "Brief": "RUSSIA - Russia Reports Nearly 28000 Coronavirus Cases After New Record Daily Rise"
                  },
                  {
                    "DateTime": "2020-04-16 07:43:00",
                    "Country": "United States",
                    "City": "Columbus, OH",
                    "Brief": "OHIO - 7791 Cases In Ohio - 2291 In Kentucky - 8955 In Indiana"
                  },
                  {
                    "DateTime": "2020-04-16 07:44:00",
                    "Country": "Indonesia",
                    "City": "Jakarta",
                    "Brief": "INDONESIA - Indonesia Reports 380 New Coronavirus Infections - 27 Deaths"
                  },
                  {
                    "DateTime": "2020-04-17 02:07:00",
                    "Country": "United States",
                    "City": "Camilla, GA",
                    "Brief": "GEORGIA - 4 Workers Died From Coronavirus At A Tyson Foods Poultry Plant"
                  },
                  {
                    "DateTime": "2020-04-17 03:59:00",
                    "Country": "United States",
                    "City": "Jefferson City, MO",
                    "Brief": "MISSIOURI - Missouri Reports 5 New COVID - 19 Deaths - 216 More Cases"
                  },
                  {
                    "DateTime": "2020-04-17 04:01:00",
                    "Country": "United States",
                    "City": "Richmond, VA",
                    "Brief": "VIRGINIA - Virginias Coronavirus Cases Have Grown By Nearly 3000 In One Week"
                  },
                  {
                    "DateTime": "2020-04-17 04:11:00",
                    "Country": "India",
                    "City": "Rajasthan",
                    "Brief": "INDIA - 24 More COVID-19 Cases In Rajasthan - State Tally Reaches 1193"
                  },
                  {
                    "DateTime": "2020-04-17 04:13:00",
                    "Country": "Russia",
                    "City": "Moscow",
                    "Brief": "RUSSIA - Russian COVID-19 Cases Exceed 30000 With Daily Record Rise"
                  },
                  {
                    "DateTime": "2020-04-17 04:14:00",
                    "Country": "Hong Kong S.A.R., China",
                    "City": "Victoria",
                    "Brief": "HONG KONG - Hong Kong Reports 4 New COVID-19 Cases - 1021 In Total"
                  },
                  {
                    "DateTime": "2020-04-17 04:16:00",
                    "Country": "United States",
                    "City": "Florence, SC",
                    "Brief": "SOUTH CAROLINA - Number Of Florence School District 1 Employees Have Contracted COVID-19 - Officials"
                  },
                  {
                    "DateTime": "2020-04-17 04:18:00",
                    "Country": "South Korea",
                    "City": "Seoul",
                    "Brief": "SOUTH KOREA - South Korea Reports 22 More COVID-19 Cases - 10635 In Total"
                  },
                  {
                    "DateTime": "2020-04-17 04:20:00",
                    "Country": "United States",
                    "City": "Herkimer County, NY",
                    "Brief": "NEW YORK – Four New COVID-19 Cases Reported In Herkimer County"
                  },
                  {
                    "DateTime": "2020-04-17 04:21:00",
                    "Country": "United States",
                    "City": "Vanderburgh County, IN",
                    "Brief": "INDIANA - Total COVID-19 Cases Pass 10K In Indiana"
                  },
                  {
                    "DateTime": "2020-04-17 04:30:00",
                    "Country": "China",
                    "City": "Jiangsu",
                    "Brief": "CHINA - China Reports African Swine Fever In Pigs Transported To Jiangsu Province"
                  },
                  {
                    "DateTime": "2020-04-17 22:37:00",
                    "Country": "United States",
                    "City": "Andover, NJ",
                    "Brief": "NEW JERSEY - 18 Bodies Found Piled Up In Nursing Home"
                  },
                  {
                    "DateTime": "2020-04-17 22:40:00",
                    "Country": "United States",
                    "City": "Alexandria, LA",
                    "Brief": "LOUISIANA - 11 ICE Staffers At AEX Test Positive For COVID - 19"
                  },
                  {
                    "DateTime": "2020-04-17 22:44:00",
                    "Country": "Saudi Arabia",
                    "City": "Riyadh",
                    "Brief": "SAUDI ARABIA - 4 Deaths And 762 New Cases Of Corona Virus Were Recorded And 59 Cases Were Cured"
                  },
                  {
                    "DateTime": "2020-04-17 22:46:00",
                    "Country": "India",
                    "City": "Jammu And Kashmir",
                    "Brief": "INDIA - One COVID-19 Patient Dies In J-K"
                  },
                  {
                    "DateTime": "2020-04-18 00:08:00",
                    "Country": "Israel",
                    "City": "Jerusalem",
                    "Brief": "ISRAEL - COVID-19 Cases In Israel Exceed 13000 - Death Toll Hits 158"
                  },
                  {
                    "DateTime": "2020-04-18 00:18:00",
                    "Country": "Kyrgyzstan",
                    "City": "Bishkek",
                    "Brief": "KYRGYZSTAN - COVID-19 Cases Surpass 500 In Kyrgyzstan"
                  },
                  {
                    "DateTime": "2020-04-18 02:01:00",
                    "Country": "Afghanistan",
                    "City": "Kabul",
                    "Brief": "AFGHANISTAN - Afghanistan Reports 27 New COVID-19 Cease - Govt"
                  },
                  {
                    "DateTime": "2020-04-18 02:07:00",
                    "Country": "Singapore",
                    "City": "Singapore City",
                    "Brief": "SINGAPORE - Singpore Reports Daily Record Of 942 COVID-19 New Cases"
                  },
                  {
                    "DateTime": "2020-04-18 02:14:00",
                    "Country": "Russia",
                    "City": "Moscow",
                    "Brief": "RUSSIA - Russian COVID-19 Cases Rise By Daily Record Of 4785"
                  },
                  {
                    "DateTime": "2020-04-18 20:22:00",
                    "Country": "Australia",
                    "City": "Canberra",
                    "Brief": "AUSTRALIA - Australia Sees 3 New Deaths As Govt Urges App Installation"
                  },
                  {
                    "DateTime": "2020-04-18 20:25:00",
                    "Country": "Mexico",
                    "City": "Mexico City",
                    "Brief": "MEXICO - Mexico Reports 570 New Coronavirus Cases - 60 New Deaths"
                  },
                  {
                    "DateTime": "2020-04-18 20:32:00",
                    "Country": "India",
                    "City": "Jaipur, Rajasthan",
                    "Brief": "INDIA - Coronavirus In Rajasthan - 41 More Cases"
                  },
                  {
                    "DateTime": "2020-04-18 20:43:00",
                    "Country": "India",
                    "City": "Shahjahanpur, Uttar Pradesh",
                    "Brief": "INDIA - Suspected Coronavirus Death Reported From Shahjahanpur"
                  },
                  {
                    "DateTime": "2020-04-18 20:49:00",
                    "Country": "United States",
                    "City": "Wyoming State Hospital, Wyoming 150, Evanston, WY, USA",
                    "Brief": "WYOMING - Two Patients At Wyoming State Hospital Test Positive For COVID - 19"
                  },
                  {
                    "DateTime": "2020-04-18 20:53:00",
                    "Country": "United States",
                    "City": "Broome County, NY, USA",
                    "Brief": "NEW YORK - Pack Mail Employee Tests Positive For COVID - 19"
                  },
                  {
                    "DateTime": "2020-04-18 20:58:00",
                    "Country": "Thailand",
                    "City": "Bangkok",
                    "Brief": "THAILAND - Thailand Reports 33 New Cases - No New Deaths"
                  },
                  {
                    "DateTime": "2020-04-18 21:07:00",
                    "Country": "Germany",
                    "City": "Berlin",
                    "Brief": "GERMANY - Germanys Coronavirus Cases Rise By 3609 To 137439 - RKI"
                  },
                  {
                    "DateTime": "2020-04-18 21:10:00",
                    "Country": "South Korea",
                    "City": "Seoul",
                    "Brief": "SOUTH KOREA - South Korea Shows Lowest Daily Jump In Virus Cases Since February 20"
                  },
                  {
                    "DateTime": "2020-04-18 21:15:00",
                    "Country": "France",
                    "City": "Paris",
                    "Brief": "FRANCE - France Finds More Than 1000 Virus Cases On Aircraft Carrier"
                  },
                  {
                    "DateTime": "2020-04-18 21:22:00",
                    "Country": "China",
                    "City": "Heilongjiang",
                    "Brief": "CHINA - China Reports New Cases Coming From Russia"
                  },
                  {
                    "DateTime": "2020-04-18 21:30:00",
                    "Country": "Mexico",
                    "City": "Mexico City",
                    "Brief": "MEXICO - Mexico Reports 570 New Coronavirus Cases - 60 New Deaths"
                  },
                  {
                    "DateTime": "2020-04-18 21:34:00",
                    "Country": "India",
                    "City": "Rajasthan",
                    "Brief": "INDIA - Coronavirus In Rajasthan - 41 More Cases"
                  },
                  {
                    "DateTime": "2020-04-18 21:37:00",
                    "Country": "India",
                    "City": "Mumbai, Maharashtra, India",
                    "Brief": "INDIA - 21 Navy Personnel In Western Naval Command Test Positive For Coronavirus"
                  },
                  {
                    "DateTime": "2020-04-18 21:40:00",
                    "Country": "India",
                    "City": "Andhra Pradesh",
                    "Brief": "INDIA - Covid-19 In Andhra Pradesh - 603 Cases"
                  },
                  {
                    "DateTime": "2020-04-19 03:02:00",
                    "Country": "Bangladesh",
                    "City": "Dhaka",
                    "Brief": "BANGLADESH - Seven More Ccoronavirus Patients Die - 312 Test Positive In 24Hrs"
                  },
                  {
                    "DateTime": "2020-04-19 03:15:00",
                    "Country": "South Korea",
                    "City": "Seoul",
                    "Brief": "SOUTH KOREA - South Koreas New Ccoronavirus Cases Fall To Single Digits"
                  },
                  {
                    "DateTime": "2020-04-19 03:56:00",
                    "Country": "Ireland",
                    "City": "Dublin",
                    "Brief": "IRELAND - Coronavirus - One More Death In Northern Ireland"
                  },
                  {
                    "DateTime": "2020-04-19 03:59:00",
                    "Country": "Japan",
                    "City": "Tokyo",
                    "Brief": "JAPAN - Coronavirus Cases In Japan Exceed 10500"
                  },
                  {
                    "DateTime": "2020-04-19 04:06:00",
                    "Country": "United Kingdom",
                    "City": "London",
                    "Brief": "UNITED KINGDOM - Coronavirus - UK Hospital Deaths Reach 16060 After 596 More Patients Die"
                  },
                  {
                    "DateTime": "2020-04-19 20:19:00",
                    "Country": "Turkey",
                    "City": "Ankara",
                    "Brief": "TURKEY - Turkey Pandemic Case Numbers Overtake Iran - Highest In Middle East"
                  },
                  {
                    "DateTime": "2020-04-20 05:16:00",
                    "Country": "Australia",
                    "City": "Canberra",
                    "Brief": "AUSTRALIA - Coronavirus Updates - US COVID-19 Deaths Surpass 41000 - Australian Death Toll Stands At"
                  },
                  {
                    "DateTime": "2020-04-20 05:17:00",
                    "Country": "Kuwait",
                    "City": "Kuwait City",
                    "Brief": "KUWAIT - Kuwait Confirms 2 More Deaths - 80 New Covid-19 Cases"
                  },
                  {
                    "DateTime": "2020-04-20 05:19:00",
                    "Country": "Netherlands",
                    "City": "Amsterdam",
                    "Brief": "NETHERLANDS - Dutch Coronavirus Cases Rise By 750 To 33405 With 67 New Deaths"
                  },
                  {
                    "DateTime": "2020-04-20 05:21:00",
                    "Country": "Sweden",
                    "City": "Stockholm",
                    "Brief": "SWEDEN - Sweden Records Just 40 New Coronavirus Deaths And Less Than 400 Fresh Cases In One Day As T"
                  },
                  {
                    "DateTime": "2020-04-20 20:38:00",
                    "Country": "India",
                    "City": "New Delhi",
                    "Brief": "INDIA - Five More Delhi Police Personnel Test PositiveFor COVID-19"
                  },
                  {
                    "DateTime": "2020-04-20 20:40:00",
                    "Country": "Kenya",
                    "City": "Nairobi",
                    "Brief": "KENYA - Kenyas COVID-19 Cases Rise To 270"
                  },
                  {
                    "DateTime": "2020-04-20 20:44:00",
                    "Country": "Laos",
                    "City": "Vientiane",
                    "Brief": "LAOS - Laos Reports No New COVID-19 Case For 8 Days"
                  },
                  {
                    "DateTime": "2020-04-20 20:47:00",
                    "Country": "Russia",
                    "City": "Moscow",
                    "Brief": "RUSSIA - Russian COVID-19 Cases Rise By 4268 To 47121"
                  },
                  {
                    "DateTime": "2020-04-20 20:50:00",
                    "Country": "Afghanistan",
                    "City": "Kabul",
                    "Brief": "AFGHANISTAN - Afghanistan Reports 30 More COVID-19 Cases In 24 Hours - 1026 In Total"
                  },
                  {
                    "DateTime": "2020-04-20 20:53:00",
                    "Country": "Singapore",
                    "City": "Singapore City",
                    "Brief": "SINGAPORE - Singapore Reports Daily Record Of 1426 COVID-19 New Cases"
                  },
                  {
                    "DateTime": "2020-04-20 20:55:00",
                    "Country": "Fiji",
                    "City": "Suva",
                    "Brief": "FIJI - Fiji Confirms 18th COVID-19 Case"
                  },
                  {
                    "DateTime": "2020-04-20 20:58:00",
                    "Country": "Brazil",
                    "City": "Brasilia",
                    "Brief": "BRAZIL - COVID-19 Caseload In Latam Tops 100000"
                  },
                  {
                    "DateTime": "2020-04-20 21:03:00",
                    "Country": "Peru",
                    "City": "Lima",
                    "Brief": "PERU - Coronavirus Cases In Peru Top 15000 - Second Highest In Latin America"
                  },
                  {
                    "DateTime": "2020-04-20 21:10:00",
                    "Country": "United States",
                    "City": "Volusia County, FL, USA",
                    "Brief": "FLORIDA - 6 Volusia Nursing Homes Have COVID - 19 Positive Patients Or Staff"
                  },
                  {
                    "DateTime": "2020-04-20 21:12:00",
                    "Country": "India",
                    "City": "Triplicane, Chennai, Tamil Nadu",
                    "Brief": "INDIA - Two Chennai Scribes Test COVID-19 Positive - Street Where They Live Sealed"
                  },
                  {
                    "DateTime": "2020-04-20 21:17:00",
                    "Country": "India",
                    "City": "New Delhi",
                    "Brief": "INDIA - India COVID-19 Death Toll Rises To 543 As Total Cases Reach 17265"
                  },
                  {
                    "DateTime": "2020-04-20 21:22:00",
                    "Country": "United States",
                    "City": "Kanawha County, WV, USA",
                    "Brief": "WEST VIRGINIA - First COVID - 19 Death Reported In Kanawha County"
                  },
                  {
                    "DateTime": "2020-04-20 21:24:00",
                    "Country": "United States",
                    "City": "Livingston County, MI, USA",
                    "Brief": "MICHIGAN - 1 New Coronavirus Death Reported In Livingston County - 3 New Confirmed Cases"
                  },
                  {
                    "DateTime": "2020-04-21 21:11:00",
                    "Country": "Philippines",
                    "City": "Manila",
                    "Brief": "PHILIPPINES - Philippines Records 140 New Confirmed COVID-19 Cases - Tally At 6599"
                  },
                  {
                    "DateTime": "2020-04-21 21:21:00",
                    "Country": "Germany",
                    "City": "Berlin",
                    "Brief": "GERMANY - Germany Reports 1785 New COVID-19 Cases"
                  },
                  {
                    "DateTime": "2020-04-21 21:27:00",
                    "Country": "India",
                    "City": "Odisha, India",
                    "Brief": "INDIA - 5 More Test COVID-19 Positive In Odisha - Total Cases Rise To 79"
                  },
                  {
                    "DateTime": "2020-04-21 21:30:00",
                    "Country": "India",
                    "City": "New Delhi",
                    "Brief": "INDIA - 78 More COVID-19 Cases In Delhi - Tally In City Reaches 2081"
                  },
                  {
                    "DateTime": "2020-04-21 21:38:00",
                    "Country": "Singapore",
                    "City": "Singapore City",
                    "Brief": "SINGAPORE - 1426 New Coronavirus Cases - Bringing Spores Total To 8014"
                  },
                  {
                    "DateTime": "2020-04-21 21:40:00",
                    "Country": "United Kingdom",
                    "City": "Dorset",
                    "Brief": "UNITED KINGDOM - 17 New Cases Confirmed In Dorset"
                  },
                  {
                    "DateTime": "2020-04-21 21:42:00",
                    "Country": "Egypt",
                    "City": "Cairo",
                    "Brief": "EGYPT - Egypt Reports Record 189 Single - Day New COVID - 19 Cases - 3333 In Total"
                  },
                  {
                    "DateTime": "2020-04-21 21:45:00",
                    "Country": "New Zealand",
                    "City": "Wellington",
                    "Brief": "NEW ZEALAND - New Zealand Reports One More Death Of COVID-19"
                  },
                  {
                    "DateTime": "2020-04-21 21:47:00",
                    "Country": "United States",
                    "City": "Plainwell, MI, USA",
                    "Brief": "MICHIGAN - 60 Coronavirus Cases - 1 Death At Plainwell Meat Plant"
                  },
                  {
                    "DateTime": "2020-04-22 05:10:00",
                    "Country": "United States",
                    "City": "Washington DC",
                    "Brief": "DISTRICT OF COLUMBIA - US CDC Reports 776093 Coronavirus Cases - 41758 Deaths"
                  },
                  {
                    "DateTime": "2020-04-22 05:16:00",
                    "Country": "Turkey",
                    "City": "Ankara",
                    "Brief": "TURKEY - Turkeys Coronavirus Death Toll Rises To 2259 As Cases Near 100000"
                  },
                  {
                    "DateTime": "2020-04-22 05:37:00",
                    "Country": "Mongolia",
                    "City": "Ulaanbaatar",
                    "Brief": "MONGOLIA - Mongolia Confirms 1 New COVID-19 Case - Raising Total To 35"
                  },
                  {
                    "DateTime": "2020-04-22 05:39:00",
                    "Country": "Malaysia",
                    "City": "Kuala Lumpur",
                    "Brief": "MALAYSIA - Malaysia Reports 50 New Coronavirus Cases - One Death"
                  },
                  {
                    "DateTime": "2020-04-22 05:40:00",
                    "Country": "Philippines",
                    "City": "Manila",
                    "Brief": "PHILIPPINES - Philippines Records Nine New Coronavirus Deaths - 111 More Cases"
                  },
                  {
                    "DateTime": "2020-04-22 05:42:00",
                    "Country": "United Kingdom",
                    "City": "London",
                    "Brief": "UNITED KINGDOM - UK Death Toll In Hospitals From Coronavirus Rises By 763 To 18100"
                  },
                  {
                    "DateTime": "2020-04-22 05:44:00",
                    "Country": "Iran",
                    "City": "Tehran",
                    "Brief": "IRAN - Death Toll Due To Coronavirus Rises To 5391 In Iran - Businesses Open"
                  },
                  {
                    "DateTime": "2020-04-22 07:39:00",
                    "Country": "United States",
                    "City": "Annapolis, MD",
                    "Brief": "MARYLAND - Maryland Announces 47 More Coronavirus-Related Deaths - Pushing Victim Count To 631"
                  },
                  {
                    "DateTime": "2020-04-22 07:40:00",
                    "Country": "Uzbekistan",
                    "City": "Namangan",
                    "Brief": "UZBEKISTAN - 54 Yo Coronavirus Patient Dies In Uzbekistan"
                  },
                  {
                    "DateTime": "2020-04-22 07:41:00",
                    "Country": "Lebanon",
                    "City": "Dinnieh",
                    "Brief": "LEBANON - Patient Dies Of Coronavirus In Dinnieh"
                  },
                  {
                    "DateTime": "2020-04-22 07:43:00",
                    "Country": "Georgia",
                    "City": "Tbilisi",
                    "Brief": "GEORGIA - 5th Patient Dies Of Coronavirus In Georgia"
                  },
                  {
                    "DateTime": "2020-04-22 07:48:00",
                    "Country": "United States",
                    "City": "Imperial County, CA",
                    "Brief": "CALIFORNIA - Imperial County Confirms Fifth Coronavirus Death"
                  },
                  {
                    "DateTime": "2020-04-22 07:52:00",
                    "Country": "United Kingdom",
                    "City": "Edinburgh",
                    "Brief": "UNITED KINGDOM - Coronavirus In Scotland - Total Number Of Deaths Rises To More Than 1600"
                  },
                  {
                    "DateTime": "2020-04-22 07:54:00",
                    "Country": "United States",
                    "City": "Brockton, MA",
                    "Brief": "MASSACHUSETTS - 7 Residents At Guardian Center Nursing Home In Brockton Die From Coronavirus"
                  },
                  {
                    "DateTime": "2020-04-22 07:55:00",
                    "Country": "United States",
                    "City": "Columbiana County, OH",
                    "Brief": "OHIO - Coronavirus In Columbiana County - One New Death - 10 New Positive Cases In 24 Hours"
                  },
                  {
                    "DateTime": "2020-04-22 07:57:00",
                    "Country": "United Kingdom",
                    "City": "Kettering General Hospital",
                    "Brief": "UNITED KINGDOM - KGH Coronavirus Death Toll Rises To 72"
                  },
                  {
                    "DateTime": "2020-04-22 13:28:00",
                    "Country": "Nigeria",
                    "City": "Kaduna",
                    "Brief": "NIGERIA - Kaduna Discharges 5th Coronavirus Patient - Confirms 3 New Cases"
                  },
                  {
                    "DateTime": "2020-04-22 13:32:00",
                    "Country": "Japan",
                    "City": "Tokyo",
                    "Brief": "JAPAN - Tokyo Olympic Staffer Tests Positive For Coronavirus"
                  },
                  {
                    "DateTime": "2020-04-22 13:37:00",
                    "Country": "United States",
                    "City": "Aiken County, SC",
                    "Brief": "SOUTH CAROLINA - Second Aiken County Public Schools Employee Tests Positive For Coronavirus"
                  },
                  {
                    "DateTime": "2020-04-22 13:39:00",
                    "Country": "India",
                    "City": "Kannur, Kerala",
                    "Brief": "INDIA - Kannur COVID-19 Tally Keeps Escalating"
                  },
                  {
                    "DateTime": "2020-04-22 13:40:00",
                    "Country": "Sri Lanka",
                    "City": "Colombo",
                    "Brief": "SRI LANKA - Coronavirus Update - Sri Lankas Total Rises To 322 With 12 New Cases Today"
                  },
                  {
                    "DateTime": "2020-04-22 13:44:00",
                    "Country": "United States",
                    "City": "Orange County, CA",
                    "Brief": "CALIFORNIA - Orange County Expanding COVID-19 Testing As 29 More Cases Reported"
                  },
                  {
                    "DateTime": "2020-04-22 13:47:00",
                    "Country": "Bangladesh",
                    "City": "Magura",
                    "Brief": "BANGLADESH - First Coronavirus Patient Detected In Magura"
                  },
                  {
                    "DateTime": "2020-04-22 13:50:00",
                    "Country": "United States",
                    "City": "Nashville, TN",
                    "Brief": "TENNESSEE - Metro Health Dept Reports 1962 Cases Of COVID-19 In Nashville"
                  },
                  {
                    "DateTime": "2020-04-22 13:53:00",
                    "Country": "United States",
                    "City": "New Orleans, LA",
                    "Brief": "LOUISIANA - New Orleans RTA Operator Infected With COVID-19 - Hopes For More Protection"
                  },
                  {
                    "DateTime": "2020-04-22 13:55:00",
                    "Country": "United States",
                    "City": "Willmar, MN",
                    "Brief": "MINNESOTA - Jennie-O Turkey Plant In Willmar Reporting Coronavirus Outbreak"
                  },
                  {
                    "DateTime": "2020-04-22 13:58:00",
                    "Country": "Singapore",
                    "City": "Singapore City",
                    "Brief": "SINGAPORE - Singapore Confirms 1016 More Coronavirus Cases"
                  },
                  {
                    "DateTime": "2020-04-22 14:00:00",
                    "Country": "Japan",
                    "City": "Saiseikai Central Hospital, 1 Chome-4-17 Mita, Minato City, Tokyo",
                    "Brief": "JAPAN - Japanese Childrens Home Reports Eight Babies With Coronavirus"
                  },
                  {
                    "DateTime": "2020-04-22 14:02:00",
                    "Country": "Lebanon",
                    "City": "Baalbek",
                    "Brief": "LEBANON - Lebanon To Test For Coronavirus At Refugee Camp After First Case Found"
                  },
                  {
                    "DateTime": "2020-04-22 14:04:00",
                    "Country": "Philippines",
                    "City": "Manila",
                    "Brief": "PHILIPPINES - Philippines Records Nine New Coronavirus Deaths - 111 More Cases"
                  },
                  {
                    "DateTime": "2020-04-22 14:07:00",
                    "Country": "Malaysia",
                    "City": "Kuala Lumpur",
                    "Brief": "MALAYSIA - Malaysia Reports 50 New Coronavirus Cases - 1 Death"
                  },
                  {
                    "DateTime": "2020-04-22 14:09:00",
                    "Country": "India",
                    "City": "Karnataka, India",
                    "Brief": "INDIA - 7 More COVID-9 Cases In Karnataka - Count Rises To 425"
                  },
                  {
                    "DateTime": "2020-04-22 14:12:00",
                    "Country": "Belgium",
                    "City": "Brussels",
                    "Brief": "BELGIUM - COVID-19 Death Toll Exceeds 6000 In Belgium"
                  },
                  {
                    "DateTime": "2020-04-22 14:13:00",
                    "Country": "Bangladesh",
                    "City": "Dhaka",
                    "Brief": "BANGLADESH - Bangladesh Reports 390 New COVID-19 Cases - 10 More Deaths"
                  },
                  {
                    "DateTime": "2020-04-22 14:15:00",
                    "Country": "United States",
                    "City": "Middle Amana, IA",
                    "Brief": "IOWA - Amana Whirlpool To Temporarily Close - More Positive COVID-19 Cases"
                  },
                  {
                    "DateTime": "2020-04-22 14:17:00",
                    "Country": "Indonesia",
                    "City": "Jakarta",
                    "Brief": "INDONESIA - Indonesia Reports 283 New COVID-19 Cases"
                  },
                  {
                    "DateTime": "2020-04-22 14:20:00",
                    "Country": "Israel",
                    "City": "Jerusalem",
                    "Brief": "ISRAEL - COVID-19 Cases Surpass 14000 In Israel"
                  },
                  {
                    "DateTime": "2020-04-22 14:22:00",
                    "Country": "Afghanistan",
                    "City": "Kabul",
                    "Brief": "AFGHANISTAN - Afghanistan Reports 51 More COVID-19 Cases"
                  },
                  {
                    "DateTime": "2020-04-22 14:24:00",
                    "Country": "United States",
                    "City": "Denver International Airport (DEN), Peña Blvd, Denver, CO, USA",
                    "Brief": "COLORADO - 17 TSA Employees At DIA Test Positive For Coronavirus"
                  },
                  {
                    "DateTime": "2020-04-22 14:26:00",
                    "Country": "India",
                    "City": "New Delhi",
                    "Brief": "INDIA - Employee Tests COVID-19 Positive - Part Of Civil Aviation Ministrys Office Sealed"
                  },
                  {
                    "DateTime": "2020-04-23 05:00:00",
                    "Country": "United Kingdom",
                    "City": "Warrington hospital",
                    "Brief": "UNITED KINGDOM - 3 More Coronavirus Deaths At Warrington Hospital As Death Toll Passes 60"
                  },
                  {
                    "DateTime": "2020-04-23 05:02:00",
                    "Country": "Nigeria",
                    "City": "Oyo",
                    "Brief": "NIGERIA - Oyo Records First Coronavirus Death"
                  },
                  {
                    "DateTime": "2020-04-23 05:03:00",
                    "Country": "United Kingdom",
                    "City": "South Shields",
                    "Brief": "UNITED KINGDOM - 6 More Coronavirus Patients Die At South Tynesides Hospital Trust"
                  },
                  {
                    "DateTime": "2020-04-23 05:05:00",
                    "Country": "United States",
                    "City": "Albany, NY",
                    "Brief": "NEW YORK - Coronavirus Deaths At US Nursing Homes - Long-Term Facilities Reach Over 10000"
                  },
                  {
                    "DateTime": "2020-04-23 05:07:00",
                    "Country": "Nigeria",
                    "City": "Lagos",
                    "Brief": "NIGERIA - Coronavirus - Lagos Records Two More Deaths"
                  },
                  {
                    "DateTime": "2020-04-23 05:10:00",
                    "Country": "Pakistan",
                    "City": "Lahore",
                    "Brief": "PAKISTAN - 2 Coronavirus Patients Die At Mayo Hospital"
                  },
                  {
                    "DateTime": "2020-04-23 05:12:00",
                    "Country": "Kazakhstan",
                    "City": "Almaty",
                    "Brief": "KAZAKHSTAN - Coronavirus Claimed Life Of Patient In Almaty"
                  },
                  {
                    "DateTime": "2020-04-23 21:28:00",
                    "Country": "India",
                    "City": "New Delhi",
                    "Brief": "INDIA - 682 Dead In India - Over 21300 Cases Reported"
                  },
                  {
                    "DateTime": "2020-04-23 21:31:00",
                    "Country": "Bangladesh",
                    "City": "Dhaka",
                    "Brief": "BANGLADESH - Bangladeshs COVID-19 Tally Rises To 4186 - Death Toll At 127"
                  },
                  {
                    "DateTime": "2020-04-23 21:33:00",
                    "Country": "Israel",
                    "City": "Jerusalem",
                    "Brief": "ISRAEL - Israel Confirms 14592 COVID-19 Cases - 191 Deaths"
                  },
                  {
                    "DateTime": "2020-04-23 21:35:00",
                    "Country": "India",
                    "City": "Rajasthan, India",
                    "Brief": "INDIA - 49 More COVID-19 Cases In Rajasthan - State Tally Reaches 1937"
                  },
                  {
                    "DateTime": "2020-04-23 21:38:00",
                    "Country": "India",
                    "City": "Amaravathi, Andhra Pradesh, India",
                    "Brief": "INDIA - 80 More COVID-19 Cases In Andhra Pradesh - State Count Reaches 893"
                  },
                  {
                    "DateTime": "2020-04-23 21:40:00",
                    "Country": "United States",
                    "City": "Springfield, MA, USA",
                    "Brief": "MASSACHUSETTS - Springfield Sees Major Spike In Coronavirus Cases - 104 New COVID - 19 Cases Reporte"
                  },
                  {
                    "DateTime": "2020-04-23 21:42:00",
                    "Country": "Israel",
                    "City": "Jerusalem",
                    "Brief": "ISRAEL - Israel Confirms 14592 COVID-19 Cases - 191 Deaths"
                  },
                  {
                    "DateTime": "2020-04-23 21:44:00",
                    "Country": "Iran",
                    "City": "Tehran",
                    "Brief": "IRAN - Irans COVID-19 Cases Surpass 87000 - 5481 Deaths"
                  },
                  {
                    "DateTime": "2020-04-23 21:46:00",
                    "Country": "United States",
                    "City": "Salem, OR, USA",
                    "Brief": "OREGON - Oregon Reports 57 New Confirmed COVID-19 Cases"
                  },
                  {
                    "DateTime": "2020-04-23 21:48:00",
                    "Country": "United States",
                    "City": "Bakersfield, CA, USA",
                    "Brief": "CALIFORNIA - Bakersfield Starbucks Location Closed After Employee Was Diagnosed With COVID - 19"
                  },
                  {
                    "DateTime": "2020-04-24 04:52:00",
                    "Country": "United States",
                    "City": "Mecklenburg County, NC",
                    "Brief": "NORTH CAROLINA - Mecklenburg County - 1400 Cases - 8 Nursing Home Residents Have Died From Coronavir"
                  },
                  {
                    "DateTime": "2020-04-24 04:53:00",
                    "Country": "Kyrgyzstan",
                    "City": "Almaty",
                    "Brief": "KYRGYZSTAN - Another Coronavirus Patient Dies In Almaty"
                  },
                  {
                    "DateTime": "2020-04-24 04:55:00",
                    "Country": "United Kingdom",
                    "City": "Lincolnshire",
                    "Brief": "UNITED KINGDOM - Five More People Die From Coronavirus At Lincolnshire Hospitals"
                  },
                  {
                    "DateTime": "2020-04-24 04:57:00",
                    "Country": "United States",
                    "City": "Chicago, IL",
                    "Brief": "ILLINOIS - Latest Coronavirus News - Illinois Has Seen 2 Of Its Highest 3 Single-Day Increases In 48"
                  },
                  {
                    "DateTime": "2020-04-24 05:03:00",
                    "Country": "United Kingdom",
                    "City": "Yorkshire",
                    "Brief": "UNITED KINGDOM - 46 More Coronavirus Deaths In Yorkshire As Latest Figures Released By Area"
                  },
                  {
                    "DateTime": "2020-04-24 05:08:00",
                    "Country": "Canada",
                    "City": "Quebec",
                    "Brief": "CANADA - Quebec Officials To Provide Update As Coronavirus Cases - Deaths Continue To Rise"
                  },
                  {
                    "DateTime": "2020-04-24 05:10:00",
                    "Country": "Belgium",
                    "City": "Brussels",
                    "Brief": "BELGIUM - Coronavirus - 190 New Deaths - 210 Hospital Admissions In Belgium"
                  },
                  {
                    "DateTime": "2020-04-24 05:11:00",
                    "Country": "United States",
                    "City": "Washington DC",
                    "Brief": "DISTRICT OF COLUMBIA - US Coronavirus Cases Surpass 880000 With More Than 50000 Deaths"
                  },
                  {
                    "DateTime": "2020-04-24 05:12:00",
                    "Country": "Canada",
                    "City": "Ottawa",
                    "Brief": "CANADA - Canadas Coronavirus Death Toll Passes 2000"
                  },
                  {
                    "DateTime": "2020-04-24 05:13:00",
                    "Country": "United Kingdom",
                    "City": "London",
                    "Brief": "UNITED KINGDOM - Englands COVID-19 Hospital Death Toll Rises By 587 To 17373"
                  },
                  {
                    "DateTime": "2020-04-24 05:14:00",
                    "Country": "New Zealand",
                    "City": "Christchurch",
                    "Brief": "NEW ZEALAND - Tenth Rosewood Rest Home Resident Dies Of Covid-19"
                  },
                  {
                    "DateTime": "2020-04-24 21:49:00",
                    "Country": "Canada",
                    "City": "Ottawa",
                    "Brief": "CANADA - Canadas Coronavirus Death Toll Passes 2000"
                  },
                  {
                    "DateTime": "2020-04-24 21:51:00",
                    "Country": "United States",
                    "City": "Albany, NY, USA",
                    "Brief": "NEW YORK - Rapper Dies Aged 35 After Contracting Coronavirus"
                  },
                  {
                    "DateTime": "2020-04-24 21:55:00",
                    "Country": "India",
                    "City": "Amaravathi, Andhra Pradesh, India",
                    "Brief": "INDIA - 2 Deaths - 62 More COVID-19 Cases In Andhra Pradesh"
                  },
                  {
                    "DateTime": "2020-04-24 21:58:00",
                    "Country": "United States",
                    "City": "St. Joseph County, IN, USA",
                    "Brief": "INDIANA - St Joseph County County Records 29 New Confirmed Coronavirus Cases And 13th Death"
                  },
                  {
                    "DateTime": "2020-04-24 22:00:00",
                    "Country": "United States",
                    "City": "Boise, ID, USA",
                    "Brief": "IDAHO - Idaho Coronavirus Death Count Increases Again"
                  },
                  {
                    "DateTime": "2020-04-24 22:02:00",
                    "Country": "United States",
                    "City": "Kalamazoo County, MI, USA",
                    "Brief": "MICHIGAN - Daily Coronavirus Cases Swing Back Up - Total 229 In Kalamazoo County"
                  },
                  {
                    "DateTime": "2020-04-24 22:04:00",
                    "Country": "United States",
                    "City": "Indianapolis, IN, USA",
                    "Brief": "INDIANA - An Indiana Prison Tested Hundreds Of Inmates For Coronavirus AND 92 Percent Came Back Posi"
                  },
                  {
                    "DateTime": "2020-04-24 22:09:00",
                    "Country": "United States",
                    "City": "Tyson Foods Inc, West Jackson Street, Shelbyville, TN, USA",
                    "Brief": "TENNESSEE - Shelbyville Tyson Plant With Covid-19 Cluster To Shut Down For Cleaning"
                  },
                  {
                    "DateTime": "2020-04-25 21:37:00",
                    "Country": "United States",
                    "City": "Trenton, NJ, USA",
                    "Brief": "NEW JERSEY - NJ Coronavirus Cases Increase To 102196 - With 5617 Deaths Reported Statewide - 3047 Ne"
                  },
                  {
                    "DateTime": "2020-04-25 21:40:00",
                    "Country": "United States",
                    "City": "Lansing, MI, USA",
                    "Brief": "MICHIGAN - 3085 Deaths - 36641 Cases Of Coronavirus Confirmed In Michigan"
                  },
                  {
                    "DateTime": "2020-04-25 21:42:00",
                    "Country": "United States",
                    "City": "Washington DC, DC, USA",
                    "Brief": "DISTRICT OF COLUMBIA - Coronavirus Deaths Tops 50000 In US - More Than Any Other Country"
                  },
                  {
                    "DateTime": "2020-04-25 21:51:00",
                    "Country": "Thailand",
                    "City": "Bangkok",
                    "Brief": "THAILAND - Thailand Reports 53 New Cases - One New Death"
                  },
                  {
                    "DateTime": "2020-04-25 21:57:00",
                    "Country": "Sri Lanka",
                    "City": "Colombo, Sri Lanka",
                    "Brief": "SRI LANKA - 29 Lanka Navy Personnel Test Positive For Coronavirus"
                  },
                  {
                    "DateTime": "2020-04-25 22:03:00",
                    "Country": "India",
                    "City": "Pondicherry, Puducherry, India",
                    "Brief": "INDIA - One More Tests Positive In Pondy - Tally Rises To 4"
                  },
                  {
                    "DateTime": "2020-04-25 22:06:00",
                    "Country": "India",
                    "City": "Karnataka, India",
                    "Brief": "INDIA - Journalist Among 15 New COVID-19 Cases In Karnataka"
                  },
                  {
                    "DateTime": "2020-04-25 22:12:00",
                    "Country": "India",
                    "City": "Firozabad, Uttar Pradesh, India",
                    "Brief": "INDIA - 7 New COVID-19 Patients In Firozabad - Total Cases Rise To 78"
                  },
                  {
                    "DateTime": "2020-04-25 22:16:00",
                    "Country": "India",
                    "City": "Rajasthan, India",
                    "Brief": "INDIA - 27 New COVID19 Positive Cases In Rajasthan"
                  },
                  {
                    "DateTime": "2020-04-25 22:32:00",
                    "Country": "United States",
                    "City": "Tallahassee, FL",
                    "Brief": "FLORIDA - 30839 Cases Of COVID-19 In Florida - 1055 Deaths In The State"
                  },
                  {
                    "DateTime": "2020-04-25 22:34:00",
                    "Country": "India",
                    "City": "Kaimur, Bihar, India",
                    "Brief": "INDIA - Kaimur - COVID19 Cases Rise To 238 In Bihar"
                  },
                  {
                    "DateTime": "2020-04-25 22:44:00",
                    "Country": "Singapore",
                    "City": "Singapore City",
                    "Brief": "SINGAPORE - Singapore Reports 618 New Coronavirus Cases"
                  },
                  {
                    "DateTime": "2020-04-25 22:47:00",
                    "Country": "India",
                    "City": "Uttar Pradesh, India",
                    "Brief": "INDIA - Total 1778 COVID19 Positive Cases In UP"
                  },
                  {
                    "DateTime": "2020-04-25 22:49:00",
                    "Country": "India",
                    "City": "Buxar, Bihar, India",
                    "Brief": "INDIA - Buxar - COVID19 Cases Rise To 238 In Bihar"
                  },
                  {
                    "DateTime": "2020-04-25 22:51:00",
                    "Country": "India",
                    "City": "Maharashtra, India",
                    "Brief": "INDIA - 15 More Cases In Maharashtra"
                  },
                  {
                    "DateTime": "2020-04-26 22:14:00",
                    "Country": "Iran",
                    "City": "Tehran",
                    "Brief": "IRAN - Iran Says Death Toll Rises By 60 To 5710"
                  },
                  {
                    "DateTime": "2020-04-26 22:16:00",
                    "Country": "Netherlands",
                    "City": "Amsterdam",
                    "Brief": "NETHERLANDS - Dutch Cases Rise By 655 To 37845 With 66 New Deaths - Authorities"
                  },
                  {
                    "DateTime": "2020-04-26 22:18:00",
                    "Country": "Turkey",
                    "City": "Ankara",
                    "Brief": "TURKEY - Turkeys Death Toll Rises To 2706"
                  },
                  {
                    "DateTime": "2020-04-26 22:21:00",
                    "Country": "France",
                    "City": "Paris",
                    "Brief": "FRANCE - Death Toll Rises To 22614 In France"
                  },
                  {
                    "DateTime": "2020-04-26 22:23:00",
                    "Country": "India",
                    "City": "Srinagar",
                    "Brief": "INDIA - 1 More Coronavirus Patient Dies In IOK"
                  },
                  {
                    "DateTime": "2020-04-26 22:28:00",
                    "Country": "Malta",
                    "City": "Mater Dei Hospital",
                    "Brief": "MALTA - Woman Is Fourth Coronavirus Patient To Die"
                  },
                  {
                    "DateTime": "2020-04-26 22:30:00",
                    "Country": "United States",
                    "City": "Montgomery, AL",
                    "Brief": "ALABAMA - Over 200 Killed - 6200 Confirmed COVID-19 Cases In Alabama"
                  },
                  {
                    "DateTime": "2020-04-26 22:34:00",
                    "Country": "Nigeria",
                    "City": "Ondo",
                    "Brief": "NIGERIA - Ondo Records Fourth COVID-19 Case"
                  },
                  {
                    "DateTime": "2020-04-26 22:35:00",
                    "Country": "United States",
                    "City": "Hempstead, NY",
                    "Brief": "NEW YORK - Nassau Coronavirus Cases By Community - Hempstead Reaches 1600"
                  },
                  {
                    "DateTime": "2020-04-26 22:39:00",
                    "Country": "United States",
                    "City": "Ivy Hall Nursing Home, South Watauga Avenue, Elizabethton, TN",
                    "Brief": "TENNESSEE - Ivy Hall Nursing Home Releases Statement After Three Employees Test Positive For COVID-1"
                  },
                  {
                    "DateTime": "2020-04-26 22:41:00",
                    "Country": "United States",
                    "City": "Iowa Veterans Home, Summit Street, Marshalltown, IA",
                    "Brief": "IOWA - Iowa Veterans Home Reports Positive Coronavirus Case"
                  },
                  {
                    "DateTime": "2020-04-26 22:43:00",
                    "Country": "United States",
                    "City": "Monroe, NJ",
                    "Brief": "NEW JERSEY - Monroe Reports 15 New Positive Covid-19 Cases"
                  },
                  {
                    "DateTime": "2020-04-26 22:45:00",
                    "Country": "Sri Lanka",
                    "City": "Colombo",
                    "Brief": "SRI LANKA - Coronavirus Cases In Sri Lanka Reach 460"
                  },
                  {
                    "DateTime": "2020-04-26 22:47:00",
                    "Country": "United States",
                    "City": "Brevard, FL",
                    "Brief": "FLORIDA - Coronavirus In Brevard - April 25 Cases At 250 - 8 Deaths"
                  },
                  {
                    "DateTime": "2020-04-26 22:49:00",
                    "Country": "United States",
                    "City": "Raleigh, NC",
                    "Brief": "NORTH CAROLINA - Coronavirus Live Updates: Heres What To Know In North Carolina On April 25"
                  },
                  {
                    "DateTime": "2020-04-26 22:56:00",
                    "Country": "India",
                    "City": "Andhra Pradesh, India",
                    "Brief": "INDIA - 81 New Positive Cases Reported In The Last 24 Hours In Andhra Pradesh"
                  },
                  {
                    "DateTime": "2020-04-26 22:58:00",
                    "Country": "India",
                    "City": "Uttarakhand, India",
                    "Brief": "INDIA - Number Of Covid-19 Cases Touch 50 In Uttarakhand"
                  },
                  {
                    "DateTime": "2020-04-26 23:01:00",
                    "Country": "Canada",
                    "City": "Ontario, Canada",
                    "Brief": "CANADA - Ontario Reports 437 New Coronavirus Cases - 24 Deaths As Total Cases Top 14400"
                  },
                  {
                    "DateTime": "2020-04-26 23:02:00",
                    "Country": "India",
                    "City": "Karnataka, India",
                    "Brief": "INDIA - Karnataka Cases Now 503 - Death Toll 19"
                  },
                  {
                    "DateTime": "2020-04-26 23:04:00",
                    "Country": "India",
                    "City": "Jharkhand, India",
                    "Brief": "INDIA - 9 More Cases In Jharkhand - Total Reaches 82"
                  },
                  {
                    "DateTime": "2020-04-26 23:06:00",
                    "Country": "India",
                    "City": "Maharashtra, India",
                    "Brief": "INDIA - Maharashtra Cases Reach 8068 - Death Toll 342"
                  },
                  {
                    "DateTime": "2020-04-26 23:09:00",
                    "Country": "India",
                    "City": "Tamil Nadu, India",
                    "Brief": "INDIA - Tamil Nadu Cases Now 1885 - Death Toll 24"
                  },
                  {
                    "DateTime": "2020-04-26 23:11:00",
                    "Country": "India",
                    "City": "Kerala, India",
                    "Brief": "INDIA - 11 New COVID-19 Cases In Kerala - Hotspots Now 87"
                  },
                  {
                    "DateTime": "2020-04-26 23:14:00",
                    "Country": "Netherlands",
                    "City": "Amsterdam",
                    "Brief": "NETHERLANDS - Minks Found To Be Infected On Two Dutch Farms"
                  },
                  {
                    "DateTime": "2020-04-27 21:41:00",
                    "Country": "Israel",
                    "City": "Mayanei Hayeshua Medical Center, HaRav David Povarski Street, Bnei Brak, Israel",
                    "Brief": "ISRAEL - Israel Records 15466 COVID-19 Cases - 202 Deaths"
                  },
                  {
                    "DateTime": "2020-04-27 21:43:00",
                    "Country": "United States",
                    "City": "Richmond, VA, USA",
                    "Brief": "VIRGINIA - Virginia Department Of Health Reports 12970 Coronavirus Cases - 448 Deaths"
                  },
                  {
                    "DateTime": "2020-04-27 21:47:00",
                    "Country": "Singapore",
                    "City": "Singapore City",
                    "Brief": "SINGAPORE - Coronavirus - 931 New Cases - Of Which 15 Are Sporeans And PRs - Experts Say Too Early T"
                  },
                  {
                    "DateTime": "2020-04-27 21:49:00",
                    "Country": "United States",
                    "City": "Raleigh, NC, USA",
                    "Brief": "NORTH CAROLINA - Number Of Coronavirus Cases In North Carolina Now At 8830"
                  },
                  {
                    "DateTime": "2020-04-27 21:51:00",
                    "Country": "United States",
                    "City": "Denver, CO, USA",
                    "Brief": "COLORADO - Colorado Coronavirus Latest - April 26"
                  },
                  {
                    "DateTime": "2020-04-27 21:53:00",
                    "Country": "China",
                    "City": "Beijing",
                    "Brief": "CHINA - Chinese Mainland Reports 107 COVID-19 Cases With Imported Case Links - Official"
                  },
                  {
                    "DateTime": "2020-04-27 21:55:00",
                    "Country": "Russia",
                    "City": "Moscow",
                    "Brief": "RUSSIA - Russias COVID-19 Cases Grow By 6198 To 87147"
                  },
                  {
                    "DateTime": "2020-04-27 21:57:00",
                    "Country": "Japan",
                    "City": "Tokyo",
                    "Brief": "JAPAN - COVID-19 Cases In Japan Rise To 13585"
                  },
                  {
                    "DateTime": "2020-04-27 22:01:00",
                    "Country": "Ukraine",
                    "City": "Kiev",
                    "Brief": "UKRAINE - Ukraine COVID-19 Cases Exceed 9000"
                  },
                  {
                    "DateTime": "2020-04-27 22:03:00",
                    "Country": "Kenya",
                    "City": "Nairobi",
                    "Brief": "KENYA - Kenya Confirms 8 New COVID-19 Cases As Tally Hits 363"
                  },
                  {
                    "DateTime": "2020-04-27 22:04:00",
                    "Country": "Lebanon",
                    "City": "Beirut",
                    "Brief": "LEBANON - Lebanons Number Of COVID-19 Infections Rises To 710"
                  },
                  {
                    "DateTime": "2020-04-27 22:06:00",
                    "Country": "Kazakhstan",
                    "City": "Astana",
                    "Brief": "KAZAKHSTAN - Kazakhstan Extends State Of Emergency Until May 11"
                  },
                  {
                    "DateTime": "2020-04-27 22:09:00",
                    "Country": "Belarus",
                    "City": "Minsk",
                    "Brief": "BELARUS - Belarus COVID-19 Cases Surpass 11000"
                  },
                  {
                    "DateTime": "2020-04-27 22:16:00",
                    "Country": "China",
                    "City": "Beijing",
                    "Brief": "GLOBAL - Latest Count Of Confirmed COVID-19 Cases Worldwide At 1000 GMT - April 27 - 2981592"
                  },
                  {
                    "DateTime": "2020-04-28 20:39:00",
                    "Country": "United Kingdom",
                    "City": "London",
                    "Brief": "UNITED KINGDOM - Another 360 COVID-19 Patients Die In UK Hospitals: Health Secretary"
                  },
                  {
                    "DateTime": "2020-04-28 20:41:00",
                    "Country": "Israel",
                    "City": "Jerusalem",
                    "Brief": "ISRAEL - Israel Confirms 15555 COVID-19 cases - 204 Deaths"
                  },
                  {
                    "DateTime": "2020-04-28 20:43:00",
                    "Country": "Indonesia",
                    "City": "Jakarta",
                    "Brief": "INDONESIA - Indonesia Reports 415 New COVID-19 Cases - 8 New Deaths"
                  },
                  {
                    "DateTime": "2020-04-28 20:45:00",
                    "Country": "Iran",
                    "City": "Tehran",
                    "Brief": "IRAN - Iran Reports 1112 New Covid-19 Cases - 71 More Deaths"
                  },
                  {
                    "DateTime": "2020-04-28 20:47:00",
                    "Country": "United States",
                    "City": "Columbia, SC,USA",
                    "Brief": "SOUTH CAROLINA - Coronavirus Updates In SC - DHEC Reports 142 New Cases - 3 More Deaths"
                  },
                  {
                    "DateTime": "2020-04-28 20:49:00",
                    "Country": "United States",
                    "City": "Lansing, MI, USA",
                    "Brief": "MICHIGAN - 3407 Deaths - 38210 Cases Of Coronavirus Confirmed In Michigan"
                  },
                  {
                    "DateTime": "2020-04-28 20:51:00",
                    "Country": "United Kingdom",
                    "City": "London",
                    "Brief": "UNITED KINGDOM - Coronavirus - 329 More COVID-19 Deaths In England Hospitals - Lowest Daily Rise In"
                  },
                  {
                    "DateTime": "2020-04-28 20:54:00",
                    "Country": "France",
                    "City": "Paris",
                    "Brief": "FRANCE - France Reports The Most New Coronavirus Cases Since April 18"
                  },
                  {
                    "DateTime": "2020-04-28 20:57:00",
                    "Country": "United States",
                    "City": "Concord, NH, USA",
                    "Brief": "NEW HAMPSHIRE - 75 New NH Cases - 3 New Care Facility Outbreaks - 5 New Testing Sites"
                  },
                  {
                    "DateTime": "2020-04-28 20:58:00",
                    "Country": "Philippines",
                    "City": "Manila",
                    "Brief": "PHILIPPINES - COVID-19 Cases In Philippines Inch Closer To 8000"
                  },
                  {
                    "DateTime": "2020-04-28 21:05:00",
                    "Country": "Sierra Leone",
                    "City": "Freetown",
                    "Brief": "SIERRA LEONEA - Sierra Leonean Tests Positive For Covid-19 In Custody"
                  },
                  {
                    "DateTime": "2020-04-28 21:06:00",
                    "Country": "Bangladesh",
                    "City": "Dhaka",
                    "Brief": "BANGLADESH - Bangladesh Reports Record Jump In COVID-19 Cases"
                  },
                  {
                    "DateTime": "2020-04-28 21:08:00",
                    "Country": "Belarus",
                    "City": "Minsk",
                    "Brief": "BELARUS - Belarus COVID-19 Cases Surpass 12000"
                  },
                  {
                    "DateTime": "2020-04-28 21:10:00",
                    "Country": "Afghanistan",
                    "City": "Kabul",
                    "Brief": "AFGHANISTAN - Afghanistan Reports 125 New COVID-19 Cases - Tally At 1828"
                  },
                  {
                    "DateTime": "2020-04-28 21:11:00",
                    "Country": "Brunei",
                    "City": "Bandar Seri Begawan",
                    "Brief": "BRUNEI - Brunei Reports No New Covid-19 Cases For 9 Straight Days"
                  },
                  {
                    "DateTime": "2020-04-28 21:16:00",
                    "Country": "Greece",
                    "City": "Athens",
                    "Brief": "GREECE - Greece Reports 2 New COVID-19 Deaths Within 24 Hours - Bringing Total To 136"
                  },
                  {
                    "DateTime": "2020-04-28 21:19:00",
                    "Country": "United Arab Emirates",
                    "City": "Abu Dhabi",
                    "Brief": "UNITED ARAB EMIRATES - 490 New COVID-19 Cases Reported In UAE - 10839 In Total"
                  },
                  {
                    "DateTime": "2020-04-28 21:22:00",
                    "Country": "Iraq",
                    "City": "Baghdad",
                    "Brief": "IRAQ - Iraq Reports 27 New COVID-19 Cases - 1847 In Total"
                  },
                  {
                    "DateTime": "2020-04-28 21:23:00",
                    "Country": "Oman",
                    "City": "Muscat",
                    "Brief": "OMAN - Oman Reports 51 New COVID-19 Cases - 2049 In Total"
                  },
                  {
                    "DateTime": "2020-04-28 21:25:00",
                    "Country": "Sudan",
                    "City": "Khartoum",
                    "Brief": "SUDAN - Sudan Announces 38 New COVID-19 Cases - 275 In Total"
                  },
                  {
                    "DateTime": "2020-04-28 21:27:00",
                    "Country": "Tunisia",
                    "City": "Tunis",
                    "Brief": "TUNISIA - 18 New COVID-19 Cases Confirmed In Tunisia - 967 In Total"
                  },
                  {
                    "DateTime": "2020-04-28 21:46:00",
                    "Country": "China",
                    "City": "Beijing",
                    "Brief": "GLOBAL - Global COVID-19 Cases Top 3 mln -- Johns Hopkins University"
                  },
                  {
                    "DateTime": "2020-04-28 21:48:00",
                    "Country": "Uganda",
                    "City": "Kampala",
                    "Brief": "UGANDA - Uganda Repatriates 14 Virus-Positive Cross-Border Cargo Truck Drivers"
                  },
                  {
                    "DateTime": "2020-04-28 21:51:00",
                    "Country": "Maldives",
                    "City": "Male",
                    "Brief": "MALDIVES - COVID-19 Cases In Maldives Reach 226"
                  },
                  {
                    "DateTime": "2020-04-28 21:53:00",
                    "Country": "Russia",
                    "City": "Moscow",
                    "Brief": "RUSSIA - Russia Reports 6411 New COVID-19 Cases - Total Reaches 93558"
                  },
                  {
                    "DateTime": "2020-04-29 02:25:00",
                    "Country": "United States",
                    "City": "Wichita, KS",
                    "Brief": "KANSAS - COVID-19 Cluster At Wichita Care Home Involves 36 Cases - 2 Deaths"
                  },
                  {
                    "DateTime": "2020-04-29 02:26:00",
                    "Country": "Saudi Arabia",
                    "City": "Riyadh",
                    "Brief": "SAUDI ARABIA - Saudi Arabia Confirms 1325 New Cases - 5 Deaths"
                  },
                  {
                    "DateTime": "2020-04-29 02:28:00",
                    "Country": "Canada",
                    "City": "Pickering",
                    "Brief": "CANADA - 47 Coronavirus-Related Deaths Reported At Pickering Long-Term Care Home"
                  },
                  {
                    "DateTime": "2020-04-29 21:17:00",
                    "Country": "Bangladesh",
                    "City": "Dhaka",
                    "Brief": "BANGLADESH - 8 More Die As Bangladesh Again Records Highest Number Of New Cases In 24 Hours"
                  },
                  {
                    "DateTime": "2020-04-29 21:19:00",
                    "Country": "Indonesia",
                    "City": "Jakarta",
                    "Brief": "INDONESIA - Indonesia Reports 260 New Confirmed Cases Of COVID-19 - 11 New Deaths"
                  },
                  {
                    "DateTime": "2020-04-29 21:22:00",
                    "Country": "India",
                    "City": "New Delhi",
                    "Brief": "INDIA - COVID-19 Deaths In India Cross 1000 Mark - Cases Surpass 30000"
                  },
                  {
                    "DateTime": "2020-04-29 21:23:00",
                    "Country": "India",
                    "City": "New Delhi",
                    "Brief": "INDIA - COVID - 19 Cases In India Cross 31000 - Death Toll At 1007 - State - Wise Tally"
                  },
                  {
                    "DateTime": "2020-04-29 21:26:00",
                    "Country": "United Kingdom",
                    "City": "London",
                    "Brief": "UNITED KINGDOM - UK Says Some Children Have Died From Syndrome Linked To COVID - 19"
                  },
                  {
                    "DateTime": "2020-04-29 21:29:00",
                    "Country": "Peru",
                    "City": "Lima",
                    "Brief": "PERU - Death Toll In Peru Prison Riot Over Coronavirus Demands Rises To Nine"
                  },
                  {
                    "DateTime": "2020-04-29 21:32:00",
                    "Country": "Germany",
                    "City": "Berlin",
                    "Brief": "GERMANY - Germany Reports 1304 More Coronavirus Cases - 202 More Deaths"
                  },
                  {
                    "DateTime": "2020-04-29 21:36:00",
                    "Country": "United States",
                    "City": "Lenoir County, NC, USA",
                    "Brief": "NORTH CAROLINA - Lenoir County Confirms 14 More Cases Of COVID - 19"
                  },
                  {
                    "DateTime": "2020-04-29 21:38:00",
                    "Country": "Mongolia",
                    "City": "Ulaanbaatar",
                    "Brief": "MONGOLIA - Mongolia Reports No New COVID-19 Cases"
                  },
                  {
                    "DateTime": "2020-04-29 21:40:00",
                    "Country": "Laos",
                    "City": "Vientiane",
                    "Brief": "LAOS - Laos Reports No New Case Of COVID-19 - 1 More Recovery"
                  },
                  {
                    "DateTime": "2020-04-29 21:42:00",
                    "Country": "Italy",
                    "City": "Rome",
                    "Brief": "ITALY - Italys Tops 200000 Coronavirus Cases - Daily Death Toll Rises"
                  },
                  {
                    "DateTime": "2020-04-29 21:44:00",
                    "Country": "Russia",
                    "City": "Moscow",
                    "Brief": "RUSSIA - Russias COVID - 19 Cases Near 100000"
                  },
                  {
                    "DateTime": "2020-04-29 21:48:00",
                    "Country": "Philippines",
                    "City": "Manila",
                    "Brief": "PHILIPPINES - COVID - 19 Cases In Philippines Surpass 8000 With 254 New Cases"
                  }
                ]
              },
              {
                "Name": "Dengue / Hemorrhagic Fever",
                "is_checked" : true,
                "Cases": [
                  {
                    "DateTime": "2020-04-02 04:25:00",
                    "Country": "Argentina",
                    "City": "Buenos Aires",
                    "Brief": "ARGENTINA - Mendez Confirmed 374 Dengue Cases At The Spa"
                  },
                  {
                    "DateTime": "2020-04-04 00:39:00",
                    "Country": "Argentina",
                    "City": "Brinkmann",
                    "Brief": "ARGENTINA - Dengue Cases In Brinkmann Total 52"
                  },
                  {
                    "DateTime": "2020-04-04 00:48:00",
                    "Country": "Brazil",
                    "City": "Moji-Mirim",
                    "Brief": "BRAZIL - Mogi Mirim Records 1235 Dengue Cases - City ​​Has 1 Death From Illness"
                  },
                  {
                    "DateTime": "2020-04-04 00:53:00",
                    "Country": "Reunion",
                    "City": "Saint-Denis",
                    "Brief": "REUNION - 2 Deaths From Dengue Fever In Reunion"
                  },
                  {
                    "DateTime": "2020-04-07 03:41:00",
                    "Country": "Indonesia",
                    "City": "Jakarta",
                    "Brief": "INDONESIA - Dengue Fever Claims 254 Indonesian Lives Amid COVID-19 Outbreak"
                  },
                  {
                    "DateTime": "2020-04-10 22:53:00",
                    "Country": "Thailand",
                    "City": "Bangkok",
                    "Brief": "THAILAND - Thai Dengue Fever Infections Rise To 8147 In Three Provinces"
                  },
                  {
                    "DateTime": "2020-04-10 22:55:00",
                    "Country": "Brazil",
                    "City": "Aracatuba",
                    "Brief": "BRAZIL - Aracatuba Records 246 Dengue Cases In Less Than A Week"
                  },
                  {
                    "DateTime": "2020-04-10 22:58:00",
                    "Country": "Brazil",
                    "City": "Jundiai",
                    "Brief": "BRAZIL - Dengue - Jundiai Records 57 Confirmed Cases"
                  },
                  {
                    "DateTime": "2020-04-11 02:09:00",
                    "Country": "Indonesia",
                    "City": "North Maluku",
                    "Brief": "INDONESIA - Dengue Fever Kills At Least Six People In North Maluku"
                  },
                  {
                    "DateTime": "2020-04-11 02:15:00",
                    "Country": "Bangladesh",
                    "City": "Dhaka",
                    "Brief": "BANGLADESH - One New Dengue Patient In Last 24 Hrs - DGHS"
                  },
                  {
                    "DateTime": "2020-04-12 00:40:00",
                    "Country": "India",
                    "City": "Wanaparthy",
                    "Brief": "INDIA - 38 Dengue Cases Reported In Wanaparthy"
                  },
                  {
                    "DateTime": "2020-04-12 02:23:00",
                    "Country": "Brazil",
                    "City": "Santa Maria",
                    "Brief": "BRAZIL - Santa Maria Has 20 Confirmed Cases Of Dengue"
                  },
                  {
                    "DateTime": "2020-04-14 05:59:00",
                    "Country": "Bangladesh",
                    "City": "Dhaka",
                    "Brief": "BANGLADESH - Three Hospitalised With Dengue In 24 Hours"
                  },
                  {
                    "DateTime": "2020-04-14 06:01:00",
                    "Country": "Brazil",
                    "City": "Chapeco",
                    "Brief": "BRAZIL - Chapeco Accounts For 36 Confirmed Dengue Cases"
                  },
                  {
                    "DateTime": "2020-04-18 04:18:00",
                    "Country": "Argentina",
                    "City": "Jujuy",
                    "Brief": "ARGENTINA - Dengue - More Than 1300 Confirmed Cases In Jujuy"
                  },
                  {
                    "DateTime": "2020-04-19 00:40:00",
                    "Country": "Argentina",
                    "City": "Tucuman",
                    "Brief": "ARGENTINA - 824 Dengue Cases Confirmed In Tucuman"
                  },
                  {
                    "DateTime": "2020-04-21 22:52:00",
                    "Country": "Argentina",
                    "City": "Santiago del Estero",
                    "Brief": "ARGENTINA - Confirm That There Are 700 Cases Of Dengue In The Province"
                  },
                  {
                    "DateTime": "2020-04-21 22:54:00",
                    "Country": "Bangladesh",
                    "City": "Dhaka",
                    "Brief": "BANGLADESH - One New Dengue Case Reported In 24 Hours"
                  },
                  {
                    "DateTime": "2020-04-25 00:03:00",
                    "Country": "Mayotte",
                    "City": "Mamoudzou",
                    "Brief": "MAYOTTE - Dengue Fever In Mayotte - More Than 3500 Cases Reported To Date"
                  },
                  {
                    "DateTime": "2020-04-25 00:07:00",
                    "Country": "Argentina",
                    "City": "Tucuman",
                    "Brief": "ARGENTINA - Confirmed 1097 Cases Of The Disease In Tucuman"
                  },
                  {
                    "DateTime": "2020-04-27 22:41:00",
                    "Country": "Brazil",
                    "City": "Araraquara",
                    "Brief": "BRAZIL - Araraquara Has 139 Dengue Cases In 2020"
                  },
                  {
                    "DateTime": "2020-04-28 00:04:00",
                    "Country": "Argentina",
                    "City": "Tucuman",
                    "Brief": "ARGENTINA - Dengue In Tucuman - The Number Of Infected Amounts To 1227"
                  },
                  {
                    "DateTime": "2020-04-28 00:08:00",
                    "Country": "Brazil",
                    "City": "Pauliceia",
                    "Brief": "BRAZIL - 82-Year-Old Man Is The Second Dengue Death Recorded In Pauliceia"
                  },
                  {
                    "DateTime": "2020-04-28 23:58:00",
                    "Country": "Brazil",
                    "City": "State Of Minas Gerais",
                    "Brief": "BRAZIL - Probable Dengue Cases Grow In The Main Cities Of The Triangle - Alto Paranaiba And Northwes"
                  }
                ]
              },
              {
                "Name": "Ebola / Marburg",
                "is_checked" : true,
                "Cases": [
                  {
                    "DateTime": "2020-04-11 23:52:00",
                    "Country": "Congo (Kinshasa)",
                    "City": "Kinshasa",
                    "Brief": "DEMOCRATIC REPUBLIC OF CONGO - Congo Records Second Ebola Death In Days - WHO"
                  },
                  {
                    "DateTime": "2020-04-17 04:48:00",
                    "Country": "Congo (Kinshasa)",
                    "City": "Kinshasa",
                    "Brief": "DEMOCRATIC REPUBLIC OF CONGO - Congo records five new Ebola cases, shelves declaration of end to epi"
                  },
                  {
                    "DateTime": "2020-04-18 04:00:00",
                    "Country": "Congo (Kinshasa)",
                    "City": "Kinshasa",
                    "Brief": "DEMOCRATIC REPUBLIC OF CONGO - 5 New Ebola Cases In Congo"
                  }
                ]
              },
              {
                "Name": "Foot-And-Mouth Disease",
                "is_checked" : true,
                "Cases": [
                  {
                    "DateTime": "2020-04-11 02:20:00",
                    "Country": "India",
                    "City": "Manipur",
                    "Brief": "INDIA - Outbreak Of Foot And Mouth Disease Reported In Manipur"
                  }
                ]
              },
              {
                "Name": "H7N9 / H5N1 / H5N2 / H7N1 / H7N3 / H7N7 / H5N8",
                "is_checked" : true,
                "Cases": [
                  {
                    "DateTime": "2020-04-10 00:05:00",
                    "Country": "United States",
                    "City": "Chesterfield County, SC",
                    "Brief": "SOUTH CAROLINA - Bird Flu Reported In Commercial Turkey Flock In South Carolina"
                  },
                  {
                    "DateTime": "2020-04-14 05:57:00",
                    "Country": "United States",
                    "City": "Jefferson, SC",
                    "Brief": "SOUTH CAROLINA - Fatal Bird Flu Strikes Flock In Jefferson"
                  },
                  {
                    "DateTime": "2020-04-24 00:24:00",
                    "Country": "India",
                    "City": "Nawada",
                    "Brief": "INDIA - Bird Flu In Bihars Nawada District"
                  }
                ]
              },
              {
                "Name": "Lassa Fever",
                "is_checked" : true,
                "Cases": [
                  {
                    "DateTime": "2020-04-02 03:22:00",
                    "Country": "Nigeria",
                    "City": "Abuja",
                    "Brief": "NIGERIA - Lassa Fever - Nigerias Death Toll Reaches 185"
                  },
                  {
                    "DateTime": "2020-04-10 23:59:00",
                    "Country": "Nigeria",
                    "City": "Abuja",
                    "Brief": "NIGERIA - Lassa Fever Kills Three As Nigeria Records 12 New Cases"
                  },
                  {
                    "DateTime": "2020-04-17 04:52:00",
                    "Country": "Nigeria",
                    "City": "Bauchi",
                    "Brief": "NIGERIA - Lassa Fever Kills 19 In Bauchi State"
                  },
                  {
                    "DateTime": "2020-04-24 23:58:00",
                    "Country": "Nigeria",
                    "City": "Abuja",
                    "Brief": "NIGERIA - Ondo - Gombe - Taraba Push Lassa Fever Cases To 979"
                  }
                ]
              },
              {
                "Name": "Polio",
                "is_checked" : true,
                "Cases": [
                  {
                    "DateTime": "2020-04-11 23:50:00",
                    "Country": "Pakistan",
                    "City": "Khyber Pakhtunkhwa",
                    "Brief": "PAKISTAN - K-P Reports New Polio Case - Country-Wide Tally Reaches 38"
                  },
                  {
                    "DateTime": "2020-04-19 00:00:00",
                    "Country": "Pakistan",
                    "City": "Islamabad",
                    "Brief": "PAKISTAN - Polio - Additional Cases Reported In Pakistan - Polio Vaccine"
                  },
                  {
                    "DateTime": "2020-04-27 22:38:00",
                    "Country": "Pakistan",
                    "City": "Khyber Pakhtunkhwa",
                    "Brief": "PAKISTAN - K-P Reports Two New Cases Of Polio Virus"
                  }
                ]
              }
            ]
        }
        this.fetch_disease = this.fetch_disease.bind();
        this.create_form_label = this.create_form_label.bind();
        this.map_name = this.map_name.bind();
        this.handleTotalCheckBox = this.handleTotalCheckBox.bind();
        this.handleNormalCheckBox = this.handleNormalCheckBox.bind();
        this.create_marker_group = this.create_marker_group.bind();
        this.create_marker = this.create_marker.bind();
        this.renderMarkers = this.renderMarkers.bind();
    }

    handleNormalCheckBox = (e) => {
      var new_data = this.state.diseases;
      new_data[e.target.value]["is_checked"] = e.target.checked;
      var id = this.state.state_id + 1;
      this.setState({diseases: new_data,
        state_id : id});
    }

    handleTotalCheckBox = () => {
      if (this.state.display_total) {
        this.setState({display_total : false});
      } else {
        this.setState({display_total : true});
      }
    }

    // Disease name mapping hash function
    map_name = (name) => {
      if (name === "African Swine Fever / Swine Fever" ) {
        name = "African Swine Fever";
      } else if (name == "Swine Flu - Confirmed / Possible Related Death") {
        name = "Swine Flu Death";
      } else if (name == "Swine Flu - Suspected or Probable Cases") {
        name = "Suspected Swine Flu";
      } else if (name == "Dengue / Hemorrhagic Fever") {
        name = "Hemorrhagic Fever";
      } else if (name == "H7N9 / H5N1 / H5N2 / H7N1 / H7N3 / H7N7 / H5N8") {
        name = "Avian influenza"
      }
      return name;
    }

    renderMarkers = async () => {
      try {
        const temp = await Promise.all(this.state.diseases.map((key,i) => this.create_marker_group(key,i)));
        this.setState({
          marker_group: temp
        });
      } catch (err) {
        console.log(err);
      }
    }

    create_marker = async (key) => {
      const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + key["City"] + "," + key["Country"] + "&key=AIzaSyCZAhgGJq-k2ixG-fX-wbkUqbVaR8-WkR0";
      const data = await fetch(url).then(res => res.json());
      if (data["status"] == "OK") {
        const lat = data["results"][0]["geometry"]["location"]["lat"] + Math.random()/2 -0.25;
        const lng = data["results"][0]["geometry"]["location"]["lng"] + Math.random()/2 -0.25;
        const loc = lat.toString() + "," + lng.toString();
        console.log("success");
        return <Marker location = {loc}/>
      }
      console.log(data["status"]);
      await new Promise(r => setTimeout(r, 500));
      return <Marker location = "Shanghai, China"/>
    }

    create_marker_group = async  (key,i) => {
      const url = "https://maps.gstatic.com/mapfiles/ms2/micons/" + this.state.colours[i] + "-dot.png";
      const temp = key["Cases"].filter((key,i) => {
        if (this.state.country == "Global" || this.state.country == "global") {
          if (i < 6) {
            return true;
          } else {
            return i%10 == 0;
          }
        }
        return true;
      }).map(k =>  this.create_marker(k));
      const markers = await Promise.all(temp);
      return <Marker.Group label="T" size="tiny"  iconURL = {url}>
        {markers}
    </Marker.Group>
    }

    create_form_label = (key,i) => {
        return  <FormControlLabel
              control={<Checkbox name="antoine" value = {i} checked={key["is_checked"]} color="primary" onClick = {this.handleNormalCheckBox}/>}
              label={key.Name}
        />
    }

    fetch_disease = async () => {
        this.setState({loading: true});
        const url =
          "http://ken.crestruction.org:8000/user/epidemicInfo";
        var country_name = this.state.country;
        if (country_name == "global" || country_name == "Global") {
            country_name = "None";
        }
        const lists = await fetch(url, {
          method: "POST",
          headers: {"accept": "application/json",
                    "Content-Type": "application/json" },
          body: JSON.stringify({
            "key_terms": "None",
            "country": country_name,
            "location": "None",
            "A_start_date": this.state.start_date + "T00:00:01",
            "An_end_date": this.state.end_date + "T23:59:59"
          })
        })
          .then(res => {
            // console.log(res.json());
            return res.json();
          })
        if (lists["Message"]) {
          this.setState({diseases : []});
          // this.renderMarkers();
        } else {
          const diseases = lists.filter((key) => key["Name"] !== "General News").map((key,i) => {
            var checked = false;
            if (i < 3) {
              checked = true;
            }
            return {"Name" : this.map_name(key["Name"]), "Cases" : key["Cases"], "is_checked" : checked};
          })
          this.setState({diseases : diseases});
          // this.renderMarkers();
        }
        console.log("fetch new result");
        this.setState({loading: false});
        this.setState({diseases : [
          {
            "Name": "African Swine Fever / Swine Fever",
            "is_checked" : true,
            "Cases": [
              {
                "DateTime": "2020-04-02 04:29:00",
                "Country": "China",
                "City": "Gansu",
                "Brief": "CHINA - China Reports New African Swine Fever Cases In Gansu Province"
              },
              {
                "DateTime": "2020-04-10 00:08:00",
                "Country": "Poland",
                "City": "Wieckowice",
                "Brief": "POLAND - African Swine Fever Outbreak Discovered In Poland"
              },
              {
                "DateTime": "2020-04-11 01:53:00",
                "Country": "South Korea",
                "City": "Seoul",
                "Brief": "SOUTH KOREA - 12 More Cases Of African Swine Fever Confirmed In Wild Boars"
              },
              {
                "DateTime": "2020-04-21 22:47:00",
                "Country": "China",
                "City": "Sichuan",
                "Brief": "CHINA - China Detects African Swine Fever In Another Pig Truck"
              },
              {
                "DateTime": "2020-04-27 23:52:00",
                "Country": "Namibia",
                "City": "Windhoek",
                "Brief": "NAMIBIA - African Swine Fever Kills 61 Pigs"
              }
            ]
          },
          {
            "Name": "Coronavirus",
            "is_checked" : true,
            "Cases": [
              {
                "DateTime": "2020-04-02 03:22:00",
                "Country": "Algeria",
                "City": "Algiers",
                "Brief": "ALGERIA - Algeria Reports 14 New Deaths From COVID - 19 - 847 Infections In Total"
              },
              {
                "DateTime": "2020-04-02 03:22:00",
                "Country": "France",
                "City": "Paris",
                "Brief": "FRANCE - France Reports 509 Coronavirus Deaths In Last 24 Hours - Total Cases Close To 57000"
              },
              {
                "DateTime": "2020-04-02 03:22:00",
                "Country": "Lebanon",
                "City": "Beirut",
                "Brief": "LEBANON - Philippine Ambassador To Lebanon Dies Of COVID-19"
              },
              {
                "DateTime": "2020-04-02 04:50:00",
                "Country": "Egypt",
                "City": "Cairo",
                "Brief": "EGYPT - Egypt Confirms 69 New Cases - 6 Deaths Of COVID - 19 - Ministry"
              },
              {
                "DateTime": "2020-04-02 05:04:00",
                "Country": "Indonesia",
                "City": "Jakarta",
                "Brief": "INDONESIA - Indonesias Cases Surge By 149 Amid Confusion Over Transport Restrictions"
              },
              {
                "DateTime": "2020-04-02 05:11:00",
                "Country": "United Kingdom",
                "City": "Airedale Hospital",
                "Brief": "UNITED KINGDOM - Seven More Coronavirus Deaths Recorded At Bradford District Hospitals"
              },
              {
                "DateTime": "2020-04-02 05:13:00",
                "Country": "Ireland",
                "City": "Dublin",
                "Brief": "IRELAND - 10 Women Who Attended Dublin Maternity Hospital Tested Positive For Coronavirus"
              },
              {
                "DateTime": "2020-04-02 05:14:00",
                "Country": "Singapore",
                "City": "Singapore City",
                "Brief": "SINGAPORE – Fourth Coronavirus Death In Singapore"
              },
              {
                "DateTime": "2020-04-02 05:21:00",
                "Country": "Israel",
                "City": "Jerusalem",
                "Brief": "ISRAEL - COVID-19 Death Toll Rises To 31 In Israel"
              },
              {
                "DateTime": "2020-04-02 05:22:00",
                "Country": "India",
                "City": "New Delhi",
                "Brief": "INDIA - India COVID - 19 Death Toll Rises To 50 As Total Cases Reach 1965"
              },
              {
                "DateTime": "2020-04-02 05:24:00",
                "Country": "Spain",
                "City": "Madrid",
                "Brief": "SPAIN - Spains Coronavirus Death Toll Surpasses 10000 After Another Record Daily Toll"
              },
              {
                "DateTime": "2020-04-02 05:33:00",
                "Country": "Philippines",
                "City": "Manila",
                "Brief": "PHILIPPINES - Philippines Reports 11 New Coronavirus Deaths - 322 More Infections"
              },
              {
                "DateTime": "2020-04-02 05:36:00",
                "Country": "Italy",
                "City": "Rome",
                "Brief": "ITALY - COVID - 19 Cases In Italy Reach 110574 - Death Toll At 13155"
              },
              {
                "DateTime": "2020-04-02 05:38:00",
                "Country": "Brazil",
                "City": "Brasilia",
                "Brief": "BRAZIL - Brazils COVID - 19 Death Toll Reaches 240 - With 6836 Infected"
              },
              {
                "DateTime": "2020-04-02 05:39:00",
                "Country": "Cyprus",
                "City": "Nicosia",
                "Brief": "CYPRUS - COVID - 19 Cases In Cyprus Climb To 320 - Death Toll At 9"
              },
              {
                "DateTime": "2020-04-02 05:41:00",
                "Country": "Greece",
                "City": "Athens",
                "Brief": "GREECE - Greeces COVID - 19 Death Toll Rises To 50 - Private Flights Banned"
              },
              {
                "DateTime": "2020-04-03 02:18:00",
                "Country": "United States",
                "City": "Topeka, kS",
                "Brief": "KANSAS - Coronavirus In Kansas 555 Confirmed Cases 13 Deaths"
              },
              {
                "DateTime": "2020-04-03 02:28:00",
                "Country": "Latvia",
                "City": "Riga",
                "Brief": "LATVIA - Latvia Reports First Death Of A COVID-19 Patient"
              },
              {
                "DateTime": "2020-04-03 02:31:00",
                "Country": "Libya",
                "City": "Tripoli",
                "Brief": "LIBYA - Libya Records 1st COVID - 19 Death"
              },
              {
                "DateTime": "2020-04-03 02:37:00",
                "Country": "Brazil",
                "City": "Brasilia",
                "Brief": "BRAZIL - COVID-19 Death Toll Hits 299 In Brazil -Infections Reach 7910"
              },
              {
                "DateTime": "2020-04-03 02:43:00",
                "Country": "Morocco",
                "City": "Rabat",
                "Brief": "MOROCCO - Moroccos Novel Coronavirus Cases Reach 691"
              },
              {
                "DateTime": "2020-04-03 02:53:00",
                "Country": "United States",
                "City": "Columbia, SC",
                "Brief": "SOUTH CAROLINA - 26 Total Deaths In SC - 210 New Cases Of Coronavirus - 5 New Cases In Horry County"
              },
              {
                "DateTime": "2020-04-03 03:17:00",
                "Country": "France",
                "City": "Paris",
                "Brief": "FRANCE - France Reports 471 New COVID - 19 Deaths In Hospitals"
              },
              {
                "DateTime": "2020-04-03 03:19:00",
                "Country": "Turkey",
                "City": "Ankara",
                "Brief": "TURKEY - COVID - 19 Cases In Turkey Rise To 18135 - With 356 Deaths"
              },
              {
                "DateTime": "2020-04-03 03:21:00",
                "Country": "Greece",
                "City": "Athens",
                "Brief": "GREECE - Greeces COVID - 19 Cases Exceed 1500 - Death Toll Climbs To 53"
              },
              {
                "DateTime": "2020-04-03 04:24:00",
                "Country": "Zambia",
                "City": "Lusaka",
                "Brief": "ZAMBIA - Zambia Records First Coronavirus Death - Health Minister"
              },
              {
                "DateTime": "2020-04-03 04:30:00",
                "Country": "United States",
                "City": "Las Vegas, NV",
                "Brief": "NEVADA - NLV Police Officer - Staffer Test Positive For Coronavirus"
              },
              {
                "DateTime": "2020-04-03 04:39:00",
                "Country": "Turkey",
                "City": "Ankara",
                "Brief": "TURKEY - COVID - 19 Cases In Turkey Rise To 18135 - With 356 Deaths"
              },
              {
                "DateTime": "2020-04-03 04:48:00",
                "Country": "Armenia",
                "City": "Nork Infections Clinical Hospital",
                "Brief": "ARMENIA - COVID-19 - 68-Year-Old Patient Dies In Armenia"
              },
              {
                "DateTime": "2020-04-03 04:51:00",
                "Country": "United States",
                "City": "Washington DC",
                "Brief": "DISTRICT OF COLUMBIA - US Hits A New World Record For The Most One-Day Coronavirus Deaths - At 1169"
              },
              {
                "DateTime": "2020-04-03 04:53:00",
                "Country": "United States",
                "City": "Clark County, NV",
                "Brief": "NEVADA - Coronavirus Deaths Hit 38 In Nevada, More Than 1400 Cases"
              },
              {
                "DateTime": "2020-04-03 04:56:00",
                "Country": "United States",
                "City": "Berlin",
                "Brief": "GERMANY - Germany Reports Over 1000 Deaths Of COVID-19"
              },
              {
                "DateTime": "2020-04-03 05:12:00",
                "Country": "India",
                "City": "New Delhi",
                "Brief": "INDIA - India COVID - 19 Death Toll Rises To 56 As Total Cases Reach 2301"
              },
              {
                "DateTime": "2020-04-03 05:18:00",
                "Country": "Germany",
                "City": "Berlin",
                "Brief": "GERMANY - Germany Reports Over 1000 Deaths Of COVID - 19"
              },
              {
                "DateTime": "2020-04-03 05:19:00",
                "Country": "Singapore",
                "City": "Singapore City",
                "Brief": "SINGAPORE - Singapore Reports 5th COVID - 19 Death"
              },
              {
                "DateTime": "2020-04-04 01:44:00",
                "Country": "Bangladesh",
                "City": "Dhaka",
                "Brief": "BANGLADESH - 2 More Coronavirus Patients Die In Bangladesh"
              },
              {
                "DateTime": "2020-04-04 01:46:00",
                "Country": "Switzerland",
                "City": "Zurich",
                "Brief": "SWITZERLAND - Switzerland Death Toll Rises To 540 As Confirmed Cases Top 20000"
              },
              {
                "DateTime": "2020-04-04 01:48:00",
                "Country": "Netherlands",
                "City": "Amsterdam",
                "Brief": "NETHERLANDS - Deaths In Netherlands Rise By 164 To 1651"
              },
              {
                "DateTime": "2020-04-04 01:49:00",
                "Country": "Kuwait",
                "City": "Kuwait City",
                "Brief": "KUWAIT - Kuwait Reports First Death"
              },
              {
                "DateTime": "2020-04-04 01:51:00",
                "Country": "India",
                "City": "New Delhi",
                "Brief": "INDIA - India COVID - 19 Death Toll Rises To 68 As Total Cases Reach 2902"
              },
              {
                "DateTime": "2020-04-04 01:52:00",
                "Country": "Pakistan",
                "City": "Islamabad",
                "Brief": "PAKISTAN - 37 Die - 2547 Test Positive For COVID-19 In Pakistan"
              },
              {
                "DateTime": "2020-04-04 01:53:00",
                "Country": "Vietnam",
                "City": "Hanoi",
                "Brief": "VIETNAM - Vietnams COVID - 19 Cases Increase To 239"
              },
              {
                "DateTime": "2020-04-04 01:55:00",
                "Country": "Afghanistan",
                "City": "Kabul",
                "Brief": "AFGHANISTAN - Afghanistan Reports 1 New Death From COVID - 19"
              },
              {
                "DateTime": "2020-04-04 01:57:00",
                "Country": "United States",
                "City": "Riverside County, CA",
                "Brief": "CALIFORNIA - Second Deputy Dies From Coronavirus In Riverside County"
              },
              {
                "DateTime": "2020-04-04 01:58:00",
                "Country": "United States",
                "City": "Albuquerque, NM",
                "Brief": "NEW MEXICO - 3 New COVID-19 Deaths Reported In New Mexico As Total Cases Rise To 495"
              },
              {
                "DateTime": "2020-04-04 02:00:00",
                "Country": "Sri Lanka",
                "City": "Colombo",
                "Brief": "SRI LANKA - Death Toll From COVID-19 In Sri Lanka Rises To 5"
              },
              {
                "DateTime": "2020-04-04 02:06:00",
                "Country": "Laos",
                "City": "Vientiane",
                "Brief": "LAOS - Laos Tests 53 Negative COVID-19 Cases"
              },
              {
                "DateTime": "2020-04-04 02:07:00",
                "Country": "Fiji",
                "City": "Suva",
                "Brief": "FIJI - Number Of Confirmed COVID - 19 Cases Rises To 12 In Fiji"
              },
              {
                "DateTime": "2020-04-04 02:17:00",
                "Country": "Japan",
                "City": "Tokyo",
                "Brief": "JAPAN - COVID - 19 Infections In Japan Rise To 3142"
              },
              {
                "DateTime": "2020-04-04 02:19:00",
                "Country": "Singapore",
                "City": "Singapore City",
                "Brief": "SINGAPORE - Singapore Reports 75 New Cases"
              },
              {
                "DateTime": "2020-04-04 02:20:00",
                "Country": "Portugal",
                "City": "Lisbon",
                "Brief": "PORTUGAL - Portugals Coronavirus Cases Surpass 10000 Mark"
              },
              {
                "DateTime": "2020-04-04 02:21:00",
                "Country": "Germany",
                "City": "Berlin",
                "Brief": "GERMANY - Germany Reports 6082 More Cases"
              },
              {
                "DateTime": "2020-04-05 02:35:00",
                "Country": "India",
                "City": "Udhampur",
                "Brief": "INDIA - 100-Year-Old Man Dies In Quarantine In JKs Udhampur"
              },
              {
                "DateTime": "2020-04-05 02:48:00",
                "Country": "India",
                "City": "Chennai",
                "Brief": "INDIA - Two COVID19 Patients Pass Away In Chennai"
              },
              {
                "DateTime": "2020-04-05 03:08:00",
                "Country": "India",
                "City": "Surat",
                "Brief": "INDIA - COVID-19 Patient Dies In Surat"
              },
              {
                "DateTime": "2020-04-05 03:18:00",
                "Country": "India",
                "City": "Indore",
                "Brief": "INDIA - Another Death Reported From Indore"
              },
              {
                "DateTime": "2020-04-05 03:21:00",
                "Country": "Albania",
                "City": "Tirane",
                "Brief": "ALBANIA - Albanias Now Has A Total Of 333 Cases And 18 Deaths Related To Covid-19"
              },
              {
                "DateTime": "2020-04-05 03:24:00",
                "Country": "Belarus",
                "City": "Minsk",
                "Brief": "BELARUS - Five People Have Died From The Disease The Belarusian Health Ministry Said"
              },
              {
                "DateTime": "2020-04-05 03:31:00",
                "Country": "United States",
                "City": "Nashville, TN",
                "Brief": "TENNESSEE - 3321 Confirmed COVID-19 Cases In Tennessee"
              },
              {
                "DateTime": "2020-04-05 03:58:00",
                "Country": "United States",
                "City": "Frankfort, KY",
                "Brief": "KENTUCKY - Kentucky Gov Andy Beshear Confirms 92 New COVID-19 Cases - Three New Deaths"
              },
              {
                "DateTime": "2020-04-05 04:09:00",
                "Country": "United States",
                "City": "York County, SC",
                "Brief": "SOUTH CAROLINA - A Clover Police Officer Has Tested Positive For Coronavirus - Chief Of Police Says"
              },
              {
                "DateTime": "2020-04-05 04:13:00",
                "Country": "United States",
                "City": "Columbus, OH",
                "Brief": "OHIO - Over 4K Cases - 119 Deaths Across State As Ohioans Prepare For Coronavirus Peak"
              },
              {
                "DateTime": "2020-04-05 04:24:00",
                "Country": "United States",
                "City": "Washington DC",
                "Brief": "DISTRICT OF COLUMBIA - Navy Captain Fired After Writing Letter Asking For Coronavirus Help Has Repor"
              },
              {
                "DateTime": "2020-04-05 04:28:00",
                "Country": "Israel",
                "City": "Jerusalem",
                "Brief": "ISRAEL - Number Of Corona Cases In Israel Exceeds 8000 As Death Toll Continues To Rise"
              },
              {
                "DateTime": "2020-04-05 04:36:00",
                "Country": "United States",
                "City": "Collier County, FL",
                "Brief": "FLORIDA - Two Infants Test Positive For Covid-19"
              },
              {
                "DateTime": "2020-04-05 04:40:00",
                "Country": "United States",
                "City": "Asbury Park, NJ",
                "Brief": "NEW JERSEY - 12 Positive Coronavirus Tests In Asbury Park In 2 Days"
              },
              {
                "DateTime": "2020-04-05 04:43:00",
                "Country": "United States",
                "City": "Kern County, CA",
                "Brief": "CALIFORNIA - Kern County Now Has 230 Coronavirus Cases"
              },
              {
                "DateTime": "2020-04-05 04:52:00",
                "Country": "United States",
                "City": "Montpelier, VT",
                "Brief": "VERMONT - Coronavirus Cases In Vermont Surpass 500 As Two More Die"
              },
              {
                "DateTime": "2020-04-05 05:13:00",
                "Country": "United States",
                "City": "Austin, TX",
                "Brief": "TEXAS - Coronavirus In Texas  - State Reports 6812 Cases And 127 Deaths"
              },
              {
                "DateTime": "2020-04-05 05:16:00",
                "Country": "Saudi Arabia",
                "City": "Riyadh",
                "Brief": "SAUDI ARABIA - Coronavirus Cases In Saudi Arabia Rise To 2402"
              },
              {
                "DateTime": "2020-04-05 05:29:00",
                "Country": "United States",
                "City": "Jackson County, MI",
                "Brief": "MICHIGAN - Jackson County Reports 10 More Confirmed Coronavirus Cases"
              },
              {
                "DateTime": "2020-04-05 05:32:00",
                "Country": "Canada",
                "City": "Anjou",
                "Brief": "CANADA - Coronavirus - 3 Costco Employees Test Positive In Anjou - Montreal"
              },
              {
                "DateTime": "2020-04-05 05:35:00",
                "Country": "Ireland",
                "City": "Dublin",
                "Brief": "IRELAND - Coronavirus - Seven Further Deaths And 91 New Covid-19 Cases Confirmed In Northern Ireland"
              },
              {
                "DateTime": "2020-04-05 05:39:00",
                "Country": "United States",
                "City": "Jackson, MS",
                "Brief": "MISSISSIPPI - Coronavirus In Mississippi - 183 New Cases - 8 More Deaths Reported Sunday"
              },
              {
                "DateTime": "2020-04-06 00:28:00",
                "Country": "United States",
                "City": "Crest Hill, IL",
                "Brief": "ILLINOIS - Stateville Correctional Center Inmate Dies Of COVID-19"
              },
              {
                "DateTime": "2020-04-06 00:30:00",
                "Country": "Malaysia",
                "City": "Kuala Lumpur",
                "Brief": "MALAYSIA - COVID-19 Cases Increase To 3662 In Malaysia - Death Toll At 61"
              },
              {
                "DateTime": "2020-04-06 00:33:00",
                "Country": "India",
                "City": "New Delhi",
                "Brief": "INDIA - India COVID-19 Death Toll Rises To 109 As Total Cases Reach 4067"
              },
              {
                "DateTime": "2020-04-06 00:42:00",
                "Country": "Ethiopia",
                "City": "Addis Ababa",
                "Brief": "ETHIOPIA - Ethiopia Reports Its First Death Of A COVID-19 Patient"
              },
              {
                "DateTime": "2020-04-06 00:47:00",
                "Country": "China",
                "City": "Shanghai",
                "Brief": "CHINA - Shanghai Reports 5 New Imported COVID-19 Cases"
              },
              {
                "DateTime": "2020-04-06 02:15:00",
                "Country": "United States",
                "City": "Long Island, NY",
                "Brief": "NEW YORK - Coronavirus News - Nurse At Long Island Hospital Dies From COVID-19"
              },
              {
                "DateTime": "2020-04-06 02:18:00",
                "Country": "Israel",
                "City": "Jerusalem",
                "Brief": "ISRAEL - Israels COVID-19 Death Toll Hits 54 As Total Cases Climb To 8611"
              },
              {
                "DateTime": "2020-04-06 02:19:00",
                "Country": "Iran",
                "City": "Tehran",
                "Brief": "IRAN - COVID-19 Death Toll Hits 3739 In Iran"
              },
              {
                "DateTime": "2020-04-06 02:41:00",
                "Country": "France",
                "City": "Paris",
                "Brief": "FRANCE - COVID - 19 Death Toll Tops 8000 In France"
              },
              {
                "DateTime": "2020-04-06 02:58:00",
                "Country": "Oman",
                "City": "Muscat",
                "Brief": "OMAN - Oman Announces 21 New COVID-19 Cases - 2 More Deaths"
              },
              {
                "DateTime": "2020-04-06 03:37:00",
                "Country": "Brazil",
                "City": "Brasília",
                "Brief": "BRAZIL - Brazil Registers 11130 COVID - 19 Cases - 486 Deaths"
              },
              {
                "DateTime": "2020-04-06 03:38:00",
                "Country": "Chile",
                "City": "Santiago",
                "Brief": "CHILE - Chile Confirms 4471 Cases Of Coronavirus - 34 Deaths"
              },
              {
                "DateTime": "2020-04-06 04:50:00",
                "Country": "United States",
                "City": "Concord, NH",
                "Brief": "NEW HAMPSHIRE - Corrections - Prison Employee Tests Positive For Virus"
              },
              {
                "DateTime": "2020-04-06 04:51:00",
                "Country": "United States",
                "City": "Annapolis, MD",
                "Brief": "MARYLAND - Maryland COVID-19 Cases Grow To At Least 288 Monday"
              },
              {
                "DateTime": "2020-04-06 04:53:00",
                "Country": "Russia",
                "City": "Moscow",
                "Brief": "RUSSIA - In single day - Over 900 Coronavirus Cases Confirmed In Russia"
              },
              {
                "DateTime": "2020-04-06 04:54:00",
                "Country": "South Korea",
                "City": "Seoul",
                "Brief": "SOUTH KOREA - S Korea Reports 47 More COVID - 19 Cases - 10284 In Total"
              },
              {
                "DateTime": "2020-04-06 04:55:00",
                "Country": "Germany",
                "City": "Berlin",
                "Brief": "GERMANY - Germany Reports Over 95000 Confirmed COVID - 19 Cases"
              },
              {
                "DateTime": "2020-04-06 04:57:00",
                "Country": "Kuwait",
                "City": "Kuwait City",
                "Brief": "KUWAIT - Kuwait Reports 77 New COVID - 19 Cases - 556 In Total"
              },
              {
                "DateTime": "2020-04-07 00:57:00",
                "Country": "United States",
                "City": "Montgomery, AL",
                "Brief": "ALABAMA - COVID-19 Cases In Alabama Now At 2035 With 39 Deaths Reported"
              },
              {
                "DateTime": "2020-04-07 02:07:00",
                "Country": "Algeria",
                "City": "Algiers",
                "Brief": "ALGERIA - Algerias COVID-19 Death Toll Hits 173 - Infections Surge To 1423"
              },
              {
                "DateTime": "2020-04-07 02:12:00",
                "Country": "India",
                "City": "New Delhi",
                "Brief": "INDIA - India COVID - 19 Death Toll Rises To 114 As Total Cases Reach 4421"
              },
              {
                "DateTime": "2020-04-07 02:13:00",
                "Country": "Belgium",
                "City": "Brussels",
                "Brief": "BELGIUM - Number Of COVID - 19 Deaths Exceeds 2000 In Belgium"
              },
              {
                "DateTime": "2020-04-07 02:15:00",
                "Country": "Indonesia",
                "City": "Jakarta",
                "Brief": "INDONESIA - Indonesias COVID - 19 Death Toll Rises To 221 - Total Cases To 2738"
              },
              {
                "DateTime": "2020-04-07 02:25:00",
                "Country": "United Kingdom",
                "City": "London",
                "Brief": "UNITED KINGDOM - Coronavirus Patient Deaths Rise By 439 Across The UK"
              },
              {
                "DateTime": "2020-04-07 03:09:00",
                "Country": "Iran",
                "City": "Tehran",
                "Brief": "IRAN - Irans COVID - 19 Death Toll Rises To 3872 With 62589 Infected In Total"
              },
              {
                "DateTime": "2020-04-07 03:12:00",
                "Country": "Ukraine",
                "City": "Kyiv",
                "Brief": "UKRAINE - Ukraine COVID - 19 Death Toll Rises To 45 As Total Infections Reach 1462"
              },
              {
                "DateTime": "2020-04-07 03:14:00",
                "Country": "Pakistan",
                "City": "Islamabad",
                "Brief": "PAKISTAN - Pakistan Confirms 3864 COVID - 19 Positive Cases - 54 Deaths"
              },
              {
                "DateTime": "2020-04-07 03:25:00",
                "Country": "Colombia",
                "City": "Bogota",
                "Brief": "COLUMBIA - Colombias Covid-19 Death Toll Rises By 11 - Total Infections At 1579"
              },
              {
                "DateTime": "2020-04-07 03:28:00",
                "Country": "United States",
                "City": "Raleigh, NC",
                "Brief": "NORTH CAROLINA - 46 Deaths In NC Blamed On Coronavirus - 3221 Total Cases - Cooper Says"
              },
              {
                "DateTime": "2020-04-07 03:34:00",
                "Country": "Azerbaijan",
                "City": "Nagorno-Karabakh",
                "Brief": "AZERBAIJAN - Azerbaijans Breakaway Nagorno-Karabakh Region Reports First Coronavirus Case"
              },
              {
                "DateTime": "2020-04-07 03:35:00",
                "Country": "Spain",
                "City": "Madrid",
                "Brief": "SPAIN - Coronavirus Infection Cases In Spain Reach 140510"
              },
              {
                "DateTime": "2020-04-07 03:37:00",
                "Country": "Russia",
                "City": "Moscow",
                "Brief": "RUSSIA - Number Of Confirmed COVID - 19 Cases In Russia Rises To 15862"
              },
              {
                "DateTime": "2020-04-07 03:38:00",
                "Country": "Kuwait",
                "City": "Kuwait City",
                "Brief": "KUWAIT - Kuwait Reports 78 New COVID-19 Cases - 743 In Total"
              },
              {
                "DateTime": "2020-04-07 03:59:00",
                "Country": "Brazil",
                "City": "Brasilia",
                "Brief": "BRAZIL - Assisi Confirms Death From Dengue And Has MoreThan 250 Cases"
              },
              {
                "DateTime": "2020-04-07 23:29:00",
                "Country": "United States",
                "City": "Redondo Beach, CA",
                "Brief": "CALIFORNIA - 4 Die At Redondo Beachs Kensington Senior Home Who Also Tested Positive For Coronavirus"
              },
              {
                "DateTime": "2020-04-07 23:30:00",
                "Country": "United States",
                "City": "Montgomery County, PA",
                "Brief": "PENNSYLVANIA - Montco Reports 160 New Coronavirus Cases - Death Toll Rises To 32"
              },
              {
                "DateTime": "2020-04-08 00:15:00",
                "Country": "United States",
                "City": "Washington DC",
                "Brief": "DISTRICT OF COLUMBIA - Updated - Nearly 2000 Coronavirus Deaths In US In Last 24 Hours"
              },
              {
                "DateTime": "2020-04-08 00:17:00",
                "Country": "United States",
                "City": "Athens, AL",
                "Brief": "ALABAMA - Four Alabama Hospital Employees Test Positive For COVID - 19"
              },
              {
                "DateTime": "2020-04-08 00:20:00",
                "Country": "United States",
                "City": "Mercer County, WV",
                "Brief": "WEST VIRGINIA - Mercer Countys 5th Case Of COVID-19 Result Of Community Transmission"
              },
              {
                "DateTime": "2020-04-08 00:26:00",
                "Country": "United States",
                "City": "Gibsonia, PA",
                "Brief": "PENNSYLVANIA - Coronavirus In Allegheny County - 2 People At St Barnabas Nursing Home Die From COVID"
              },
              {
                "DateTime": "2020-04-08 00:45:00",
                "Country": "Macedonia",
                "City": "Skopje",
                "Brief": "MACEDONIA - 45-Year-Old Coronavirus Patient From Skopje Dies On Way To Hospital"
              },
              {
                "DateTime": "2020-04-08 00:51:00",
                "Country": "United States",
                "City": "Athens, GA",
                "Brief": "KENTUCKY - Two New COVID - 19 Cases Reported In Marshall County"
              },
              {
                "DateTime": "2020-04-08 00:56:00",
                "Country": "United States",
                "City": "Mecklenburg County, NC",
                "Brief": "NORTH CAROLINA - Mecklenburg County Reports 805 Total COVID-19 Cases - With 8 Virus-Related Deaths"
              },
              {
                "DateTime": "2020-04-08 01:00:00",
                "Country": "Iran",
                "City": "Tehran",
                "Brief": "IRAN - Iran - Coronavirus Death Toll Surges To 20400 In 245 Cities"
              },
              {
                "DateTime": "2020-04-08 01:04:00",
                "Country": "France",
                "City": "Paris",
                "Brief": "FRANCE - France Is Fourth Country To Pass 10000 Coronavirus Deaths"
              },
              {
                "DateTime": "2020-04-08 01:15:00",
                "Country": "United States",
                "City": "Saint Paul, MN",
                "Brief": "MINNESOTA - 29 Deaths - 935 Confirmed Cases"
              },
              {
                "DateTime": "2020-04-08 01:18:00",
                "Country": "United States",
                "City": "Breinigsville, PA",
                "Brief": "PENNSYLVANIA - Employee Tests Positive For Coronavirus At Amazon In Breinigsville"
              },
              {
                "DateTime": "2020-04-08 23:15:00",
                "Country": "United States",
                "City": "Denver, CO",
                "Brief": "COLORADO - A third Avalanche Player Tests Positive For COVID - 19"
              },
              {
                "DateTime": "2020-04-08 23:17:00",
                "Country": "United States",
                "City": "Sacramento, CA",
                "Brief": "CALIFORNIA - California Crosses 16000 Cases - New Model Cuts Projected Death Total"
              },
              {
                "DateTime": "2020-04-08 23:34:00",
                "Country": "United Kingdom",
                "City": "London",
                "Brief": "UNITED KINGDOM - 224 More London Patients Die As UK Death Toll Climbs To Over 6000"
              },
              {
                "DateTime": "2020-04-08 23:40:00",
                "Country": "United Kingdom",
                "City": "London",
                "Brief": "UNITED KINGDOM - Total Of 16 Patients With Coronavirus Have Now Died At York Hospital"
              },
              {
                "DateTime": "2020-04-09 02:45:00",
                "Country": "United Kingdom",
                "City": "Plymouth",
                "Brief": "UNITED KINGDOM - Another Person Has Died After Testing Positive For Coronavirus In Plymouth"
              },
              {
                "DateTime": "2020-04-09 02:48:00",
                "Country": "Djibouti",
                "City": "Djibouti",
                "Brief": "DJIBOUTI - Djibouti Records Its First Coronavirus Death - Ministry Of Health"
              },
              {
                "DateTime": "2020-04-09 02:55:00",
                "Country": "Iran",
                "City": "Tehran",
                "Brief": "IRAN - Iran Coronavirus Death Toll Rises To 4110"
              },
              {
                "DateTime": "2020-04-09 02:58:00",
                "Country": "United Kingdom",
                "City": "Wiltshire",
                "Brief": "UNITED KINGDOM - Doctor Passes Away From Coronavirus In Wiltshire"
              },
              {
                "DateTime": "2020-04-09 03:06:00",
                "Country": "United States",
                "City": "Albany, NY",
                "Brief": "NEW YORK - U S Death Toll Approaches 15000 As New York Reports Deadliest Day"
              },
              {
                "DateTime": "2020-04-09 03:08:00",
                "Country": "Spain",
                "City": "Madrid",
                "Brief": "SPAIN - Spains Coronavirus Deaths Pass 14500 - But Real Toll May Be Bigger"
              },
              {
                "DateTime": "2020-04-09 03:10:00",
                "Country": "India",
                "City": "Gujarat",
                "Brief": "INDIA - Coronavirus Patient Dies In Ahmedabad - Toll Reaches 17"
              },
              {
                "DateTime": "2020-04-09 03:13:00",
                "Country": "Israel",
                "City": "Jerusalem",
                "Brief": "ISRAEL - Israels Coronavirus Death Toll Hits 86 - With Number Of Infected At 9968"
              },
              {
                "DateTime": "2020-04-09 03:16:00",
                "Country": "Mozambique",
                "City": "Maputo",
                "Brief": "MOZAMBIQUE - Coronavirus - Mozambique - World Health Organization - 17 Cases Of Covid-19 Confirmed I"
              },
              {
                "DateTime": "2020-04-10 01:13:00",
                "Country": "Zimbabwe",
                "City": "Matabeleland",
                "Brief": "ZIMBABWE - Six Malaria Deaths In Matabeleland South"
              },
              {
                "DateTime": "2020-04-10 02:40:00",
                "Country": "Ireland",
                "City": "Belfast",
                "Brief": "IRELAND - Coronavirus Northern Ireland: 10 More Deaths Takes NI Total To 92"
              },
              {
                "DateTime": "2020-04-10 02:45:00",
                "Country": "United Kingdom",
                "City": "University Hospitals of Morecambe Bay NHS Foundation Trust",
                "Brief": "UNITED KINGDOM - More Than 80 Coronavirus Patients Have Died At Morecambe Bay Hospitals Trust"
              },
              {
                "DateTime": "2020-04-10 03:00:00",
                "Country": "Nigeria",
                "City": "Abuja",
                "Brief": "NIGERIA - Nigerias Coronavirus Death Toll Rises To Seven"
              },
              {
                "DateTime": "2020-04-10 03:03:00",
                "Country": "Israel",
                "City": "Jerusalem",
                "Brief": "ISRAEL - Israels Coronavirus Death Toll Reaches 86 - With 9968 Confirmed Cases"
              },
              {
                "DateTime": "2020-04-10 03:08:00",
                "Country": "United States",
                "City": "Wood County, WV",
                "Brief": "WEST VIRGINIA - DHHR Reports 523 COVID - 19 Cases In W Va - 16 In Wood County"
              },
              {
                "DateTime": "2020-04-10 03:20:00",
                "Country": "United States",
                "City": "Wyandot County, OH",
                "Brief": "OHIO - First Wyandot County COVID - 19 Death Reported"
              },
              {
                "DateTime": "2020-04-10 04:17:00",
                "Country": "Zambia",
                "City": "Lusaka",
                "Brief": "ZAMBIA - Zambia Records 2nd COVID - 19 Death"
              },
              {
                "DateTime": "2020-04-10 04:19:00",
                "Country": "Pakistan",
                "City": "Islamabad",
                "Brief": "PAKISTAN - Pakistans Total COVID - 19 Cases Rise To 4601 - Death Toll At 66"
              },
              {
                "DateTime": "2020-04-10 04:25:00",
                "Country": "Kyrgyzstan",
                "City": "Nookat",
                "Brief": "KYRGYZSTAN - 87-Year-Old Patient Dies Of Coronavirus In Nookat District"
              },
              {
                "DateTime": "2020-04-10 04:27:00",
                "Country": "Belgium",
                "City": "Brussels",
                "Brief": "BELGIUM - COVID-19 Deaths In Belgium Surpass 3000"
              },
              {
                "DateTime": "2020-04-10 04:29:00",
                "Country": "Taiwan",
                "City": "Taipei",
                "Brief": "TAIWAN - Taiwan Two COVID-19 Cases - One Death"
              },
              {
                "DateTime": "2020-04-10 04:38:00",
                "Country": "Saudi Arabia",
                "City": "Riyadh",
                "Brief": "SAUDI ARABIA - Saudi Arabia Announces 364 New Coronavirus Cases - First Evacuation Flight Arrives In"
              },
              {
                "DateTime": "2020-04-10 04:43:00",
                "Country": "Belarus",
                "City": "Minsk",
                "Brief": "BELARUS - Belarus COVID - 19 Infections Near 2000"
              },
              {
                "DateTime": "2020-04-11 02:32:00",
                "Country": "United States",
                "City": "Augusta, ME",
                "Brief": "MAINE - Maine CDC Reports 1 More Coronavirus Death And 9 More Cases At Belfast Senior Facility"
              },
              {
                "DateTime": "2020-04-11 02:33:00",
                "Country": "Spain",
                "City": "Madrid",
                "Brief": "SPAIN - Spain Records 510 New Deaths - Continuing Downward Trend"
              },
              {
                "DateTime": "2020-04-11 02:41:00",
                "Country": "Indonesia",
                "City": "Jakarta",
                "Brief": "INDONESIA - Indonesia Reports 330 New Cases - 21 Deaths"
              },
              {
                "DateTime": "2020-04-11 02:43:00",
                "Country": "Nigeria",
                "City": "Abuja",
                "Brief": "NIGERIA - Anambra - Niger Record First Cases Of Coronavirus"
              },
              {
                "DateTime": "2020-04-11 02:45:00",
                "Country": "India",
                "City": "Indore",
                "Brief": "INDIA - Death Toll Reaches 30 In Indore"
              },
              {
                "DateTime": "2020-04-11 02:48:00",
                "Country": "India",
                "City": "Dharavi",
                "Brief": "INDIA - One More Death In Dharavi - Death Toll Now 4"
              },
              {
                "DateTime": "2020-04-11 02:51:00",
                "Country": "Philippines",
                "City": "Manila",
                "Brief": "PHILIPPINES - Philippines Reports 26 New Deaths - 233 More Infections"
              },
              {
                "DateTime": "2020-04-11 02:52:00",
                "Country": "Malaysia",
                "City": "Kuala Lumpur",
                "Brief": "MALAYSIA - Malaysia Reports 184 New Cases - Death Toll Rises By 3"
              },
              {
                "DateTime": "2020-04-11 03:06:00",
                "Country": "Nigeria",
                "City": "Katsina",
                "Brief": "NIGERIA - Wife - Children Of Dead Coronavirus Patient Test Positive In Katsina"
              },
              {
                "DateTime": "2020-04-11 03:18:00",
                "Country": "Turkey",
                "City": "Ankara",
                "Brief": "TURKEY - Coronavirus Death Toll Surpasses 1000 In Turkey - 4747 New Cases Announced"
              },
              {
                "DateTime": "2020-04-11 03:26:00",
                "Country": "Iran",
                "City": "Tehran",
                "Brief": "IRAN - Iran Says Total Number Of Infected Reaches 70029"
              },
              {
                "DateTime": "2020-04-11 03:35:00",
                "Country": "Armenia",
                "City": "Tirana",
                "Brief": "ALBANIA - 24th Coronavirus Victim In Albania Confirmed"
              },
              {
                "DateTime": "2020-04-11 03:42:00",
                "Country": "Yemen",
                "City": "Sanaa",
                "Brief": "YEMEN - Yemen Has 1st Confirmed Virus Case - More Than 10k In Israel"
              },
              {
                "DateTime": "2020-04-12 00:49:00",
                "Country": "Brazil",
                "City": "Pindamonhangaba",
                "Brief": "BRAZIL - Pindamonhangaba Registers 866 Dengue Cases"
              },
              {
                "DateTime": "2020-04-12 03:05:00",
                "Country": "India",
                "City": "Pune",
                "Brief": "INDIA - 2 More Death In Pune - Death Toll In District Now 31"
              },
              {
                "DateTime": "2020-04-12 03:18:00",
                "Country": "India",
                "City": "Rajendra Institute of Medical Sciences, Rims Circle, Jora Talab",
                "Brief": "INDIA - COVID19 Positive Man Dies In Ranchi"
              },
              {
                "DateTime": "2020-04-12 03:21:00",
                "Country": "Nepal",
                "City": "Birgunj",
                "Brief": "NEPAL - Three Indians Test Positive In Nepal"
              },
              {
                "DateTime": "2020-04-12 03:22:00",
                "Country": "Thailand",
                "City": "Bangkok",
                "Brief": "THAILAND - Thailand Reports 33 New Cases - Three New Deaths"
              },
              {
                "DateTime": "2020-04-12 03:25:00",
                "Country": "Guatemala",
                "City": "Guatemala City",
                "Brief": "GUATEMALA - Guatemala Registers 16 New Cases - Infections Rise To 153"
              },
              {
                "DateTime": "2020-04-12 03:27:00",
                "Country": "India",
                "City": "Uttar Pradesh",
                "Brief": "INDIA - Cases Rise To 480 In Uttar Pradesh"
              },
              {
                "DateTime": "2020-04-12 03:35:00",
                "Country": "United Kingdom",
                "City": "London",
                "Brief": "UNITED KINGDOM - Another 737 Dead As UK Coronavirus Death Toll Passes 10000"
              },
              {
                "DateTime": "2020-04-12 03:39:00",
                "Country": "United States",
                "City": "Washington DC",
                "Brief": "DISTRICT OF COLUMBIA - Confirmed US Covid-19 Death Toll Reaches 20000 - Highest In The World"
              },
              {
                "DateTime": "2020-04-12 03:44:00",
                "Country": "Spain",
                "City": "Madrid",
                "Brief": "SPAIN - Spains Overnight Coronavirus Death Toll Rises - Total At 16972"
              },
              {
                "DateTime": "2020-04-12 03:47:00",
                "Country": "France",
                "City": "Paris",
                "Brief": "FRANCE - Coronavirus Death Toll In France Nears 14400"
              },
              {
                "DateTime": "2020-04-12 03:51:00",
                "Country": "Germany",
                "City": "Berlin",
                "Brief": "GERMANY - Germanys Coronavirus Cases Rise By 2821 - Deaths By 129 - RKI"
              },
              {
                "DateTime": "2020-04-12 03:55:00",
                "Country": "Turkey",
                "City": "Ankara",
                "Brief": "TURKEY - Turkeys Coronavirus Cases Near 57000 With 480 Recoveries In Single Day"
              },
              {
                "DateTime": "2020-04-12 03:59:00",
                "Country": "Canada",
                "City": "Ontario",
                "Brief": "CANADA - Ontario Reports 401 New Coronavirus Cases - Including 21 Deaths As Total Cases Top 7000"
              },
              {
                "DateTime": "2020-04-12 04:03:00",
                "Country": "Russia",
                "City": "Moscow",
                "Brief": "RUSSIA - Coronavirus Case Tally In Russia Surpasses 15700"
              },
              {
                "DateTime": "2020-04-12 04:07:00",
                "Country": "Iraq",
                "City": "Baghdad",
                "Brief": "IRAQ - 1318 Coronavirus Cases - 72 Fatalities In Iraq"
              },
              {
                "DateTime": "2020-04-12 04:11:00",
                "Country": "Bangladesh",
                "City": "Dhaka",
                "Brief": "BANGLADESH - Bangladesh Reports 4 More Coronavirus Deaths - 139 New Cases In 24 Hrs"
              },
              {
                "DateTime": "2020-04-13 01:43:00",
                "Country": "United States",
                "City": "Washington DC",
                "Brief": "DISTRICT OF COLUMBIA - Sailor Assigned To Uss Theodore Roosevelt Dies Of Coronavirus Complications"
              },
              {
                "DateTime": "2020-04-13 02:57:00",
                "Country": "United Kingdom",
                "City": "London",
                "Brief": "UNITED KINGDOM - UK Coronavirus Death Toll Rises To 11329 - Up By 717"
              },
              {
                "DateTime": "2020-04-13 02:59:00",
                "Country": "United States",
                "City": "Annapolis, MD",
                "Brief": "MARYLAND - Nearly 9k COVID-19 Cases - 262 Deaths Reported In Maryland"
              },
              {
                "DateTime": "2020-04-13 03:10:00",
                "Country": "United States",
                "City": "Cook County, IL",
                "Brief": "ILLINOIS - 3rd Ill County Jail Inmate Dies From COVID-19"
              },
              {
                "DateTime": "2020-04-13 04:19:00",
                "Country": "United Arab Emirates",
                "City": "Abu Dhabi",
                "Brief": "UNITED ARAB EMIRATES - Coronavirus - UAE Reports Three More COVID-19-Related Deaths"
              },
              {
                "DateTime": "2020-04-13 04:23:00",
                "Country": "Turkey",
                "City": "Ankara",
                "Brief": "TURKEY - 3 Turkish Prisoners Die Out Of 17 Infected With Coronavirus"
              },
              {
                "DateTime": "2020-04-13 04:26:00",
                "Country": "Kazakhstan",
                "City": "Astana",
                "Brief": "KAZAKHSTAN - Coronavirus Claimed Life Of 11th Patient In Kazakhstan"
              },
              {
                "DateTime": "2020-04-13 04:36:00",
                "Country": "Iran",
                "City": "Tehran",
                "Brief": "IRAN - Iran Records 4585 Coronavirus Deaths As Restrictions Eased"
              },
              {
                "DateTime": "2020-04-13 04:38:00",
                "Country": "Armenia",
                "City": "Yerevan",
                "Brief": "ARMENIA - 67-Year-Old Coronavirus Patient Dies In Yerevan"
              },
              {
                "DateTime": "2020-04-13 04:44:00",
                "Country": "South Korea",
                "City": "Seoul",
                "Brief": "SOUTH KOREA - South Korea Reports More Recovered Coronavirus Patients Testing Positive Again"
              },
              {
                "DateTime": "2020-04-13 04:46:00",
                "Country": "India",
                "City": "Maharashtra",
                "Brief": "INDIA - 82 More COVID-19 Cases In Maharashtra - State Tally Reaches 2064"
              },
              {
                "DateTime": "2020-04-13 04:56:00",
                "Country": "Italy",
                "City": "Rome",
                "Brief": "ITALY - Italys Coronavirus Death Toll Tops 20000"
              },
              {
                "DateTime": "2020-04-13 05:13:00",
                "Country": "France",
                "City": "Paris",
                "Brief": "FRANCE - Coronavirus - France Death Toll 14400 Ahead Of Macron Speech On Lockdown"
              },
              {
                "DateTime": "2020-04-13 05:29:00",
                "Country": "Spain",
                "City": "Madrid",
                "Brief": "SPAIN - Spain Reports 3477 New Coronavirus Cases - 517 New Deaths"
              },
              {
                "DateTime": "2020-04-14 04:06:00",
                "Country": "United States",
                "City": "Belmont County, OH",
                "Brief": "OHIO - Coronavirus In Belmont County - Belmont County Health Department Confirms Death Due COVID-19"
              },
              {
                "DateTime": "2020-04-14 04:08:00",
                "Country": "India",
                "City": "Mumbai",
                "Brief": "INDIA - COVID-19 - Mumbai Reports 204 Cases 11 Deaths In One Day"
              },
              {
                "DateTime": "2020-04-14 04:12:00",
                "Country": "Ukraine",
                "City": "Kiev",
                "Brief": "UKRAINE - COVID-19 Death Toll Nears 100 In Ukraine"
              },
              {
                "DateTime": "2020-04-14 04:13:00",
                "Country": "Kuwait",
                "City": "Kuwait City",
                "Brief": "KUWAIT - Kuwait Reports 55 New Covid-19 Cases 1 More Death"
              },
              {
                "DateTime": "2020-04-14 04:24:00",
                "Country": "Palestinian Territory",
                "City": "Palestinian",
                "Brief": "PALESTINE - 10 New COVID-19 Cases Recorded In Palestine Totaling 320"
              },
              {
                "DateTime": "2020-04-14 04:27:00",
                "Country": "Iran",
                "City": "Tehran",
                "Brief": "IRAN - Coronavirus Death Toll Exceeds 27000 In 267 Cities"
              },
              {
                "DateTime": "2020-04-14 04:29:00",
                "Country": "Belgium",
                "City": "Brussels",
                "Brief": "BELGIUM - COVID-19 Deaths Exceed 4000 In Belgium"
              },
              {
                "DateTime": "2020-04-14 04:33:00",
                "Country": "Israel",
                "City": "Jerusalem",
                "Brief": "ISRAEL - 8-Day-Old Baby Infected With Coronavirus"
              },
              {
                "DateTime": "2020-04-14 04:37:00",
                "Country": "Indonesia",
                "City": "Jakarta",
                "Brief": "INDONESIA - Indonesia Reports Its Biggest Daily Jump In Coronavirus Deaths"
              },
              {
                "DateTime": "2020-04-14 04:50:00",
                "Country": "Nigeria",
                "City": "Lagos",
                "Brief": "NIGERIA - Lagos Confirms Sixth Coronavirus Death"
              },
              {
                "DateTime": "2020-04-14 04:52:00",
                "Country": "Belarus",
                "City": "Minsk",
                "Brief": "BELARUS - COVID-19 Cases In Belarus Rise To 3281"
              },
              {
                "DateTime": "2020-04-14 04:54:00",
                "Country": "Myanmar",
                "City": "Rangoon",
                "Brief": "MYANMAR - Myanmar Reports 21 New COVID-19 Cases In Single Day"
              },
              {
                "DateTime": "2020-04-14 04:55:00",
                "Country": "Egypt",
                "City": "Alexandria",
                "Brief": "EGYPT - Lecico Egypt Closes Borg El-Arab Factory After Coronavirus Case"
              },
              {
                "DateTime": "2020-04-14 04:58:00",
                "Country": "Japan",
                "City": "Tokyo",
                "Brief": "JAPAN - 16 People From All Japan Judo Federation Test Positive For COVID-19"
              },
              {
                "DateTime": "2020-04-14 05:19:00",
                "Country": "United States",
                "City": "Midway Township, MN",
                "Brief": "MINNESOTA - Small - Fixed-Wing Plane Makes Emergency Landing On Midway Road"
              },
              {
                "DateTime": "2020-04-15 03:16:00",
                "Country": "United Kingdom",
                "City": "London",
                "Brief": "UNITED KINGDOM - UK Hospital COVID-19 Death Toll Rises By 761 To 12868"
              },
              {
                "DateTime": "2020-04-15 03:18:00",
                "Country": "United States",
                "City": "Columbiana County, OH",
                "Brief": "OHIO - Columbiana County Records Jump In COVID-19 Cases - Related Deaths"
              },
              {
                "DateTime": "2020-04-15 03:21:00",
                "Country": "United States",
                "City": "Little Rock, AR",
                "Brief": "ARKANSAS - 2 More Arkansas COVID - 19 Deaths"
              },
              {
                "DateTime": "2020-04-15 03:23:00",
                "Country": "Sweden",
                "City": "Stockholm",
                "Brief": "SWEDEN - Sweden Records Its Highest Number Of Coronavirus Deaths In One Day With 170 Fatalities - Br"
              },
              {
                "DateTime": "2020-04-15 03:25:00",
                "Country": "Kyrgyzstan",
                "City": "Astana",
                "Brief": "KAZAKHSTAN - Coronavirus Claimed Life Of 15th Patient In Kazakhstan"
              },
              {
                "DateTime": "2020-04-15 03:32:00",
                "Country": "United States",
                "City": "Providence, RI",
                "Brief": "RHODE ISLAND - 9 Providence Police Officers Have Tested Positive For COVID-19 - 2 Have Recovered"
              },
              {
                "DateTime": "2020-04-15 04:26:00",
                "Country": "Kuwait",
                "City": "Kuwait City",
                "Brief": "KUWAIT - Kuwait Reports 55 New Coronavirus Cases"
              },
              {
                "DateTime": "2020-04-15 04:28:00",
                "Country": "Japan",
                "City": "Tokyo",
                "Brief": "JAPAN - Hospital-Acquired Coronavirus Infections Increasing In Japan"
              },
              {
                "DateTime": "2020-04-15 04:30:00",
                "Country": "United States",
                "City": "Laredo, TX",
                "Brief": "TEXAS - Over 50 Laredo Healthcare Professionals Confirmed Positive For Coronavirus"
              },
              {
                "DateTime": "2020-04-16 03:25:00",
                "Country": "United States",
                "City": "Richmond, VA",
                "Brief": "VIRGINIA - Virginias Coronavirus Death Toll Surpasses 200"
              },
              {
                "DateTime": "2020-04-16 03:27:00",
                "Country": "Germany",
                "City": "Berlin",
                "Brief": "GERMANY - COVID-19 Cases In Germany Rise To 130450 Death Toll At 3569"
              },
              {
                "DateTime": "2020-04-16 03:41:00",
                "Country": "Spain",
                "City": "Madrid",
                "Brief": "SPAIN - Spain Considers Summer School For Quarantined Children - Coronavirus Deaths Rise"
              },
              {
                "DateTime": "2020-04-16 03:46:00",
                "Country": "Spain",
                "City": "Madrid",
                "Brief": "SPAIN - Spain Considers Summer School For Quarantined Children - Coronavirus Deaths Rise"
              },
              {
                "DateTime": "2020-04-16 03:48:00",
                "Country": "United States",
                "City": "Hanover Twp, PA",
                "Brief": "PENNSYLVANIA - Another Adidas Employee Tests Positive For COVID-19"
              },
              {
                "DateTime": "2020-04-16 03:53:00",
                "Country": "United States",
                "City": "Sioux Falls, SD",
                "Brief": "SOUTH DAKOTA - Worker Dies Of COVID-19 At South Dakota Pork Factory Where 640 Tested Positive"
              },
              {
                "DateTime": "2020-04-16 03:55:00",
                "Country": "United Kingdom",
                "City": "London",
                "Brief": "UNITED KINGDOM - Coronavirus UK Death Toll Hits 13000 As Covid-19 Kills 870 In 24 Hours"
              },
              {
                "DateTime": "2020-04-16 03:56:00",
                "Country": "Russia",
                "City": "Serbia",
                "Brief": "RUSSIA - More Than 100 Deaths In Serbia From Coronavirus - In The Last 24 Hours - 4 More Have Died"
              },
              {
                "DateTime": "2020-04-16 03:59:00",
                "Country": "France",
                "City": "Paris",
                "Brief": "FRANCE - French Coronavirus Toll Jumps By Record 1438 Deaths"
              },
              {
                "DateTime": "2020-04-16 05:36:00",
                "Country": "Russia",
                "City": "Serbia",
                "Brief": "RUSSIA - More Than 100 Deaths In Serbia From Coronavirus: In The Last 24 Hours 4 More Have Died"
              },
              {
                "DateTime": "2020-04-16 05:37:00",
                "Country": "Ireland",
                "City": "Belfast",
                "Brief": "IRELAND - Eight Patients Die At Laois Care Centre As Dáil Discusses Nursing Homes - Todays COVID-19"
              },
              {
                "DateTime": "2020-04-16 05:39:00",
                "Country": "India",
                "City": "Bengaluru",
                "Brief": "INDIA - 66-Year-Old Coronavirus Patient Dies In Bengaluru"
              },
              {
                "DateTime": "2020-04-16 05:40:00",
                "Country": "Nigeria",
                "City": "Kano",
                "Brief": "NIGERIA - Kano Records First Death From Coronavirus - Confirmed Cases Now 21"
              },
              {
                "DateTime": "2020-04-16 07:39:00",
                "Country": "Philippines",
                "City": "Manila",
                "Brief": "PHILIPPINES - Philippines Reports 13 New Coronavirus Deaths - 207 More Infections"
              },
              {
                "DateTime": "2020-04-16 07:40:00",
                "Country": "United Arab Emirates",
                "City": "Abu Dhabi",
                "Brief": "UNITED ARAB EMIRATES - Coronavirus News Bulletin From Uae: 432 New Cases Confirmed - First Genome S"
              },
              {
                "DateTime": "2020-04-16 07:41:00",
                "Country": "Russia",
                "City": "Moscow",
                "Brief": "RUSSIA - Russia Reports Nearly 28000 Coronavirus Cases After New Record Daily Rise"
              },
              {
                "DateTime": "2020-04-16 07:43:00",
                "Country": "United States",
                "City": "Columbus, OH",
                "Brief": "OHIO - 7791 Cases In Ohio - 2291 In Kentucky - 8955 In Indiana"
              },
              {
                "DateTime": "2020-04-16 07:44:00",
                "Country": "Indonesia",
                "City": "Jakarta",
                "Brief": "INDONESIA - Indonesia Reports 380 New Coronavirus Infections - 27 Deaths"
              },
              {
                "DateTime": "2020-04-17 02:07:00",
                "Country": "United States",
                "City": "Camilla, GA",
                "Brief": "GEORGIA - 4 Workers Died From Coronavirus At A Tyson Foods Poultry Plant"
              },
              {
                "DateTime": "2020-04-17 03:59:00",
                "Country": "United States",
                "City": "Jefferson City, MO",
                "Brief": "MISSIOURI - Missouri Reports 5 New COVID - 19 Deaths - 216 More Cases"
              },
              {
                "DateTime": "2020-04-17 04:01:00",
                "Country": "United States",
                "City": "Richmond, VA",
                "Brief": "VIRGINIA - Virginias Coronavirus Cases Have Grown By Nearly 3000 In One Week"
              },
              {
                "DateTime": "2020-04-17 04:11:00",
                "Country": "India",
                "City": "Rajasthan",
                "Brief": "INDIA - 24 More COVID-19 Cases In Rajasthan - State Tally Reaches 1193"
              },
              {
                "DateTime": "2020-04-17 04:13:00",
                "Country": "Russia",
                "City": "Moscow",
                "Brief": "RUSSIA - Russian COVID-19 Cases Exceed 30000 With Daily Record Rise"
              },
              {
                "DateTime": "2020-04-17 04:14:00",
                "Country": "Hong Kong S.A.R., China",
                "City": "Victoria",
                "Brief": "HONG KONG - Hong Kong Reports 4 New COVID-19 Cases - 1021 In Total"
              },
              {
                "DateTime": "2020-04-17 04:16:00",
                "Country": "United States",
                "City": "Florence, SC",
                "Brief": "SOUTH CAROLINA - Number Of Florence School District 1 Employees Have Contracted COVID-19 - Officials"
              },
              {
                "DateTime": "2020-04-17 04:18:00",
                "Country": "South Korea",
                "City": "Seoul",
                "Brief": "SOUTH KOREA - South Korea Reports 22 More COVID-19 Cases - 10635 In Total"
              },
              {
                "DateTime": "2020-04-17 04:20:00",
                "Country": "United States",
                "City": "Herkimer County, NY",
                "Brief": "NEW YORK – Four New COVID-19 Cases Reported In Herkimer County"
              },
              {
                "DateTime": "2020-04-17 04:21:00",
                "Country": "United States",
                "City": "Vanderburgh County, IN",
                "Brief": "INDIANA - Total COVID-19 Cases Pass 10K In Indiana"
              },
              {
                "DateTime": "2020-04-17 04:30:00",
                "Country": "China",
                "City": "Jiangsu",
                "Brief": "CHINA - China Reports African Swine Fever In Pigs Transported To Jiangsu Province"
              },
              {
                "DateTime": "2020-04-17 22:37:00",
                "Country": "United States",
                "City": "Andover, NJ",
                "Brief": "NEW JERSEY - 18 Bodies Found Piled Up In Nursing Home"
              },
              {
                "DateTime": "2020-04-17 22:40:00",
                "Country": "United States",
                "City": "Alexandria, LA",
                "Brief": "LOUISIANA - 11 ICE Staffers At AEX Test Positive For COVID - 19"
              },
              {
                "DateTime": "2020-04-17 22:44:00",
                "Country": "Saudi Arabia",
                "City": "Riyadh",
                "Brief": "SAUDI ARABIA - 4 Deaths And 762 New Cases Of Corona Virus Were Recorded And 59 Cases Were Cured"
              },
              {
                "DateTime": "2020-04-17 22:46:00",
                "Country": "India",
                "City": "Jammu And Kashmir",
                "Brief": "INDIA - One COVID-19 Patient Dies In J-K"
              },
              {
                "DateTime": "2020-04-18 00:08:00",
                "Country": "Israel",
                "City": "Jerusalem",
                "Brief": "ISRAEL - COVID-19 Cases In Israel Exceed 13000 - Death Toll Hits 158"
              },
              {
                "DateTime": "2020-04-18 00:18:00",
                "Country": "Kyrgyzstan",
                "City": "Bishkek",
                "Brief": "KYRGYZSTAN - COVID-19 Cases Surpass 500 In Kyrgyzstan"
              },
              {
                "DateTime": "2020-04-18 02:01:00",
                "Country": "Afghanistan",
                "City": "Kabul",
                "Brief": "AFGHANISTAN - Afghanistan Reports 27 New COVID-19 Cease - Govt"
              },
              {
                "DateTime": "2020-04-18 02:07:00",
                "Country": "Singapore",
                "City": "Singapore City",
                "Brief": "SINGAPORE - Singpore Reports Daily Record Of 942 COVID-19 New Cases"
              },
              {
                "DateTime": "2020-04-18 02:14:00",
                "Country": "Russia",
                "City": "Moscow",
                "Brief": "RUSSIA - Russian COVID-19 Cases Rise By Daily Record Of 4785"
              },
              {
                "DateTime": "2020-04-18 20:22:00",
                "Country": "Australia",
                "City": "Canberra",
                "Brief": "AUSTRALIA - Australia Sees 3 New Deaths As Govt Urges App Installation"
              },
              {
                "DateTime": "2020-04-18 20:25:00",
                "Country": "Mexico",
                "City": "Mexico City",
                "Brief": "MEXICO - Mexico Reports 570 New Coronavirus Cases - 60 New Deaths"
              },
              {
                "DateTime": "2020-04-18 20:32:00",
                "Country": "India",
                "City": "Jaipur, Rajasthan",
                "Brief": "INDIA - Coronavirus In Rajasthan - 41 More Cases"
              },
              {
                "DateTime": "2020-04-18 20:43:00",
                "Country": "India",
                "City": "Shahjahanpur, Uttar Pradesh",
                "Brief": "INDIA - Suspected Coronavirus Death Reported From Shahjahanpur"
              },
              {
                "DateTime": "2020-04-18 20:49:00",
                "Country": "United States",
                "City": "Wyoming State Hospital, Wyoming 150, Evanston, WY, USA",
                "Brief": "WYOMING - Two Patients At Wyoming State Hospital Test Positive For COVID - 19"
              },
              {
                "DateTime": "2020-04-18 20:53:00",
                "Country": "United States",
                "City": "Broome County, NY, USA",
                "Brief": "NEW YORK - Pack Mail Employee Tests Positive For COVID - 19"
              },
              {
                "DateTime": "2020-04-18 20:58:00",
                "Country": "Thailand",
                "City": "Bangkok",
                "Brief": "THAILAND - Thailand Reports 33 New Cases - No New Deaths"
              },
              {
                "DateTime": "2020-04-18 21:07:00",
                "Country": "Germany",
                "City": "Berlin",
                "Brief": "GERMANY - Germanys Coronavirus Cases Rise By 3609 To 137439 - RKI"
              },
              {
                "DateTime": "2020-04-18 21:10:00",
                "Country": "South Korea",
                "City": "Seoul",
                "Brief": "SOUTH KOREA - South Korea Shows Lowest Daily Jump In Virus Cases Since February 20"
              },
              {
                "DateTime": "2020-04-18 21:15:00",
                "Country": "France",
                "City": "Paris",
                "Brief": "FRANCE - France Finds More Than 1000 Virus Cases On Aircraft Carrier"
              },
              {
                "DateTime": "2020-04-18 21:22:00",
                "Country": "China",
                "City": "Heilongjiang",
                "Brief": "CHINA - China Reports New Cases Coming From Russia"
              },
              {
                "DateTime": "2020-04-18 21:30:00",
                "Country": "Mexico",
                "City": "Mexico City",
                "Brief": "MEXICO - Mexico Reports 570 New Coronavirus Cases - 60 New Deaths"
              },
              {
                "DateTime": "2020-04-18 21:34:00",
                "Country": "India",
                "City": "Rajasthan",
                "Brief": "INDIA - Coronavirus In Rajasthan - 41 More Cases"
              },
              {
                "DateTime": "2020-04-18 21:37:00",
                "Country": "India",
                "City": "Mumbai, Maharashtra, India",
                "Brief": "INDIA - 21 Navy Personnel In Western Naval Command Test Positive For Coronavirus"
              },
              {
                "DateTime": "2020-04-18 21:40:00",
                "Country": "India",
                "City": "Andhra Pradesh",
                "Brief": "INDIA - Covid-19 In Andhra Pradesh - 603 Cases"
              },
              {
                "DateTime": "2020-04-19 03:02:00",
                "Country": "Bangladesh",
                "City": "Dhaka",
                "Brief": "BANGLADESH - Seven More Ccoronavirus Patients Die - 312 Test Positive In 24Hrs"
              },
              {
                "DateTime": "2020-04-19 03:15:00",
                "Country": "South Korea",
                "City": "Seoul",
                "Brief": "SOUTH KOREA - South Koreas New Ccoronavirus Cases Fall To Single Digits"
              },
              {
                "DateTime": "2020-04-19 03:56:00",
                "Country": "Ireland",
                "City": "Dublin",
                "Brief": "IRELAND - Coronavirus - One More Death In Northern Ireland"
              },
              {
                "DateTime": "2020-04-19 03:59:00",
                "Country": "Japan",
                "City": "Tokyo",
                "Brief": "JAPAN - Coronavirus Cases In Japan Exceed 10500"
              },
              {
                "DateTime": "2020-04-19 04:06:00",
                "Country": "United Kingdom",
                "City": "London",
                "Brief": "UNITED KINGDOM - Coronavirus - UK Hospital Deaths Reach 16060 After 596 More Patients Die"
              },
              {
                "DateTime": "2020-04-19 20:19:00",
                "Country": "Turkey",
                "City": "Ankara",
                "Brief": "TURKEY - Turkey Pandemic Case Numbers Overtake Iran - Highest In Middle East"
              },
              {
                "DateTime": "2020-04-20 05:16:00",
                "Country": "Australia",
                "City": "Canberra",
                "Brief": "AUSTRALIA - Coronavirus Updates - US COVID-19 Deaths Surpass 41000 - Australian Death Toll Stands At"
              },
              {
                "DateTime": "2020-04-20 05:17:00",
                "Country": "Kuwait",
                "City": "Kuwait City",
                "Brief": "KUWAIT - Kuwait Confirms 2 More Deaths - 80 New Covid-19 Cases"
              },
              {
                "DateTime": "2020-04-20 05:19:00",
                "Country": "Netherlands",
                "City": "Amsterdam",
                "Brief": "NETHERLANDS - Dutch Coronavirus Cases Rise By 750 To 33405 With 67 New Deaths"
              },
              {
                "DateTime": "2020-04-20 05:21:00",
                "Country": "Sweden",
                "City": "Stockholm",
                "Brief": "SWEDEN - Sweden Records Just 40 New Coronavirus Deaths And Less Than 400 Fresh Cases In One Day As T"
              },
              {
                "DateTime": "2020-04-20 20:38:00",
                "Country": "India",
                "City": "New Delhi",
                "Brief": "INDIA - Five More Delhi Police Personnel Test PositiveFor COVID-19"
              },
              {
                "DateTime": "2020-04-20 20:40:00",
                "Country": "Kenya",
                "City": "Nairobi",
                "Brief": "KENYA - Kenyas COVID-19 Cases Rise To 270"
              },
              {
                "DateTime": "2020-04-20 20:44:00",
                "Country": "Laos",
                "City": "Vientiane",
                "Brief": "LAOS - Laos Reports No New COVID-19 Case For 8 Days"
              },
              {
                "DateTime": "2020-04-20 20:47:00",
                "Country": "Russia",
                "City": "Moscow",
                "Brief": "RUSSIA - Russian COVID-19 Cases Rise By 4268 To 47121"
              },
              {
                "DateTime": "2020-04-20 20:50:00",
                "Country": "Afghanistan",
                "City": "Kabul",
                "Brief": "AFGHANISTAN - Afghanistan Reports 30 More COVID-19 Cases In 24 Hours - 1026 In Total"
              },
              {
                "DateTime": "2020-04-20 20:53:00",
                "Country": "Singapore",
                "City": "Singapore City",
                "Brief": "SINGAPORE - Singapore Reports Daily Record Of 1426 COVID-19 New Cases"
              },
              {
                "DateTime": "2020-04-20 20:55:00",
                "Country": "Fiji",
                "City": "Suva",
                "Brief": "FIJI - Fiji Confirms 18th COVID-19 Case"
              },
              {
                "DateTime": "2020-04-20 20:58:00",
                "Country": "Brazil",
                "City": "Brasilia",
                "Brief": "BRAZIL - COVID-19 Caseload In Latam Tops 100000"
              },
              {
                "DateTime": "2020-04-20 21:03:00",
                "Country": "Peru",
                "City": "Lima",
                "Brief": "PERU - Coronavirus Cases In Peru Top 15000 - Second Highest In Latin America"
              },
              {
                "DateTime": "2020-04-20 21:10:00",
                "Country": "United States",
                "City": "Volusia County, FL, USA",
                "Brief": "FLORIDA - 6 Volusia Nursing Homes Have COVID - 19 Positive Patients Or Staff"
              },
              {
                "DateTime": "2020-04-20 21:12:00",
                "Country": "India",
                "City": "Triplicane, Chennai, Tamil Nadu",
                "Brief": "INDIA - Two Chennai Scribes Test COVID-19 Positive - Street Where They Live Sealed"
              },
              {
                "DateTime": "2020-04-20 21:17:00",
                "Country": "India",
                "City": "New Delhi",
                "Brief": "INDIA - India COVID-19 Death Toll Rises To 543 As Total Cases Reach 17265"
              },
              {
                "DateTime": "2020-04-20 21:22:00",
                "Country": "United States",
                "City": "Kanawha County, WV, USA",
                "Brief": "WEST VIRGINIA - First COVID - 19 Death Reported In Kanawha County"
              },
              {
                "DateTime": "2020-04-20 21:24:00",
                "Country": "United States",
                "City": "Livingston County, MI, USA",
                "Brief": "MICHIGAN - 1 New Coronavirus Death Reported In Livingston County - 3 New Confirmed Cases"
              },
              {
                "DateTime": "2020-04-21 21:11:00",
                "Country": "Philippines",
                "City": "Manila",
                "Brief": "PHILIPPINES - Philippines Records 140 New Confirmed COVID-19 Cases - Tally At 6599"
              },
              {
                "DateTime": "2020-04-21 21:21:00",
                "Country": "Germany",
                "City": "Berlin",
                "Brief": "GERMANY - Germany Reports 1785 New COVID-19 Cases"
              },
              {
                "DateTime": "2020-04-21 21:27:00",
                "Country": "India",
                "City": "Odisha, India",
                "Brief": "INDIA - 5 More Test COVID-19 Positive In Odisha - Total Cases Rise To 79"
              },
              {
                "DateTime": "2020-04-21 21:30:00",
                "Country": "India",
                "City": "New Delhi",
                "Brief": "INDIA - 78 More COVID-19 Cases In Delhi - Tally In City Reaches 2081"
              },
              {
                "DateTime": "2020-04-21 21:38:00",
                "Country": "Singapore",
                "City": "Singapore City",
                "Brief": "SINGAPORE - 1426 New Coronavirus Cases - Bringing Spores Total To 8014"
              },
              {
                "DateTime": "2020-04-21 21:40:00",
                "Country": "United Kingdom",
                "City": "Dorset",
                "Brief": "UNITED KINGDOM - 17 New Cases Confirmed In Dorset"
              },
              {
                "DateTime": "2020-04-21 21:42:00",
                "Country": "Egypt",
                "City": "Cairo",
                "Brief": "EGYPT - Egypt Reports Record 189 Single - Day New COVID - 19 Cases - 3333 In Total"
              },
              {
                "DateTime": "2020-04-21 21:45:00",
                "Country": "New Zealand",
                "City": "Wellington",
                "Brief": "NEW ZEALAND - New Zealand Reports One More Death Of COVID-19"
              },
              {
                "DateTime": "2020-04-21 21:47:00",
                "Country": "United States",
                "City": "Plainwell, MI, USA",
                "Brief": "MICHIGAN - 60 Coronavirus Cases - 1 Death At Plainwell Meat Plant"
              },
              {
                "DateTime": "2020-04-22 05:10:00",
                "Country": "United States",
                "City": "Washington DC",
                "Brief": "DISTRICT OF COLUMBIA - US CDC Reports 776093 Coronavirus Cases - 41758 Deaths"
              },
              {
                "DateTime": "2020-04-22 05:16:00",
                "Country": "Turkey",
                "City": "Ankara",
                "Brief": "TURKEY - Turkeys Coronavirus Death Toll Rises To 2259 As Cases Near 100000"
              },
              {
                "DateTime": "2020-04-22 05:37:00",
                "Country": "Mongolia",
                "City": "Ulaanbaatar",
                "Brief": "MONGOLIA - Mongolia Confirms 1 New COVID-19 Case - Raising Total To 35"
              },
              {
                "DateTime": "2020-04-22 05:39:00",
                "Country": "Malaysia",
                "City": "Kuala Lumpur",
                "Brief": "MALAYSIA - Malaysia Reports 50 New Coronavirus Cases - One Death"
              },
              {
                "DateTime": "2020-04-22 05:40:00",
                "Country": "Philippines",
                "City": "Manila",
                "Brief": "PHILIPPINES - Philippines Records Nine New Coronavirus Deaths - 111 More Cases"
              },
              {
                "DateTime": "2020-04-22 05:42:00",
                "Country": "United Kingdom",
                "City": "London",
                "Brief": "UNITED KINGDOM - UK Death Toll In Hospitals From Coronavirus Rises By 763 To 18100"
              },
              {
                "DateTime": "2020-04-22 05:44:00",
                "Country": "Iran",
                "City": "Tehran",
                "Brief": "IRAN - Death Toll Due To Coronavirus Rises To 5391 In Iran - Businesses Open"
              },
              {
                "DateTime": "2020-04-22 07:39:00",
                "Country": "United States",
                "City": "Annapolis, MD",
                "Brief": "MARYLAND - Maryland Announces 47 More Coronavirus-Related Deaths - Pushing Victim Count To 631"
              },
              {
                "DateTime": "2020-04-22 07:40:00",
                "Country": "Uzbekistan",
                "City": "Namangan",
                "Brief": "UZBEKISTAN - 54 Yo Coronavirus Patient Dies In Uzbekistan"
              },
              {
                "DateTime": "2020-04-22 07:41:00",
                "Country": "Lebanon",
                "City": "Dinnieh",
                "Brief": "LEBANON - Patient Dies Of Coronavirus In Dinnieh"
              },
              {
                "DateTime": "2020-04-22 07:43:00",
                "Country": "Georgia",
                "City": "Tbilisi",
                "Brief": "GEORGIA - 5th Patient Dies Of Coronavirus In Georgia"
              },
              {
                "DateTime": "2020-04-22 07:48:00",
                "Country": "United States",
                "City": "Imperial County, CA",
                "Brief": "CALIFORNIA - Imperial County Confirms Fifth Coronavirus Death"
              },
              {
                "DateTime": "2020-04-22 07:52:00",
                "Country": "United Kingdom",
                "City": "Edinburgh",
                "Brief": "UNITED KINGDOM - Coronavirus In Scotland - Total Number Of Deaths Rises To More Than 1600"
              },
              {
                "DateTime": "2020-04-22 07:54:00",
                "Country": "United States",
                "City": "Brockton, MA",
                "Brief": "MASSACHUSETTS - 7 Residents At Guardian Center Nursing Home In Brockton Die From Coronavirus"
              },
              {
                "DateTime": "2020-04-22 07:55:00",
                "Country": "United States",
                "City": "Columbiana County, OH",
                "Brief": "OHIO - Coronavirus In Columbiana County - One New Death - 10 New Positive Cases In 24 Hours"
              },
              {
                "DateTime": "2020-04-22 07:57:00",
                "Country": "United Kingdom",
                "City": "Kettering General Hospital",
                "Brief": "UNITED KINGDOM - KGH Coronavirus Death Toll Rises To 72"
              },
              {
                "DateTime": "2020-04-22 13:28:00",
                "Country": "Nigeria",
                "City": "Kaduna",
                "Brief": "NIGERIA - Kaduna Discharges 5th Coronavirus Patient - Confirms 3 New Cases"
              },
              {
                "DateTime": "2020-04-22 13:32:00",
                "Country": "Japan",
                "City": "Tokyo",
                "Brief": "JAPAN - Tokyo Olympic Staffer Tests Positive For Coronavirus"
              },
              {
                "DateTime": "2020-04-22 13:37:00",
                "Country": "United States",
                "City": "Aiken County, SC",
                "Brief": "SOUTH CAROLINA - Second Aiken County Public Schools Employee Tests Positive For Coronavirus"
              },
              {
                "DateTime": "2020-04-22 13:39:00",
                "Country": "India",
                "City": "Kannur, Kerala",
                "Brief": "INDIA - Kannur COVID-19 Tally Keeps Escalating"
              },
              {
                "DateTime": "2020-04-22 13:40:00",
                "Country": "Sri Lanka",
                "City": "Colombo",
                "Brief": "SRI LANKA - Coronavirus Update - Sri Lankas Total Rises To 322 With 12 New Cases Today"
              },
              {
                "DateTime": "2020-04-22 13:44:00",
                "Country": "United States",
                "City": "Orange County, CA",
                "Brief": "CALIFORNIA - Orange County Expanding COVID-19 Testing As 29 More Cases Reported"
              },
              {
                "DateTime": "2020-04-22 13:47:00",
                "Country": "Bangladesh",
                "City": "Magura",
                "Brief": "BANGLADESH - First Coronavirus Patient Detected In Magura"
              },
              {
                "DateTime": "2020-04-22 13:50:00",
                "Country": "United States",
                "City": "Nashville, TN",
                "Brief": "TENNESSEE - Metro Health Dept Reports 1962 Cases Of COVID-19 In Nashville"
              },
              {
                "DateTime": "2020-04-22 13:53:00",
                "Country": "United States",
                "City": "New Orleans, LA",
                "Brief": "LOUISIANA - New Orleans RTA Operator Infected With COVID-19 - Hopes For More Protection"
              },
              {
                "DateTime": "2020-04-22 13:55:00",
                "Country": "United States",
                "City": "Willmar, MN",
                "Brief": "MINNESOTA - Jennie-O Turkey Plant In Willmar Reporting Coronavirus Outbreak"
              },
              {
                "DateTime": "2020-04-22 13:58:00",
                "Country": "Singapore",
                "City": "Singapore City",
                "Brief": "SINGAPORE - Singapore Confirms 1016 More Coronavirus Cases"
              },
              {
                "DateTime": "2020-04-22 14:00:00",
                "Country": "Japan",
                "City": "Saiseikai Central Hospital, 1 Chome-4-17 Mita, Minato City, Tokyo",
                "Brief": "JAPAN - Japanese Childrens Home Reports Eight Babies With Coronavirus"
              },
              {
                "DateTime": "2020-04-22 14:02:00",
                "Country": "Lebanon",
                "City": "Baalbek",
                "Brief": "LEBANON - Lebanon To Test For Coronavirus At Refugee Camp After First Case Found"
              },
              {
                "DateTime": "2020-04-22 14:04:00",
                "Country": "Philippines",
                "City": "Manila",
                "Brief": "PHILIPPINES - Philippines Records Nine New Coronavirus Deaths - 111 More Cases"
              },
              {
                "DateTime": "2020-04-22 14:07:00",
                "Country": "Malaysia",
                "City": "Kuala Lumpur",
                "Brief": "MALAYSIA - Malaysia Reports 50 New Coronavirus Cases - 1 Death"
              },
              {
                "DateTime": "2020-04-22 14:09:00",
                "Country": "India",
                "City": "Karnataka, India",
                "Brief": "INDIA - 7 More COVID-9 Cases In Karnataka - Count Rises To 425"
              },
              {
                "DateTime": "2020-04-22 14:12:00",
                "Country": "Belgium",
                "City": "Brussels",
                "Brief": "BELGIUM - COVID-19 Death Toll Exceeds 6000 In Belgium"
              },
              {
                "DateTime": "2020-04-22 14:13:00",
                "Country": "Bangladesh",
                "City": "Dhaka",
                "Brief": "BANGLADESH - Bangladesh Reports 390 New COVID-19 Cases - 10 More Deaths"
              },
              {
                "DateTime": "2020-04-22 14:15:00",
                "Country": "United States",
                "City": "Middle Amana, IA",
                "Brief": "IOWA - Amana Whirlpool To Temporarily Close - More Positive COVID-19 Cases"
              },
              {
                "DateTime": "2020-04-22 14:17:00",
                "Country": "Indonesia",
                "City": "Jakarta",
                "Brief": "INDONESIA - Indonesia Reports 283 New COVID-19 Cases"
              },
              {
                "DateTime": "2020-04-22 14:20:00",
                "Country": "Israel",
                "City": "Jerusalem",
                "Brief": "ISRAEL - COVID-19 Cases Surpass 14000 In Israel"
              },
              {
                "DateTime": "2020-04-22 14:22:00",
                "Country": "Afghanistan",
                "City": "Kabul",
                "Brief": "AFGHANISTAN - Afghanistan Reports 51 More COVID-19 Cases"
              },
              {
                "DateTime": "2020-04-22 14:24:00",
                "Country": "United States",
                "City": "Denver International Airport (DEN), Peña Blvd, Denver, CO, USA",
                "Brief": "COLORADO - 17 TSA Employees At DIA Test Positive For Coronavirus"
              },
              {
                "DateTime": "2020-04-22 14:26:00",
                "Country": "India",
                "City": "New Delhi",
                "Brief": "INDIA - Employee Tests COVID-19 Positive - Part Of Civil Aviation Ministrys Office Sealed"
              },
              {
                "DateTime": "2020-04-23 05:00:00",
                "Country": "United Kingdom",
                "City": "Warrington hospital",
                "Brief": "UNITED KINGDOM - 3 More Coronavirus Deaths At Warrington Hospital As Death Toll Passes 60"
              },
              {
                "DateTime": "2020-04-23 05:02:00",
                "Country": "Nigeria",
                "City": "Oyo",
                "Brief": "NIGERIA - Oyo Records First Coronavirus Death"
              },
              {
                "DateTime": "2020-04-23 05:03:00",
                "Country": "United Kingdom",
                "City": "South Shields",
                "Brief": "UNITED KINGDOM - 6 More Coronavirus Patients Die At South Tynesides Hospital Trust"
              },
              {
                "DateTime": "2020-04-23 05:05:00",
                "Country": "United States",
                "City": "Albany, NY",
                "Brief": "NEW YORK - Coronavirus Deaths At US Nursing Homes - Long-Term Facilities Reach Over 10000"
              },
              {
                "DateTime": "2020-04-23 05:07:00",
                "Country": "Nigeria",
                "City": "Lagos",
                "Brief": "NIGERIA - Coronavirus - Lagos Records Two More Deaths"
              },
              {
                "DateTime": "2020-04-23 05:10:00",
                "Country": "Pakistan",
                "City": "Lahore",
                "Brief": "PAKISTAN - 2 Coronavirus Patients Die At Mayo Hospital"
              },
              {
                "DateTime": "2020-04-23 05:12:00",
                "Country": "Kazakhstan",
                "City": "Almaty",
                "Brief": "KAZAKHSTAN - Coronavirus Claimed Life Of Patient In Almaty"
              },
              {
                "DateTime": "2020-04-23 21:28:00",
                "Country": "India",
                "City": "New Delhi",
                "Brief": "INDIA - 682 Dead In India - Over 21300 Cases Reported"
              },
              {
                "DateTime": "2020-04-23 21:31:00",
                "Country": "Bangladesh",
                "City": "Dhaka",
                "Brief": "BANGLADESH - Bangladeshs COVID-19 Tally Rises To 4186 - Death Toll At 127"
              },
              {
                "DateTime": "2020-04-23 21:33:00",
                "Country": "Israel",
                "City": "Jerusalem",
                "Brief": "ISRAEL - Israel Confirms 14592 COVID-19 Cases - 191 Deaths"
              },
              {
                "DateTime": "2020-04-23 21:35:00",
                "Country": "India",
                "City": "Rajasthan, India",
                "Brief": "INDIA - 49 More COVID-19 Cases In Rajasthan - State Tally Reaches 1937"
              },
              {
                "DateTime": "2020-04-23 21:38:00",
                "Country": "India",
                "City": "Amaravathi, Andhra Pradesh, India",
                "Brief": "INDIA - 80 More COVID-19 Cases In Andhra Pradesh - State Count Reaches 893"
              },
              {
                "DateTime": "2020-04-23 21:40:00",
                "Country": "United States",
                "City": "Springfield, MA, USA",
                "Brief": "MASSACHUSETTS - Springfield Sees Major Spike In Coronavirus Cases - 104 New COVID - 19 Cases Reporte"
              },
              {
                "DateTime": "2020-04-23 21:42:00",
                "Country": "Israel",
                "City": "Jerusalem",
                "Brief": "ISRAEL - Israel Confirms 14592 COVID-19 Cases - 191 Deaths"
              },
              {
                "DateTime": "2020-04-23 21:44:00",
                "Country": "Iran",
                "City": "Tehran",
                "Brief": "IRAN - Irans COVID-19 Cases Surpass 87000 - 5481 Deaths"
              },
              {
                "DateTime": "2020-04-23 21:46:00",
                "Country": "United States",
                "City": "Salem, OR, USA",
                "Brief": "OREGON - Oregon Reports 57 New Confirmed COVID-19 Cases"
              },
              {
                "DateTime": "2020-04-23 21:48:00",
                "Country": "United States",
                "City": "Bakersfield, CA, USA",
                "Brief": "CALIFORNIA - Bakersfield Starbucks Location Closed After Employee Was Diagnosed With COVID - 19"
              },
              {
                "DateTime": "2020-04-24 04:52:00",
                "Country": "United States",
                "City": "Mecklenburg County, NC",
                "Brief": "NORTH CAROLINA - Mecklenburg County - 1400 Cases - 8 Nursing Home Residents Have Died From Coronavir"
              },
              {
                "DateTime": "2020-04-24 04:53:00",
                "Country": "Kyrgyzstan",
                "City": "Almaty",
                "Brief": "KYRGYZSTAN - Another Coronavirus Patient Dies In Almaty"
              },
              {
                "DateTime": "2020-04-24 04:55:00",
                "Country": "United Kingdom",
                "City": "Lincolnshire",
                "Brief": "UNITED KINGDOM - Five More People Die From Coronavirus At Lincolnshire Hospitals"
              },
              {
                "DateTime": "2020-04-24 04:57:00",
                "Country": "United States",
                "City": "Chicago, IL",
                "Brief": "ILLINOIS - Latest Coronavirus News - Illinois Has Seen 2 Of Its Highest 3 Single-Day Increases In 48"
              },
              {
                "DateTime": "2020-04-24 05:03:00",
                "Country": "United Kingdom",
                "City": "Yorkshire",
                "Brief": "UNITED KINGDOM - 46 More Coronavirus Deaths In Yorkshire As Latest Figures Released By Area"
              },
              {
                "DateTime": "2020-04-24 05:08:00",
                "Country": "Canada",
                "City": "Quebec",
                "Brief": "CANADA - Quebec Officials To Provide Update As Coronavirus Cases - Deaths Continue To Rise"
              },
              {
                "DateTime": "2020-04-24 05:10:00",
                "Country": "Belgium",
                "City": "Brussels",
                "Brief": "BELGIUM - Coronavirus - 190 New Deaths - 210 Hospital Admissions In Belgium"
              },
              {
                "DateTime": "2020-04-24 05:11:00",
                "Country": "United States",
                "City": "Washington DC",
                "Brief": "DISTRICT OF COLUMBIA - US Coronavirus Cases Surpass 880000 With More Than 50000 Deaths"
              },
              {
                "DateTime": "2020-04-24 05:12:00",
                "Country": "Canada",
                "City": "Ottawa",
                "Brief": "CANADA - Canadas Coronavirus Death Toll Passes 2000"
              },
              {
                "DateTime": "2020-04-24 05:13:00",
                "Country": "United Kingdom",
                "City": "London",
                "Brief": "UNITED KINGDOM - Englands COVID-19 Hospital Death Toll Rises By 587 To 17373"
              },
              {
                "DateTime": "2020-04-24 05:14:00",
                "Country": "New Zealand",
                "City": "Christchurch",
                "Brief": "NEW ZEALAND - Tenth Rosewood Rest Home Resident Dies Of Covid-19"
              },
              {
                "DateTime": "2020-04-24 21:49:00",
                "Country": "Canada",
                "City": "Ottawa",
                "Brief": "CANADA - Canadas Coronavirus Death Toll Passes 2000"
              },
              {
                "DateTime": "2020-04-24 21:51:00",
                "Country": "United States",
                "City": "Albany, NY, USA",
                "Brief": "NEW YORK - Rapper Dies Aged 35 After Contracting Coronavirus"
              },
              {
                "DateTime": "2020-04-24 21:55:00",
                "Country": "India",
                "City": "Amaravathi, Andhra Pradesh, India",
                "Brief": "INDIA - 2 Deaths - 62 More COVID-19 Cases In Andhra Pradesh"
              },
              {
                "DateTime": "2020-04-24 21:58:00",
                "Country": "United States",
                "City": "St. Joseph County, IN, USA",
                "Brief": "INDIANA - St Joseph County County Records 29 New Confirmed Coronavirus Cases And 13th Death"
              },
              {
                "DateTime": "2020-04-24 22:00:00",
                "Country": "United States",
                "City": "Boise, ID, USA",
                "Brief": "IDAHO - Idaho Coronavirus Death Count Increases Again"
              },
              {
                "DateTime": "2020-04-24 22:02:00",
                "Country": "United States",
                "City": "Kalamazoo County, MI, USA",
                "Brief": "MICHIGAN - Daily Coronavirus Cases Swing Back Up - Total 229 In Kalamazoo County"
              },
              {
                "DateTime": "2020-04-24 22:04:00",
                "Country": "United States",
                "City": "Indianapolis, IN, USA",
                "Brief": "INDIANA - An Indiana Prison Tested Hundreds Of Inmates For Coronavirus AND 92 Percent Came Back Posi"
              },
              {
                "DateTime": "2020-04-24 22:09:00",
                "Country": "United States",
                "City": "Tyson Foods Inc, West Jackson Street, Shelbyville, TN, USA",
                "Brief": "TENNESSEE - Shelbyville Tyson Plant With Covid-19 Cluster To Shut Down For Cleaning"
              },
              {
                "DateTime": "2020-04-25 21:37:00",
                "Country": "United States",
                "City": "Trenton, NJ, USA",
                "Brief": "NEW JERSEY - NJ Coronavirus Cases Increase To 102196 - With 5617 Deaths Reported Statewide - 3047 Ne"
              },
              {
                "DateTime": "2020-04-25 21:40:00",
                "Country": "United States",
                "City": "Lansing, MI, USA",
                "Brief": "MICHIGAN - 3085 Deaths - 36641 Cases Of Coronavirus Confirmed In Michigan"
              },
              {
                "DateTime": "2020-04-25 21:42:00",
                "Country": "United States",
                "City": "Washington DC, DC, USA",
                "Brief": "DISTRICT OF COLUMBIA - Coronavirus Deaths Tops 50000 In US - More Than Any Other Country"
              },
              {
                "DateTime": "2020-04-25 21:51:00",
                "Country": "Thailand",
                "City": "Bangkok",
                "Brief": "THAILAND - Thailand Reports 53 New Cases - One New Death"
              },
              {
                "DateTime": "2020-04-25 21:57:00",
                "Country": "Sri Lanka",
                "City": "Colombo, Sri Lanka",
                "Brief": "SRI LANKA - 29 Lanka Navy Personnel Test Positive For Coronavirus"
              },
              {
                "DateTime": "2020-04-25 22:03:00",
                "Country": "India",
                "City": "Pondicherry, Puducherry, India",
                "Brief": "INDIA - One More Tests Positive In Pondy - Tally Rises To 4"
              },
              {
                "DateTime": "2020-04-25 22:06:00",
                "Country": "India",
                "City": "Karnataka, India",
                "Brief": "INDIA - Journalist Among 15 New COVID-19 Cases In Karnataka"
              },
              {
                "DateTime": "2020-04-25 22:12:00",
                "Country": "India",
                "City": "Firozabad, Uttar Pradesh, India",
                "Brief": "INDIA - 7 New COVID-19 Patients In Firozabad - Total Cases Rise To 78"
              },
              {
                "DateTime": "2020-04-25 22:16:00",
                "Country": "India",
                "City": "Rajasthan, India",
                "Brief": "INDIA - 27 New COVID19 Positive Cases In Rajasthan"
              },
              {
                "DateTime": "2020-04-25 22:32:00",
                "Country": "United States",
                "City": "Tallahassee, FL",
                "Brief": "FLORIDA - 30839 Cases Of COVID-19 In Florida - 1055 Deaths In The State"
              },
              {
                "DateTime": "2020-04-25 22:34:00",
                "Country": "India",
                "City": "Kaimur, Bihar, India",
                "Brief": "INDIA - Kaimur - COVID19 Cases Rise To 238 In Bihar"
              },
              {
                "DateTime": "2020-04-25 22:44:00",
                "Country": "Singapore",
                "City": "Singapore City",
                "Brief": "SINGAPORE - Singapore Reports 618 New Coronavirus Cases"
              },
              {
                "DateTime": "2020-04-25 22:47:00",
                "Country": "India",
                "City": "Uttar Pradesh, India",
                "Brief": "INDIA - Total 1778 COVID19 Positive Cases In UP"
              },
              {
                "DateTime": "2020-04-25 22:49:00",
                "Country": "India",
                "City": "Buxar, Bihar, India",
                "Brief": "INDIA - Buxar - COVID19 Cases Rise To 238 In Bihar"
              },
              {
                "DateTime": "2020-04-25 22:51:00",
                "Country": "India",
                "City": "Maharashtra, India",
                "Brief": "INDIA - 15 More Cases In Maharashtra"
              },
              {
                "DateTime": "2020-04-26 22:14:00",
                "Country": "Iran",
                "City": "Tehran",
                "Brief": "IRAN - Iran Says Death Toll Rises By 60 To 5710"
              },
              {
                "DateTime": "2020-04-26 22:16:00",
                "Country": "Netherlands",
                "City": "Amsterdam",
                "Brief": "NETHERLANDS - Dutch Cases Rise By 655 To 37845 With 66 New Deaths - Authorities"
              },
              {
                "DateTime": "2020-04-26 22:18:00",
                "Country": "Turkey",
                "City": "Ankara",
                "Brief": "TURKEY - Turkeys Death Toll Rises To 2706"
              },
              {
                "DateTime": "2020-04-26 22:21:00",
                "Country": "France",
                "City": "Paris",
                "Brief": "FRANCE - Death Toll Rises To 22614 In France"
              },
              {
                "DateTime": "2020-04-26 22:23:00",
                "Country": "India",
                "City": "Srinagar",
                "Brief": "INDIA - 1 More Coronavirus Patient Dies In IOK"
              },
              {
                "DateTime": "2020-04-26 22:28:00",
                "Country": "Malta",
                "City": "Mater Dei Hospital",
                "Brief": "MALTA - Woman Is Fourth Coronavirus Patient To Die"
              },
              {
                "DateTime": "2020-04-26 22:30:00",
                "Country": "United States",
                "City": "Montgomery, AL",
                "Brief": "ALABAMA - Over 200 Killed - 6200 Confirmed COVID-19 Cases In Alabama"
              },
              {
                "DateTime": "2020-04-26 22:34:00",
                "Country": "Nigeria",
                "City": "Ondo",
                "Brief": "NIGERIA - Ondo Records Fourth COVID-19 Case"
              },
              {
                "DateTime": "2020-04-26 22:35:00",
                "Country": "United States",
                "City": "Hempstead, NY",
                "Brief": "NEW YORK - Nassau Coronavirus Cases By Community - Hempstead Reaches 1600"
              },
              {
                "DateTime": "2020-04-26 22:39:00",
                "Country": "United States",
                "City": "Ivy Hall Nursing Home, South Watauga Avenue, Elizabethton, TN",
                "Brief": "TENNESSEE - Ivy Hall Nursing Home Releases Statement After Three Employees Test Positive For COVID-1"
              },
              {
                "DateTime": "2020-04-26 22:41:00",
                "Country": "United States",
                "City": "Iowa Veterans Home, Summit Street, Marshalltown, IA",
                "Brief": "IOWA - Iowa Veterans Home Reports Positive Coronavirus Case"
              },
              {
                "DateTime": "2020-04-26 22:43:00",
                "Country": "United States",
                "City": "Monroe, NJ",
                "Brief": "NEW JERSEY - Monroe Reports 15 New Positive Covid-19 Cases"
              },
              {
                "DateTime": "2020-04-26 22:45:00",
                "Country": "Sri Lanka",
                "City": "Colombo",
                "Brief": "SRI LANKA - Coronavirus Cases In Sri Lanka Reach 460"
              },
              {
                "DateTime": "2020-04-26 22:47:00",
                "Country": "United States",
                "City": "Brevard, FL",
                "Brief": "FLORIDA - Coronavirus In Brevard - April 25 Cases At 250 - 8 Deaths"
              },
              {
                "DateTime": "2020-04-26 22:49:00",
                "Country": "United States",
                "City": "Raleigh, NC",
                "Brief": "NORTH CAROLINA - Coronavirus Live Updates: Heres What To Know In North Carolina On April 25"
              },
              {
                "DateTime": "2020-04-26 22:56:00",
                "Country": "India",
                "City": "Andhra Pradesh, India",
                "Brief": "INDIA - 81 New Positive Cases Reported In The Last 24 Hours In Andhra Pradesh"
              },
              {
                "DateTime": "2020-04-26 22:58:00",
                "Country": "India",
                "City": "Uttarakhand, India",
                "Brief": "INDIA - Number Of Covid-19 Cases Touch 50 In Uttarakhand"
              },
              {
                "DateTime": "2020-04-26 23:01:00",
                "Country": "Canada",
                "City": "Ontario, Canada",
                "Brief": "CANADA - Ontario Reports 437 New Coronavirus Cases - 24 Deaths As Total Cases Top 14400"
              },
              {
                "DateTime": "2020-04-26 23:02:00",
                "Country": "India",
                "City": "Karnataka, India",
                "Brief": "INDIA - Karnataka Cases Now 503 - Death Toll 19"
              },
              {
                "DateTime": "2020-04-26 23:04:00",
                "Country": "India",
                "City": "Jharkhand, India",
                "Brief": "INDIA - 9 More Cases In Jharkhand - Total Reaches 82"
              },
              {
                "DateTime": "2020-04-26 23:06:00",
                "Country": "India",
                "City": "Maharashtra, India",
                "Brief": "INDIA - Maharashtra Cases Reach 8068 - Death Toll 342"
              },
              {
                "DateTime": "2020-04-26 23:09:00",
                "Country": "India",
                "City": "Tamil Nadu, India",
                "Brief": "INDIA - Tamil Nadu Cases Now 1885 - Death Toll 24"
              },
              {
                "DateTime": "2020-04-26 23:11:00",
                "Country": "India",
                "City": "Kerala, India",
                "Brief": "INDIA - 11 New COVID-19 Cases In Kerala - Hotspots Now 87"
              },
              {
                "DateTime": "2020-04-26 23:14:00",
                "Country": "Netherlands",
                "City": "Amsterdam",
                "Brief": "NETHERLANDS - Minks Found To Be Infected On Two Dutch Farms"
              },
              {
                "DateTime": "2020-04-27 21:41:00",
                "Country": "Israel",
                "City": "Mayanei Hayeshua Medical Center, HaRav David Povarski Street, Bnei Brak, Israel",
                "Brief": "ISRAEL - Israel Records 15466 COVID-19 Cases - 202 Deaths"
              },
              {
                "DateTime": "2020-04-27 21:43:00",
                "Country": "United States",
                "City": "Richmond, VA, USA",
                "Brief": "VIRGINIA - Virginia Department Of Health Reports 12970 Coronavirus Cases - 448 Deaths"
              },
              {
                "DateTime": "2020-04-27 21:47:00",
                "Country": "Singapore",
                "City": "Singapore City",
                "Brief": "SINGAPORE - Coronavirus - 931 New Cases - Of Which 15 Are Sporeans And PRs - Experts Say Too Early T"
              },
              {
                "DateTime": "2020-04-27 21:49:00",
                "Country": "United States",
                "City": "Raleigh, NC, USA",
                "Brief": "NORTH CAROLINA - Number Of Coronavirus Cases In North Carolina Now At 8830"
              },
              {
                "DateTime": "2020-04-27 21:51:00",
                "Country": "United States",
                "City": "Denver, CO, USA",
                "Brief": "COLORADO - Colorado Coronavirus Latest - April 26"
              },
              {
                "DateTime": "2020-04-27 21:53:00",
                "Country": "China",
                "City": "Beijing",
                "Brief": "CHINA - Chinese Mainland Reports 107 COVID-19 Cases With Imported Case Links - Official"
              },
              {
                "DateTime": "2020-04-27 21:55:00",
                "Country": "Russia",
                "City": "Moscow",
                "Brief": "RUSSIA - Russias COVID-19 Cases Grow By 6198 To 87147"
              },
              {
                "DateTime": "2020-04-27 21:57:00",
                "Country": "Japan",
                "City": "Tokyo",
                "Brief": "JAPAN - COVID-19 Cases In Japan Rise To 13585"
              },
              {
                "DateTime": "2020-04-27 22:01:00",
                "Country": "Ukraine",
                "City": "Kiev",
                "Brief": "UKRAINE - Ukraine COVID-19 Cases Exceed 9000"
              },
              {
                "DateTime": "2020-04-27 22:03:00",
                "Country": "Kenya",
                "City": "Nairobi",
                "Brief": "KENYA - Kenya Confirms 8 New COVID-19 Cases As Tally Hits 363"
              },
              {
                "DateTime": "2020-04-27 22:04:00",
                "Country": "Lebanon",
                "City": "Beirut",
                "Brief": "LEBANON - Lebanons Number Of COVID-19 Infections Rises To 710"
              },
              {
                "DateTime": "2020-04-27 22:06:00",
                "Country": "Kazakhstan",
                "City": "Astana",
                "Brief": "KAZAKHSTAN - Kazakhstan Extends State Of Emergency Until May 11"
              },
              {
                "DateTime": "2020-04-27 22:09:00",
                "Country": "Belarus",
                "City": "Minsk",
                "Brief": "BELARUS - Belarus COVID-19 Cases Surpass 11000"
              },
              {
                "DateTime": "2020-04-27 22:16:00",
                "Country": "China",
                "City": "Beijing",
                "Brief": "GLOBAL - Latest Count Of Confirmed COVID-19 Cases Worldwide At 1000 GMT - April 27 - 2981592"
              },
              {
                "DateTime": "2020-04-28 20:39:00",
                "Country": "United Kingdom",
                "City": "London",
                "Brief": "UNITED KINGDOM - Another 360 COVID-19 Patients Die In UK Hospitals: Health Secretary"
              },
              {
                "DateTime": "2020-04-28 20:41:00",
                "Country": "Israel",
                "City": "Jerusalem",
                "Brief": "ISRAEL - Israel Confirms 15555 COVID-19 cases - 204 Deaths"
              },
              {
                "DateTime": "2020-04-28 20:43:00",
                "Country": "Indonesia",
                "City": "Jakarta",
                "Brief": "INDONESIA - Indonesia Reports 415 New COVID-19 Cases - 8 New Deaths"
              },
              {
                "DateTime": "2020-04-28 20:45:00",
                "Country": "Iran",
                "City": "Tehran",
                "Brief": "IRAN - Iran Reports 1112 New Covid-19 Cases - 71 More Deaths"
              },
              {
                "DateTime": "2020-04-28 20:47:00",
                "Country": "United States",
                "City": "Columbia, SC,USA",
                "Brief": "SOUTH CAROLINA - Coronavirus Updates In SC - DHEC Reports 142 New Cases - 3 More Deaths"
              },
              {
                "DateTime": "2020-04-28 20:49:00",
                "Country": "United States",
                "City": "Lansing, MI, USA",
                "Brief": "MICHIGAN - 3407 Deaths - 38210 Cases Of Coronavirus Confirmed In Michigan"
              },
              {
                "DateTime": "2020-04-28 20:51:00",
                "Country": "United Kingdom",
                "City": "London",
                "Brief": "UNITED KINGDOM - Coronavirus - 329 More COVID-19 Deaths In England Hospitals - Lowest Daily Rise In"
              },
              {
                "DateTime": "2020-04-28 20:54:00",
                "Country": "France",
                "City": "Paris",
                "Brief": "FRANCE - France Reports The Most New Coronavirus Cases Since April 18"
              },
              {
                "DateTime": "2020-04-28 20:57:00",
                "Country": "United States",
                "City": "Concord, NH, USA",
                "Brief": "NEW HAMPSHIRE - 75 New NH Cases - 3 New Care Facility Outbreaks - 5 New Testing Sites"
              },
              {
                "DateTime": "2020-04-28 20:58:00",
                "Country": "Philippines",
                "City": "Manila",
                "Brief": "PHILIPPINES - COVID-19 Cases In Philippines Inch Closer To 8000"
              },
              {
                "DateTime": "2020-04-28 21:05:00",
                "Country": "Sierra Leone",
                "City": "Freetown",
                "Brief": "SIERRA LEONEA - Sierra Leonean Tests Positive For Covid-19 In Custody"
              },
              {
                "DateTime": "2020-04-28 21:06:00",
                "Country": "Bangladesh",
                "City": "Dhaka",
                "Brief": "BANGLADESH - Bangladesh Reports Record Jump In COVID-19 Cases"
              },
              {
                "DateTime": "2020-04-28 21:08:00",
                "Country": "Belarus",
                "City": "Minsk",
                "Brief": "BELARUS - Belarus COVID-19 Cases Surpass 12000"
              },
              {
                "DateTime": "2020-04-28 21:10:00",
                "Country": "Afghanistan",
                "City": "Kabul",
                "Brief": "AFGHANISTAN - Afghanistan Reports 125 New COVID-19 Cases - Tally At 1828"
              },
              {
                "DateTime": "2020-04-28 21:11:00",
                "Country": "Brunei",
                "City": "Bandar Seri Begawan",
                "Brief": "BRUNEI - Brunei Reports No New Covid-19 Cases For 9 Straight Days"
              },
              {
                "DateTime": "2020-04-28 21:16:00",
                "Country": "Greece",
                "City": "Athens",
                "Brief": "GREECE - Greece Reports 2 New COVID-19 Deaths Within 24 Hours - Bringing Total To 136"
              },
              {
                "DateTime": "2020-04-28 21:19:00",
                "Country": "United Arab Emirates",
                "City": "Abu Dhabi",
                "Brief": "UNITED ARAB EMIRATES - 490 New COVID-19 Cases Reported In UAE - 10839 In Total"
              },
              {
                "DateTime": "2020-04-28 21:22:00",
                "Country": "Iraq",
                "City": "Baghdad",
                "Brief": "IRAQ - Iraq Reports 27 New COVID-19 Cases - 1847 In Total"
              },
              {
                "DateTime": "2020-04-28 21:23:00",
                "Country": "Oman",
                "City": "Muscat",
                "Brief": "OMAN - Oman Reports 51 New COVID-19 Cases - 2049 In Total"
              },
              {
                "DateTime": "2020-04-28 21:25:00",
                "Country": "Sudan",
                "City": "Khartoum",
                "Brief": "SUDAN - Sudan Announces 38 New COVID-19 Cases - 275 In Total"
              },
              {
                "DateTime": "2020-04-28 21:27:00",
                "Country": "Tunisia",
                "City": "Tunis",
                "Brief": "TUNISIA - 18 New COVID-19 Cases Confirmed In Tunisia - 967 In Total"
              },
              {
                "DateTime": "2020-04-28 21:46:00",
                "Country": "China",
                "City": "Beijing",
                "Brief": "GLOBAL - Global COVID-19 Cases Top 3 mln -- Johns Hopkins University"
              },
              {
                "DateTime": "2020-04-28 21:48:00",
                "Country": "Uganda",
                "City": "Kampala",
                "Brief": "UGANDA - Uganda Repatriates 14 Virus-Positive Cross-Border Cargo Truck Drivers"
              },
              {
                "DateTime": "2020-04-28 21:51:00",
                "Country": "Maldives",
                "City": "Male",
                "Brief": "MALDIVES - COVID-19 Cases In Maldives Reach 226"
              },
              {
                "DateTime": "2020-04-28 21:53:00",
                "Country": "Russia",
                "City": "Moscow",
                "Brief": "RUSSIA - Russia Reports 6411 New COVID-19 Cases - Total Reaches 93558"
              },
              {
                "DateTime": "2020-04-29 02:25:00",
                "Country": "United States",
                "City": "Wichita, KS",
                "Brief": "KANSAS - COVID-19 Cluster At Wichita Care Home Involves 36 Cases - 2 Deaths"
              },
              {
                "DateTime": "2020-04-29 02:26:00",
                "Country": "Saudi Arabia",
                "City": "Riyadh",
                "Brief": "SAUDI ARABIA - Saudi Arabia Confirms 1325 New Cases - 5 Deaths"
              },
              {
                "DateTime": "2020-04-29 02:28:00",
                "Country": "Canada",
                "City": "Pickering",
                "Brief": "CANADA - 47 Coronavirus-Related Deaths Reported At Pickering Long-Term Care Home"
              },
              {
                "DateTime": "2020-04-29 21:17:00",
                "Country": "Bangladesh",
                "City": "Dhaka",
                "Brief": "BANGLADESH - 8 More Die As Bangladesh Again Records Highest Number Of New Cases In 24 Hours"
              },
              {
                "DateTime": "2020-04-29 21:19:00",
                "Country": "Indonesia",
                "City": "Jakarta",
                "Brief": "INDONESIA - Indonesia Reports 260 New Confirmed Cases Of COVID-19 - 11 New Deaths"
              },
              {
                "DateTime": "2020-04-29 21:22:00",
                "Country": "India",
                "City": "New Delhi",
                "Brief": "INDIA - COVID-19 Deaths In India Cross 1000 Mark - Cases Surpass 30000"
              },
              {
                "DateTime": "2020-04-29 21:23:00",
                "Country": "India",
                "City": "New Delhi",
                "Brief": "INDIA - COVID - 19 Cases In India Cross 31000 - Death Toll At 1007 - State - Wise Tally"
              },
              {
                "DateTime": "2020-04-29 21:26:00",
                "Country": "United Kingdom",
                "City": "London",
                "Brief": "UNITED KINGDOM - UK Says Some Children Have Died From Syndrome Linked To COVID - 19"
              },
              {
                "DateTime": "2020-04-29 21:29:00",
                "Country": "Peru",
                "City": "Lima",
                "Brief": "PERU - Death Toll In Peru Prison Riot Over Coronavirus Demands Rises To Nine"
              },
              {
                "DateTime": "2020-04-29 21:32:00",
                "Country": "Germany",
                "City": "Berlin",
                "Brief": "GERMANY - Germany Reports 1304 More Coronavirus Cases - 202 More Deaths"
              },
              {
                "DateTime": "2020-04-29 21:36:00",
                "Country": "United States",
                "City": "Lenoir County, NC, USA",
                "Brief": "NORTH CAROLINA - Lenoir County Confirms 14 More Cases Of COVID - 19"
              },
              {
                "DateTime": "2020-04-29 21:38:00",
                "Country": "Mongolia",
                "City": "Ulaanbaatar",
                "Brief": "MONGOLIA - Mongolia Reports No New COVID-19 Cases"
              },
              {
                "DateTime": "2020-04-29 21:40:00",
                "Country": "Laos",
                "City": "Vientiane",
                "Brief": "LAOS - Laos Reports No New Case Of COVID-19 - 1 More Recovery"
              },
              {
                "DateTime": "2020-04-29 21:42:00",
                "Country": "Italy",
                "City": "Rome",
                "Brief": "ITALY - Italys Tops 200000 Coronavirus Cases - Daily Death Toll Rises"
              },
              {
                "DateTime": "2020-04-29 21:44:00",
                "Country": "Russia",
                "City": "Moscow",
                "Brief": "RUSSIA - Russias COVID - 19 Cases Near 100000"
              },
              {
                "DateTime": "2020-04-29 21:48:00",
                "Country": "Philippines",
                "City": "Manila",
                "Brief": "PHILIPPINES - COVID - 19 Cases In Philippines Surpass 8000 With 254 New Cases"
              }
            ]
          },
          {
            "Name": "Dengue / Hemorrhagic Fever",
            "is_checked" : true,
            "Cases": [
              {
                "DateTime": "2020-04-02 04:25:00",
                "Country": "Argentina",
                "City": "Buenos Aires",
                "Brief": "ARGENTINA - Mendez Confirmed 374 Dengue Cases At The Spa"
              },
              {
                "DateTime": "2020-04-04 00:39:00",
                "Country": "Argentina",
                "City": "Brinkmann",
                "Brief": "ARGENTINA - Dengue Cases In Brinkmann Total 52"
              },
              {
                "DateTime": "2020-04-04 00:48:00",
                "Country": "Brazil",
                "City": "Moji-Mirim",
                "Brief": "BRAZIL - Mogi Mirim Records 1235 Dengue Cases - City ​​Has 1 Death From Illness"
              },
              {
                "DateTime": "2020-04-04 00:53:00",
                "Country": "Reunion",
                "City": "Saint-Denis",
                "Brief": "REUNION - 2 Deaths From Dengue Fever In Reunion"
              },
              {
                "DateTime": "2020-04-07 03:41:00",
                "Country": "Indonesia",
                "City": "Jakarta",
                "Brief": "INDONESIA - Dengue Fever Claims 254 Indonesian Lives Amid COVID-19 Outbreak"
              },
              {
                "DateTime": "2020-04-10 22:53:00",
                "Country": "Thailand",
                "City": "Bangkok",
                "Brief": "THAILAND - Thai Dengue Fever Infections Rise To 8147 In Three Provinces"
              },
              {
                "DateTime": "2020-04-10 22:55:00",
                "Country": "Brazil",
                "City": "Aracatuba",
                "Brief": "BRAZIL - Aracatuba Records 246 Dengue Cases In Less Than A Week"
              },
              {
                "DateTime": "2020-04-10 22:58:00",
                "Country": "Brazil",
                "City": "Jundiai",
                "Brief": "BRAZIL - Dengue - Jundiai Records 57 Confirmed Cases"
              },
              {
                "DateTime": "2020-04-11 02:09:00",
                "Country": "Indonesia",
                "City": "North Maluku",
                "Brief": "INDONESIA - Dengue Fever Kills At Least Six People In North Maluku"
              },
              {
                "DateTime": "2020-04-11 02:15:00",
                "Country": "Bangladesh",
                "City": "Dhaka",
                "Brief": "BANGLADESH - One New Dengue Patient In Last 24 Hrs - DGHS"
              },
              {
                "DateTime": "2020-04-12 00:40:00",
                "Country": "India",
                "City": "Wanaparthy",
                "Brief": "INDIA - 38 Dengue Cases Reported In Wanaparthy"
              },
              {
                "DateTime": "2020-04-12 02:23:00",
                "Country": "Brazil",
                "City": "Santa Maria",
                "Brief": "BRAZIL - Santa Maria Has 20 Confirmed Cases Of Dengue"
              },
              {
                "DateTime": "2020-04-14 05:59:00",
                "Country": "Bangladesh",
                "City": "Dhaka",
                "Brief": "BANGLADESH - Three Hospitalised With Dengue In 24 Hours"
              },
              {
                "DateTime": "2020-04-14 06:01:00",
                "Country": "Brazil",
                "City": "Chapeco",
                "Brief": "BRAZIL - Chapeco Accounts For 36 Confirmed Dengue Cases"
              },
              {
                "DateTime": "2020-04-18 04:18:00",
                "Country": "Argentina",
                "City": "Jujuy",
                "Brief": "ARGENTINA - Dengue - More Than 1300 Confirmed Cases In Jujuy"
              },
              {
                "DateTime": "2020-04-19 00:40:00",
                "Country": "Argentina",
                "City": "Tucuman",
                "Brief": "ARGENTINA - 824 Dengue Cases Confirmed In Tucuman"
              },
              {
                "DateTime": "2020-04-21 22:52:00",
                "Country": "Argentina",
                "City": "Santiago del Estero",
                "Brief": "ARGENTINA - Confirm That There Are 700 Cases Of Dengue In The Province"
              },
              {
                "DateTime": "2020-04-21 22:54:00",
                "Country": "Bangladesh",
                "City": "Dhaka",
                "Brief": "BANGLADESH - One New Dengue Case Reported In 24 Hours"
              },
              {
                "DateTime": "2020-04-25 00:03:00",
                "Country": "Mayotte",
                "City": "Mamoudzou",
                "Brief": "MAYOTTE - Dengue Fever In Mayotte - More Than 3500 Cases Reported To Date"
              },
              {
                "DateTime": "2020-04-25 00:07:00",
                "Country": "Argentina",
                "City": "Tucuman",
                "Brief": "ARGENTINA - Confirmed 1097 Cases Of The Disease In Tucuman"
              },
              {
                "DateTime": "2020-04-27 22:41:00",
                "Country": "Brazil",
                "City": "Araraquara",
                "Brief": "BRAZIL - Araraquara Has 139 Dengue Cases In 2020"
              },
              {
                "DateTime": "2020-04-28 00:04:00",
                "Country": "Argentina",
                "City": "Tucuman",
                "Brief": "ARGENTINA - Dengue In Tucuman - The Number Of Infected Amounts To 1227"
              },
              {
                "DateTime": "2020-04-28 00:08:00",
                "Country": "Brazil",
                "City": "Pauliceia",
                "Brief": "BRAZIL - 82-Year-Old Man Is The Second Dengue Death Recorded In Pauliceia"
              },
              {
                "DateTime": "2020-04-28 23:58:00",
                "Country": "Brazil",
                "City": "State Of Minas Gerais",
                "Brief": "BRAZIL - Probable Dengue Cases Grow In The Main Cities Of The Triangle - Alto Paranaiba And Northwes"
              }
            ]
          },
          {
            "Name": "Ebola / Marburg",
            "is_checked" : true,
            "Cases": [
              {
                "DateTime": "2020-04-11 23:52:00",
                "Country": "Congo (Kinshasa)",
                "City": "Kinshasa",
                "Brief": "DEMOCRATIC REPUBLIC OF CONGO - Congo Records Second Ebola Death In Days - WHO"
              },
              {
                "DateTime": "2020-04-17 04:48:00",
                "Country": "Congo (Kinshasa)",
                "City": "Kinshasa",
                "Brief": "DEMOCRATIC REPUBLIC OF CONGO - Congo records five new Ebola cases, shelves declaration of end to epi"
              },
              {
                "DateTime": "2020-04-18 04:00:00",
                "Country": "Congo (Kinshasa)",
                "City": "Kinshasa",
                "Brief": "DEMOCRATIC REPUBLIC OF CONGO - 5 New Ebola Cases In Congo"
              }
            ]
          },
          {
            "Name": "Foot-And-Mouth Disease",
            "is_checked" : true,
            "Cases": [
              {
                "DateTime": "2020-04-11 02:20:00",
                "Country": "India",
                "City": "Manipur",
                "Brief": "INDIA - Outbreak Of Foot And Mouth Disease Reported In Manipur"
              }
            ]
          },
          {
            "Name": "H7N9 / H5N1 / H5N2 / H7N1 / H7N3 / H7N7 / H5N8",
            "is_checked" : true,
            "Cases": [
              {
                "DateTime": "2020-04-10 00:05:00",
                "Country": "United States",
                "City": "Chesterfield County, SC",
                "Brief": "SOUTH CAROLINA - Bird Flu Reported In Commercial Turkey Flock In South Carolina"
              },
              {
                "DateTime": "2020-04-14 05:57:00",
                "Country": "United States",
                "City": "Jefferson, SC",
                "Brief": "SOUTH CAROLINA - Fatal Bird Flu Strikes Flock In Jefferson"
              },
              {
                "DateTime": "2020-04-24 00:24:00",
                "Country": "India",
                "City": "Nawada",
                "Brief": "INDIA - Bird Flu In Bihars Nawada District"
              }
            ]
          },
          {
            "Name": "Lassa Fever",
            "is_checked" : true,
            "Cases": [
              {
                "DateTime": "2020-04-02 03:22:00",
                "Country": "Nigeria",
                "City": "Abuja",
                "Brief": "NIGERIA - Lassa Fever - Nigerias Death Toll Reaches 185"
              },
              {
                "DateTime": "2020-04-10 23:59:00",
                "Country": "Nigeria",
                "City": "Abuja",
                "Brief": "NIGERIA - Lassa Fever Kills Three As Nigeria Records 12 New Cases"
              },
              {
                "DateTime": "2020-04-17 04:52:00",
                "Country": "Nigeria",
                "City": "Bauchi",
                "Brief": "NIGERIA - Lassa Fever Kills 19 In Bauchi State"
              },
              {
                "DateTime": "2020-04-24 23:58:00",
                "Country": "Nigeria",
                "City": "Abuja",
                "Brief": "NIGERIA - Ondo - Gombe - Taraba Push Lassa Fever Cases To 979"
              }
            ]
          },
          {
            "Name": "Polio",
            "is_checked" : true,
            "Cases": [
              {
                "DateTime": "2020-04-11 23:50:00",
                "Country": "Pakistan",
                "City": "Khyber Pakhtunkhwa",
                "Brief": "PAKISTAN - K-P Reports New Polio Case - Country-Wide Tally Reaches 38"
              },
              {
                "DateTime": "2020-04-19 00:00:00",
                "Country": "Pakistan",
                "City": "Islamabad",
                "Brief": "PAKISTAN - Polio - Additional Cases Reported In Pakistan - Polio Vaccine"
              },
              {
                "DateTime": "2020-04-27 22:38:00",
                "Country": "Pakistan",
                "City": "Khyber Pakhtunkhwa",
                "Brief": "PAKISTAN - K-P Reports Two New Cases Of Polio Virus"
              }
            ]
          }
        ]});
      };

    componentDidMount() {
      this.fetch_disease();
    }

    test = async () => {
      await this.fetch_disease();
    }
    
    componentDidUpdate(prevProps, prevState) {
      
      // console.log("bbb")
      // console.log(prevProps)
      // console.log(prevState)
      // console.log(this.state)
      if (prevState.start_date !== this.state.start_date || prevState.end_date !== this.state.end_date || prevState.country !== this.state.country) {
        this.fetch_disease()
        return ;
      }
      if (prevState.diseases !== this.state.diseases ) {
        console.log("update disease")
        // this.renderMarkers();
        return;
      }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.start_date != nextProps.start_date || this.props.end_date != nextProps.end_date || this.props.country != nextProps.country) {
            this.setState({start_date : nextProps.start_date,
                end_date : nextProps.end_date,
                country : nextProps.country});
        }
      }

    render() {
        let styleobj = { font: "helvetica", fontSize: 35, fontWeight: "bold" };
        const loading = this.state.loading;
        return (
          <div >
            {loading ? 
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Loader
                type="Bars"
                color="#00BFFF"
                height={180}
                width={550}
                /> 
              </div>
            : 
            <div>
            <Divider />
            <br />
            <PieChart data_list = {this.state.diseases} country = {this.state.country}/>
            <br />
            <Divider />
            <br />
            <br />
            <FormGroup row >   
            <Typography variant="h5" style = {{margin : "10px"}}>
              Display on graph:     
            </Typography>
              {this.state.diseases.map((key,i) => this.create_form_label(key,i))}
              <FormControlLabel
                control={<Checkbox name="antoine" checked={this.state.display_total} color="primary" onClick = {this.handleTotalCheckBox}/>}
                label="Total"
              />
            </FormGroup>
            <LineChart data_list = {this.state.diseases} display_total = {this.state.display_total}/>
            <br />
            <Divider />
            <br />
            <LineChart2 data_list = {this.state.diseases} display_total = {this.state.display_total}/>
            <br />
            <Divider />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
            <AlertMap data_list = {this.state.diseases} country = {this.state.country} state_id = {this.state.state_id}/>
            </div>
            <br />
            <br />
            <br />
            <br />
            </div>
            }
          </div >
        );
      }

}