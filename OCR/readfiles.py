from PIL import Image
import pytesseract
import cv2 
from methods import display
from matplotlib import pyplot as plt
import arabic_reshaper
from bidi.algorithm import get_display




Carte = "C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\no_noise.jpg"





# display(Carte)
ocr_result = pytesseract.image_to_string(Image.open(Carte), lang='ara')
reshaped_text = arabic_reshaper.reshape(ocr_result)
bidi_text = get_display(reshaped_text)
print(bidi_text)




