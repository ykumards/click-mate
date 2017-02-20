#from flask import Flask
from flask import Flask, jsonify, request
from predictor import checkbaitor

application = Flask(__name__)

# print a nice greeting.
#@application.route('/predict', methods = ['GET'])
def predict():
    headline = request.args.get('headline', '')
    print headline
    clickbait_percent = checkbaitor.predict(headline)
    return jsonify({'clickbait_percent': clickbait_percent * 100})

application.add_url_rule('/', 'index', predict)

# @app.route('/identify', methods = ['GET'])
# def identify():
#     headline = request.args.get('headline', '')
#     clickbait_percent = predictor.predict(headline)
#     return jsonify({'clickbait_percent': clickbait_percent * 100})

if __name__ == "__main__":
	application.run()
