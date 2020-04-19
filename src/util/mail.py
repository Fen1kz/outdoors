from os import environ
from threading import Thread

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Email, To, Content, Mail

from flask import render_template

import logging
logger = logging.getLogger('app.mail')

SENDGRID_API_KEY = environ.get('SENDGRID_API_KEY')
SOURCE_EMAIL = environ.get('SOURCE_EMAIL')
TARGET_EMAIL = environ.get('TARGET_EMAIL')

def _send_via_sendgrid(subject, body):
  sg = SendGridAPIClient()
  from_email = Email(SOURCE_EMAIL)
  to_email = To(TARGET_EMAIL)
  content = Content("text/plain", body)
  email = Mail(from_email, to_email, subject, content)
  response = sg.client.mail.send.post(request_body=email.get())
  logger.info(response.status_code)
  logger.info(response.body)
  logger.info(response.headers)

def mailSend(subject, body):
  _send_via_sendgrid(subject, body)
  # thr = Thread(target=_send_via_sendgrid, args=[body])
  # thr.start()
  # return thr

def mailFormat(data):
  return render_template('email/order.txt', data=data);