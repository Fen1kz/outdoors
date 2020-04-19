from os import walk, path, listdir
import json

def readDirJson(dirPath):
  datalist = []
  for filename in listdir(dirPath):
    filepath = path.join(dirPath, filename)
    with open(filepath, "r", encoding="utf-8") as read_file:
      data = json.load(read_file)
      data['filename'] = filename
      datalist.append(data)
  return datalist
      