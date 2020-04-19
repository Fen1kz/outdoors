from os import path
import logging
import re
from util.readDirJson import readDirJson

logger = logging.getLogger('app.data')

PATH_DATA = 'data'

PATH_COLLECTIONS = path.join(PATH_DATA, 'collections')
PATH_IMG = path.join(PATH_DATA, 'img')
PATH_ITEMS = path.join(PATH_DATA, 'items')

pattern = re.compile('(.*)\.')

def processImg(img):
  return '%s/%s' % ('img', img)

def processItem(item):
  logger.info('processing %s', item['filename'])
  try:
    item['id'] = item['filename']
    item['imgs'] = [processImg(img) for img in item['imgs']]
    item['img'] = item['imgs'][0]
  except KeyError as e:
    errorMsg = 'Cannot find field "%s" in file %s' % (e, item['filename'])
    logger.error(errorMsg)
    raise Exception(errorMsg)
  return item

def processCollection(col):
  logger.info('processing %s', col['id'])
  col['things'] = [];
  return col


def getData():
  data = {
    'cols': [],
    'colById': {},
    'things': [],
    'thingById': {}
  }
  
  data['cols'] = [processCollection(col) for col in readDirJson(PATH_COLLECTIONS)]
  data['things'] = [processItem(thing) for thing in readDirJson(PATH_ITEMS)]

  for col in data['cols']:
    data['colById'][col['id']] = col

  for thing in data['things']:
    data['thingById'][thing['id']] = thing
    for thingCollection in thing['collections']:
      data['colById'][thingCollection]['things'].append(thing)

  logger.info('data processed')
  return data