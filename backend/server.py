from flask import Flask, jsonify, abort
import json

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


@app.route('/get', methods=["GET"])
def index():

    with open("data.json", "r") as f:
        data = json.load(f)

        return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)