from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from db.app_db import Item

item_bp = Blueprint('item_controller', __name__)


@item_bp.route('/', methods=['GET'])
def index():
    items = list(Item().find({}))
    # Convert ObjectId instances to strings
    for item in items:
        item['_id'] = str(item['_id'])

    return jsonify(items)

@item_bp.route('/<id>', methods=['GET'])
def find(id):
    item = Item().find_one({"_id": ObjectId(id)})
    if not item:
        return jsonify({'error': 'Item not found'}), 404
    
    item['_id'] = str(item['_id'])
    return jsonify(item)

@item_bp.route('/', methods=['POST'])
def insert():
    data = request.get_json()
    item = Item()
    item.insert(data)
    return jsonify({'message': 'Item inserted successfully'})

@item_bp.route('/<id>', methods=['PUT'])
def update(id):
    # Find the item document by its ObjectId
    item = Item().find({"_id": ObjectId(id)})
    if not item:
        return jsonify({'error': 'Item not found'})
    
    data = request.get_json()
    Item().update({"_id": ObjectId(id)}, data)
    return jsonify({'message': 'Item updated successfully'})

@item_bp.route('/<id>', methods=['DELETE'])
def delete(id):
    # Find the item document by its ObjectId
    item = Item().find({"_id": ObjectId(id)})
    if item:
        # Delete the item document
        Item().delete({"_id": ObjectId(id)})
        return jsonify({'message': 'Item deleted successfully'})
    else:
        return jsonify({'error': 'Item not found'}), 404

