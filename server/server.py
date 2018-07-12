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
    # Mintage Table
    c.execute('''
	    CREATE TABLE Mintage(
            mintageID INTEGER PRIMARY KEY,
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

    # Coin Types Table
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


    # Coins Table
    c.execute('''
	    CREATE TABLE Coins(
	        coinID INTEGER PRIMARY KEY,
	        mintageID INTEGER,
            buyDate TEXT,
            sellDate TEXT,
            buyPrice REAL,
            sellPrice REAL,
            grade INTEGER,
            notes TEXT
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
    c.execute("DELETE FROM Mintage WHERE 1")
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
    print(c.execute('''SELECT COUNT(*) FROM Mintage''').fetchall())
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

    try:
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

            # print('', file=sys.stderr)
            # print(level, file=sys.stderr)
            # print(value, file=sys.stderr)
            # print(nickname, file=sys.stderr)
            # print('', file=sys.stderr)

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
                jsonString = jsonString[:-1] + ']'

                jsonString += ',"header": "Value"'
                jsonString += '}'

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
                jsonString = jsonString[:-1] + ']'

                jsonString += ',"header": "' + valueLookupInt(info[0][1]) + '"'
                jsonString += '}'

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
                jsonString = jsonString[:-1] + ']'

                jsonString += ',"header": "' + info[0][0] + '"'
                jsonString += '}'

                return jsonify(jsonString), 202
            else:
                return jsonify('{"message": "Invalid level."}'), 404

    except Exception as e:
        return jsonify('{"message": "' + str(e) + '"}'), 404

# Returns arrays of items to select from the coins in the mintage table
@app.route('/collections/select', methods = ['POST'])
def selectData():

    try:
        # Sets up/connects to DB
        conn = sqlite3.connect('coins.db')
        c = conn.cursor()

        # Gets the level
        # Level 0 - Value List
        # Level 1 - Type List
        # Level 2 - Coin List
        level = request.json["level"]
        value = request.json["value"]
        nickname = request.json["nickname"]

        if level == 0:
            values = c.execute('SELECT value FROM Mintage GROUP BY value').fetchall()
            valueArray = '{"items": ['
            for val in values:
                valueArray += '"' + valueLookupInt(val[0]) + '",'

            valueArray = valueArray[:-1] + ']}'
            return jsonify(valueArray), 202
        elif level == 1:
            values = c.execute('SELECT nickname FROM Mintage WHERE value= ' + str(valueLookupStr(value)) + ' GROUP BY nickname').fetchall()
            valueArray = '{"items": ['
            for val in values:
                valueArray += '"' + val[0] + '",'

            valueArray = valueArray[:-1] + ']}'
            return jsonify(valueArray), 202
        elif level == 2:
            values = c.execute('SELECT year, mint, note FROM Mintage WHERE value= ' + str(valueLookupStr(value)) + ' AND nickname="' + nickname + '"').fetchall()
            valueArray = '{"items": ['
            for val in values:
                if val[2]:
                    valueArray += '"' + val[0] + '-' + val[1] + ' -- ' + val[2] + '",'
                else:
                    if not val[1] == '':
                        valueArray += '"' + val[0] + '-' + val[1] + '",'
                    else:
                        valueArray += '"' + val[0] + '",'


            valueArray = valueArray[:-1] + ']}'
            return jsonify(valueArray), 202

    except Exception as e:
        return jsonify('{"message": "' + str(e) + '"}'), 404

# Adds a coin to your personal collection
@app.route('/collections/coin/add', methods = ['POST'])
def addCoin():

    try:
        # Sets up/connects to DB
        conn = sqlite3.connect('coins.db')
        c = conn.cursor()

        value = request.json["value"]
        nickname = request.json["nickname"]
        coin = request.json["coin"]
        grade = request.json["grade"]
        # YYYY-MM-DD
        buyDate = request.json["buyDate"]
        buyPrice = request.json["buyPrice"]
        notes = request.json["notes"]

        coinArray = coin.split(" -- ")
        note = ''
        if (len(coinArray) == 2):
            note = coinArray[1]
        coinArray = coinArray[0].split("-")
        year = coinArray[0]
        mint = ''
        if (len(coinArray) == 2):
            mint = coinArray[1]

        query = 'INSERT INTO Coins(mintageID, buyDate, buyPrice, grade, notes) VALUES (' \
                    '(SELECT mintageID FROM Mintage M ' \
                        'WHERE M.year="' + year + '" AND M.mint="' + mint + '" AND ' \
                            'M.nickname="' + nickname + '" AND M.value=' + str(valueLookupStr(value)) + ' ' \
                            'AND M.note="' + note + '")' \
                    ', "' + buyDate + '", ' + buyPrice + ', + "' + grade + '", "' + notes + '")'
        c.execute(query)
        conn.commit()

        return jsonify('{"message": "Successfully added coin to collection."}'), 202

    except Exception as e:
        return jsonify('{"message": "' + str(e) + '"}'), 404



if __name__ == '__main__':
    # Runs the application
    app.run(host=hostName, port=portNumber)
