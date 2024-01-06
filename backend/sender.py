import requests
import time

CreateUrl = 'http://127.0.0.1:5000/create_journal_entry'
RemoveUrl = 'http://127.0.0.1:5000/remove_journal_entry'

# JSON data to be sent in the POST request
json_data = {'file_name': '11-11-24'}

# Sending the POST request with JSON data
response = requests.post(CreateUrl, json=json_data)
time.sleep(5)
response = requests.post(RemoveUrl, json=json_data)

# Print the response from the server
print(response.text)