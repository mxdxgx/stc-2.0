import time, re

from database.models.Character import Character
from flask_app.flask_app import cache_redis


class Parser(object):
    def __init__(self):
        self.speaker_name_regex = r"([A-Z][A-Z ]*)(?: \[([\w ]+)\])?:"
        self.didascalie_regex = r"\(([^)]+)\)"
        self.room_regex = r"\[(.*?)\]"
        self.personas_name_list = self.get_personas_names()

    def parse_speakers_and_dialogs(self, transcript=None):
        if not transcript:
            raise ValueError("No transcript to parse!")

        matches = re.finditer(self.speaker_name_regex, transcript)
        last_match_begin = None
        last_match_end = None
        dialogs = []
        for matchNum, match in enumerate(matches):
            dialog = dict()
            if last_match_begin:
                dialog["speaker"] = transcript[last_match_begin:last_match_end]
                dialog["text"] = transcript[last_match_end:match.start()]
                dialogs.append(dialog)
            last_match_begin = match.start()
            last_match_end = match.end()

        # Retrieve very last piece of dialog
        dialog = dict()
        dialog["speaker"] = transcript[last_match_begin:last_match_end]
        dialog["text"] = transcript[last_match_end:]
        dialogs.append(dialog)
        return dialogs

    def parse_didascalis(self, dialogs_list):
        if not dialogs_list:
            raise ValueError("No dialogs to parse!")

        for dialog in dialogs_list:
            didascalis = []
            matches = re.finditer(self.didascalie_regex, dialog["text"])
            for matchNum, match in enumerate(matches):
                didascalis.append(match.group())
            dialog["didascalis"] = didascalis
        return dialogs_list

    def parse_rooms(self, dialogs_list):
        if not dialogs_list:
            raise ValueError("No dialogs to parse!")

        for dialog in dialogs_list:
            rooms = []
            matches = re.finditer(self.room_regex, dialog["text"])
            for matchNum, match in enumerate(matches):
                rooms.append(match.group())
            dialog["rooms"] = rooms
        return dialogs_list

    def map_personas(self, fromDatabase, withDialogs):
        pass

    def get_personas_names(self):
        char_name_array = cache_redis.get('personas_name')
        if char_name_array is None:
            chars = Character.query.all()
            char_name_array = []
            for char in chars:
                char_name_array.append(char.name)
            cache_redis.set('personas_name', char_name_array)
        return char_name_array
