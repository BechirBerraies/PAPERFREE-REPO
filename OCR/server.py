import cv2 
from PIL import Image
from matplotlib import pyplot as plt
import os
import numpy as np
from methods import display



image_file = "C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\images\\nour.jpg"
img = cv2.imread(image_file)


# print("OpenCV version:", cv2.__version__)


display(image_file)


# 1 INVERT THE IMAGE 
inverted_image = cv2.bitwise_not(img)
cv2.imwrite("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\invertedimage.jpg", inverted_image)
# display("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\invertedimage.jpg")

# 2 BINARISATION 
def grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY )

gray_image = grayscale(img)
cv2.imwrite("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\grayedimage.jpg",gray_image)

# display("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\grayedimage.jpg")

# Blurr 

blur = cv2.GaussianBlur(gray_image,(7,7),0)
cv2.imwrite("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\blur.jpg", blur)
# display("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\blur.jpg")


# THRESH

thresh = cv2.threshold(blur,0,255,cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
cv2.imwrite("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\tresh.jpg",thresh )
# display("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\tresh.jpg")

# KERNAL 

kernal = cv2.getStructuringElement(cv2.MORPH_RECT,(3,13))
cv2.imwrite("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\index_kernal.jpg",kernal)

dilate = cv2.dilate(thresh,kernal, iterations=1  )
cv2.imwrite("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\index_dilate.jpg", dilate)

# display("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\index_dilate.jpg")


# CONTOURS 


contours, _ = cv2.findContours(dilate , cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
min_contour_area = 500
contours = [c for c in contours if cv2.contourArea(c) > min_contour_area]


contours = sorted(contours, key=lambda x: cv2.boundingRect(x)[0])

for c in contours : 
    x,y,w,h = cv2.boundingRect(c)
    aspect_ratio = w / float(h)
    if aspect_ratio < 0.5 or aspect_ratio > 2:
        continue
    
    cv2.rectangle(thresh,(x,y),(x+w , y+h),(36,255,12),2)
cv2.imwrite("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\image_boxes.jpg", thresh)
display("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\image_boxes.jpg")



# IM_BW

thresh, im_bw = cv2.threshold(gray_image, 150 ,  230 , cv2.THRESH_BINARY)
cv2.imwrite("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\im_bw.jpg",im_bw )



# display("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\im_bw.jpg")



# Noise Removal 
def noiseRemoval(image):
    import numpy as np
    kernel = np.ones((1,1), np.uint8)
    image = cv2.dilate(image,kernel,iterations=1)
    kernel = np.ones((1,1), np.uint8)
    image = cv2.erode(image,kernel,iterations=1)
    image = cv2.morphologyEx(image, cv2.MORPH_CLOSE, kernel)
    image = cv2.medianBlur(image, 3 )
    return (image)


no_noise = noiseRemoval(im_bw)
cv2.imwrite("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\no_noise.jpg", no_noise)

# display("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\no_noise.jpg")


#Dilation and Erosion 

def thin_font(image):   
    import numpy as np
    image = cv2.bitwise_not(image)
    kernel = np.ones((2,2),np.uint8)
    image = cv2.erode(image,kernel,iterations=1)
    image = cv2.bitwise_not(image)
    return image



def thick_font(image):   
    import numpy as np
    image = cv2.bitwise_not(image)
    kernel = np.ones((2,2),np.uint8)
    image = cv2.dilate(image,kernel,iterations=1)
    image = cv2.bitwise_not(image)
    return image



dialated_image = thick_font(no_noise)
cv2.imwrite("OCR-Python/tempo/dialated_image.jpg",dialated_image)
# display("OCR-Python/tempo/dialated_image.jpg")



# erroded_image = thin_font(no_noise)
# cv2.imwrite("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\erroded_image.jpg",erroded_image)
# display("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\erroded_image.jpg")

# Rotation or diskewing 


# new = cv2.imread("OCR-Python/images/page_01_rotated.JPG")
# display("OCR-Python/images/page_01_rotated.JPG")


import numpy as np

def getSkewAngle(cvImage) -> float:
    # Prep image, copy, convert to gray scale, blur, and threshold
    newImage = cvImage.copy()
    gray = cv2.cvtColor(newImage, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (9, 9), 0)
    thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

    # Apply dilate to merge text into meaningful lines/paragraphs.
    # Use larger kernel on X axis to merge characters into single line, cancelling out any spaces.
    # But use smaller kernel on Y axis to separate between different blocks of text
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (30, 5))
    dilate = cv2.dilate(thresh, kernel, iterations=2)

    # Find all contours
    contours, hierarchy = cv2.findContours(dilate, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    contours = sorted(contours, key = cv2.contourArea, reverse = True)
    for c in contours:
        rect = cv2.boundingRect(c)
        x,y,w,h = rect
        cv2.rectangle(newImage,(x,y),(x+w,y+h),(0,255,0),2)

    # Find largest contour and surround in min area box
    largestContour = contours[0]
    print (len(contours))
    minAreaRect = cv2.minAreaRect(largestContour)
    cv2.imwrite("OCR-Python/tempo/boxes.jpg", newImage)
    # Determine the angle. Convert it to the value that was originally used to obtain skewed image
    angle = minAreaRect[-1]
    if angle < -45:
        angle = 90 + angle
    return -1.0 * angle
# Rotate the image around its center
def rotateImage(cvImage, angle: float):
    newImage = cvImage.copy()
    (h, w) = newImage.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    newImage = cv2.warpAffine(newImage, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    return newImage


# Deskew image
# def deskew(no_noise):
#     angle = getSkewAngle(no_noise)
#     return rotateImage(no_noise, -1.0 * angle)

# fixed = deskew(no_noise)
# cv2.imwrite("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\fixed_rotation.jpg", fixed)
# display("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\fixed_rotation.jpg")





#Removing Borders 

# display("OCR-Python/tempo/nonoise-image.jpg")

def remove_borders(image):
    contours, heiarchy = cv2.findContours(image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cntsSorted = sorted(contours, key=lambda x:cv2.contourArea(x))
    cnt = cntsSorted[-1]
    x, y, w, h = cv2.boundingRect(cnt)
    crop = image[y:y+h, x:x+w]
    return (crop)

no_borders = remove_borders(no_noise)
cv2.imwrite("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\no_borders.jpg", no_borders)
# display("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\no_borders.jpg")



# Missing Borders 

color = [255, 255, 255]
top, bottom, left, right = [150]*4
image_with_border = cv2.copyMakeBorder(no_borders, top, bottom, left, right, cv2.BORDER_CONSTANT, value=color)
cv2.imwrite("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\image_with_borders.jpg", image_with_border)
# display("C:\\Users\\Lenovo\\Desktop\\Code\\PAPERFREE-REPO\\OCR\\tempo\\image_with_borders.jpg")





