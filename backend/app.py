from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample tasks (in-memory storage)
tasks = []

# Get all tasks
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

# Add a new task
@app.route('/api/tasks', methods=['POST'])
def add_task():
    new_task = request.json
    new_task['id'] = len(tasks) + 1  # Assign an ID to the new task
    tasks.append(new_task)  # Add new task to the list
    return jsonify(new_task), 201

# Delete a task by id
@app.route('/api/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task_to_delete = next((task for task in tasks if task['id'] == id), None)
    if task_to_delete:
        tasks.remove(task_to_delete)
        return jsonify({'message': 'Task deleted successfully'}), 200
    else:
        return jsonify({'error': 'Task not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
