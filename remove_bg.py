from PIL import Image

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def remove_color(image_path, output_path, target_color_hex, tolerance=40):
    target_color = hex_to_rgb(target_color_hex)
    img = Image.open(image_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        # Check if the pixel color is close to the target color
        if all(abs(item[i] - target_color[i]) <= tolerance for i in range(3)):
            new_data.append((255, 255, 255, 0)) # fully transparent
        elif sum(item[:3]) > 250*3:
            # Also remove pure white if it exists around it
            new_data.append((255, 255, 255, 0)) 
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

remove_color("static/logo.png", "static/logo.png", "#f3d759", tolerance=30)
remove_color("static/logo.webp", "static/logo.webp.png", "#f3d759", tolerance=30)
