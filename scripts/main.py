from picamera.array import PiRGBArray
from picamera import PiCamera
import time, os, datetime, cv2
# set working directory and get current datetime
wd = "/var/bismarck"
curent_date = datetime.datetime.now().strftime("%c").replace(" ", "_")
# initialize the camera and grab a reference to the raw camera capture
camera = PiCamera()
camera.resolution = (1280, 720)
camera.framerate = 32
rawCapture = PiRGBArray(camera, size=camera.resolution)
# initialize list of existing captures (xor) create working directory
try:
	os.mkdir(wd+"/"+curent_date)
except OSError:
	pass
# allow the camera to warmup
time.sleep(0.2)
# capture frames from the camera
for frame in camera.capture_continuous(rawCapture, format="bgr", use_video_port=True):
	# grab the raw NumPy array representing the image, then initialize the timestamp
	# and occupied/unoccupied text
	image = frame.array
	# show the frame
	cv2.imshow("Frame", image)
	key = cv2.waitKey(1) & 0xFF
    push(outlet, image)
	# clear the stream in preparation for the next frame
	rawCapture.truncate(0)
	# if the `q` key was pressed, break from the loop
	if key == ord("q"):
		break