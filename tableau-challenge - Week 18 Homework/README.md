## Tableau Challenge - CitiBike Statistics Report

Contents of repo:
- raw_data.zip: contains raw data from [public CitiBike trip data](https://s3.amazonaws.com/tripdata/index.html).
- clean_data_yearround.csv: the .csv file used for the Tableau visualisations
- stations.csv: the .csv file containing all CitiBike stations with their coordinates (as the coordinates provided in the trip data is inaccurate sometimes)
- data_mod.ipynb: Jupyter Notebook showing how raw data is modified to become clean_data_yearround.csv
- stations.ipynb: Jupyter Notebook showing how the CitiBike stations API call is converted into stations.csv
- README.md - the file you are reading now :p

All analysis is done in the Tableau story linked [here](https://public.tableau.com/app/profile/nicholas.dale/viz/CitiBike-Dec2022-to-Nov2023/StatStory).

![image](https://github.com/falconpunch082/Data-Analysis-Portfolio/assets/26648391/75b94da2-2a5a-4597-b848-1573ba8b94c2)

There are two dashboards available with a filter based on months provided:
- Ridership Statistics ([link](https://public.tableau.com/app/profile/nicholas.dale/viz/CitiBike-RidershipStats/RidershipStats?publish=yes))
  ![image](https://github.com/falconpunch082/Data-Analysis-Portfolio/assets/26648391/274f9e22-6279-45e5-a73f-6bb40523153b)
- Popular Stations ([link](https://public.tableau.com/app/profile/nicholas.dale/viz/CitiBike-PopularStations/StationsandMap?publish=yes))
  ![image](https://github.com/falconpunch082/Data-Analysis-Portfolio/assets/26648391/93053b5c-3f34-484b-8019-975a0a0a3c7c)

