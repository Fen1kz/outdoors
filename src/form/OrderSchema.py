from marshmallow import Schema, fields

class ThingSchema(Schema):
  id = fields.Str(required=True)
  count = fields.Int(required=True)

class OrderSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    comment = fields.Str()
    things = fields.List(fields.Nested(ThingSchema))
    total = fields.Str(required=True) 