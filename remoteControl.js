var nodeSerialPort = require("serialport"),
    robotjs = require("robotjs"),
    yargs = require("yargs").argv,
    fs = require("fs"),
    path = require("path");

var SerialPort = nodeSerialPort.SerialPort;
var serialPort, mappedKeys;
var USER_COM_PORT = yargs.port;
if (USER_COM_PORT) {
	if(USER_COM_PORT.toLowerCase().indexOf("com") != -1) {
		createConnection(USER_COM_PORT);
	} else {
		console.log("The --port option must be a COM port. Ex.: --port=COM5");
	}
} else {
	nodeSerialPort.list(onSerialPortList);
}

function onSerialPortList(err, ports) {
	console.log("Creating a Serial port connection");
	if (err) {
		console.log("ERROR listing ports: ", err);
		return;
	}
	console.log("Ports founds: ", ports);
	var COM_PORT_NAME = ports[0].comName;
	console.log("Port selected: ", COM_PORT_NAME);
	createConnection(COM_PORT_NAME);
};

function createConnection(port) {
	console.log("Searching mappedKeys.json file...");
	try {
		fs.accessSync( path.resolve(__dirname, "mappedKeys.json"), fs.R_OK);
	} catch(e) {
		console.log("File not found, create a json file and name it: mappedKeys.json, inside put remote control codes as object keys and keyboard key as object values.");
		process.exit();
	}
	console.log("Loading mappedKeys.json...");
	var content = fs.readFileSync( path.resolve(__dirname, "mappedKeys.json") );
	mappedKeys = JSON.parse(content);
	serialPort = new SerialPort(port, { baudrate: 9600, parser: nodeSerialPort.parsers.readline("\n") });
	serialPort.on("open", onSerialPortOpen);
};

function onSerialPortOpen() {
	console.log("Serial port created");
	console.log("Waiting for data...");
	serialPort.on("data", onSerialPortData);
	function onSerialPortData(data) {
		var key = String(data).trim();
		if ( key in mappedKeys ) {
			robotjs.keyTap( mappedKeys[key].toLowerCase() );
		} else {
			console.log("No mapped key found for: ", key);
		}
	};
};