from flask import Flask, render_template, request, Response, jsonify
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
            coinTypeID INTEGER,
            year TEXT,
            mint TEXT,
            name TEXT,
            nickname TEXT,
            value INTEGER,
            quantity INTEGER
        )
    ''')

    # Coin Types
    c.execute('''
        CREATE TABLE CoinTypes(
            coinTypeID INTEGER PRIMARY KEY,
            name TEXT,
            nickname TEXT,
            value INTEGER,
            startYear TEXT,
            endYear TEXT,
            image TEXT
        )
    ''')


    print("Inserting data...")
    query, query2 = initCoinDB()
    c.execute(query)
    c.execute(query2)
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
print(c.execute('''SELECT COUNT(*) FROM CoinTypes''').fetchall())


# Specify browser path to open URL
# chrome_path = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe %s'

# Opens URL
# webbrowser.get(chrome_path).open(hostName + ':' + str(portNumber), new=2)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/collections', methods = ['POST', 'GET'])
def collections():
    # Sets up/connects to DB
    conn = sqlite3.connect('coins.db')
    c = conn.cursor()

    if request.method == 'GET':
        return render_template('index.html')
    else:

        # Gets the level
        # Level 0 - Value List
        # Level 1 - Type List
        # Level 2 - Coin List
        level = request.json["level"]
        if level == 0:

            # Gets data
            c.execute('''
                SELECT value, MIN(startYear), MAX(endYear), image FROM CoinTypes
                    GROUP BY value
                    ORDER BY value ASC
            ''')
            info = c.fetchall()

            # Turns data into a json string
            jsonString = '{"values": ['
            for data in info:
                jsonString += '{"value": "' + valueLookup(data[0]) + '", "years": "' + str(data[1]) + '-' + str(data[2]) + '", "image": "' + str(data[3]) + '"},'
            jsonString = jsonString[:-1] + ']}'

            print(jsonString, file=sys.stderr)
            return jsonify(jsonString), 202

        elif level == 1:
            pass
        elif level == 2:
            pass


@app.route('/collections/<value>', methods=['POST'])
def getValue(value):
    global c
    try:
        query = 'SELECT * FROM Coins C WHERE C.value=' + str(value) + ' GROUP BY C.name'
        print(query, file=sys.stderr)
        data = c.execute(query)
        print(data, file=sys.stderr)
        return jsonify(query), 202
    except Exception as e:
        printErr(e)
        return jsonify('{message: ' + str(e) + '}'), 404





if __name__ == '__main__':
    # Runs the application
    app.run(host=hostName, port=portNumber)
