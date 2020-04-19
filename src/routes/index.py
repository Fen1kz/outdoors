from os import path
from flask import send_from_directory, render_template

from util.data import getData, PATH_IMG

import logging
logger = logging.getLogger('app.routes')

data = getData()

def route_main():
  return render_template('main.html', data=data)

def route_collection(collectionId):
  collection = data['colById'][collectionId];
  logger.info(collection)
  return render_template('collection.html', data=data, collection=collection)

def route_img(file):
  return send_from_directory(path.join('..', PATH_IMG), file)
    
def route_page(pagename):
  return render_template('pages/%s.html' % (pagename), data=data)

def route_webapp(filename):
  return send_from_directory(path.join('..', 'webapp-dist'), filename)
