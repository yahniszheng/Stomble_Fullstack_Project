
const { ApolloServer, gql } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    data (location_filter : String, start_data : Int, end_date : Int, keyword : String): [Article]
  }

  type Article {
    id: String
    url: String
    date_of_publication: Int
    headline: String
    main_text: String
    reports: [Report]
    keyword_location:[String]
    keyword_list:[String]
    keyword_frequency:[Word_Frequency]
  }

  type Report {
      event_date: String
      locations: [Location]
      diseases: [String]
      syndromes: [String]
  }

  type Location {
    google_id: String
    address: String
  }

  type Word_Frequency {
    name: String
    freqency: Float
  }
`;


let db
const resolvers = {
  Query: {
    data: (parent, args, context, info) => {
      if (!args.location_filter && !args.start_data && !args.end_date && !args.keyword) {
        return context.db.find().limit(10).toArray();
      }
      let obj = {}
      obj['$and'] = [];
      if (args.location_filter) {
        obj['$and'].push({'keyword_location': args.location_filter});
      }
      if (args.keyword) {
        obj['$and'].push({'keyword_list': args.keyword});
      }
      if (args.start_data && args.end_date) {
        obj['$and'].push({'date_of_publication': { '$gte' : parseInt(args.start_data)}});
        obj['$and'].push({'date_of_publication': { '$lte' : parseInt(args.end_date)}});
      }
      return context.db.find(obj).limit(20).toArray();
    }
  },
  Article : {
    reports: (parent, args, context, info) => {
      return parent.reports;
    },
    keyword_frequency: (parent, args, context, info) => {
      temp = [];
      for (let k in parent.keyword_frequency){
        temp.push({'name': k, 'freqency': parent.keyword_frequency[k]});
      }
      return temp;
    }
  },
  Report : {
    locations: (parent, args, context, info) => {
      return parent.locations;
    }
  }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
      endpoint: "/dev/graphql"
    },
    context: async () => {
        if (!db) {
          try {
            const MongoClient = require('mongodb').MongoClient;
            const dbClient = new MongoClient(
              'mongodb+srv://Yahnis_Password:999999qwas13579@yahnis.c1lhp.mongodb.net/stomble?retryWrites=true&w=majority',
              {
                useNewUrlParser: true,
                useUnifiedTopology: true,
              }
            )
    
            if (!dbClient.isConnected()) await dbClient.connect()
            db = dbClient.db('stomble').collection("disease")
          } catch (e) {
            console.log('--->error while connecting with graphql context (db)', e)
          }
        }
    
        return {db}
      }
  });

  exports.graphqlHandler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  });
