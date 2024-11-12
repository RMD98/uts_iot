from flask import Flask, jsonify, request, render_template
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
stat = 'OFF'  # Initialize the status variable

client = MongoClient('mongodb://localhost:27017/')
db = client['temperatureDB']  # Replace with your database name
collection = db['sensorData']


@app.route('/')
def home():
    return render_template('index.html')  # Render the HTML template

@app.route('/data', methods=['GET'])
def get_data():
    data = {
     'suhumax' : 36,
     'suhumin' : 21,
     'suhurata' : 28.35,
     'nilai_suhu_max_humid_max':[
        {
            'idx' : 101,
            'suhu' : 36,
            'humid' : 36,
            'kecerahan' : 25,
            'timestamp' : '2010-09-18 07:23:48'
        },
        {
            'idx' : 226,
            'suhu' : 36,
            'humid' : 36,
            'kecerahan' : 27,
            'timestamp' : '2011-05-02 12:20:34'
        }
     ],
     'month_year_max' :[
        {'month_year' :'9-2010'},
        {'month_year' :'5-2011'}
     ]
    }
    return jsonify(data)  # Return the data as JSON
# def data():
#     cursor = collection.find({},{'_id':0})
#     data_list = list(cursor)
#     return jsonify(data_list)

@app.route('/api/data', methods=['POST'])
def post_data():
    global stat  # Use the global variable
    content = request.json  # Get the JSON data from the request
    if 'status' in content:
        stat = content['status']  # Update the global status variable
        return jsonify({'message': 'Status updated successfully', 'status': stat}), 200
    else:
        return jsonify({'message': 'Status not provided'}), 400  # Return an error if status is not provided

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9990, debug=True)  # Run the app