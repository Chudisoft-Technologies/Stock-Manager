from ensurepip import version
import logging
import os

import logging, logging.config, yaml
import traceback

from flask import Flask, jsonify, request
from flask_restx import Resource, Api
from flask_cors import CORS, cross_origin
from db.app_db import db
from models.email_sender import Send_Support_Email

from controllers.dashboard_controller import dashboard_bp
from controllers.staff_controller import staff_bp
from controllers.auth_controller import auth_bp
from controllers.supplier_controller import supplier_bp
from controllers.item_controller import item_bp
from controllers.ppe_controller import ppe_bp


app = Flask(__name__) #, static_url_path='/static')
app.config['JSON_AS_ASCII'] = False  # Ensure JSON responses handle non-ASCII characters

CORS(app)

# Secret Key for Session
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', '4u7b79f326202e92f9b6a52d46d68705fbd59b0271da')  # INPUT_REQUIRED {Provide a strong secret key}

# Register blueprints
app.register_blueprint(dashboard_bp, url_prefix='/api/v1/dashboard')
app.register_blueprint(staff_bp, url_prefix='/api/v1/staff')
app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
app.register_blueprint(supplier_bp, url_prefix='/api/v1/supplier')
app.register_blueprint(item_bp, url_prefix='/api/v1/item')
app.register_blueprint(ppe_bp, url_prefix='/api/v1/ppe')


@app.before_request
def log_request():
    if request.method == 'OPTIONS':
        return jsonify({'error': 'Options not allowed'}), 201

with open('logging.conf', 'r') as file:
    config = yaml.safe_load(file)
    logging.config.dictConfig(config)

logfile    = logging.getLogger('file')
logconsole = logging.getLogger('console')

# Error handler for 500 Internal Server Error
@app.errorhandler(500)
def internal_server_error(error):
    if request.method == 'OPTIONS':
        return jsonify({'error': str(error)}), 200
    
    # Get the error message and stack trace
    error_msg = str(error)
    traceback_str = traceback.format_exc()
    
    # Log the error message and stack trace
    logfile.error('An error occurred: %s\n%s', error_msg, traceback_str)
    
    return jsonify({'error': error_msg}), 500

# Error handler for 404 exceptions
@app.errorhandler(404)
def handle_exception(error):
    # Get the error message and stack trace
    error_msg = str(error)
    traceback_str = traceback.format_exc()
    
    # Log the error message and stack trace
    logfile.error('An error occurred: %s\n%s', error_msg, traceback_str)
    
    return jsonify({'error': error_msg}), 404

@app.errorhandler(401)
def handle_exception(error):
    if request.method == 'OPTIONS':
        return jsonify({'error': str(error)}), 200
    # Get the error message and stack trace
    error_msg = str(error)

    print(request.headers)

    traceback_str = traceback.format_exc()
    
    # Log the error message and stack trace
    logfile.error('An error occurred: %s\n%s', error_msg, traceback_str)
    
    return jsonify({'error': error_msg})

# Error handler for general exceptions
@app.errorhandler(Exception)
def handle_exception(error):
    if request.method == 'OPTIONS':
        return jsonify({'error': str(error)}), 200
    
    # Get the error message and stack trace
    error_msg = str(error)
    traceback_str = traceback.format_exc()
    
    # Log the error message and stack trace
    logfile.error('An error occurred: %s\n%s', error_msg, traceback_str)
    
    return jsonify({'error': error_msg}), 200





@app.post("/api/v1/Send_Support_Email")
@cross_origin(supports_credentials=True)
def SendSupportEmail():
    return Send_Support_Email()


# # Initialize database
# db.init_app(app, app.config['MONGODB_SETTINGS'])

if __name__ == "__main__":
    # app.run(host='0.0.0.0', port=81) #)
    try:
        # MongoDB configuration
        app.config['MONGO_URI'] = 'mongodb://localhost:27017/stock-manager'
        # app.config['MONGO_URI'] = 'mongodb+srv://<username>:<password>@<your-atlas-cluster-address>/database_name'
        app.run(port=8080, debug=True)  # Use a different port other than 5000
    except Exception as e:
        app.logger.error(f"Failed to start Flask application: {e}", exc_info=True)
