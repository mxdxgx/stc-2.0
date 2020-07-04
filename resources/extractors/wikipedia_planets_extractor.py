import wikipedia
import json
import os
from bs4 import BeautifulSoup

pages = [
    "List_of_Star_Trek_planets_(A–B)",
    "List_of_Star_Trek_planets_(C-F)",
    "List_of_Star_Trek_planets_(G-L)",
    "List_of_Star_Trek_planets_(M-Q)",
    "List_of_Star_Trek_planets_(R-S)",
    "List_of_Star_Trek_planets_(T-Z)"
]

planets = []
i = 1
for select_page in pages:
    page = wikipedia.page(select_page)
    html = page.html()
    soup = BeautifulSoup(html, "lxml")

    letter_list_len = len(
        [x.text for x in soup.find_all("span", {"class": "mw-headline"}) if x.text and len(x.text) == 1])

    if select_page == "List_of_Star_Trek_planets_(G-L)" or select_page == "List_of_Star_Trek_planets_(M-Q)" or select_page == "List_of_Star_Trek_planets_(R-S)" or select_page == "List_of_Star_Trek_planets_(T-Z)":
        letter_list_len = len(soup.find_all("p"))
        for k in range(1, letter_list_len):
            if "List of Star Trek planets" in soup.find_all("p")[k].text:
                continue
            planet = dict()
            planet_name, separator, description = soup.find_all("p")[k].text.partition("–")

            planet["name"] = planet_name
            planet["description"] = description
            planets.append(planet)

else:
    ul_list = soup.find_all("ul")
    for ul_tag in range(1, letter_list_len + i):
        for li_elem in ul_list[ul_tag].find_all("li"):
            planet = dict()
            planet_name, separator, description = li_elem.text.partition("–")
            planet["name"] = planet_name
            planet["description"] = description
            planets.append(planet)
    i = i + 1

planet_path = os.path.join("..", "jsonModels", "planets.json")
with open(planet_path, "w") as planet_file:
    json.dump(planets, planet_file)
