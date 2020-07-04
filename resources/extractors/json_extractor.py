import json
import os
import re

from database.models.Character import Character
from database.models.Dialog import Dialog
from database.models.Episode import Episode
from database.models.Planet import Planet
from database.models.Race import Race
from database.models.Rank import Rank
from database.models.Serie import Serie
from database.models.Unit import Unit
from database.models.Vessel import Vessel
from flask_app.flask_app import db
from resources.transcript_parser.parser import Parser


class JsonExtractor(object):
    def __init__(self):
        pass

    def planets(self):
        planet_path = os.path.join("resources", "jsonModels", "planets.json")
        planet_file = open(planet_path, "r")
        planets = json.loads(planet_file.read(), "utf-8")
        for planet in planets:
            exists = Planet.query.filter_by(name=planet["name"]).first()
            if not exists:
                planet_to_add = Planet(name=planet["name"], description=planet["description"])
                db.session.add(planet_to_add)
                db.session.commit()

    def races(self):
        race_path = os.path.join("resources", "jsonModels", "races.json")
        race_file = open(race_path, "r")
        races = json.loads(race_file.read(), "utf-8")
        for race in races["races"]:
            planet_id = None
            planet, separator, rest = race["description"].partition("Planet:")
            planet_name = rest.split(".")[0]
            if planet_name:
                planet_seek = Planet.query.filter(Planet.name.like('%' + planet_name.strip() + '%')).first()
            if planet_seek:
                planet_id = planet_seek.id
            exists = Race.query.filter_by(name=race["name"]).first()
            if not exists:
                race_to_add = Race(race["name"], race["description"], planet_id)
                db.session.add(race_to_add)
                db.session.commit()

    def series(self):
        serie_path = os.path.join("resources", "jsonModels", "series.json")
        serie_file = open(serie_path, "r")
        series = json.loads(serie_file.read(), "utf-8")
        for serie in series["series"]:
            exists = Serie.query.filter_by(name=serie["name"]).first()
            if not exists:
                tmp = Serie(serie["name"], serie["start_year"], serie["end_year"], serie["acronym"])
                db.session.add(tmp)
                db.session.commit()

    def episodes(self):
        episode_path = os.path.join("resources", "jsonModels", "episodes.json")
        episode_file = open(episode_path, "r")
        episodes = json.loads(episode_file.read(), "utf-8")
        for episode in episodes:
            serie = Serie.query.filter_by(name=episode["serie_name"]).first()
            serie_id = serie.id
            title = episode["episode_title"].split("\n\n\n")[0].strip().lower()
            airdate = episode["airdate"]
            number = episode["number"]
            stardate = episode["stardate"]
            text = episode["text"]

            exists = Episode.query.filter_by(title=title).first()
            if not exists:
                insert_episode = Episode(serie_id, title, text, number, airdate, stardate)
                db.session.add(insert_episode)
                db.session.commit()

    def retrieve_episodes(self):
        eps = Episode.query.all()
        episodes = []
        for episode in eps:
            episode_as_json = dict()
            episode_as_json["id"] = episode.id
            episode_as_json["text"] = episode.text
            episode_as_json["stardate"] = episode.stardate
            episode_as_json["episode_number"] = episode.episode_number
            episode_as_json["airdate"] = episode.airdate
            episode_as_json["title"] = episode.title
            episode_as_json["serie_id"] = episode.serie_id
            episodes.append(episode_as_json)
            del episode_as_json
        return episodes

    def ranks(self):
        ranks = ["Chief of Security", "Chief Engineer", "Crewman", "Ensign", "Lieutenant", "Lieutenant Commander",
                 "Commander", "Captain", "Admiral"]
        for rank in ranks:
            exists = Rank.query.filter_by(name=rank).first()
            if not exists:
                rank_to_add = Rank(str(rank))
                db.session.add(rank_to_add)
                db.session.commit()

    def units(self):
        metric_unit = [
            ("millimeter", "mm"),
            ("centimeter", "cm"),
            ("meter", "m"),
            ("kilometer", "km"),
            ("milligram", "mg"),
            ("gram", "g"),
            ("kilogram", "kg"),
            ("metric ton", "t"),
            ("second", "s"),
            ("degree Celsius", "C"),
            ("square meter", "m2"),
            ("hectare", "ha"),
            ("square kilometer", "km2"),
            ("milliliter", "mL"),
            ("cubic centimeter", "cm3"),
            ("liter", "L"),
            ("cubic meter", "m3"),
            ("meter per second", "m/s"),
            ("kilometer per hour", "km/h"),
            ("kilogram per cubic meter", "kg/m3"),
            ("newton", "N"),
            ("kilopascal", "kPa"),
            ("watt", "W"),
            ("kilowatt", "kW"),
            ("kilojoule", "kJ"),
            ("megajoule", "MJ"),
            ("kilowatt hour", "kW/h"),
            ("ampere", "A")
        ]

        for value in metric_unit:
            k, v = value
            exists = Unit.query.filter_by(name=k).first()
            if not exists:
                unit_to_add = Unit(name=k, symbol=v)
                db.session.add(unit_to_add)
                db.session.commit()

    def characters(self):
        char_path = os.path.join("resources", "jsonModels", "characters.json")
        char_file = open(char_path, "r")
        chars = json.loads(char_file.read(), "utf-8")
        for char in chars:
            specie = char["species"]
            print("############")
            print(specie)
            race = Race.query.filter(Race.name.like('%' + specie + '%')).first()
            planet_id = race.planet_id
            rank_from_json = char["rank"]
            vessel_from_json = char["posting"]
            exists = Character.query.filter_by(name=char["name"]).first()
            if not exists:
                char_to_add = Character(name=char["name"], planet_id=planet_id, rank=rank_from_json, race_id=race.id,
                                        vessel=vessel_from_json)
                db.session.add(char_to_add)
                db.session.commit()

    def vessels(self):
        vessel_path = os.path.join("resources", "jsonModels", "vessels.json")
        vessel_file = open(vessel_path, "r")
        vessels = json.loads(vessel_file.read(), "utf-8")
        for vessel in vessels:
            registry = ""
            if "registry" in vessel:
                registry = vessel["registry"]
            elif "mothership" in vessel:
                registry = vessel["mothership"]
            exists = Vessel.query.filter_by(name=vessel["name"]).first()
            if not exists:
                vessel_to_add = Vessel(name=vessel["name"], registry=registry, description=vessel["description"],
                                       ship_class=vessel["class"])
                db.session.add(vessel_to_add)
                db.session.commit()

    def dialogs(self):
        self.parser = Parser()
        episode_list = self.retrieve_episodes()
        episodes_dialogs = []
        for episode in episode_list:
            episode_dictionnary = dict()
            episode_text = self.get_raw_text_from_episode(episode)
            parsed_episode = self.parser.parse_speakers_and_dialogs(episode_text)
            episode_dictionnary["id"] = episode["id"]
            episode_dictionnary["serie_id"] = episode["serie_id"]
            episode_dictionnary["episode_title"] = episode["title"]
            episode_dictionnary["dialogs"] = parsed_episode
            episodes_dialogs.append(episode_dictionnary)
        return episodes_dialogs

    def didascalis(self, parsed_episodes):
        self.parser = Parser()
        for episode in parsed_episodes:
            episode["dialogs"] = self.parser.parse_didascalis(episode["dialogs"])
        return parsed_episodes

    def parsed_dialogs(self, parsed_episodes):
        for episode in parsed_episodes:
            for dialog in episode["dialogs"]:
                json_didas = dict()
                json_didas["didascalis"] = dialog["didascalis"]

                json_room = dict()
                json_room["rooms"] = dialog["rooms"]
                speaker = dialog["speaker"].replace(":", "")
                print(speaker)
                if speaker.find("[") > 0:
                    pre = speaker.find("[")
                    post = speaker.find("]")

                    speaker = speaker.replace(speaker[pre:post + 1], "")

                speaker = speaker.title().strip()

                char_with_name_like = Character.name.like('%' + speaker + '%')
                character_query_result = Character.query.filter(char_with_name_like)

                char_id = None
                if character_query_result.first():
                    char_id = character_query_result.first().id

                db_dialog = Dialog(character_id=char_id, text=dialog["text"], episode_id=episode["id"], room=json_room,
                                   didascalis=json_didas,
                                   speaker_name=speaker, episode_title=episode["episode_title"],
                                   serie_id=episode["serie_id"])

                db.session.add(db_dialog)
            db.session.commit()

    def rooms(self, parsed_episodes):
        self.parser = Parser()
        for episode in parsed_episodes:
            episode["dialogs"] = self.parser.parse_rooms(episode["dialogs"])
        return parsed_episodes

    def get_raw_text_from_episode(self, episode):
        return json.loads(episode["text"])["text"]
