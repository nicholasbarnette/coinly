from flask import Flask, render_template
import sqlite3, json
import time, datetime
import sys


app = Flask(__name__, static_folder='../static/dist', template_folder='../static')
conn = sqlite3.connect('coins.db')

c = conn.cursor()

# Prints errors
def printErr(e):
    exc_type, exc_obj, exc_tb = sys.exc_info()
    print("Error: Line", exc_tb.tb_lineno, "-", datetime.datetime.fromtimestamp(int(time.time())).strftime('%Y-%m-%d %H:%M:%S'), "--", e)


# Sets up the coin database
def initCoinDB():
    filename = './static/coins.json'

    query = "INSERT INTO Coins(year, mint, name, nickname, value, quantity) VALUES "

    try:
        if filename:
            print("Opening file:", filename)
            with open(filename, 'r') as f:
                data = json.load(f)
            print("Inserting data...")

            # Iterates through the dimes
            for type in data["dimes"]:

                # Sets coins information
                name = data["dimes"][type]["name"]
                nickname = data["dimes"][type]["nickname"]
                value = int(data["dimes"][type]["value"]) / 100
                coins = data["dimes"][type]["coins"]

                # Adds each coin to the query
                for coin in coins:
                    query += "(" + str(coin["year"]) + ",'" + coin["mint"] + "','" + name + "','" + nickname + "'," + str(value) + "," + str(coin["quantity"]) + "), "


            return query[:-2]
        else:
            print("Could not open file:", filename)
            return ''
    except Exception as e:
        printErr(e)
        return ''




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


    query = initCoinDB()
    c.execute(query)
    conn.commit()


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
                firstName TEXT,
                lastName TEXT,
                birthday TEXT,
                joinDate TEXT
            )
    	''')

except sqlite3.Error as e:
    printErr(e)


@app.route('/')
def index():
    return render_template('index.html')



if __name__ == '__main__':
    app.run()
