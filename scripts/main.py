import picamera
import time, os
import datetime as dt
# set working directory and get current datetime
wd = "/var/bismarck/"
current_date = dt.datetime.now().strftime("%c").replace(" ", "_")
# initialize list of existing captures (xor) create working directory
try:
	os.mkdir(wd)
	pass
except OSError:
	pass
# allow the camera to warmup
time.sleep(0.2)
# Recording sequence
with picamera.PiCamera() as camera:
    camera.resolution = (1280, 720)
    camera.framerate = 32
    camera.exposure_mode = 'off'
    camera.start_preview()
    camera.annotate_background = picamera.Color('black')
    camera.annotate_text = dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    tmp_filename = wd + current_date +".h264"
    camera.start_recording(tmp_filename)
    start = dt.datetime.now()
    while (dt.datetime.now() - start).seconds < 1200:
        camera.annotate_text = dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
        camera.wait_recording(0.2)
    camera.stop_recording()