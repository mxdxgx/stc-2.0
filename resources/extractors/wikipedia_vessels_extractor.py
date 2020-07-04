from wikitables import import_tables
import json, os

vessels = import_tables("List_of_Star_Trek_Starfleet_starships_ordered_by_class")

classes = ["Akira class ",
           "Ambassador class ",
           "Andromeda class ",
           "Antares class ",
           "Apollo class ",
           "Archer class ",
           "Bradbury class ",
           "Centaur class ",
           "Challenger class ",
           "Cheyenne class ",
           "Chimera class ",
           "Columbia class ",
           "Constellation class ",
           "Constitution class ",
           "Constitution class refit",
           "Daedalus class ",
           "Defiant class ",
           "Deneva class ",
           "Dreadnought class ",
           "Einstein class ",
           "Erewhon class ",
           "Excelsior class ",
           "Freedom class ",
           "Galaxy class ",
           "Galen class ",
           "Hokulea class ",
           "Intrepid class ",
           "Istanbul class ",
           "Korolev class ",
           "Luna class ",
           "Mediterranean class ",
           "Merced class ",
           "Merian class ",
           "Miranda class ",
           "Mulciber class ",
           "Nebula class ",
           "New Orleans class ",
           "Niagara class ",
           "Norway class ",
           "Nova class ",
           "NX class ",
           "Oberth class ",
           "Odyssey class ",
           "Olympic class ",
           "Prometheus class ",
           "Renaissance class ",
           "Rigel class ",
           "Saber class ",
           "Sequoia class ",
           "Sovereign class ",
           "Soyuz class ",
           "Springfield class ",
           "Starship class ",
           "Steamrunner class ",
           "Surak class ",
           "Sydney class ",
           "Theophrastus class ",
           "Universe class ",
           "Vesta class ",
           "Wambundu class ",
           "Wells class ",
           "Yorkshire class ",
           "Zodiac class ",
           "Undetermined class ",
           "Danube class ",
           "Peregrine class ",
           "Yellowstone class ",
           "Auxiliary ships "]

index = 0
vessel = []
for table in vessels:
    for ves in json.loads(table.json()):

        individual_ship = dict()
        individual_ship["class"] = classes[index]

        if "Registry" not in ves:
            individual_ship["name"] = ves["Name"]
            individual_ship["Mothership"] = ves["Mothership"]
            individual_ship["Description"] = ves["Depiction"]
        else:
            individual_ship["Name"] = ves["Name"]
            individual_ship["Registry"] = ves["Registry"]
            individual_ship["Description"] = ves["Depiction"]

        vessel.append(individual_ship)
        del individual_ship
    index = index + 1

vessel_path = os.path.join("jsonModels", "vessels.json")
with open(vessel_path, "w") as vessel_file:
    json.dump(vessel, vessel_file)
