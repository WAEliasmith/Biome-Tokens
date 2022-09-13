import requests
import sys
import json

request = requests.request("GET","https://api.v2.emissions-api.org/api/v2/carbonmonoxide/average.json?country=DE&begin=2022-09-09")

average_emissions = json.loads(request.text)[0]['average']
# print(average_emissions)
sys.stdout.write(str(average_emissions))
sys.exit(0)