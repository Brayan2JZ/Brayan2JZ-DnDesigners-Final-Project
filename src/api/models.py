from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Date

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=False, nullable=False)
    cards = db.relationship('CardBank', backref='user')
    favorites = db.relationship('Favorites', backref='user')
    comments = db.relationship('CommentsBank', backref='user')
    settings = db.relationship('Settings',backref='user')

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            # do not serialize the password, its a security breach
        }
    
class CardBank(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    filename = db.Column(db.String(40), unique=True, nullable=False)
    url = db.Column(db.Text, unique=True, nullable=False)
    tags = db.Column(db.Text, nullable=True)  # Change to false once we have a tagging system
    uploadedDate = db.Column(Date)
    favorites = db.relationship('Favorites', backref='card_bank')
    comments = db.relationship('CommentsBank', backref='card_bank')

    def __ref__(self):
        return f'<CardBank {self.filename}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'filename': self.filename,
            'url': self.url,
            'tags': self.tags,
            'uploadedDate': self.uploadedDate
        }


class TagList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tagDescription = db.Column(db.String(50), unique=True, nullable=False)
    tagCount = db.Column(db.Integer, nullable=False)

    def __ref__(self):
        return f'<TagList {self.tagDescription}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'tagDescription': self.tagDescription,
            'tagCount': self.tagCount
        }
    
class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    imageID = db.Column(db.Integer, db.ForeignKey('card_bank.id'), nullable=True)
    artId= db.Column(db.Integer, db.ForeignKey('art_bank.id'), nullable=True)
    threeId=db.Column(db.Integer,db.ForeignKey('model.id'),nullable=True)

    def __ref__(self):
        return f'<Favorites {self.id}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'imageId': self.imageID,
            'userId': self.userId,
            'artId':self.artId,
            'threeId':self.threeId
        }
    
class Settings(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    userId=db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False,unique=True)
    userName=db.Column(db.String(100),unique=True,nullable=True)
    following=db.Column(db.Text,nullable=True)
    profileUrl=db.Column(db.Text,nullable=True)

    def __ref__(self):
        return f'<Settings {self.id}>'
    
    def serialize(self):
        return {
            'id':self.id,
            #'userId':self.userId,
            'following':self.following
        }

class ArtBank(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    fileName = db.Column(db.String(40), nullable=False, unique=True)
    imageUrl = db.Column(db.Text, nullable=False)
    caption = db.Column(db.Text, nullable=False)
    comments=db.relationship('CommentsBank',backref='art_bank')

    def __ref__(self):
        return f'<ArtBank {self.id}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'fileName': self.fileName,
            'imageUrl': self.imageUrl,
            'caption': self.caption
        }
    
class CommentsBank(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    imageId = db.Column(db.Integer, db.ForeignKey('card_bank.id'), nullable=True)
    artId = db.Column(db.Integer, db.ForeignKey('art_bank.id'), nullable=True)
    threeId=db.Column(db.Integer, db.ForeignKey('model.id'), nullable=True)
    comment = db.Column(db.Text, nullable=False)
    uploadDate = db.Column(Date, nullable=False)
    
    def __ref__(self):
        return f'<CommentsBank {self.id}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'userId':self.userId,
            'imageId': self.imageId,
            'artId': self.artId,
            'threeId':self.threeId,
            'comment': self.comment,
            'uploadDate': self.uploadDate
        }

### NEW MODEL CLASS ###
class Model(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    picture_url = db.Column(db.Text, nullable=False)
    model_url = db.Column(db.Text, nullable=False)
    uploaded_date = db.Column(Date)

    def __repr__(self):
        return f'<Model {self.title}>'

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'picture_url': self.picture_url,
            'model_url': self.model_url,
            'uploaded_date': self.uploaded_date
        }
