## Tableau Challenge - CitiBike Statistics Report

Contents of repo:
- raw_data.zip: contains raw data from [public CitiBike trip data](https://s3.amazonaws.com/tripdata/index.html).
- clean_data_yearround.csv: the .csv file used for the Tableau visualisations
- stations.csv: the .csv file containing all CitiBike stations with their coordinates (as the coordinates provided in the trip data is inaccurate sometimes)
- data_mod.ipynb: Jupyter Notebook showing how raw data is modified to become clean_data_yearround.csv
- stations.ipynb: Jupyter Notebook showing how the CitiBike stations API call is converted into stations.csv
- README.md - the file you are reading now :p

All analysis is done in the Tableau story linked [here](https://public.tableau.com/app/profile/nicholas.dale/viz/CitiBike-Dec22-to-Nov23/StatStory?publish=yes).

There are two dashboards available with a filter based on months provided:
- Ridership Statistics ([link](https://public.tableau.com/app/profile/nicholas.dale/viz/CitiBike-RidershipStats/RidershipStats?publish=yes))
- Popular Stations ([link](https://public.tableau.com/app/profile/nicholas.dale/viz/CitiBike-PopularStations/StationsandMap?publish=yes))