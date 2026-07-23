import os
import json
from deep_translator import GoogleTranslator

def traducir_json_data(data, translator):
    """Recorre recursivamente el JSON y traduce solo los valores de tipo texto."""
    if isinstance(data, dict):
        return {key: traducir_json_data(value, translator) for key, value in data.items()}
    elif isinstance(data, list):
        return [traducir_json_data(item, translator) for item in data]
    elif isinstance(data, str):
        return translator.translate(data) if data.strip() else data
    return data

def traducir_carpeta(carpeta_origen: str, source_lang: str = "en", target_lang: str = "es"):
    """
    Traduce todos los archivos .json de una carpeta y guarda los resultados en 
    una nueva carpeta con el sufijo del idioma destino.
    """
    # Crear el nombre de la nueva carpeta (ej: "mi_carpeta_es")
    carpeta_destino = f"{carpeta_origen.rstrip('/\\')}_{target_lang}"
    os.makedirs(carpeta_destino, exist_ok=True)
    
    # Inicializar el traductor
    translator = GoogleTranslator(source=source_lang, target=target_lang)
    
    # Listar los archivos de la carpeta
    archivos = [f for f in os.listdir(carpeta_origen) if f.endswith('.json')]
    
    if not archivos:
        print(f"No se encontraron archivos .json en '{carpeta_origen}'.")
        return

    print(f"Traduciendo {len(archivos)} archivo(s) a '{target_lang}'...")

    for archivo in archivos:
        ruta_entrada = os.path.join(carpeta_origen, archivo)
        ruta_salida = os.path.join(carpeta_destino, archivo)
        
        try:
            # Cargar JSON
            with open(ruta_entrada, "r", encoding="utf-8") as f:
                contenido = json.load(f)
            
            # Traducir contenido
            contenido_traducido = traducir_json_data(contenido, translator)
            
            # Guardar en la nueva carpeta
            with open(ruta_salida, "w", encoding="utf-8") as f:
                json.dump(contenido_traducido, f, ensure_ascii=False, indent=2)
                
            print(f"  ✓ Traducido: {archivo} -> {os.path.join(carpeta_destino, archivo)}")
            
        except Exception as e:
            print(f"  ✗ Error al procesar {archivo}: {e}")

    print(f"\n¡Proceso completado! Archivos guardados en: {carpeta_destino}")

# Ejemplo de uso:
traducir_carpeta("output", target_lang="es")