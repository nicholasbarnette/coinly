import json, sys
import time, datetime

# Sets up the coin database
def initCoinDB():
    filename = './static/coins.json'

    query = "INSERT INTO Coins(year, mint, name, nickname, value, quantity) VALUES "
    query2 = "INSERT INTO CoinTypes(name, nickname, value, startYear, endYear, image) VALUES "

    try:
        if filename:
            print("Opening file:", filename)
            with open(filename, 'r') as f:
                data = json.load(f)
            print("Building insert query...")

            # Iterates through the different values
            for val in data:

                # Iterates through the types of each value
                for type in data[val]:

                    # Sets coins information
                    name = data[val][type]["name"]
                    nickname = data[val][type]["nickname"]
                    value = data[val][type]["value"]
                    coins = data[val][type]["coins"]
                    startYear = data[val][type]["startYear"]
                    endYear = data[val][type]["endYear"]
                    img = data[val][type]["image"]

                    query2 += "('" + name + "','" + nickname + "'," + str(value) + ","+ str(startYear) + ","+ str(endYear) + ",'" + img + "'), "

                    # Adds each coin to the query
                    for coin in coins:
                        query += "(" + str(coin["year"]) + ",'" + coin["mint"] + "','" + name + "','" + nickname + "'," + str(value) + "," + str(coin["quantity"]) + "), "

            print("Insert query ready...")
            return query[:-2], query2[:-2]
        else:
            print("Could not open file:", filename)
            return '', ''
    except Exception as e:
        printErr(e)
        return '', ''



# Prints errors
def printErr(e):
    exc_type, exc_obj, exc_tb = sys.exc_info()
    print("Error: Line", exc_tb.tb_lineno, "-", datetime.datetime.fromtimestamp(int(time.time())).strftime('%Y-%m-%d %H:%M:%S'), "--", e)


# Takes an integer value and converts it to text
def valueLookup(val):
    if val == 1:
        return "Pennies"
    elif val == 5:
        return "Nickels"
    elif val == 7:
        return "Half Dimes"
    elif val == 10:
        return "Dimes"
    elif val == 25:
        return "Quarters"
    elif val == 50:
        return "Half Dollars"
    elif val == 100:
        return "Dollars"