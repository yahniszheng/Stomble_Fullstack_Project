
const { ApolloServer, gql } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    data: Article
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
  }

  type Report {
      event_date: String
      locations: Location
      diseases: String
      syndromes: String
  }
`;

// const uri = "mongodb+srv://Yahnis_Password:999999qwas13579@yahnis.c1lhp.mongodb.net/stomble?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// // client.connect(err => {
// //   const collection = client.db("stomble").collection("diseases");
// //   // perform actions on the collection object
// //   client.close();
// // });

let db
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    data: (parent, args, context, info) => {
      return context.db.findOne().then(data => data);
    }
  },
  Article : {
    reports: (parent, args, context, info) => {
      return context.db.findOne({'headline': parent.headline}).then(data => data.reports);
    }
  },
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
