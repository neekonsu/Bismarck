import cv2
import numpy as np

def firstRectangleParams(box):
    return(int(box[0]),int(box[1]))

def secondRectangleParams(box):
    return(int(box[0]) + int(box[2]),int(box[1]) + int(box[3]))

def imageOperations(frame):
    closing = cv2.morphologyEx(frame, cv2.MORPH_CLOSE, kernel)
    opening = cv2.morphologyEx(closing, cv2.MORPH_OPEN, kernel)
    dilate = cv2.dilate(closing, (5, 5), iterations=1)
    ret, thresh = cv2.threshold(dilate,127,255,cv2.THRESH_BINARY)
    return thresh
    
cap = cv2.VideoCapture('trim.mp4')
fgbg = cv2.createBackgroundSubtractorMOG2(999, detectShadows=True)
kernel = np.ones((25, 25),np.uint8)

multiTracker = cv2.MultiTracker_create()
bboxes = []

params = cv2.SimpleBlobDetector_Params()
    
params.minThreshold = 0
params.maxThreshold = 150

params.filterByArea = True
params.minArea = 15
params.maxArea = 100000
params.filterByCircularity = True
params.filterByInertia = False
params.filterByConvexity = False
params.filterByColor = True
params.blobColor = 0
detector = cv2.SimpleBlobDetector_create(params)

tracker = cv2.TrackerKCF_create()
blobdetect = False 

while(1):
    
    ret, frame = cap.read()
    closing = cv2.morphologyEx(frame, cv2.MORPH_CLOSE, kernel)
    opening = cv2.morphologyEx(closing, cv2.MORPH_OPEN, kernel)
    frame = cv2.dilate(closing, (5, ), iterations=1)

    
    
    fgmask = fgbg.apply(imageOperations(frame), None, -1)

    keypoints = detector.detect(frame)

    bboxes = []

    
    for keypoint in keypoints:
        if keypoint:
            x = int(keypoint.pt[0])
            y = int(keypoint.pt[1])
            s = int(keypoint.size)/2
            bbox = (x-50,y-50,100,100)
            bboxes.append(bbox)
            cv2.rectangle(frame, (x-100,y+100),(x+100,y-100),(255,255,255),3)
            cv2.circle(frame, (int(bbox[0]+bbox[2]/2), int(bbox[1]+bbox[3]/2)), 2, (255,255,255))
            cv2.circle(frame, (x, y), 5, (0,255,0))
            
                

   
    ok, box = tracker.update(frame)
    
    if (blobdetect == False):
       if (len(bboxes) == 1):
           blobdetect = True
           ok = tracker.init(frame, bboxes[0])
                
    else:
        cv2.rectangle(frame,firstRectangleParams(box), secondRectangleParams(box),(255,0,255),3)
        cv2.circle(frame, (int(box[0]+box[2]/2), int(box[1]+box[3]/2)), 2, (255,255,255))

        
        
        #blobdetect = False
    

    cv2.imshow('frame', frame)
    #cv2.imshow('fgmask', fgmask)
    print(bboxes)
    
    
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

cap.release()
cv2.destroyAllWindows()
