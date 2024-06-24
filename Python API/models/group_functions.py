from enum import Enum
from uuid import UUID, uuid4


def str2bool(v):
  if v is None or v == 'null':
    return None
  return v.lower() in ("yes", "true", "t", "1", "y")