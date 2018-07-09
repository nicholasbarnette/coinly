import json, sys
import time, datetime

# Sets up the coin database
def initCoinDB():
    filename = './static/coins.json'

    query = "INSERT INTO Mintage(coinTypeID, year, mint, name, nickname, value, quantity, note) VALUES "
    query2 = "INSERT INTO CoinTypes(coinTypeID, name, nickname, value, startYear, endYear, image) VALUES "

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
                    id = data[val][type]["id"]
                    name = data[val][type]["name"]
                    nickname = data[val][type]["nickname"]
                    value = data[val][type]["value"]
                    coins = data[val][type]["coins"]
                    startYear = data[val][type]["startYear"]
                    endYear = data[val][type]["endYear"]
                    img = data[val][type]["image"]

                    query2 += "(" + str(id) + ",'" + name + "','" + nickname + "'," + str(value) + ","+ str(startYear) + ","+ str(endYear) + ",'" + img + "'), "

                    # Adds each coin to the query
                    for coin in coins:
                        note = ''
                        if "note" in coin:
                            note = coin["note"]
                        query += '(' + str(id) + ', ' + str(coin["year"]) + ',"' + coin["mint"] + '","' + name + '","' + nickname + '",' + str(value) + ',' + str(coin["quantity"]) + ', "' + note + '"), '

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
def valueLookupInt(val):
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

# Takes a string and converts it to an integer
def valueLookupStr(val):
    val = str.lower(val)
    if val == "pennies":
        return 1
    elif val == "nickels":
        return 5
    elif val == "half dimes":
        return 7
    elif val == "dimes":
        return 10
    elif val == "quarters":
        return 25
    elif val == "half dollars":
        return 50
    elif val == "dollars":
        return 100



# Takes an integer and converts it to a string
def gradeLookupInt(g):
    if g == 0:
        return 'Not Graded'
    elif g == 1:
        return 'Ungradeable'
    elif g == 2:
        return 'PO-1'
    elif g == 3:
        return 'FR-2'
    elif g == 4:
        return 'AG-3'
    elif g == 5:
        return 'G-4'
    elif g == 6:
        return 'G-6'
    elif g == 7:
        return 'VG-8'
    elif g == 8:
        return 'VG-10'
    elif g == 9:
        return 'F-12'
    elif g == 10:
        return 'F-15'
    elif g == 11:
        return 'VF-20'
    elif g == 12:
        return 'VF-25'
    elif g == 13:
        return 'VF-30'
    elif g == 14:
        return 'VF-35'
    elif g == 15:
        return 'XF-40'
    elif g == 16:
        return 'XF-45'
    elif g == 17:
        return 'AU-50'
    elif g == 18:
        return 'AU-53'
    elif g == 19:
        return 'AU-55'
    elif g == 20:
        return 'AU-58'
    elif g == 21:
        return 'MS/PR-60'
    elif g == 22:
        return 'MS/PR-61'
    elif g == 23:
        return 'MS/PR-62'
    elif g == 24:
        return 'MS/PR-63'
    elif g == 25:
        return 'MS/PR-64'
    elif g == 26:
        return 'MS/PR-65'
    elif g == 27:
        return 'MS/PR-66'
    elif g == 28:
        return 'MS/PR-67'
    elif g == 29:
        return 'MS/PR-68'
    elif g == 30:
        return 'MS/PR-69'
    elif g == 31:
        return 'MS/PR-70'

# Takes a string and converts it to an integer
def gradeLookupStr(g):
    g = str.lower(g)
    if g == 'Not Graded':
        return 0
    elif g == 'Ungradeable':
        return 1
    elif g == 'PO-1':
        return 2
    elif g == 'FR-2':
        return 3
    elif g == 'AG-3':
        return 4
    elif g == 'G-4':
        return 5
    elif g == 'G-6':
        return 6
    elif g == 'VG-8':
        return 7
    elif g == 'VG-10':
        return 8
    elif g == 'F-12':
        return 9
    elif g == 'F-15':
        return 10
    elif g == 'VF-20':
        return 11
    elif g == 'VF-25':
        return 12
    elif g == 'VF-30':
        return 13
    elif g == 'VF-35':
        return 14
    elif g == 'XF-40':
        return 15
    elif g == 'XF-45':
        return 16
    elif g == 'AU-50':
        return 17
    elif g == 'AU-53':
        return 18
    elif g == 'AU-55':
        return 19
    elif g == 'AU-58':
        return 20
    elif g == 'MS/PR-60':
        return 21
    elif g == 'MS/PR-61':
        return 22
    elif g == 'MS/PR-62':
        return 23
    elif g == 'MS/PR-63':
        return 24
    elif g == 'MS/PR-64':
        return 25
    elif g == 'MS/PR-65':
        return 26
    elif g == 'MS/PR-66':
        return 27
    elif g == 'MS/PR-67':
        return 28
    elif g == 'MS/PR-68':
        return 29
    elif g == 'MS/PR-69':
        return 30
    elif g == 'MS/PR-70':
        return 32
