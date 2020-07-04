import json
import os

resources = os.path.join("resources", "transcripts")
transcript_dir = os.listdir(resources)

transcript_series = []
episodes = []

for trans in transcript_dir:
    trans_backup = trans
    episodes = os.listdir(os.path.join(resources, trans))
    serie_obj = dict()
    episodes_array = []
    if trans == "NextGen":
        serie_obj["name"] = "Star Trek: The Next Generation"
    elif trans == "Voyager":
        serie_obj["name"] = "Star Trek: Voyager"
    elif trans == "TOS":
        serie_obj["name"] = "Star Trek: The Original Series"
    elif trans == "DS9":
        serie_obj["name"] = "Star Trek: Deep Space Nine"
    elif trans == "Enterprise":
        serie_obj["name"] = "Star Trek: Enterprise"
    elif trans == "Animated Serie":
        serie_obj["name"] = "Star Trek: The Animated Series"
    else:
        serie_obj['name'] = trans

    for ep in episodes:
        raw_episode_text = open(os.path.join(resources, trans_backup, ep)).read()
        episodes_array.append(open(os.path.join(resources, trans_backup, ep)).read())
    serie_obj["episodes"] = episodes_array
    transcript_series.append(serie_obj)

series = []
serie_obj = dict()
episodes = []

for serie in transcript_series:
    episode_number = 0
    for episode_element in serie["episodes"]:
        episode_obj = dict()
        serie_name = episode_element.split("Transcripts")[0].replace("\n", "").replace("The", "")
        episode_number += 1
        splitted_airdate = episode_element.split("Original Airdate:")
        before_stardate, stardate_, after_stardate = episode_element.partition("Stardate:")
        stardate = after_stardate[:8].replace("\n", "")
        ep_title = before_stardate
        episode_obj["episode_title"] = ep_title.split("-")[1]
        if len(splitted_airdate) > 1:
            airdate_end = splitted_airdate[1].split("Captain's log")[0].split("\n\n\n")
            airdate = airdate_end[0]
        bef, now, pure_text = episode_element.partition("\n\n\n\n\n\n")
        episode_obj["text"] = json.dumps({"text": pure_text})
        episode_obj["serie_name"] = serie["name"]
        episode_obj["number"] = episode_number
        if airdate:
            episode_obj["airdate"] = airdate
        episode_obj["stardate"] = stardate
        episodes.append(episode_obj)
        episode_obj = None

file_path = os.path.join("resources", "jsonModels", "episodes_test.json")

with open(file_path, "w") as episodes_file:
    json.dump(episodes, episodes_file)
