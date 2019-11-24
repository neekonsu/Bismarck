from picamera.array import PiRGBArray
from picamera import PiCamera
import time, os, datetime
picamera = PiCamera()
# set working directory and get current datetime
wd = "/var/bismarck/"
current_date = datetime.datetime.now().strftime("%c").replace(" ", "_")
# initialize list of existing captures (xor) create working directory
try:
	os.mkdir(wd)
	pass
except OSError:
	pass
# allow the camera to warmup
time.sleep(0.2)
# Recording sequence
with picamera as camera:
    camera.resolution = (1280, 720)
    camera.framerate = 32
    camera.start_preview()
    camera.annotate_background = picamera.Color('black')
    camera.annotate_text = dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    camera.start_recording('%s.h264', current_date)
    start = dt.datetime.now()
    while (dt.datetime.now() - start).seconds < 3600:
        camera.annotate_text = dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        camera.wait_recording(0.2)
    camera.stop_recording()
