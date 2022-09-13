import requests
import sys
import json
import datetime


today = datetime.date.today()
five_days_ago = today - datetime.timedelta(days=5)
request = requests.request("GET","https://api.v2.emissions-api.org/api/v2/carbonmonoxide/average.json?country=DE&begin={}".format(five_days_ago))
print(request.text)
data_points = json.loads(request.text)
sum_emissions = None
for data in data_points:
    if sum_emissions:
        sum_emissions += data["average"]
    else:
        sum_emissions = data["average"]

if sum_emissions:
    average_emissions = sum_emissions/len(data_points)
else:
    average_emissions = "No data"
print(average_emissions)


sys.stdout.write(str(average_emissions))
sys.exit(0)