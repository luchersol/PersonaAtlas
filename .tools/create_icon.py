# .tools/create_icon.py
import sys
import os
import base64
from PIL import Image, ImageDraw, ImageFont

# ─── CONFIGURACIÓN DINÁMICA DE TUS WIKIS ───────────────────────────────────
WIKI_CONFIGS = {
    "p4g": {
        "path": "wikis/persona-4-golden/public/logo.png",
        "bg_color": (255, 215, 0, 255),       # Amarillo brillante (P4G)
        "text_color": (30, 30, 30, 255),       # Gris oscuro/Negro
        "stroke_color": (255, 255, 255, 255),  # Borde blanco de letras
        "stroke_width": 5,                     # Grosor de borde de letras
        "border_color": (30, 30, 30, 255),     # Resalte/Borde del rectángulo (Gris oscuro)
        "fonts": ["p4g-font.ttf", "coopbl.ttf", "comicbd.ttf", "Cooper Black"]
    },
    "p5": {
        "path": "wikis/persona-5-royal/public/logo.png",
        "bg_color": (218, 0, 0, 255),          # Rojo intenso (P5R)
        "text_color": (255, 255, 255, 255),    # Blanco
        "stroke_color": (0, 0, 0, 255),        # Borde Negro estilo Punk
        "stroke_width": 6,                     # Grosor de borde de letras
        "border_color": (255, 255, 255, 255),  # Resalte/Borde del rectángulo (Blanco contraste)
        "fonts": ["p5r-font.ttf", "impact.ttf", "Impact", "Arial Black"]
    },
    "p3r": {
        "path": "wikis/persona-3-reload/public/logo.png",
        "bg_color": (0, 131, 202, 255),       # Azul agua (P3R)
        "text_color": (255, 255, 255, 255),    # Blanco
        "stroke_color": (0, 30, 90, 255),      # Borde Azul Marino profundo
        "stroke_width": 4,                     # Grosor de borde de letras
        "border_color": (255, 255, 255, 255),  # Resalte/Borde del rectángulo (Blanco)
        "fonts": ["p3-font.ttf", "arialbd.ttf", "trebucbd.ttf", "Arial Bold"]
    }
}

DEFAULT_CONFIG = {
    "path": "",
    "bg_color": (0, 102, 204, 255),
    "text_color": (255, 255, 255, 255),
    "stroke_color": (0, 0, 0, 255),
    "stroke_width": 4,
    "border_color": (255, 255, 255, 255),
    "fonts": ["arial.ttf", "Arial"]
}
# ───────────────────────────────────────────────────────────────────────────

def load_smart_font(font_list, size):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    local_fonts_dir = os.path.join(script_dir, "fonts")

    for font_name in font_list:
        if font_name.lower().endswith(('.ttf', '.otf')):
            local_path = os.path.join(local_fonts_dir, font_name)
            if os.path.exists(local_path):
                try:
                    return ImageFont.truetype(local_path, size)
                except IOError:
                    pass 
    try:
        return ImageFont.load_default(size=size)
    except TypeError:
        return ImageFont.load_default()

def create_wiki_assets(base_image_path, config):
    if not os.path.exists(base_image_path):
        print(f"Error: Image not found at {base_image_path}")
        sys.exit(1)
        
    # 1. Abrir imagen base (512x512)
    base = Image.open(base_image_path).convert("RGBA")
    base = base.resize((512, 512), Image.Resampling.LANCZOS)
    
    # 2. Crear capa para la etiqueta y el texto
    text_layer = Image.new("RGBA", base.size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(text_layer)
    
    # Cargar la fuente en un tamaño idóneo para la pastilla (Tamaño 42)
    font = load_smart_font(config["fonts"], 42)
    
    # 3. CÁLCULO DEL TAMAÑO DEL TEXTO PARA ADAPTAR EL RECTÁNGULO
    bbox = draw.textbbox((0, 0), "Wiki", font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Definimos los márgenes internos (padding) de la pastilla
    padding_x = 24
    padding_y = 16
    
    # Calculamos las dimensiones del rectángulo basándonos en el tamaño real del texto
    rect_width = text_width + (padding_x * 2)
    rect_height = text_height + (padding_y * 2)
    
    # Posicionamos la pastilla abajo a la derecha dejando un margen de 20px con los bordes del lienzo
    x1 = 512 - 20
    y1 = 512 - 20
    x0 = x1 - rect_width
    y0 = y1 - rect_height
    
    # 4. DIBUJAR RECTÁNGULO CON RESALTE (Efecto de contorno/relieve)
    # Dibujamos un rectángulo exterior ligeramente más grande en todas las direcciones (3 píxeles de grosor)
    grosor_resalte = 3
    draw.rounded_rectangle(
        [x0 - grosor_resalte, y0 - grosor_resalte, x1 + grosor_resalte, y1 + grosor_resalte], 
        radius=14, 
        fill=config["border_color"]
    )
    
    # Dibujamos el rectángulo interior del color temático del juego
    draw.rounded_rectangle([x0, y0, x1, y1], radius=12, fill=config["bg_color"])
    
    # 5. CENTRAR EL TEXTO DENTRO DE LA PASTILLA RESALTADA
    center_x = (x0 + x1) / 2
    center_y = (y0 + y1) / 2
    
    text_x = center_x - (text_width / 2)
    text_y = center_y - (text_height / 2) - (bbox[1] / 2) # Compensación de margen interno tipográfico
        
    # Dibujar las letras con su borde marcado tal y como querías
    draw.text(
        (text_x, text_y), 
        "Wiki", 
        fill=config["text_color"], 
        font=font,
        stroke_width=config["stroke_width"],
        stroke_fill=config["stroke_color"]
    )
    
    # Combinar todo
    final_image = Image.alpha_composite(base, text_layer)
    
    # Rutas de salida
    folder_dir = os.path.dirname(base_image_path)
    ico_path = os.path.join(folder_dir, "favicon.ico")
    svg_path = os.path.join(folder_dir, "favicon.svg")
    temp_png_path = os.path.join(folder_dir, "favicon_temp.png")
    
    # 6. Guardar archivos
    final_image.save(ico_path, format="ICO", sizes=[(16,16), (32,32), (48,48), (256,256)])
    print(f"✨ ICO successfully created at: {ico_path}")
    
    final_image.save(temp_png_path, format="PNG")
    with open(temp_png_path, "rb") as png_file:
        encoded_png = base64.b64encode(png_file.read()).decode('utf-8')
    os.remove(temp_png_path)
    
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,{encoded_png}" x="0" y="0" width="512" height="512" />
</svg>'''
    
    with open(svg_path, "w", encoding="utf-8") as svg_file:
        svg_file.write(svg_content)
    print(f"✨ SVG successfully created at: {svg_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: npm run icon <wiki_shortcut_or_path>")
        sys.exit(1)
        
    argument = sys.argv[1]
    
    if argument in WIKI_CONFIGS:
        selected_config = WIKI_CONFIGS[argument]
        target_path = selected_config["path"]
        print(f"Mapping shortcut '{argument}' with highlighted rectangle and enhanced typography.")
    else:
        target_path = argument
        selected_config = DEFAULT_CONFIG
        print("Using manual path with default theme.")

    create_wiki_assets(target_path, selected_config)