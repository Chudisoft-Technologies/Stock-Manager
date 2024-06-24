from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from db.app_db import Supplier

supplier_bp = Blueprint('supplier_controller', __name__)

@supplier_bp.route('/', methods=['GET'])
def index():
    suppliers = list(Supplier().find({}))
    # Convert ObjectId instances to strings
    for supplier in suppliers:
        supplier['_id'] = str(supplier['_id'])

    return jsonify(suppliers)

@supplier_bp.route('/<id>', methods=['GET'])
def find(id):
    supplier = Supplier().find_one({"_id": ObjectId(id)})
    if supplier:
        supplier['_id'] = str(supplier['_id'])
        return jsonify(supplier)
    else:
        return jsonify({'error': 'Supplier not found'}), 404

@supplier_bp.route('/', methods=['POST'])
def insert():
    data = request.get_json()
    supplier = Supplier()
    supplier.insert(data)
    return jsonify({'message': 'Supplier inserted successfully'})

@supplier_bp.route('/<id>', methods=['PUT'])
def update(id):
    # Find the supplier document by its ObjectId
    supplier = Supplier().find({"_id": ObjectId(id)})
    if not supplier:
        return jsonify({'error': 'Supplier not found'})
    
    data = request.get_json()
    Supplier().update({"_id": ObjectId(id)}, data)
    return jsonify({'message': 'Supplier updated successfully'})

@supplier_bp.route('/<id>', methods=['DELETE'])
def delete(id):
    # Find the supplier document by its ObjectId
    supplier = Supplier().find({"_id": ObjectId(id)})
    if supplier:
        # Delete the supplier document
        Supplier().delete({"_id": ObjectId(id)})
        return jsonify({'message': 'Supplier deleted successfully'})
    else:
        return jsonify({'error': 'Supplier not found'}), 404

