from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

data_dir = "data"
if not os.path.exists(data_dir):
    os.makedirs(data_dir)

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "hello"

@app.route('/add_journal', methods=['POST'])
def add_journal():
    request_data = request.get_json()

    if 'date' not in request_data or 'content' not in request_data:
        return jsonify({"error": "Invalid request data"}), 400

    goals_file_path = os.path.join(data_dir, 'goal.json')
    
    if os.path.isfile(goals_file_path):
        with open(goals_file_path, 'r') as file:
            goal_data = json.load(file)
    else:
        return jsonify({"error": "Goal not found"}), 404

    new_journal_entry = {
        "date": request_data['date'],
        "content": request_data['content']
    }
    goal_data['journals'].append(new_journal_entry)

    with open(goals_file_path, 'w') as file:
        json.dump(goal_data, file, indent=4)

    return jsonify({"message": "Journal added successfully"})


@app.route('/get_journals', methods=['GET'])
def get_journals():
    goals_file_path = os.path.join(data_dir, 'goal.json')

    if os.path.isfile(goals_file_path):
        with open(goals_file_path, 'r') as file:
            goal_data = json.load(file)
        return jsonify(goal_data.get('journals', []))
    else:
        return jsonify({"error": "Goal not found"}), 404

@app.route('/create_goal', methods=['POST'])
def create_goal():
    request_data = request.get_json()

    if 'metrics' not in request_data or not isinstance(request_data['metrics'], list):
        return jsonify({"error": "Invalid or missing 'metrics' in request"}), 400

    new_goal = {
        "goal": request_data.get("goal", "unnamed-goal"),
        "metrics": request_data['metrics'],
        "journals": []
    }

    goals_file_path = os.path.join(data_dir, 'goal.json')
    with open(goals_file_path, 'w') as file:
        json.dump(new_goal, file, indent=4)

    return jsonify({"message": "Goal data saved successfully"})

if __name__ == '__main__':
    app.run(debug=True)