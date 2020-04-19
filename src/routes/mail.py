from flask import render_template, request, abort, jsonify
from util.mail import mailSend, mailFormat

from form.OrderSchema import OrderSchema

import logging
logger = logging.getLogger('app.mail')

from routes.index import data

def orderThing(thingId, count):
    thing = data['thingById'][thingId]
    orderThing = {key: thing[key] for key in thing.keys() & {'id', 'name'}}
    orderThing['count'] = count
    return orderThing


def route_mail():
    data = request.get_json(force=True)
    errors = OrderSchema().validate(data)

    logger.info(data)

    if errors:
        abort(400, str(errors))

    data['things'] = [orderThing(thing['id'], thing['count'])
                      for thing in data['things']]
    message = mailFormat(data)
    mailSend('Outdoors order', message)
    return jsonify({'status': 'ok', 'error': None})
