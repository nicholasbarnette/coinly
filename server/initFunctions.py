import json, sys
import time, datetime

# Sets up the coin database
def initCoinDB():
    filename = './static/coins.json'

    query = "INSERT INTO Coins(year, mint, name, nickname, value, quantity) VALUES "

    try:
        if filename:
            print("Opening file:", filename)
            with open(filename, 'r') as f:
                data = json.load(f)
            print("Building insert query...")

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

            print("Insert query ready...")
            return query[:-2]
        else:
            print("Could not open file:", filename)
            return ''
    except Exception as e:
        printErr(e)
        return ''



# Prints errors
def printErr(e):
    exc_type, exc_obj, exc_tb = sys.exc_info()
    print("Error: Line", exc_tb.tb_lineno, "-", datetime.datetime.fromtimestamp(int(time.time())).strftime('%Y-%m-%d %H:%M:%S'), "--", e)