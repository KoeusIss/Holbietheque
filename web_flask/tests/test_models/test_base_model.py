""" Test Base Model """

import unittest
from web_flask.models.base_model import BaseModel
from datetime import datetime
from unittest import mock


class TestBaseModel(unittest.TestCase):
    """ TestBaseModel class """

    def test_should_create_base_model_instance(self):
        """ """
        bm = BaseModel()
        self.assertIsInstance(bm, BaseModel)

    def test_should_create_instance_with_valid_id(self):
        """ """
        bm = BaseModel()
        id_pattern = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
        self.assertRegex(bm.id, id_pattern)

    def test_should_create_instance_with_valid_datetime(self):
        bm = BaseModel()
        self.assertIsInstance(bm.created_at, datetime)
        self.assertIsInstance(bm.updated_at, datetime)

    def test_should_create_with_dictionary(self):
        """ """
        my_dict = {
            "name": "faker",
            "team": "sktelecom1"
        }
        bm = BaseModel(**my_dict)
        self.assertEqual(bm.name, my_dict["name"])
        self.assertEqual(bm.team, my_dict["team"])

    def test_should_skip_id_if_it_given(self):
        """ """
        my_dict = {
            "id": "11111111-ffff-eeee-aaaa-999999999999",
            "name": "faker"
        }
        bm = BaseModel(my_dict)
        self.assertNotEqual(bm.id, my_dict['id'])

    @mock.patch('web_flask.models.storage')
    def test_should_update_time(self, mock_storage):
        """ """
        bm = BaseModel()
        before_ua = bm.updated_at
        before_ca = bm.created_at
        bm.save()
        after_ua = bm.updated_at
        after_ca = bm.created_at
        self.assertGreater(after_ua, before_ua)
        self.assertEqual(before_ca, after_ca)
