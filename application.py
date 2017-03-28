#from flask import Flask
from flask import Flask, jsonify, request
from predictor import checkbaitor

application = Flask(__name__)
# application.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
# application.config['CORS_HEADERS'] = 'Content-Type'

# print a nice greeting.
#@application.route('/predict', methods = ['GET'])
def predict():
    headline = request.args.get('headline', '')
    print headline
    clickbait_percent = checkbaitor.predict(headline)
    response = jsonify({'clickbait_percent': clickbait_percent * 100})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

application.add_url_rule('/', 'index', predict)

# @app.route('/identify', methods = ['GET'])
# def identify():
#     headline = request.args.get('headline', '')
#     clickbait_percent = predictor.predict(headline)
#     return jsonify({'clickbait_percent': clickbait_percent * 100})

if __name__ == "__main__":
	application.run()
