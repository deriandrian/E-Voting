import datetime
from flask_sqlalchemy import SQLAlchemy
from app import db


class People(db.Model):
    
    __tablename__ = 'people'

    no_ktp = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    password = db.Column(db.String())
    email = db.Column(db.String())
    address = db.Column(db.String())
    capres = db.Column(db.Integer())
    dpr = db.Column(db.Integer())
    # quiz = db.relationship('Quizzes', backref = 'users', lazy = True)
    

    def __init__(self, no_ktp, name, password, email, address):
        self.no_ktp = no_ktp
        self.name = name
        self.password = password
        self.email = email
        self.address = address


    def __repr__(self):
        return '<user id {}>'.format(self.no_ktp)
    
    def serialize(self):
        return{
            'no_ktp': self.no_ktp,
            'name': self.name,
            'password': self.password,
            'email': self.email,
            'address' : self.address,
            'capres' : self.capres,
            'dpr' : self.dpr
            # 'quiz' : [{'quiz_id' : item.id, 'quiz_name' : item.quiz_name, 'quiz_category' : item.quiz_category} for item in self.quiz]
        }


class President(db.Model):
    
    __tablename__ = 'president'

    candidate_no = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    # quiz = db.relationship('Quizzes', backref = 'users', lazy = True)
    

    def __init__(self, candidate_no, name):
        self.candidate_no = candidate_no
        self.name = name


    def __repr__(self):
        return '<president id {}>'.format(self.candidate_no)
    
    def serialize(self):
        return{
            'candidate_no': self.candidate_no,
            'name': self.name
            # 'quiz' : [{'quiz_id' : item.id, 'quiz_name' : item.quiz_name, 'quiz_category' : item.quiz_category} for item in self.quiz]
        }


class Dpr(db.Model):
    
    __tablename__ = 'dpr'

    candidate_no = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    # quiz = db.relationship('Quizzes', backref = 'users', lazy = True)
    

    def __init__(self, candidate_no, name):
        self.candidate_no = candidate_no
        self.name = name

    def __repr__(self):
        return '<dpr id {}>'.format(self.candidate_no)
    
    def serialize(self):
        return{
            'candidate_no': self.candidate_no,
            'name': self.name
            # 'quiz' : [{'quiz_id' : item.id, 'quiz_name' : item.quiz_name, 'quiz_category' : item.quiz_category} for item in self.quiz]
        }