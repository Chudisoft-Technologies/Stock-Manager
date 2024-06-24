from flask import Blueprint, request, jsonify, session, g, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from db.app_db import db
from bson.objectid import ObjectId
import functools
from auth.auth_decorator import login_required

auth_bp = Blueprint('auth_controller', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user."""
    # db = get_db()
    users = db.users
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')

    if not username or not email or not password:
        return jsonify({"error": "Missing fields"}), 400

    if users.find_one({"$or": [{"username": username}, {"email": email}]}):
        return jsonify({"error": "Username or email already exists"}), 409

    hashed_password = generate_password_hash(password)
    try:
        users.insert_one({"username": username, "email": email, "password": hashed_password, "blocked_users": []})
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        current_app.logger.error(f"Failed to register user: {e}", exc_info=True)
        return jsonify({"error": "Registration failed"}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """Log in a user."""
    # db = get_db()
    users = db.users
    username = request.json.get('username')
    password = request.json.get('password')

    user = users.find_one({"username": username})

    if user and check_password_hash(user['password'], password):
        session.clear()
        session['user_id'] = str(user['_id'])
        return jsonify({"message": "Logged in successfully", 'token': str(user['_id'])}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

@auth_bp.before_app_request
def load_logged_in_user():
    """Load the logged-in user's ID into the global scope."""
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        # db = get_db()
        try:
            g.user = db.users.find_one({"_id": ObjectId(user_id)})
        except Exception as e:
            current_app.logger.error(f"Failed to load user: {e}", exc_info=True)
            g.user = None

@auth_bp.route('/logout', methods=['POST'])
def logout():
    """Log out the current user."""
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200

@auth_bp.route('/block_user', methods=['POST'])
@login_required
def block_user():
    # db = get_db()
    users = db.users
    data = request.json
    if not data.get('user_id_to_block'):
        return jsonify({"error": "Missing user ID to block"}), 400
    try:
        users.update_one(
            {"_id": ObjectId(session['user_id'])},
            {"$addToSet": {"blocked_users": ObjectId(data['user_id_to_block'])}}
        )
        return jsonify({"message": "User blocked successfully"}), 200
    except Exception as e:
        current_app.logger.error(f"Failed to block user: {e}", exc_info=True)
        return jsonify({"error": "Failed to block user"}), 500
