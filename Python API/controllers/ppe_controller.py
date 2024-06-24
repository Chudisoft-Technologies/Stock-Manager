from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from db.app_db import Ppe

ppe_bp = Blueprint('ppe_controller', __name__)


@ppe_bp.route('/', methods=['GET'])
def index():
    ppes = list(Ppe().find({}))
    # Convert ObjectId instances to strings
    for ppe in ppes:
        ppe['_id'] = str(ppe['_id'])

    return jsonify(ppes)

@ppe_bp.route('/<id>', methods=['GET'])
def find(id):
    ppe = Ppe().find_one({"_id": ObjectId(id)})
    if not ppe:
        return jsonify({'error': 'Item not found'}), 404
    
    ppe['_id'] = str(ppe['_id'])
    return jsonify(ppe)

@ppe_bp.route('/', methods=['POST'])
def insert():
    data = request.get_json()
    ppe = Ppe()
    ppe.insert(data)
    return jsonify({'message': 'Ppe inserted successfully'})

@ppe_bp.route('/<id>', methods=['PUT'])
def update(id):
    # Find the ppe document by its ObjectId
    ppe = Ppe().find({"_id": ObjectId(id)})
    if not ppe:
        return jsonify({'error': 'Ppe not found'})
    
    data = request.get_json()
    Ppe().update({"_id": ObjectId(id)}, data)
    return jsonify({'message': 'Ppe updated successfully'})

@ppe_bp.route('/<id>', methods=['DELETE'])
def delete(id):
    # Find the ppe document by its ObjectId
    ppe = Ppe().find({"_id": ObjectId(id)})
    if ppe:
        # Delete the ppe document
        Ppe().delete({"_id": ObjectId(id)})
        return jsonify({'message': 'Ppe deleted successfully'})
    else:
        return jsonify({'error': 'Ppe not found'}), 404

