from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            # do not serialize the password, its a security breach
        }
    
class CardBank(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    filename=db.Column(db.String(40),unique=True,nullable=False)
    uri=db.Column(db.Text,unique=True,nullable=False)

    def __ref__(self):
        return f'<User {self.filename}>'
    
    def serialize(self):
        return{
            'id':self.id,
            'filename':self.filename,
            'uri':self.uri
        }