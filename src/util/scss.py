import sass
import os

SASS_DIR = os.path.normpath('src/static/sass')
CSS_DIR = os.path.normpath('src/static/css')

def compile_sass():  
  print('compiling sass')
  sass.compile(dirname=(SASS_DIR, CSS_DIR), output_style='compressed')

class SCSSMiddleware(object):
  def __init__(self, app):    
    self.app = app
    compile_sass()

  def __call__(self, environ, start_response):
    if (os.environ.get('FLASK_ENV') == 'development'):
      compile_sass()
    return self.app(environ, start_response)