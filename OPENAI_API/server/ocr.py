from PIL import Image
import pytesseract
import arabic_reshaper
from bidi.algorithm import get_display
import sys
import os

# Set the default encoding to UTF-8
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# Get the current working directory
current_directory = os.path.dirname(__file__)

# Get the path to the image from the command line arguments
path = sys.argv[1]

# Construct the full path to the image
image_path = os.path.join(current_directory, path)

def GetText(image_path):
    # Perform OCR on the image
    ocr_result = pytesseract.image_to_string(Image.open(image_path), lang='ara')
    # Reshape the Arabic text and apply bidirectional algorithm
    reshaped_text = arabic_reshaper.reshape(ocr_result)
    bidi_text = get_display(reshaped_text)
    return bidi_text

if __name__ == "__main__":
    try:
        print(f"Processing image at {image_path}")
        text = GetText(image_path)
        print(f"Extracted text: {text}")
    except Exception as e:
        print(f"An error occurred: {e}", file=sys.stderr)
        sys.exit(1)