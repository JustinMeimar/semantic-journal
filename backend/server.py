from flask import Flask, jsonify, abort, request
import json
import os

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, Flask!'

def retrieve_journal_entry(date):
    try:  
        with open(date) as f:
            return f
    except:
        return None

@app.route('/get-journal/<date>', methods=['GET'])
def get_journal(date):
    try:
        _year, month, day = map(int, date.split('-'))
        assert 1 <= month <= 12 and 1 <= day <= 31

        journal_entry = retrieve_journal_entry(date)

        if not journal_entry:
            pass # create journal entry

        return jsonify(journal_entry)
    
    except (ValueError, AssertionError):
        abort(400, description="Invalid date format. Please use YYYY-MM-DD.")

@app.route('/startup')
def startup():
    try:
        os.mkdir("journals")
        return "Success"
    except Exception as e:
        return "failed, Existing Folder"

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