'use strict';

const electron = require('electron');
const dialog = require('electron').dialog;
const ipc = require('electron').ipcMain;

const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;


function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

ipc.on('open-file-dialog', function(event){
	dialog.showOpenDialog({
		properties: ['openDirectory']
	}, function(files){
		if(files) event.sender.send('selected-directory', files);
	});
});

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400
	});

	win.loadURL(`file://${__dirname}/dist/index.html`);
	win.on('closed', onClosed);
	
	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
