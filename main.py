from flask import Flask, jsonify, request, render_template
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)


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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9990, debug=True)  # Run the app