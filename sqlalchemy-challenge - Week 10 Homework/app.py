# Importing relevant packages
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Creating engine
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# Declaring Base with automap_base() as database already provided
Base = automap_base()

# Reflecting database tables
Base.prepare(autoload_with=engine)

# Displaying available tables
print(Base.classes.keys())