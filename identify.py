# from flask import Flask
from flask import Flask, jsonify, request
from detect import predictor

app = Flask(__name__)

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'

@app.route('/identify', methods = ['GET'])
def identify():
    headline = request.args.get('headline', '')
    clickbait_percent = predictor.predict(headline)
    return jsonify({'clickbait percent': clickbait_percent * 100})

if __name__ == "__main__":
	app.run()