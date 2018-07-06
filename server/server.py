from flask import Flask, render_template, request, Response, jsonify
import sqlite3
import json, sys
import time, datetime
import webbrowser
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
            quantity INTEGER,
            note TEXT
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


try:
    # Clears the database tables
    print("Clearing tables...")
    c.execute("DELETE FROM Coins WHERE 1")
    c.execute("DELETE FROM CoinTypes WHERE 1")
    print("Tables cleared...")


    # Inserts the coin data
    print("Inserting data...")
    query, query2 = initCoinDB()
    c.execute(query)
    c.execute(query2)
    conn.commit()
    print("Data inserted successfully.")


    # Prints the count of rows in each table
    print(c.execute('''SELECT COUNT(*) FROM Coins''').fetchall())
    print(c.execute('''SELECT COUNT(*) FROM CoinTypes''').fetchall())
except Exception as e:
    printErr(e)


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
        value = request.json["value"]
        nickname = request.json["nickname"]

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
                jsonString += '{"name": "", "value": "' + valueLookupInt(data[0]) + '", "years": "' + str(data[1]) + ' - ' + str(data[2]) + '", "image": "' + str(data[3]) + '"},'
            jsonString = jsonString[:-1] + ']}'

            return jsonify(jsonString), 202

        elif level == 1:
            # Gets data
            query = 'SELECT C.nickname, C.value, MIN(C.year) AS year, MAX(C.year), T.image FROM Coins AS C, CoinTypes AS T ' \
                        'WHERE C.value=' + str(valueLookupStr(value)) + ' AND T.coinTypeID=C.coinTypeID ' \
                        'GROUP BY C.name ' \
                        'ORDER BY year DESC'
            c.execute(query)
            info = c.fetchall()

            # Turns data into a json string
            jsonString = '{"values": ['
            for data in info:
                jsonString += '{"name": "' + data[0] + '", "value": "' + valueLookupInt(data[1]) + '", "years": "' + str(data[2]) + ' - ' + str(data[3]) + '", "image": "' + str(data[4]) + '"},'
            jsonString = jsonString[:-1] + ']}'

            return jsonify(jsonString), 202
        elif level == 2:
            # Gets data
            query = 'SELECT C.nickname, C.value, C.year, C.mint, C.note, T.image FROM Coins AS C, CoinTypes AS T ' \
                        'WHERE C.value=' + str(valueLookupStr(value)) + ' AND T.coinTypeID=C.coinTypeID AND C.nickname="' + str(nickname) + '" ' \
                        'ORDER BY year DESC'
            c.execute(query)
            info = c.fetchall()

            # Turns data into a json string
            jsonString = '{"values": ['
            for data in info:
                jsonString += '{"name": "' + data[0] + '", "value": "' + valueLookupInt(data[1]) + '", "years": "' + str(data[2]) + ' ' + str(data[3]) + '", "note": "Notes: ' + str(data[4]) + '", "image": "' + str(data[5]) + '"},'
            jsonString = jsonString[:-1] + ']}'

            return jsonify(jsonString), 202
        else:
            return jsonify('{"message": "Invalid level."}'), 404



if __name__ == '__main__':
    # Runs the application
    app.run(host=hostName, port=portNumber)
