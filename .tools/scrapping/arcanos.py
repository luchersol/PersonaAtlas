import os
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin


BASE_URL = "https://megamitensei.fandom.com/es/wiki/Arcano"
OUTPUT_FOLDER = "arcana_images"

headers = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": (
        "text/html,application/xhtml+xml,"
        "application/xml;q=0.9,image/webp,*/*;q=0.8"
    ),
    "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
    "Referer": "https://www.google.com/"
}

def get_page(url):

    title = url.split("/wiki/")[1]

    api_url = (
        "https://megamitensei.fandom.com/es/api.php"
        "?action=parse"
        "&format=json"
        "&prop=text"
        f"&page={title}"
    )

    response = requests.get(
        api_url,
        headers=headers
    )

    if response.status_code != 200:
        raise Exception(
            f"API error {response.status_code}"
        )

    data = response.json()

    html = data["parse"]["text"]["*"]

    return BeautifulSoup(html, "lxml")



def clean_filename(name):

    name = re.sub(
        r'[\\/*?:"<>|]',
        "",
        name
    )

    return name.lower().strip()

def get_arcana_links():

    soup = get_page(BASE_URL)

    arcana_links = {}

    # Busca tablas
    tables = soup.find_all("table")

    for table in tables:

        rows = table.find_all("tr")

        for row in rows:

            columns = row.find_all("td")

            # Necesitamos la primera columna
            if not columns:
                continue

            first_column = columns[1]

            link = first_column.find("a")

            if link and link.get("href"):

                name = link.get_text(strip=True)

                url = urljoin(
                    BASE_URL,
                    link["href"]
                )

                arcana_links[name] = url


    return arcana_links



def get_arcana_images(url):

    soup = get_page(url)

    images = []

    # Solo imágenes con clase thumbimage
    for img in soup.select("img.thumbimage"):

        src = (
            img.get("data-src")
            or img.get("src")
        )

        if not src:
            continue

        src = urljoin(url, src)

        images.append(src)


    return list(set(images))



def download_image(url, folder, arcana_name):

    os.makedirs(
        folder,
        exist_ok=True
    )

    filename = clean_filename(
        arcana_name
    )

    filename += ".png"

    path = os.path.join(
        folder,
        filename
    )


    if os.path.exists(path):
        return


    r = requests.get(
        url,
        headers=headers,
        timeout=20
    )

    if r.status_code == 200:

        with open(
            path,
            "wb"
        ) as f:
            f.write(r.content)

        print(
            "Guardada:",
            path
        )


def main():

    print("Buscando Arcanos...")

    arcana = get_arcana_links()

    print(f"Encontrados {len(arcana)} arcanos")


    for name, url in arcana.items():

        print("\nProcesando:", name)

        images = get_arcana_images(url)

        print(f"{len(images)} imágenes encontradas")


        if images:
            download_image(
                images[0],
                OUTPUT_FOLDER,
                name
            )

if __name__ == "__main__":
    main()