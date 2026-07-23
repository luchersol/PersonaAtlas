from pathlib import Path
import fitz  # Importa PyMuPDF

# Obtiene las rutas dinámicas del proyecto
TOOLS_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = TOOLS_DIR.parent
PUBLIC_DIR = PROJECT_ROOT / "public"

def convert_svg_to_png(svg_name, output_name, size):
    svg_path = PUBLIC_DIR / svg_name
    output_path = PUBLIC_DIR / output_name

    # Abre el SVG vectorial
    doc = fitz.open(svg_path)
    page = doc[0]

    # Calcula la escala para obtener la dimensión exacta deseada en px
    rect = page.rect
    zoom_x = size / rect.width
    zoom_y = size / rect.height
    mat = fitz.Matrix(zoom_x, zoom_y)

    # Renderiza el SVG a un mapa de bits (PixMap) con transparencia
    pix = page.get_pixmap(matrix=mat, alpha=True)
    
    # Guarda como PNG
    pix.save(output_path)
    doc.close()
    
    print(f"Generado con éxito: {output_path} ({size}x{size}px)")

# Ejecuta la conversión
convert_svg_to_png("favicon.svg", "icon-192.png", 192)
convert_svg_to_png("favicon.svg", "icon-512.png", 512)