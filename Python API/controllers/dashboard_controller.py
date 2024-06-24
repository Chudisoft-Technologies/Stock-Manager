from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from db.app_db import db, Staff, User, Ppe, Item, Supplier
from auth.auth_decorator import login_required

dashboard_bp = Blueprint('dashboard_controller', __name__)


@dashboard_bp.route('/', methods=['GET'])
def index():
    staffs = list(Staff().find({}))
    ppes = list(Ppe().find({}))
    items = list(Item().find({}))
    suppliers = list(Supplier().find({}))
    users = list(db.users.find({}))
    low_stocks = list(Item().find({'Stock_Level': {'$lt': 5}}))

    # Convert ObjectId instances to strings
    for staff in staffs:
        staff['_id'] = str(staff['_id'])

    for ppe in ppes:
        ppe['_id'] = str(ppe['_id'])

    for item in items:
        item['_id'] = str(item['_id'])
    
    for supplier in suppliers:
        supplier['_id'] = str(supplier['_id'])

    for user in users:
        user['_id'] = str(user['_id'])

    for low_stock in low_stocks:
        low_stock['_id'] = str(low_stock['_id'])

    return jsonify({'data': {
        'staffs': staffs, 'ppes': ppes, 'items': items, 
        'suppliers': suppliers, 'users': users,
        'low_stocks': low_stocks
    }})
