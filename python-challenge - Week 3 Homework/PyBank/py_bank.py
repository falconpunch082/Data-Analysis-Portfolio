# Importing necessary packages
import csv
import os

# Declaring and initialising necessary variables outside of context manager for future use
t_months = 0
t_budget = 0
avg = 0
previous_amount = 0
change = 0
inc_date = str("")
inc_amount = 0
dec_date = str("")
dec_amount = 0
csvpath = os.path.join('Resources', 'budget_data.csv')

# Opening budget_data.csv for program
with open(csvpath, newline = '') as d:

    # Creating a new list using the .csv file
    csvreader = csv.reader(d)
    header = next(csvreader)
    data = list(csvreader)

    # Calculating total months -> number of rows
    for date in data:
        t_months += 1

    # Calculating net amount and avg -> iterating through each row
    for date in data:
        t_budget = t_budget + int(date[1])
    
    avg = t_budget / t_months

    # calcuating greatest increase and decrease in profits -> for loop with conditonals
    for date in data:

        change = int(date[1]) - int(previous_amount)

        if int(change) > int(inc_amount):
            inc_date = date[0]
            inc_amount = change
            previous_amount = date[1]
            # continue because data can only be either highest amount or lowest amount
            continue
        elif int(change) < int(dec_amount):
            dec_date = date[0]
            dec_amount = change
            previous_amount = date[1]
            continue
        else:
            # continue because we still want to iterate through the dataset
            previous_amount = date[1]
            continue

# creating a new file containing results
with open('py_bank_results.txt', 'w') as results:
    # rounding average for better readability
    round_avg = round(avg, 2)
    
    # terminal print
    print("Financial analysis")
    print("------------------------------")
    print("Total months: " + str(t_months))
    print("Total: $" + str(t_budget))
    print("Average change: $" + str(round_avg))
    print("Greatest increase in profits: " + inc_date + " (" + str(inc_amount) + ")")
    print("Greatest decrease in profits: " + dec_date + " (" + str(dec_amount) + ")")
    
    # file write
    results.write("Financial analysis \n")
    results.write("------------------------------ \n")
    results.write("Total months: " + str(t_months) + "\n")
    results.write("Total: $" + str(t_budget) + "\n")
    results.write("Average change: $" + str(round_avg) + "\n")
    results.write("Greatest increase in profits: " + inc_date + " (" + str(inc_amount) + ")" + "\n")
    results.write("Greatest decrease in profits: " + dec_date + " (" + str(dec_amount) + ")" + "\n")