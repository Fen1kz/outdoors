from flask import Flask

from util.scss import SCSSMiddleware

from routes.index import *
from routes.mail import *

def create_app():
    """An application factory, as explained here:
    https://flask.palletsprojects.com/en/1.1.x/patterns/appfactories/
    :param config_object: The configuration object to use.
    """
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    # app.config.from_object(config_object)
    setupSCSS(app)
    setupRoutes(app)

    return app

def setupSCSS(app):
  from util.scss import SCSSMiddleware
  app.wsgi_app = SCSSMiddleware(app.wsgi_app)

def setupRoutes(app):
  app.add_url_rule('/', view_func=route_main)
  app.add_url_rule('/img/<file>', view_func=route_img)
  app.add_url_rule('/<any(delivery, contacts):pagename>', view_func=route_page)
  app.add_url_rule('/webapp/<path:filename>', 'webapp', view_func=route_webapp)
  app.add_url_rule('/mail', view_func=route_mail, methods=['POST'])
  
  app.add_url_rule('/c/<collectionId>', view_func=route_collection)
  # app.add_url_rule('/t/<path:thingId>', 'webapp', view_func=route_webapp)
  # app.add_url_rule('/other', view_func=views.other)
  # routes.index
  # import routes.dev
  # import routes.mail 