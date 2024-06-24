import bson
from flask import current_app, g
from flask_pymongo import PyMongo
from pymongo.errors import DuplicateKeyError, OperationFailure, InvalidId
from bson.objectid import ObjectId
from werkzeug.local import LocalProxy

def get_db():
    """
    Configuration method to return db instance
    """
    db = getattr(g, "_database", None)

    if db is None:
        db = g._database = PyMongo(current_app).db

    return db

# Use LocalProxy to read the global db instance with just `db`
db = LocalProxy(get_db)

class Ppe:
    def __init__(self):
        self.collection = db.Ppe

    def insert(self, data):
        return self.collection.insert_one(data)

    def find(self, query):
        return self.collection.find(query)

    def find_one(self, query):
        return self.collection.find_one(query)

    def update(self, query, update_data):
        return self.collection.update_one(query, {"$set": update_data})

    def delete(self, query):
        return self.collection.delete_one(query)

class Item:
    def __init__(self):
        self.collection = db.Item

    def insert(self, data):
        return self.collection.insert_one(data)

    def find(self, query):
        return self.collection.find(query)

    def find_one(self, query):
        return self.collection.find_one(query)

    def update(self, query, update_data):
        return self.collection.update_one(query, {"$set": update_data})

    def delete(self, query):
        return self.collection.delete_one(query)

class Staff:
    def __init__(self):
        self.collection = db.Staff

    def insert(self, data):
        return self.collection.insert_one(data)

    def find(self, query):
        return self.collection.find(query)

    def find_one(self, query):
        return self.collection.find_one(query)

    def update(self, query, update_data):
        return self.collection.update_one(query, {"$set": update_data})

    def delete(self, query):
        return self.collection.delete_one(query)

class Supplier:
    def __init__(self):
        self.collection = db.Supplier

    def insert(self, data):
        return self.collection.insert_one(data)

    def find(self, query):
        return self.collection.find(query)

    def find_one(self, query):
        return self.collection.find_one(query)

    def update(self, query, update_data):
        return self.collection.update_one(query, {"$set": update_data})

    def delete(self, query):
        return self.collection.delete_one(query)

class User:
    def __init__(self):
        self.collection = db.User
