import os, json


def get_serie_from_race():
    race_path = os.path.join("..", "..", "resources", "jsonModels", "races.json")
    r_file = open(race_path, "r")
    race_json = json.loads(r_file.read())
