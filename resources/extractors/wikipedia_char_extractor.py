from wikitables import import_tables
import json, os

chars = import_tables("List_of_Star_Trek_characters")
personnages = []

table = chars[1]
all = table.json()
alls = json.loads(all)
for a in alls:
    if "Actor" not in a:
        continue
    individual = dict()
    individual["name"] = a["Character"]
    individual["actor"] = a["Actor"]
    individual["rank"] = a["Rank"]
    individual["posting"] = a["Posting"]
    individual["position"] = a["Position"]
    individual["species"] = a["Species"]
    individual["appearances"] = a["Appearances"]

    personnages.append(individual)
    del individual

char_path = os.path.join("..", "jsonModels", "characters.json")
with open(char_path, "w") as char_file:
    json.dump(personnages, char_file)
