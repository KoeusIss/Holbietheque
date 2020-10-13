## Holbietheque

Holbietheque is a library of profile and resume for **Holberton school** student


## Usage
### Python requirements
In order to avoid any problems you need to install these packages
```bash
$ sudo apt-get install python3-dev
$ sudo apt-get install libmysqlclient-dev
$ sudo apt-get install zlib1g-dev
```
In order to run flask api server you need to pass this command
```bash
yarn run-flask
```
This command run the server on localhost port 5000 to see the status of your server try to visit the next link
![http://localhost:5000/status](http://localhost:5000/status)
you should see the following API response
```json
{
  "status": "OK"
}
```