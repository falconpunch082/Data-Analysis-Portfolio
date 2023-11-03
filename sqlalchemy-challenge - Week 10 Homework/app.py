# Importing necessary packages
import sqlalchemy
import datetime as dt
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify

# Creating engine
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# Reflecting existing database
Base = automap_base()
Base.prepare(autoload_with=engine)

# Saving references to each table
Station = Base.classes.station
Measurement = Base.classes.measurement

# Creating session
session = Session(engine)

# Creating an app
app = Flask(__name__)

# Creating home route displaying all available routes
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    return (
        f"Welcome to the Hawaii Temperature and Precipitation API! <br/>"
        f"Available routes: <br/>"
        f"- Static routes <br/>"
        f"/api/v1.0/precipitation -> provides all precipitation data from database <br/>"
        f"/api/v1.0/stations -> provides list of weather stations in Hawaii <br/>"
        f"/api/v1.0/tobs -> provides date and temperature observations from most active station from previous year <br/>"
        f"- Variable routes (dates should be in YYYY-MM-DD format) <br/>"
        f"/api/v1.0/(start_date) -> once a start date is determined, provides minimum, average and maximum temperature from that date to latest date <br/>"
        f"/api/v1.0/(start_date)/(end_date) -> once a start and end date are determined, provides minimum, average and maximum temperature from start to end date <br/>"
    )

# Creating preciptiation page
@app.route("/api/v1.0/precipitation")
def precipitation():
    print("Server received request for 'Precipitation' page...")

    query = dict(session.query(Measurement.date, Measurement.prcp).all())

    return jsonify(query)

# Creating list of stations
@app.route("/api/v1.0/stations")
def station():
    print("Server received request for 'Stations' page...")

    query = dict(session.query(Station.station, Station.name).all())

    return jsonify(query)

# Creating temperature summary
@app.route("/api/v1.0/tobs")
def tobs():
    print("Server received request for 'tobs' page...")

    recent_date = dt.date(2017, 8, 23)
    query_date = recent_date - dt.timedelta(days=365)

    query = dict(session.query(Measurement.date, Measurement.tobs).\
                            filter(Measurement.station == 'USC00519281').filter(Measurement.date >= query_date).all())

    return jsonify(query)

# Creating variable start date temperature summary
@app.route("/api/v1.0/<start>")
def start_summ(start):
    print("Server received request for 'summary-start' page...")

    # Using string and splitting them into different parts to feed into dt.date
    start_details = start.split(sep="-")

    query_date = dt.date(int(start_details[0]), int(start_details[1]), int(start_details[2]))

    tmin = session.query(func.min(Measurement.tobs)).\
                            filter(Measurement.date >= query_date).first()[0]
    
    tavg = session.query(func.avg(Measurement.tobs)).\
                            filter(Measurement.date >= query_date).first()[0]
    
    tmax = session.query(func.max(Measurement.tobs)).\
                            filter(Measurement.date >= query_date).first()[0]
    
    result = {'tmin': tmin, 'tavg': tavg, 'tmax': tmax}

    print(result)

    return jsonify(result)

# Creating variable start date to end date temperature summary
@app.route("/api/v1.0/<start>/<end>")
def start_end_summ(start, end):
    print("Server received request for 'summary-start-end' page...")

    # Using string and splitting them into different parts to feed into dt.date
    start_details = start.split(sep="-")
    end_details = end.split(sep='-')

    start_date = dt.date(int(start_details[0]), int(start_details[1]), int(start_details[2]))
    end_date = dt.date(int(end_details[0]), int(end_details[1]), int(end_details[2]))

    tmin = session.query(func.min(Measurement.tobs)).\
                            filter(Measurement.date >= start_date).filter(Measurement.date <= end_date).first()[0]
    
    tavg = session.query(func.avg(Measurement.tobs)).\
                            filter(Measurement.date >= start_date).filter(Measurement.date <= end_date).first()[0]
    
    tmax = session.query(func.max(Measurement.tobs)).\
                            filter(Measurement.date >= start_date).filter(Measurement.date <= end_date).first()[0]
    
    result = {'tmin': tmin, 'tavg': tavg, 'tmax': tmax}

    print(result)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
