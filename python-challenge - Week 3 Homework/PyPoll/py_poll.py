# importing necessary packages
import os
import csv

# declaring and initialising variables + creating candidate dictionary
t_votes = 0
candidates = {}
winner = ""
winner_votes = 0
csvpath = os.path.join("Resources", "election_data.csv")
    
# opening election_data.csv for program
with open(csvpath, newline = '') as d:
    
    # creating a new list with the .csv file
    csvreader = csv.reader(d)
    header = next(csvreader)
    data = list(csvreader)
    
    # iterating through each datapoint
    for voter in data:
        
        # adding one to total votes
        t_votes += 1
        
        # adding votes if candidate object exists, and making a new one before if not
        c_name = voter[2]
        
        # most likely an candidate will not exist first time, so we will be expecting a KeyError exception
        try:
            candidates[c_name]["votes"] += 1
        except KeyError:
             candidates[c_name] = {"votes": int(0), "percentage" : int(0)}
             candidates[c_name]["votes"] += 1
             
    for candidate in candidates:
        percentage = (float(candidates[candidate]["votes"]) / t_votes) * 100
        percentage_rounded = round(percentage, 3)
        candidates[candidate]["percentage"] = float(percentage_rounded)
            
 # creating readable results in terminal and in a file
with open("election_results.txt", "w") as results:         
    
    # determining winner
    for candidate in candidates:
        if candidates[candidate]["votes"] > winner_votes:
            winner = candidate
            winner_votes = candidates[candidate]["votes"]
        else:
            continue
    
    # terminal print
    print("Election Results")
    print("-----------------------")
    print("Total Votes: " + str(t_votes))
    print("-----------------------")

    for candidate in candidates:
        print(candidate + ": " + str(candidates[candidate]["percentage"]) + "% (" + str(candidates[candidate]["votes"]) + ")")
        
    print("-----------------------")
    print("Winner: " + winner)
    print("-----------------------")
    
    # results file creation
    results.write("Election Results \n")
    results.write("----------------------- \n")
    results.write("Total Votes: " + str(t_votes) + "\n")
    results.write("----------------------- \n")

    for candidate in candidates:
        results.write(candidate + ": " + str(candidates[candidate]["percentage"]) + "% (" + str(candidates[candidate]["votes"]) + ") \n")

    results.write("----------------------- \n")
    results.write("Winner: " + winner + "\n")
    results.write("----------------------- \n")