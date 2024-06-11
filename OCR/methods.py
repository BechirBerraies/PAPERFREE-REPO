from PIL import Image
from matplotlib import pyplot as plt




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





