from dotenv import load_dotenv
load_dotenv()

import sys
import logging

handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(logging.Formatter(
  '%(asctime)s|%(name)s[%(levelname)s]: %(message)s',
  "%dT%H:%M:%S"
  ))

from app import create_app

app = create_app();
app.logger.addHandler(handler)
app.logger.setLevel(logging.DEBUG)