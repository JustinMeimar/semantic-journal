from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import json
import os
import openai

from quantify_goals import *

data_dir = "data"
if not os.path.exists(data_dir):
    os.makedirs(data_dir)


app = Flask(__name__)
CORS(app, resources={r"/*" : {"origins":"http://localhost:3000"}})

@app.route('/')
def index():
    return "hello"

def create_goal(goal, metrics):

    request_data = request.get_json()
    new_goal = {
        "goal": goal,
        "metrics": metrics, 
        "journals": []
    }
    goals_file_path = os.path.join(data_dir, 'goal.json')
    with open(goals_file_path, 'w') as file:
        json.dump(new_goal, file, indent=4)

@app.route('/gen_metrics', methods=['POST'])
def gen_metrics():

    request_data = request.get_json()

    if 'goal' not in request_data:
        return jsonify({"error": "Invalid request data"}), 400

    goal = request_data['goal']

    # seif generate metrics function here

    metrics = {
        "metric-1": "mock metric",
        "metric-2": "mock metric",
        "metric-3": "mock metric"
    }
    
    create_goal(goal, metrics)
    
    return jsonify(metrics)

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

    # TODO: properly implement the GPT stuff
    # nums = get_nums(convos, request_data['content'])
    nums = [7, 8, 9]
    existing_journal = next((item for item in goal_data['journals'] if item['date'] == request_data['date']), None)

    if existing_journal:
        existing_journal['content'] = request_data['content']
        existing_journal['quantities'] = nums
    else:
        new_journal_entry = {
            "date": request_data['date'],
            "content": request_data['content'],
            "quantities": nums
        }
        goal_data['journals'].append(new_journal_entry)

    with open(goals_file_path, 'w') as file:
        json.dump(goal_data, file, indent=4)

    return jsonify({"message": "Journal updated successfully" if existing_journal else "Journal added successfully"})

@app.route('/get_journals', methods=['GET'])
def get_journals():
    goals_file_path = os.path.join(data_dir, 'goal.json')

    if os.path.isfile(goals_file_path):
        with open(goals_file_path, 'r') as file:
            goal_data = json.load(file)
        return jsonify(goal_data.get('journals', []))
    else:
        return jsonify({"error": "Goal not found"}), 404


@app.route('/send_message', methods=['POST'])
def send_message():
    request_data = request.get_json()

    if 'message' not in request_data:
        return jsonify({"error": "Invalid request data"}), 400
    # request["message"]   holds data being sent
    # connect to API TODO



    return jsonify({"message": "Send data"})

@app.route('/get_message', methods=["GET"])
def get_message():
    # stub function, add chat functionality

    return jsonify({"message": "textData"})


if __name__ == '__main__':
    app.run(debug=True)