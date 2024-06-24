from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from db.app_db import Staff
from auth.auth_decorator import login_required

staff_bp = Blueprint('staff_controller', __name__)


@staff_bp.route('/', methods=['GET'])
def index():
    staffs = list(Staff().find({}))
    # Convert ObjectId instances to strings
    for staff in staffs:
        staff['_id'] = str(staff['_id'])

    return jsonify(staffs)

@staff_bp.route('/<id>', methods=['GET'])
def find(id):
    staff = Staff().find_one({"_id": ObjectId(id)})
    if not staff:
        return jsonify({'error': 'Item not found'}), 404
    
    staff['_id'] = str(staff['_id'])
    return jsonify(staff)

@staff_bp.route('/', methods=['POST'])
def insert():
    data = request.get_json()
    staff = Staff()
    staff.insert(data)
    return jsonify({'message': 'Staff inserted successfully'})

@staff_bp.route('/<id>', methods=['PUT'])
def update(id):
    # Find the staff document by its ObjectId
    staff = Staff().find({"_id": ObjectId(id)})
    if not staff:
        return jsonify({'error': 'Staff not found'})
    
    data = request.get_json()
    Staff().update({"_id": ObjectId(id)}, data)
    return jsonify({'message': 'Staff updated successfully'})

@staff_bp.route('/<id>', methods=['DELETE'])
def delete(id):
    # Find the staff document by its ObjectId
    staff = Staff().find({"_id": ObjectId(id)})
    if staff:
        # Delete the staff document
        Staff().delete({"_id": ObjectId(id)})
        return jsonify({'message': 'Staff deleted successfully'})
    else:
        return jsonify({'error': 'Staff not found'}), 404

