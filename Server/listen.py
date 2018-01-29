import serial
import time
import sys

import requests

ser = serial.Serial('COM5', 115200)

while 1:
    serial_line = ser.readline().decode()
    #serial_line = '00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 040232........'

    #* sys.stdout is intercepted by NodeJS
    print(serial_line[49:55])

    #student_id_str = serial_line.decode().strip()

    sys.stdout.flush()
    time.sleep(1)

ser.close()