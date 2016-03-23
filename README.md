# Your cheap remote control with Nodejs and Arduino
This is an arduino simple project to control your pc over IR remote control (its simulated a common notebook remote control)

# Hardware

TODO: put fritzing schematic here

# Software
1. Upload the ```sketch/sketch.ino``` to your Arduino
2. In ```mappedKeys.json``` put the control remote code as object key (like FFA857, if you dont know your remote control codes, use Arduino serial monitor and press keys and copy the console output or run the app and any key that's not mapped in ```mappedKeys.json``` will be in the console output) then put the keyboard key (like right, enter, escape, etc) as object value
3. ```npm install```
4. ```node remoteControl.js [--port=YOUR_ARDUINO_COM_PORT]```
5. Have fun :)

NOTES:
* If you dont pass the ```--port``` option it will use the first detected COM port (all ports are listed with no --port option)
