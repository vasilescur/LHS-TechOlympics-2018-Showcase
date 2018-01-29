import serial
import time
import sys

import requests

ser = serial.Serial('COM5', 115200)

while 1:
    serial_line = ser.readline().decode()

    #* sys.stdout is intercepted by NodeJS
    print(serial_line[49:55])

    sys.stdout.flush()
    time.sleep(1)

ser.close()