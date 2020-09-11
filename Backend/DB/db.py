import pymongo
from google.api_core.exceptions import NotFound
import json
import os
import sys
import re



client = pymongo.MongoClient("mongodb+srv://Yahnis_Password:999999qwas13579@yahnis.c1lhp.mongodb.net/stomble?retryWrites=true&w=majority")
db = client.stomble
conn = db.disease


def setDocument(data):
    # check if headline already exists
    print("connect to db")
    if conn.find_one({'headline': data["headline"]}) == None:
        print("Writing data to MongoDb")
        conn.insert_one(data)





