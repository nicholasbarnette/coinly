from flask import Flask, render_template, request, Response
import bcrypt, sqlite3
import json, sys
import time, datetime
import webbrowser
from profile import *
from initFunctions import *


# Set the desired host and port
hostName = '127.0.0.1'
portNumber = 8000


# Sets up/connects to DB
conn = sqlite3.connect('coins.db')
c = conn.cursor()


app = Flask(__name__, static_folder='../static/dist', template_folder='../static')


# Attempts to set up the necessary tables
try:
    # Coins Table
    c.execute('''
	    CREATE TABLE Coins(
            coinID INTEGER PRIMARY KEY,
            year TEXT,
            mint TEXT,
            name TEXT,
            nickname TEXT,
            value REAL,
            quantity INTEGER
        )
    ''')


    print("Inserting data...")
    query = initCoinDB()
    c.execute(query)
    conn.commit()
    print("Data inserted successfully.")


    # Transactions Table
    c.execute('''
	    CREATE TABLE Transactions(
	        transactionID INTEGER PRIMARY KEY,
            coinID INTEGER,
            buyDate TEXT,
            sellDate TEXT,
            buyPrice REAL,
            sellPrice REAL
        )
    ''')

    # Users Table
    c.execute('''
    	    CREATE TABLE Users(
    	        userID INTEGER PRIMARY KEY,
                email TEXT,
                password TEXT,
                firstName TEXT,
                lastName TEXT,
                birthday TEXT,
                joinDate TEXT
            )
    	''')

except sqlite3.Error as e:
    printErr(e)


print(c.execute('''SELECT COUNT(*) FROM Coins''').fetchall())


# Specify browser path to open URL
# chrome_path = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe %s'

# Opens URL
# webbrowser.get(chrome_path).open(hostName + ':' + str(portNumber), new=2)


@app.route('/')
@app.route('/collections')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    # Runs the application
    app.run(host=hostName, port=portNumber)
