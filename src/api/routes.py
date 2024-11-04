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

@api.route('/login',methods=['GET'])
def login():
    username=request.json['username']
    password=request.json['password']
    
    user=User.query.filter_by(username=username,password=password)

    if(user):
        ...
    else:
        return "Wrong username or password"
    
@api.route('/register',methods=['POST'])
def register():
    inputuser=request.json['username']
    inputpass=request.json['password']

    isUser=User.query.filter_by(username=inputuser)

    if(isUser):
        return "User already exists"
    else:
        newUser=User(username=inputuser,password=inputpass)
        db.session.add(newUser)
        db.session.commit()
        return "User created successfuly. Hello %s",inputuser

@api.route('/users',methods=['GET'])
def getUsers():
    users=User.query.all()

    users=list(map(lambda x: x.serialize(),users))

    return print(users)