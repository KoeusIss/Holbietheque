""" Testing DBStorage """

import unittest
import os
from web_flask.models.base_model import BaseModel
from web_flask.models import storage


class TestDBStorage(unittest.TestCase):
    """ Test DBStorage """

    @classmethod
    def setUp(self) -> None:
        """ """
        os.environ['FLASK_ENV'] = 'testing'
        os.environ['MYSQL_USER'] = 'holbie_test'
        os.environ['MYSQL_PWD'] = 'holbie_test_pwd'
        os.environ['MYSQL_DB'] = 'holbietheque_test_db'
        os.environ['HOLBIETHEQUE_ENV'] = 'test'

    def setUp(self):


    def test_should_return_dictionary_by_calling_all(self):
        """ """
        ret = storage.all()
        self.assertIsInstance(ret, dict)

    def test_should_create_new_db_instance_connection(self):
        """ """
        bm = BaseModel()
        storage.new(bm)

