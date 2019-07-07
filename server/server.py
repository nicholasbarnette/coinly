from flask import Flask, render_template, request, Response, jsonify, session
import sqlite3
import json, sys
import time, datetime
import bcrypt, webbrowser
from initFunctions import *



# Redis Session Management
# http://flask.pocoo.org/snippets/75/


# Set the desired host and port
hostName = '127.0.0.1'
portNumber = 8000



# Sets up/connects to DB
conn = sqlite3.connect('coins.db')
c = conn.cursor()


app = Flask(__name__, static_folder='../static/dist', template_folder='../static')
app.secret_key = "19Me19Rc97uR01yD08iME16D"


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
	        userID INTEGER,
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
    print(c.execute('''SELECT quantity FROM Mintage LIMIT 1''').fetchall())
    print(c.execute('''SELECT COUNT(*) FROM CoinTypes''').fetchall())

    # print()
    # print()
    # print(c.execute('''SELECT COUNT(*) FROM Users''').fetchall())
    # password = c.execute('''SELECT password FROM Users LIMIT 1''').fetchall()[0][0]
    # if bcrypt.checkpw(b'Test', str.encode(password)):
    #     print("It Matches!")
    # else:
    #     print("It Does not Match :(")


except Exception as e:
    printErr(e)


# Specify browser path to open URL
# chrome_path = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe %s'

# Opens URL
# webbrowser.get(chrome_path).open(hostName + ':' + str(portNumber), new=2)


@app.before_request
def session_management():
    # Sets the session to last indefinitely until reset
    session.permanent = True




@app.route('/')
def index():
    return render_template('index.html')

# Returns an array of the whole collections data
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
                query = 'SELECT M.nickname, M.value, MIN(M.year) AS year, MAX(M.year), T.image FROM Mintage M, CoinTypes T ' \
                            'WHERE M.value=' + str(valueLookupStr(value)) + ' AND T.coinTypeID=M.coinTypeID ' \
                            'GROUP BY M.name ' \
                            'ORDER BY year ASC'
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
                query = 'SELECT M.nickname, M.value, M.year, M.mint, M.quantity, M.note, T.image FROM CoinTypes T, Mintage M ' \
                            'WHERE M.value=' + str(valueLookupStr(value)) + ' AND T.coinTypeID=M.coinTypeID AND M.nickname="' + str(nickname) + '" ' \
                            'ORDER BY year ASC'
                c.execute(query)
                info = c.fetchall()

                # Turns data into a json string
                jsonString = '{"values": ['
                for data in info:
                    jsonString += '{"name": "' + data[0] + '", "value": "' + valueLookupInt(data[1]) + '", "years": "' + str(data[2]) + ' ' + str(data[3]) + '", "quantity": "Mintage: ' + "{:,d}".format(data[4]) + '", "note": "Notes: ' + str(data[5]) + '", "image": "' + str(data[6]) + '"},'
                jsonString = jsonString[:-1] + ']'

                jsonString += ',"header": "' + info[0][0] + '"'
                jsonString += '}'

                return jsonify(jsonString), 202
            else:
                return jsonify('{"message": "Invalid level."}'), 404

    except Exception as e:
        print(e, file=sys.stderr)
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
@app.route('/explore/coin/add', methods = ['POST'])
def addCoin():

    if "userID" not in session:
        return jsonify('{"message": "User is not logged in."}'), 404

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

        query = 'INSERT INTO Coins(mintageID, userID, buyDate, buyPrice, grade, notes) VALUES (' \
                    '(SELECT mintageID FROM Mintage M ' \
                        'WHERE M.year="' + year + '" AND M.mint="' + mint + '" AND ' \
                            'M.nickname="' + nickname + '" AND M.value=' + str(valueLookupStr(value)) + ' ' \
                            'AND M.note="' + note + '")' \
                    ', "' + str(session["userID"]) + '", "' + buyDate + '", ' + buyPrice + ', + "' + grade + '", "' + notes + '")'
        print(query, file=sys.stderr)
        c.execute(query)
        conn.commit()

        return jsonify('{"message": "Successfully added coin to collection."}'), 202

    except Exception as e:
        print(e, file=sys.stderr)
        return jsonify('{"message": "' + str(e) + '"}'), 404

# Returns an array of a users personal collection
@app.route('/explore', methods = ['POST', 'GET'])
def explore():

    try:

        # Sets up/connects to DB
        conn = sqlite3.connect('coins.db')
        c = conn.cursor()

        if request.method == 'GET':
            return render_template('index.html')
        else:

            if "userID" not in session:
                return jsonify('{"message": "User is not logged in."}'), 404

            # Gets the level
            # Level 0 - Value List
            # Level 1 - Type List
            # Level 2 - Coin List
            level = request.json["level"]
            value = request.json["value"]
            nickname = request.json["nickname"]

            if level == 0:

                # Gets data
                query = 'SELECT T.value, MIN(T.startYear), MAX(T.endYear), image FROM CoinTypes T, Coins C, Mintage M ' \
                        'WHERE T.coinTypeID=M.coinTypeID AND M.mintageID=C.mintageID AND C.userID=' + str(session["userID"]) + ' ' \
                        'GROUP BY T.value ' \
                        'ORDER BY T.value ASC'
                c.execute(query)
                info = c.fetchall()

                # Turns data into a json string
                jsonString = '{"values": ['
                for data in info:
                    jsonString += '{"name": "", "value": "' + valueLookupInt(data[0]) + '", "years": "' + str(data[1]) + ' - ' + str(data[2]) + '", "image": "' + str(data[3]) + '"},'
                jsonString = jsonString[:-1] + (']', '[]')[jsonString == '{"values": [']

                jsonString += ',"header": "Value"'
                jsonString += '}'

                return jsonify(jsonString), 202

            elif level == 1:

                # Gets data
                query = 'SELECT T.nickname, T.value, T.startYear AS year, T.endYear, T.image FROM CoinTypes T, Coins C, Mintage M ' \
                            'WHERE T.coinTypeID=M.coinTypeID AND T.value=' + str(valueLookupStr(value)) + ' AND C.mintageID=M.mintageID ' \
                                'AND C.userID=' + str(session["userID"]) + ' ' \
                            'GROUP BY T.name ' \
                            'ORDER BY year ASC'
                c.execute(query)
                info = c.fetchall()

                # Turns data into a json string
                jsonString = '{"values": ['
                for data in info:
                    jsonString += '{"name": "' + data[0] + '", "value": "' + valueLookupInt(data[1]) + '", "years": "' + str(data[2]) + ' - ' + str(data[3]) + '", "image": "' + str(data[4]) + '"},'
                jsonString = jsonString[:-1] + (']', '[]')[jsonString == '{"values": [']

                jsonString += ',"header": "' + valueLookupInt(info[0][1]) + '"'
                jsonString += '}'

                return jsonify(jsonString), 202
            elif level == 2:
                # Gets data
                query = 'SELECT M.nickname, M.value, M.year, M.mint, M.note, T.image, C.grade, C.notes FROM Coins C, CoinTypes T, Mintage M ' \
                            'WHERE T.value=' + str(valueLookupStr(value)) + ' AND T.coinTypeID=M.coinTypeID AND C.mintageID=M.mintageID ' \
                                'AND T.nickname="' + str(nickname) + '" AND C.userID=' + str(session["userID"]) + ' ' \
                            'ORDER BY M.year ASC'
                c.execute(query)
                info = c.fetchall()

                # Turns data into a json string
                jsonString = '{"values": ['
                for data in info:
                    jsonString += '{"name": "' + data[0] + '", "value": "' + valueLookupInt(data[1]) + '", "years": "' + str(data[2]) + ' ' + str(data[3]) + '", "image": "' + str(data[5]) + '", "grade": "' + str(data[6]) + '", "note": "Notes: ' + str(data[7]) + '"},'
                jsonString = jsonString[:-1] + (']', '[]')[jsonString == '{"values": [']

                jsonString += ',"header": "' + info[0][0] + '"'
                jsonString += '}'

                return jsonify(jsonString), 202
            else:
                return jsonify('{"message": "Invalid level."}'), 404

    except Exception as e:
        print(e, file=sys.stderr)
        return jsonify('{"message": "' + str(e) + '"}'), 404

# Creates an account for a user
@app.route('/profile/create', methods = ['POST'])
def createAccount():

    try:
        # Sets up/connects to DB
        conn = sqlite3.connect('coins.db')
        c = conn.cursor()

        email = request.json["email"]
        password = request.json["password"].encode()
        firstName = request.json["firstName"]
        lastName = request.json["lastName"]
        birthday = request.json["birthday"]
        joinDate = datetime.date.today().strftime("%y-%m-%d")


        # Check if email is in use already
        if not len(c.execute('SELECT U.email FROM Users U WHERE U.email="' + email + '"').fetchall()) == 0:
            return jsonify('{"message": "Email is in use."}'), 404


        # Hashes the password
        password = bcrypt.hashpw(password, bcrypt.gensalt())

        query = 'INSERT INTO Users (email, password, firstName, lastName, birthday, joinDate) VALUES ("' + email + '","' + str(password.decode()) + '","' + firstName + '","' + lastName + '","' + birthday + '","' + joinDate + '")'
        c.execute(query)
        conn.commit()

        return jsonify('{"message": "Successfully created the account."}'), 202

    except Exception as e:
        print(e, file=sys.stderr)
        return jsonify('{"message": "' + str(e) + '"}'), 404


# Logs a user into their account
@app.route('/profile/login', methods = ['POST'])
def login():

    try:
        # Sets up/connects to DB
        conn = sqlite3.connect('coins.db')
        c = conn.cursor()

        # Gets parameters
        email = request.json["email"]
        password = request.json["password"].encode()

        query = 'SELECT U.userID, U.password FROM Users U WHERE U.email="' + email + '"'
        res = c.execute(query).fetchall()

        if len(res) == 0:
            return jsonify('{"message": "User not found."}'), 404

        userID = res[0][0]
        passwordHash = res[0][1].encode()


        if bcrypt.checkpw(password, passwordHash):

            # Creates a new session
            session["userID"] = userID
            session["email"] = email

            print("Logging in...", file=sys.stderr)
            print(session, file=sys.stderr)

            return jsonify('{"message": "User has been logged in."}'), 202
        else:
            return jsonify('{"message": "Could not login."}'), 404

    except Exception as e:
        print(e, file=sys.stderr)
        return jsonify('{"message": "' + str(e) + '"}'), 404


# Logs a user out of their account
@app.route('/profile/logout', methods = ['POST'])
def logout():
    try:
        # Clears the session
        session.clear()

        print("Logging out...", file=sys.stderr)
        print(session, file=sys.stderr)

        return jsonify('"{message": "User has been logged out."}'), 202
    except Exception as e:
        print(e, file=sys.stderr)
        return jsonify('{"message": "' + str(e) + '"}'), 404


# Checks if a user is logged in
@app.route('/profile/login/check', methods = ['POST'])
def loginCheck():
    try:
        if "userID" in session:
            return jsonify('{"message": "User is logged in.", "loggedIn": true}'), 202
        else:
            return jsonify('{"message": "User is not logged in.", "loggedIn": false}'), 202
    except Exception as e:
        print("error", file=sys.stderr)
        print(e, file=sys.stderr)
        return jsonify('{"message": "' + str(e) + '"}'), 404

@app.route('/test', methods = ['POST', 'GET'])
def test():
    # Sets up/connects to DB
    conn = sqlite3.connect('coins.db')
    c = conn.cursor()
    print('hello world')
    query = 'SELECT COUNT(*) FROM Coins'
    res = c.execute(query).fetchall()
    print(res)



if __name__ == '__main__':
    # Runs the application
    app.run(host=hostName, port=portNumber)
