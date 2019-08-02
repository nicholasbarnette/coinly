#!/home/mm7m6qpyxqv5/.local/bin/python3
from wsgiref.handlers import CGIHandler
import sys
sys.path.insert(0, '/home/mm7m6qpyxqv5/public_html/cgi-bin/server.py')
from server import app

class ProxyFix(object):
	def __init__(self, app):
		self.app = app

	def __call__(self, environ, start_response):
		environ['SERVER_NAME'] = ""
		environ['SERVER_PORT'] = "80"
		environ['REQUEST_METHOD'] = "GET"
		environ['SCRIPT_NAME'] = ""
		environ['PATH_INFO'] = "/"
		environ['QUERY_STRING'] = ""
		environ['SERVER_PROTOCOL'] = "HTTP/1.1"
		return self.app(environ, start_response)

if __name__ == '__main__':
	app.wsgi_app = ProxyFix(app.wsgi_app)
	CGIHandler().run(app)

# gunicorn -w 1 -b 127.0.0.1:80 server:app