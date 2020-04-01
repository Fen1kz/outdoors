from flask import Flask, render_template, g, send_from_directory
from util.getStuff import getStuff

app = Flask(__name__)

with app.app_context():
  g.stuff = getStuff()

@app.route('/')
def hello_world():
  g.stuff = getStuff()
  return render_template('main.html')

@app.route('/img/<path:path>')
def send_img(path):
  return send_from_directory('../img', path)
