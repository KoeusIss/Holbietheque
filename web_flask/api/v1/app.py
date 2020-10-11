#!/usr/bin/python3
""" 
Starts Flask app
"""
from flask import Flask

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

@app.route('/status', strict_slashes=False)
def status():
    """GET /status

    Returns:
        (json): returns the status of our app
    """
    return {'status': 'OK'}

if __name__ == "__main__":
    """ Main function """
    app.run('0.0.0.0', 5000)
