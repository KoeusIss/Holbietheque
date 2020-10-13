""" DBStorage engine """

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from web_flask.models.state import State
from web_flask.models.country import Country
from web_flask.models.address import Address
from web_flask.models.base_model import Base
from os import environ, path
from dotenv import load_dotenv
from web_flask.config import base_dir


load_dotenv(path.join(base_dir, '.env'))


classes = {"Country": Country, "State": State, "Address": Address}


class DBStorage:
    """ DBStorage for database connection interface """
    __engine = None
    __session = None

    def __init__(self):
        """ Initialization """
        mysql_user = environ.get('MYSQL_USER')
        mysql_pwd = environ.get('MYSQL_PWD')
        mysql_host = environ.get('MYSQL_HOST')
        mysql_db = environ.get('MYSQL_DB')
        holbietheque_env = environ.get('HOLBIETHEQUE_ENV')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}?charset=utf8'.
                                      format(mysql_user,
                                             mysql_pwd,
                                             mysql_host,
                                             mysql_db))
        if holbietheque_env == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """ Queries all from database """
        new_dict = {}
        for item in classes:
            if cls is None or cls is classes[item] or cls is item:
                objs = self.__session.query(classes[item]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return new_dict

    def new(self, obj):
        """ Creates new records """
        self.__session.add(obj)

    def save(self):
        """ Saves changes on database """
        self.__session.commit()

    def delete(self, obj=None):
        """ Deletes from database """
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """ Reloads database """
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """ Closes connections application/database """
        self.__session.remove()

    def roll(self):
        """ Closes connections application/database """
        self.__session.rollback()
        
    def get(self, cls, id):
        """ Returns single object based on ID """
        if cls not in classes.values():
            return None

        all_cls = self.all(cls)
        for value in all_cls.values():
            if value.id == id:
                return value

        return None
