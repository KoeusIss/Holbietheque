""" Testing DBStorage """

import unittest
import os
from web_flask.models import storage
from web_flask.models.base_model import BaseModel


class TestDBStorage(unittest.TestCase):
    """ Test DBStorage """

    def setUp(self) -> None:
        """ """
        os.environ['MYSQL_USER'] = 'holbie_test'
        os.environ['MYSQL_PWD'] = 'holbie_test_pwd'
        os.environ['MYSQL_DB'] = 'holbietheque_test_db'
        os.environ['HOLBIETHEQUE_ENV'] = 'test'

    def test_should_create_connection_with_database(self):
        """ """
        ret = storage.all()
        self.assertIsInstance(ret, dict)

    def test_should_add_a_new_record_to_database(self):
        """ """
        pass
