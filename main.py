from flask import Flask, render_template, jsonify, request
from geopy.distance import geodesic
import pandas as pd
from data_processing import get_data

app = Flask(__name__)

data = get_data()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ship_type/<int:mmsi>', methods=['GET'])
def get_ship_type(mmsi):
    ship_data = data[data['MMSI'] == mmsi]
    if ship_data.empty:
        return jsonify({'error': 'Ship not found'}), 404
    
    ship_type = ship_data['Ship type'].iloc[0]
    return jsonify({'ship_type': ship_type})

@app.route('/trajectory/<int:mmsi>', methods=['GET'])
def get_trajectory(mmsi):
    ship_data = data[data['MMSI'] == mmsi]
    if ship_data.empty:
        return jsonify({'error': 'Ship not found'}), 404
    
    trajectory = ship_data[['Time', 'Latitude', 'Longitude']].to_dict(orient='records')
    return jsonify(trajectory)

@app.route('/trajectory_length/<int:mmsi>', methods=['GET'])
def get_trajectory_length(mmsi):
    ship_data = data[data['MMSI'] == mmsi]
    if ship_data.empty:
        return jsonify({'error': 'Ship not found'}), 404
    
    total_distance = 0.0
    previous_point = None
    
    for index, row in ship_data.iterrows():
        current_point = (row['Latitude'], row['Longitude'])
        if previous_point:
            total_distance += geodesic(previous_point, current_point).kilometers
        previous_point = current_point
    
    return jsonify({'trajectory_length': total_distance})

if __name__ == '__main__':
    app.run(debug=True)
