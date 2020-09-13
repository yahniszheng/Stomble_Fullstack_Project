const MongoClient = require('mongodb').MongoClient;
            const uri = 'mongodb+srv://Yahnis_Password:999999qwas13579@yahnis.c1lhp.mongodb.net/stomble?retryWrites=true&w=majority';
            const client = new MongoClient(uri, { useNewUrlParser: true });
            client.connect(async (err) => {
              const collection = client.db("stomble").collection("disease");
              var a = await collection.find({'$and' : [{'keyword_location': 'china'}, {'keyword_location': 'cook county'}, {'keyword_location': 'kr'}, {'date_of_publication': { '$gte' : 5}}, {'date_of_publication': { '$lte' : 10000000000}}]}).limit(10).toArray();
              console.log(a);
              client.close();
            });