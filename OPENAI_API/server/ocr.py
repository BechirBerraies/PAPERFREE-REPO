from PIL import Image
from bidi.algorithm import get_display # type: ignore
import sys
import os
from methods import preprocess_image 
from methods import perform_ocr
from methods import display





def main():
    
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')


    path = sys.argv[1]
    current_directory = os.path.dirname(__file__)
    image_path = os.path.join(current_directory, path)


    # image_path=r"C:\Users\Lenovo\Desktop\Code\PAPERFREE-REPO\OPENAI_API\server\uploads\nour.jpg"

    # Preprocess the image
    processed_image = preprocess_image(image_path)
    # Perform OCR
    ocr_result = perform_ocr(processed_image)

    
    

    
    print( ocr_result )
    return ocr_result 


if __name__ == "__main__":
    main()