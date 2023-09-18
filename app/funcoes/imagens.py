import numpy as np
import matplotlib.pyplot as plt

def display_image(img_array):
    if img_array.ndim != 3:
        img_array = img_array.reshape(img_array.shape[0], img_array.shape[1], 1)
    num_slices = img_array.shape[2]
    for i in range(num_slices):
        plt.figure()
        plt.imshow(img_array[:,:,i], cmap='gray')
        plt.axis('off') 
    plt.show()