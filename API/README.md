## API Phase

GraphQL API will act like a public interface, accepting queries from public and fetch data from mongoDb hosted on mongo cloud. Currently API is hosted on AWS. Access from
  https://zzlu54fd84.execute-api.ap-southeast-2.amazonaws.com/dev/graphql (Sometimes GraphQL doesn't work)

## sample queue without filter:
query{
  data {
    url
    date_of_publication
    main_text
    keyword_location
    keyword_list
    keyword_frequency {
      name
      freqency
    }
    reports{
      event_date
      locations {
        address
      }
      diseases
      syndromes
    }
  }
}

## sample queue with filter:
query{
  data (start_data: 1388757596, end_date : 1600000000, location_filter : "sydney", keyword : "coronavirus") {
    url
    date_of_publication
    main_text
    keyword_location
    keyword_list
    keyword_frequency {
      name
      freqency
    }
    reports{
      event_date
      locations {
        address
      }
      diseases
      syndromes
    }
  }
}

