import json
import sys
import os
import time
import re
from DB.db import *
from Scrapy.last_activity import ActivityPost
from NLP_PhaseMatcher_version.NLP_Processer import NLP_Processer
from datetime import datetime

def fetch_resource_context(i):
  with open('Scrapy/posts.json', 'r') as f:
    data = json.load(f)

  post = data['posts'][i]
  nodeid = post['nodeid']
  date = post['date']
  date = date.replace("T", " ")
  datestamp = post['datestamp']
  flutrack_content = ['flu_trackers_post_content']
  url = post['url']

  
  open('Scrapy/temp.html', 'w').close()
  title, content = ActivityPost.get_source_text_for_onepost(url)
  # print("\n\n\n\n\n\n\n\n\n\n" + title +"\n\n\n\n\n\n\n\n\n")
  open('Scrapy/temp.html', 'w').close()

  if len(title) < 2 or len(content) < 300 or content[3:10] in "NCBIErrorYour access to the NCBI website":
    print("Cannot Access or too less content\n")
    return

  if title == "Access Denied" :
    print("Auh")
    return

  nlp_processer = NLP_Processer()
  nlp_processer.set_publication_date(date)
  reports = nlp_processer.make_reports(content)
  d = {}
  d["url"] = url
  dt = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
  ts = time.mktime(dt.timetuple())
  d["date_of_publication"] = int(ts)
  d["headline"] = title
  d["main_text"] = content
  d["reports"] = reports
  d["keyword_frequency"] = nlp_processer.get_keyword_frequency()
  d["keyword_location"] = nlp_processer.get_keyword_location()
  d["keyword_list"] = nlp_processer.get_keyword_list()
  
  json_file = json.dumps(d, indent = 2)
  print(json_file)
  json_file = json.loads(json_file)
  # upload to mongoDB
  setDocument(json_file)

if __name__ == "__main__":
    i = int(sys.argv[1])
    fetch_resource_context(i)