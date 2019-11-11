from __future__ import print_function
import cv2 as cv
import numpy as np
import argparse
import time
import random
from pylsl import StreamInfo, StreamOutlet

# intiialize LSL stream
info = StreamInfo('Pupil-Coordinates', '(X,Y)', 2, 100, 'float32', 'myuid34234')
outlet = StreamOutlet(info)

# init video object
vidObj = cv.VideoCapture("1.mp4")

# resize window
cv.namedWindow('image', cv.WINDOW_NORMAL)
cv.resizeWindow('image', 720,1280)

# capture frames from the camera
def detectAndDisplay(frame):
    frame_gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    frame_gray = cv.equalizeHist(frame_gray)
    #-- Detect faces
    eyes = eyes_cascade.detectMultiScale(frame_gray)
    eye_center = (0,0)
    for (x2,y2,w2,h2) in eyes:
        eye_center = (x2 + w2//2, y2 + h2//2)
        radius = int(round((w2 + h2)*0.25))
        frame = cv.circle(frame, eye_center, radius, (255, 0, 0 ), 4)
        print(eye_center)
    cv.imshow('Capture - Face detection', frame)
    return(eye_center)

parser = argparse.ArgumentParser(description='Code for Cascade Classifier tutorial.')
parser.add_argument('--eyes_cascade', help='Path to eyes cascade.', default='data/haarcascades/haarcascade_eye_tree_eyeglasses.xml')
parser.add_argument('--camera', help='Camera divide number.', type=int, default=0)
args = parser.parse_args()
eyes_cascade_name = args.eyes_cascade
eyes_cascade = cv.CascadeClassifier()

#-- 1. Load the cascades
if not eyes_cascade.load(cv.samples.findFile(eyes_cascade_name)):
    print('--(!)Error loading eyes cascade')
    exit(0)

#-- 2. Read the video stream
# Used as counter variable 
count = 0
# checks whether frames were extracted 
success = 1

while success: 
    # vidObj object calls read 
    # function extract frames 
    success, image = vidObj.read() 
    # Saves the frames with frame-count
    if image is None:
        print('--(!) No captured frame -- Break!')
        break
    
    if cv.waitKey(1) == ord('q'):
       break
    outlet.push_sample(detectAndDisplay(image))
    detectAndDisplay(image)