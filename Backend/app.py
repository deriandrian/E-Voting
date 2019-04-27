from flask import Flask, jsonify, request, json, make_response
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
from models import People, President, Dpr
from random import randint
from flask_cors import CORS

app = Flask (__name__)
CORS(app)

POSTGRES = {
    'user' : 'postgres',
    'pw' : 'Sukamanah16',
    'db' : 'test_makers',
    'host' : 'localhost',
    'port' : '5432'
}

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES

db.init_app(app)

@app.route('/login', methods=['POST'])
def login():
    body=request.json
    try:
        people = People.query.filter_by(name = body['name']).first()
        body['name'] = people.name
        body['no_ktp'] = people.no_ktp
        body['email'] = people.email
        body['address'] = people.address
        if people.password == body['password']:
            return (jsonify(body), 200)
            
        else: 
            return ("Password Salah",404)
    except Exception as e:
        print (str(e))
        return ("Username Tidak Terdaftar"), 400

@app.route('/getAllPeople', methods=["GET"])
def get_all_people():
        try:
            people = People.query.order_by(People.no_ktp).all()
            return jsonify([ppl.serialize() for ppl in people])
        except Exception as e:
            return (str(e))

@app.route('/getPeopleBy/<noKtp_>', methods=["GET"])
def get_people_by(noKtp_):
        try:
                people = People.query.filter_by(no_ktp = noKtp_).first()
                return jsonify(people.serialize())
        except Exception as e:
                return (str(e))

@app.route('/addPeople', methods=["POST"])
def add_people():

        body = request.json
        
        no_ktp = body['no_ktp']
        name = body['name']
        password = body['password']
        email = body['email']
        address = body['address']

        try:
                people=People(
                no_ktp=no_ktp,
                name=name,
                password=password,
                email=email,
                address=address
                )

                db.session.add(people)
                db.session.commit()
                return (jsonify(body), 200)
                # return "People added. No.KTP={}".format(people.no_ktp), 200

        except Exception as e:
                return(str(e)), 400


@app.route('/getAllPresident', methods=["GET"])
def get_all_president():
        try:
            president = President.query.order_by(President.candidate_no).all()
            return jsonify([prs.serialize() for prs in president])
        except Exception as e:
            return (str(e))

@app.route('/addPresident', methods=["POST"])
def add_president():

        body = request.json
        
        candidate_no = body['candidate_no']
        name = body['name']

        try:
                president=President(
                candidate_no=candidate_no,
                name=name
                )

                db.session.add(president)
                db.session.commit()
                return "Calon Presiden bertambah. No. Urut={}".format(president.candidate_no), 200

        except Exception as e:
                return(str(e)), 400

@app.route('/getAllDpr', methods=["GET"])
def get_all_dpr():
        try:
            dpr = Dpr.query.order_by(Dpr.candidate_no).all()
            return jsonify([dr.serialize() for dr in dpr])
        except Exception as e:
            return (str(e))

@app.route('/pilihPresiden', methods=['POST'])
def pilihPresiden():
    body = request.json
    no_ktp = body['no_ktp']
    response = {}
    try:
        people = get_people_by(no_ktp).json
        print(people)
        if people['capres'] is None:
            pesan = "Berhasil memilih Calon Presiden"
            capres = {
                'capres' : body['capres']
            }
            db.session.query(People).filter_by(no_ktp = no_ktp).update(capres)
            db.session.commit()
        else:
            pesan = "Anda sudah melakukan voting Calon Presiden sebelumnya, suara tidak sah!"
        
        response['pesan'] = pesan

        return jsonify(response), 200
    except Exception as e:
        
        return str(e), 400

@app.route('/hasilVotingPresiden', methods=['GET'])
def hasilVotingPresiden():
    response = {}
    data = []

    try: 
        semuaCapres = President.query.all()
        for capres in semuaCapres:
            calon = {}
            suara = People.query.filter_by(capres=capres.candidate_no).all()
            calon['nama'] = capres.name
            calon['jumlah_suara'] = len(suara)
            data.append(calon)

        response['data'] = data
        return jsonify(response), 200
    except Exception as e:
        return str(e), 400

@app.route('/addDpr', methods=["POST"])
def add_dpr():

        body = request.json
        
        candidate_no = body['candidate_no']
        name = body['name']

        try:
                dpr=Dpr(
                candidate_no=candidate_no,
                name=name
                )

                db.session.add(dpr)
                db.session.commit()
                return "Calon DPR bertambah. No. Urut={}".format(dpr.candidate_no), 200

        except Exception as e:
                return(str(e)), 400

@app.route('/pilihDPR', methods=['POST'])
def pilihDPR():
    body = request.json
    no_ktp = body['no_ktp']
    response = {}
    try:
        people = get_people_by(no_ktp).json
        print(people)
        if people['dpr'] is None:
            pesan = "Berhasil memilih DPR, suara sah!"
            dpr = {
                'dpr' : body['dpr']
            }
            db.session.query(People).filter_by(no_ktp = no_ktp).update(dpr)
            db.session.commit()
        else:
            pesan = "Anda sudah melakukan voting DPR sebelumnya, suara tidak sah!"
        
        response['pesan'] = pesan

        return jsonify(response), 200
    except Exception as e:
        
        return str(e), 400

@app.route('/hasilVotingDPR', methods=['GET'])
def hasilVotingDPR():
    response = {}
    data = []

    try: 
        semuaCalonDpr = Dpr.query.all()
        for dpr in semuaCalonDpr:
            calon = {}
            suara = People.query.filter_by(dpr=dpr.candidate_no).all()
            calon['nama'] = dpr.name
            calon['jumlah_suara'] = len(suara)
            data.append(calon)

        response['data'] = data
        return jsonify(response), 200
    except Exception as e:
        return str(e), 400