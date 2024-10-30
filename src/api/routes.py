"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,CardBank
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/addcard',methods=['POST'])
def addCard():
    newCard= CardBank(filename=request.json['filename'],uri= request.json['uri'])
    db.session.add(newCard)
    db.session.commit()
    cardId=CardBank.query.filter_by(filename=request.json['filename']).first().serialize()['id']
    return cardId