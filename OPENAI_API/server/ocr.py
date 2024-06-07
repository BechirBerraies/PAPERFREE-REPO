from PIL import Image
import pytesseract
import arabic_reshaper
from bidi.algorithm import get_display
import sys
import cv2 
import os




def extract_text_from_image(image_path):
    current_directory = os.path.dirname(os.path.realpath(__file__))
    image_full_path = os.path.join(current_directory, image_path)
    print(image_full_path)
    ocr_result = pytesseract.image_to_string(Image.open(image_full_path), lang='ara')
    reshaped_text = arabic_reshaper.reshape(ocr_result)
    bidi_text = get_display(reshaped_text)
    print("this is biditext "+bidi_text)
    bidi_text_encoded = bidi_text.encode('utf-8')
    print("this is biditext " + bidi_text_encoded.decode('utf-8'))

    return bidi_text_encoded

# Data ="uploads/1717758956283-bechir.jpg"
# extract_text_from_image(Data)