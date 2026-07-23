import json
from pathlib import Path

# Rutas
# Carpeta donde está el script
SCRIPT_DIR = Path(__file__).resolve().parent

# Raíz del proyecto (subimos un nivel desde .tools)
PROJECT_ROOT = SCRIPT_DIR.parent

base_path = PROJECT_ROOT / "src" / "data" / "es" / "confidents"
input_file = base_path / "confidents-list.json"

print(input_file)  # Para comprobar la ruta

with input_file.open("r", encoding="utf-8") as f:
    confidents = json.load(f)

# Generar archivos
for confident in confidents:
    output_dir = base_path / (confident["id"] + ".json")

    output_data = {
        **confident,
        "gifts": [""],
        "ranks": [
            {
                "number": i,
                "options": [""],
                "ability": {
                    "name": "",
                    "description": ""
                }
            }
            for i in range(1, 11)
        ]
    }

    with output_dir.open("w", encoding="utf-8") as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    print(f"Generado: {output_dir}")