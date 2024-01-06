from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, Flask!'

@app.route('/create_journal_entry', methods=['POST'])
def create_journal_entry():
    try:
        json_data = request.json
        param_value = json_data.get('file_name')
        file_path = "./journals/" + param_value + ".json"
        with open(file_path, "w") as file:
            file.write("")
        
        return "Succesful Creation"

    except Exception as e:
        return "File Already Exists"


@app.route('/remove_journal_entry', methods=['POST'])
def remove_journal_entry():
    try:
        json_data = request.json
        param_value = json_data.get('file_name')

    except Exception as e:
        return "File Already Exists"

    file_path = "./journals/" + param_value + ".json"
    os.remove(file_path)

    return ""

if __name__ == '__main__':
    app.run(debug=True)