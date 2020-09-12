const MongoClient = require('mongodb').MongoClient;
            const uri = 'mongodb+srv://Yahnis_Password:999999qwas13579@yahnis.c1lhp.mongodb.net/stomble?retryWrites=true&w=majority';
            const client = new MongoClient(uri, { useNewUrlParser: true });
            client.connect(err => {
              const collection = client.db("stomble").collection("disease");
              collection.findOne().then(data => {
                console.log(data.url);
                return data});
              client.close();
            });