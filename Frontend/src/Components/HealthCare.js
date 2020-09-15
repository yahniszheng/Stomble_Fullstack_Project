import React, { Component } from 'react';
import GridItem from "./Style/GridItem.js";
import GridContainer from "./Style/GridContainer.js";
import Card from "./Style/Card.js";
import CardHeader from "./Style/CardHeader.js";
import CardBody from "./Style/CardBody.js";
import { CardActionArea, CardContent, Typography, Grid } from "@material-ui/core"
import CardAvatar from "./Style/CardAvatar.js";
import hand from "./Hands.jpg";
import ReactLoading from 'react-loading';
import { Box } from '@material-ui/core';

class HealthCare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [{"source":{"id":null,"name":"Lifehacker.com"},
      "author":"Kate Dore on Two Cents, shared by Kate Dore to Lifehacker",
      "title":"Why You Should Avoid Health Sharing Ministries",
      "description":"As the pandemic continues, President Trump quietly launched another attack on the Affordable Care Act: The Treasury Department has proposed a new regulation to define healthcare sharing ministries as health insurance. As the Los Angeles Times reports, the new…","url":"https://twocents.lifehacker.com/why-you-should-avoid-health-sharing-ministries-1844766937","urlToImage":"https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/dyz61ptmrumqvzx6h86c.jpg","publishedAt":"2020-08-18T21:00:00Z","content":"As the pandemic continues, President Trump quietly launched another attack on the Affordable Care Act: The Treasury Department has proposed a new regulation to define healthcare sharing ministries as… [+1879 chars]"},{"source":{"id":"techcrunch","name":"TechCrunch"},"author":"Jonathan Shieber","title":"Point72, the firm investing hedge fund mogul Steven A Cohen’s personal wealth, gets into healthcare",
      "description":"Point72 Ventures, the early stage investment firm that’s now solely investing the personal wealth of the multi-billionaire hedge fund magnate Steven A. Cohen, is getting into healthcare investing. The firm has hired Scott Barclay, a former partner at the life…","url":"http://techcrunch.com/2020/09/02/point72-the-firm-investing-hedge-fund-mogul-steven-a-cohens-personal-wealth-gets-into-healthcare/","urlToImage":"https://techcrunch.com/wp-content/uploads/2019/09/dollar-bills.png?w=753","publishedAt":"2020-09-02T12:00:37Z","content":"Point72 Ventures, the early stage investment firm that’s now solely investing the personal wealth of the multi-billionaire hedge fund magnate Steven A. Cohen, is getting into healthcare investing.\r\nT… [+2518 chars]"},{"source":{"id":"techcrunch","name":"TechCrunch"},"author":"Jonathan Shieber","title":"Closing on $75 million in new cash, Truepill plans at-home testing service as it nears $175 million in annual revenue","description":"Truepill, the white-label healthcare services company that provides telehealth and pharmacy fulfillment services, is adding at-home medical testing as the third branch of its services powering the offerings of companies like Hims and Hers, Ro, and other direc…",
      "url":"http://techcrunch.com/2020/09/09/closing-on-75-million-in-new-cash-truepill-plans-at-home-testing-service-as-it-nears-175-million-in-annual-revenue/","urlToImage":"https://techcrunch.com/wp-content/uploads/2016/10/overdose.jpg?w=633","publishedAt":"2020-09-09T13:01:01Z","content":"Truepill, the white-label healthcare services company that provides telehealth and pharmacy fulfillment services, is adding at-home medical testing as the third branch of its services powering the of… [+3604 chars]"},{"source":{"id":"techcrunch","name":"TechCrunch"},"author":"Darrell Etherington","title":"Carbon Health’s Eren Bali and Color’s Othman Laraki will join us at Disrupt 2020","description":"The COVID-19 pandemic has left no industry untouched, but the healthcare industry is arguably the one that stands to be transformed the most by the ongoing pandemic. At TechCrunch Disrupt 2020, get the perspectives of two founders who’ve created entirely new …",
      "url":"http://techcrunch.com/2020/08/25/carbon-healths-eren-bali-and-colors-othman-laraki-will-join-us-at-disrupt-2020/","urlToImage":"https://techcrunch.com/wp-content/uploads/2020/08/bali-laraki-disrupt.jpg?w=711","publishedAt":"2020-08-25T15:05:50Z","content":"The COVID-19 pandemic has left no industry untouched, but the healthcare industry is arguably the one that stands to be transformed the most by the ongoing pandemic. At TechCrunch Disrupt 2020, get t… [+2057 chars]"},{"source":{"id":"techcrunch","name":"TechCrunch"},"author":"Steve O'Hear","title":"Virtual healthcare provider Medefer raises £10M to digitise the outpatient journey","description":"Medefer, the U.K.-based virtual healthcare provider that, in its own words, is “reimagining” the outpatient system, is disclosing £10 million in new funding. The round was led by private investment firm Nickleby Capital, and will be used to grow the team and …",
      "url":"http://techcrunch.com/2020/09/13/medefer/","urlToImage":"https://techcrunch.com/wp-content/uploads/2020/09/DrBahmanNedjat-Shokouhi1.jpg?w=398","publishedAt":"2020-09-14T06:00:30Z","content":"Medefer, the U.K.-based virtual healthcare provider that, in its own words, is “reimagining” the outpatient system, is disclosing £10 million in new funding.\r\nThe round was led by private investment … [+2577 chars]"},{"source":{"id":"techcrunch","name":"TechCrunch"},"author":"Jonathan Shieber","title":"Patient engagement startup raises $15 million from Google’s Gradient Ventures","description":"Klara, a New York-based healthcare startup that pitches itself as a better tool for patient engagement for doctor’s offices and other clinical practices, has raised $15 million in new financing.  The money comes as investors continue to pour cash into compani…","url":"http://techcrunch.com/2020/08/20/patient-engagement-startup-raises-15-million-from-googles-gradient-ventures/","urlToImage":"https://techcrunch.com/wp-content/uploads/2019/08/GettyImages-1154445332-e1566220726653.jpg?w=591","publishedAt":"2020-08-20T13:01:22Z","content":"Klara, a New York-based healthcare startup that pitches itself as a better tool for patient engagement for doctor’s offices and other clinical practices, has raised $15 million in new financing. \r\nTh… [+1969 chars]"},{"source":{"id":"techcrunch","name":"TechCrunch"},"author":"Jonathan Shieber",
      "title":"Here are four areas the $311 billion CPPIB investment fund thinks will be impacted by COVID-19","description":"The Canadian Pension Plan Investment Board, an asset manager controlling around $311 billion in assets for the Canada’s pensioners and retirees, has identified four key industries that are set to experience massive changes as a result of the global economic r…","url":"http://techcrunch.com/2020/08/19/here-are-four-areas-the-311-billion-cppib-investment-fund-thinks-will-be-impacted-by-covid-19/","urlToImage":"https://techcrunch.com/wp-content/uploads/2020/07/GettyImages-1217653935.jpg?w=600","publishedAt":"2020-08-19T17:10:15Z","content":"The Canadian Pension Plan Investment Board, an asset manager controlling around $311 billion in assets for the Canada’s pensioners and retirees, has identified four key industries that are set to exp… [+6957 chars]"},{"source":{"id":"techcrunch","name":"TechCrunch"},"author":"Rita Liao","title":"JD.com’s 1-year-old health unicorn to get $830M from Hillhouse","description":"In recent years, China’s online shopping titans have been muscling into the prescription drug market. When JD.com, Alibaba’s archrival, realized the health market spans well beyond retail, it spun out its healthcare unit into a subsidiary last May for a poten…","url":"http://techcrunch.com/2020/08/18/jd-coms-1-year-old-health-unicorn-to-get-830m-from-hillhouse/",
      "urlToImage":"https://techcrunch.com/wp-content/uploads/2020/08/Screen-Shot-2020-08-19-at-12.05.43-PM.png?w=764","publishedAt":"2020-08-19T04:26:56Z","content":"In recent years, China’s online shopping titans have been muscling into the prescription drug market. When JD.com, Alibaba’s archrival, realized the health market spans well beyond retail, it spun ou… [+2181 chars]"},{"source":{"id":"techcrunch","name":"TechCrunch"},"author":"Darrell Etherington","title":"Carbon Health to launch 100 pop-up COVID-19 testing clinics across the U.S.","description":"Primary care health tech startup Carbon Health has added a new element to its “omnichannel” healthcare approach with the launch of a new pop-up clinic model that is already live in San Francisco, LA, Seattle, Brooklyn and Manhattan, with Detroit to follow soo…","url":"http://techcrunch.com/2020/09/10/carbon-health-to-launch-100-pop-up-covid-19-testing-clinics-across-the-u-s/","urlToImage":"https://techcrunch.com/wp-content/uploads/2020/09/carbon-health-covid-pop-up.jpg?w=600","publishedAt":"2020-09-10T13:00:51Z","content":"Primary care health tech startup Carbon Health has added a new element to its “omnichannel” healthcare approach with the launch of a new pop-up clinic model that is already live in San Francisco, LA,… [+5136 chars]"},{"source":{"id":"techcrunch","name":"TechCrunch"},"author":"Jonathan Shieber","title":"Thirty Madison raises $47 million for its direct to consumer treatments of hair loss, migraines, and indigestion",
      "description":"Thirty Madison, the New York-based startup developing a range of direct to consumer treatments for hair loss, migraines, and chronic indigestion, has raised $47 million in new financing. After last week’s nearly $19 billion merger between Teladoc and Livongo,…","url":"http://techcrunch.com/2020/08/14/thirty-madison-raises-47-million-for-its-direct-to-consumer-treatments-of-hair-loss-migraines-and-indigestion/","urlToImage":"https://techcrunch.com/wp-content/uploads/2019/06/GettyImages-942012862.jpg?w=533","publishedAt":"2020-08-14T16:00:56Z","content":"Thirty Madison, the New York-based startup developing a range of direct to consumer treatments for hair loss, migraines, and chronic indigestion, has raised $47 million in new financing.\r\nAfter last … [+1616 chars]"},{"source":{"id":"cnn","name":"CNN"},"author":"Caitlin Hu, CNN","title":"With Canada and Mexico borders closed, Americans are trapped in their own healthcare system","description":"Mexico and Canada have closed thousands of miles of border to all but essential travel, roiling plans for vacation, work, and school. For cash-strapped Americans, it has also cut off access to medicines and healthcare services that they can't afford at home -…","url":"https://www.cnn.com/2020/08/31/americas/canada-mexico-borders-insulin-intl/index.html","urlToImage":"https://cdn.cnn.com/cnnnext/dam/assets/200830130918-03-us-canada-border-super-tease.jpg","publishedAt":"2020-08-31T09:06:39Z","content":"(CNN)\"Want to hear the joke about insulin?\" goes the bleak gag about America's drug prices. \"You have to go to Canada to get it.\" \r\nBut even that's not an option anymore.\r\nPandemic travel restriction… [+13960 chars]"},{"source":{"id":"reuters","name":"Reuters"},
      "author":"Reuters Editorial","title":"China stocks rise as consumer, healthcare firms lend support; Hong Kong up - Reuters","description":"China stocks rise as consumer, healthcare firms lend support; Hong Kong up  Reuters","url":"https://www.reuters.com/article/china-stocks-midday-idUSL4N2FN11O","urlToImage":"https://s4.reutersmedia.net/resources_v2/images/rcom-default.png","publishedAt":"2020-08-21T04:45:00Z","content":"* SSEC 0.8%, CSI300 1.2%, HSI 1.3% \r\n* HK-&gt;Shanghai Connect daily quota used 0.1%, Shanghai-&gt;HK daily quota used 1.8% \r\n* FTSE China A50 +1.0% \r\nSHANGHAI, Aug 21(Reuters) - Chinese stocks advan… [+1951 chars]"},{"source":{"id":"reuters","name":"Reuters"},"author":"Reuters Editorial","title":"China shares weaken as investors shed high-value healthcare, tech stocks - Reuters","description":"China shares weaken as investors shed high-value healthcare, tech stocks  Reuters","url":"https://www.reuters.com/article/china-stocks-midday-idUSL4N2FL15O","urlToImage":"https://s4.reutersmedia.net/resources_v2/images/rcom-default.png","publishedAt":"2020-08-19T04:41:00Z","content":"* SSEC -0.3%, CSI300 -0.54% \r\n* Hong Kong markets, stock connect morning trade cancelled due to typhoon \r\n* Regional markets track the S&amp;P that hits record highs \r\nBEIJING/SHANGHAI, Aug 19 (Reute… [+2103 chars]"},{"source":{"id":"reuters","name":"Reuters"},"author":"Reuters Editorial","title":"China healthcare, consumer shares fuel strong rally; Hong Kong up - Reuters","description":"China healthcare, consumer shares fuel strong rally; Hong Kong up  Reuters","url":"https://www.reuters.com/article/china-stocks-midday-idUSL4N2FK145",
      "urlToImage":"https://s4.reutersmedia.net/resources_v2/images/rcom-default.png","publishedAt":"2020-08-18T04:42:00Z","content":"* SSEC 0.4%, CSI300 0.1%, HSI 0.2% \r\n* HK-&gt;Shanghai Connect daily quota used 1.4%, Shanghai-&gt;HK daily quota used 2.2% \r\n* FTSE China A50 +0.0% \r\nSHANGHAI, Aug 18 (Reuters) - China stocks eked o… [+2126 chars]"},{"source":{"id":"reuters","name":"Reuters"},"author":"Reuters Editorial","title":"UPDATE 1-Trump rejects proposal to cut military healthcare; sources say no formal proposal - Reuters","description":"UPDATE 1-Trump rejects proposal to cut military healthcare; sources say no formal proposal  Reuters","url":"https://www.reuters.com/article/usa-trump-military-healthcare-idUSL1N2FK1B6","urlToImage":"https://s4.reutersmedia.net/resources_v2/images/rcom-default.png","publishedAt":"2020-08-18T17:18:00Z","content":"(Recasts to reflect there was no formal proposal; adds details) \r\nAug 18 (Reuters) - U.S. President Donald Trump said he rejected a Pentagon proposal to cut military healthcare by $2.2 billion, altho… [+1017 chars]"}],
      loading:false
    }
  }


  render() {
    let data;
    if(!this.state.loading){
      data = this.state.articles.map((item) => {
        return (
          <Box mt={1}>
            <Card>
              <CardActionArea href={item.url} target="_blank">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.content}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        )
      });
      
    }else{
      data = (
        <Box mt={1}>
            <Grid container justify="center" alignItems="center" >
              <ReactLoading type="spin" color="#34c0eb" height={100} width={100} />
            </Grid>
        </Box>
      );
    }
    return (
      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="success">
            <h2>Health Care Tips</h2>
          </CardHeader>
          <CardBody>
          {data}
          </CardBody>
        </Card>
      </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Box my={8}>
              <Card profile>
                <CardAvatar profile>
                  <a>
                    <img src={hand} />
                  </a>
                </CardAvatar>
                <CardBody profile>
                  <h2>Advices to protect yourself</h2>
                  <h4>1. Wash your hands frequently</h4>
                  <h4>2. Maintain social distancing</h4>
                  <h4>3. Avoid touching eyes, nose and mouth</h4>
                  <h4>4. If you have fever, cough and difficulty breathing, seek medical care early</h4>
                  <h4>5. Stay informed and follow advice given by your healthcare provider</h4>
                </CardBody>
              </Card>
            </Box>
          </GridItem>
        </GridContainer>
      </div >
    );
  }
}
export default HealthCare;
