import os 
import requests
import ast
from dotenv import load_dotenv


load_dotenv
places_api_key = os.environ.get("GOOGLE_PLACES_API_KEY")

def get_place_details(places):
    list_str = places.split("=", 1)[1].strip()
    cafe_list = ast.literal_eval(list_str)
    name = []
    location = []
    for cafe in cafe_list:
        name = cafe
