import requests 
import json 
import datetime
from bs4 import BeautifulSoup
from scrapy.crawler import CrawlerProcess
import scrapy
import os
import sys
import re
from .scrapy_script import scrapping
from .filter import Filter

headers = {
  'Content-Type':'application/x-www-form-urlencoded'
}

class ActivityPost(object):
  def __init__(self, html, last_date):
    self.html = html
    self.soup = BeautifulSoup(html, features='lxml')
    self.last_datestamp = last_date
    self.last_date = datetime.datetime.fromtimestamp(last_date) 
  
  @property
  def num_posts(self):
    posts = self.soup.findAll('li',{"class":"b-post"})
    return len(posts)
  
  @property
  def valid_html(self):
    return bool(BeautifulSoup(self.html, "html.parser").find())

  def get_posts(self, count=-1):
    posts = self.soup.findAll('li',{"class":"b-post"})
    for post in posts:
      # we will fetch all the post content 
      nodeid = post['data-node-id']
      content, url = self.post_all_content_and_url(nodeid)

      date = ""
      if post.find('time') != None:
        date = post.find('time')['datetime']
      result = {
        "date": date,
        "datestamp":post['data-node-publishdate'],
        "nodeid": nodeid,
        "flu_trackers_post_content" : content,
        "url":url
      }
      yield result
    
  def post_all_content_and_url(self, nodeid):
    params ="nodeid={}&securitytoken=guest".format(nodeid)
    res = requests.post("https://flutrackers.com/forum/activity/fetchText",headers=headers, data=params)
    res = json.loads(res.text)
    full_content = BeautifulSoup(res['nodeText'], features='lxml')
    
    source_url = ""
    if full_content.find('a') != None:
      source_url = full_content.find('a')['href']
    content = full_content.text.strip()
    
    return content, source_url
  
  @classmethod
  def get_source_text_for_onepost(cls, url):
    scrapping(url)
    filename = 'Scrapy/temp.html' #consistent file name
    flter = Filter(filename)
    
    return flter.get_source_text_by_p()
