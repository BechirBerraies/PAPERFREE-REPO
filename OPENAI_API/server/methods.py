from PIL import Image
from matplotlib import pyplot as plt
from PIL import Image
import pytesseract
import cv2
import numpy as np
import arabic_reshaper
from bidi.algorithm import get_display
import numpy as np





def display(im_path):
    dpi = 80
    im_data = plt.imread(im_path)
    if len(im_data.shape) == 3:
        height, width, depth = im_data.shape
    else:
        height, width = im_data.shape
        depth = 1  # Grayscale images have a single channel

    # What size does the figure need to be in inches to fit the image?
    figsize = width / float(dpi), height / float(dpi)

    # Create a figure of the right size with one axes that takes up the full figure
    fig = plt.figure(figsize=figsize)
    ax = fig.add_axes([0, 0, 1, 1])

    # Hide spines, ticks, etc.
    ax.axis('off')

    # Display the image.
    ax.imshow(im_data, cmap='gray')

    plt.show()



def preprocess_image(image_path):
    # Load the image
    image = cv2.imread(image_path)
    if image is None:
        print(f"Failed to load image from {image_path}")
        return None


    # 1 INVERT THE IMAGE 
    inverted_image = cv2.bitwise_not(image)
    inverted_path = "temp/invertedimage.png"
    cv2.imwrite(inverted_path, inverted_image)
    display(inverted_path)


    # 2 GRAYED IMAGE 
    gray_image = cv2.cvtColor(inverted_image, cv2.COLOR_BGR2GRAY )
    gray_path = "temp/grayedimage.png"
    cv2.imwrite(gray_path,gray_image)
    display(gray_path)


    # # 3 BLURR IMAGE
    # blur = cv2.GaussianBlur(gray_image,(7,7),0)
    # blur_path = "temp/blurimage.png"
    # cv2.imwrite(blur_path,blur)
    # display(blur_path)

    # 4 THRESH 

    
    _, thresh = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    # thresh = cv2.threshold(gray_path,0,255,cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
    # tresh_path =  "temp/tresh.png"
    # cv2.imwrite(tresh_path,thresh)
    # display(tresh_path)

    # NOISE REMOVAL 
    def noiseRemoval(image):
        kernel = np.ones((1,1), np.uint8)
        image = cv2.dilate(image,kernel,iterations=1)
        kernel = np.ones((1,1), np.uint8)
        image = cv2.erode(image,kernel,iterations=1)
        image = cv2.morphologyEx(image, cv2.MORPH_CLOSE, kernel)
        image = cv2.medianBlur(image, 3 )
        return (image)
    
    # 5 REMOVE NOISE 
    no_noise = noiseRemoval(thresh)
    no_noisepath = "temp/no_noisepath.png"
    cv2.imwrite(no_noisepath,no_noise)
    display(no_noisepath)



    # Deskewing and Rotation Correction
    def deskew(image):
        coords = np.column_stack(np.where(image > 0))
        angle = cv2.minAreaRect(coords)[-1]
        if angle < -45:
            angle = -(90 + angle)
        else:
            angle = -angle
        (h, w) = image.shape[:2]
        center = (w // 2, h // 2)
        M = cv2.getRotationMatrix2D(center, angle, 1.0)
        rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
        return rotated
    
    deskewed_image = deskew(no_noise)

    # Save the processed image
    processed_image_path = "temp/processed_image.png"
    cv2.imwrite(processed_image_path, deskewed_image)

    return no_noisepath








def perform_ocr(image):
    ocr_result = pytesseract.image_to_string(Image.open(image), lang='ara')
    reshaped_text = arabic_reshaper.reshape(ocr_result)
    bidi_text = get_display(reshaped_text)
    return bidi_text


