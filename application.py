from flask import Flask
# from flask import Flask, jsonify, request
# from detect import predictor

# print a nice greeting.
def say_hello():
    return "Hello World!"

application = Flask(__name__)

application.add_url_rule('/', 'index', say_hello)

# @app.route('/identify', methods = ['GET'])
# def identify():
#     headline = request.args.get('headline', '')
#     clickbait_percent = predictor.predict(headline)
#     return jsonify({'clickbait_percent': clickbait_percent * 100})

if __name__ == "__main__":
	application.run()
