from os import walk, path, listdir
import json

PATH_STUFF = 'stuff'
PATH_IMAGES = 'img'

def getStuff():
  stuff = []
  for filename in listdir(PATH_STUFF):
    filename = path.join(PATH_STUFF, filename)
    with open(filename, "r") as read_file:
      data = json.load(read_file)

      data['img'] = PATH_IMAGES + '/' + data['img']

      stuff.append(data)
  return stuff
      