
import functools

from flask import g, jsonify


def login_required(view):
    """View decorator that redirects anonymous users to the login page."""
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return jsonify({"error": "Unauthorized"}), 401
        return view(**kwargs)
    return wrapped_view