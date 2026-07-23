from pathlib import Path
import json

from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
from io import StringIO

import pandas as pd


def normalize(text: str) -> str:
    return " ".join(text.strip().lower().split())


def get_html(url: str) -> str:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        page = browser.new_page(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/138.0.0.0 Safari/537.36"
            ),
            locale="en-US",
        )

        page.goto(url, wait_until="networkidle", timeout=60000)

        html = page.content()

        browser.close()

        return html


def scrape_ffqa_table(url: str):
    html = get_html(url)

    soup = BeautifulSoup(html, "html.parser")

    results = []

    for table in soup.select("table.ffaq"):
        
        try:
            html = StringIO(str(table))

            df = pd.read_html(
                html,
                header=0,
                keep_default_na=False
            )[0]
        except Exception as e:
            print(type(e).__name__, e)
            continue


        # Normalizar nombres de columnas
        df.columns = [normalize(str(col)) for col in df.columns]

        # 1. Definimos los alias permitidos para cada campo
        COLUMN_ALIASES = {
            "rank": ["rank"],
            "name": ["name", "ability"],
            "description": ["description", "effect"]
        }

        def obtener_nombre_columna(df_columns, posibles_nombres):
            """Devuelve la primera columna del DataFrame que coincida con la lista de posibles nombres."""
            for col in posibles_nombres:
                if col in df_columns:
                    return col
            return None

        # --- DENTRO DE TU BUCLE/CÓDIGO ---

        # Mapeamos los campos a las columnas reales presentes en el DataFrame
        col_rank = obtener_nombre_columna(df.columns, COLUMN_ALIASES["rank"])
        col_name = obtener_nombre_columna(df.columns, COLUMN_ALIASES["name"])
        col_desc = obtener_nombre_columna(df.columns, COLUMN_ALIASES["description"])

        # Verificamos que se haya encontrado al menos una columna válida para cada uno de los 3 campos
        if not (col_rank and col_name and col_desc):
            continue  # No se encontraron todas las columnas necesarias en este DataFrame

        for _, row in df.iterrows():
            val_name = str(row[col_name]).strip()
            if not val_name or val_name.lower() == "nan":
                continue
                
            item = {
                "rank": str(row[col_rank]).strip(),
                "ability": {
                    "name": val_name,
                    "description": str(row[col_desc]).strip()
                }
            }

            if "requirement" in df.columns:
                requirement = str(row["requirement"]).strip()
                if requirement:
                    item["requirement"] = requirement

            results.append(item)

    return results


def scrape_pages(pages: dict[str, str], output_dir="output"):

    output_dir = Path(output_dir)
    output_dir.mkdir(exist_ok=True)

    for name, url in pages.items():

        print(f"Scrapeando {name}...")

        try:

            data = scrape_ffqa_table(url)

            with (output_dir / f"{name}.json").open(
                "w",
                encoding="utf-8",
            ) as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

            print(f"  -> {len(data)} filas")

        except Exception as e:
            print(f"Error en {name}")


if __name__ == "__main__":

    BASE_URL = "https://gamefaqs.gamespot.com/ps4/260936-persona-5-royal/faqs/82334/"

    pages = {
        "0-fool": BASE_URL + "fool-igor",
        "1-magician": BASE_URL + "magician-morgana",
        "2-priestess": BASE_URL + "priestess-makoto-nijima",
        "3-empress": BASE_URL + "empress-haru-okumura",
        "4-emperor": BASE_URL + "emperor-yusuke-kitagawa",
        "5-hierophant": BASE_URL + "hierophant-sojiro-sakura",
        "6-lovers": BASE_URL + "lovers-ann-takamaki",
        "7-chariot": BASE_URL + "chariot-ryuji-sakomoto",
        "8-justice": BASE_URL + "justice-goro-akechi-spoiler-alert",
        "9-hermit": BASE_URL + "hermit-futaba-sakura",
        "10-fortune": BASE_URL + "wheel-of-fortune-chihaya-mifune",
        "11-strength": BASE_URL + "strength-caroline-and-justine",
        "12-hanged_man": BASE_URL + "hanged-man-munehisa-iwai",
        "13-death": BASE_URL + "death-tae-takami",
        "14-temperance": BASE_URL + "temperance-sadayo-kawakami",
        "15-devil": BASE_URL + "devil-ichiko-ohya",
        "16-tower": BASE_URL + "tower-shinya-oda",
        "17-star": BASE_URL + "star-hifumi-togo",
        "18-moon": BASE_URL + "moon-yuuki-mishima",
        "19-sun": BASE_URL + "sun-toranosuke-yoshida",
        "20-judgement": BASE_URL + "judgement-sae-nijima-spoiler-alert",
        "21-faith": BASE_URL + "faith-yoshizawa-spoiler-alert",
        "22-councilor": BASE_URL + "councilor-takuto-maruki",
    }

    scrape_pages(pages)