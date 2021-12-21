const { app, BrowserWindow, Menu, Tray }   = require('electron');

app.setAppUserModelId('com.ricardo-san.dev-anotacao');

function createWindow(){
    
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    mainWindow.loadFile(__dirname + '/src/index.html');
    mainWindow.on('closed', function() {
        mainWindow = null;
    })

    mainWindow.setMenu(null);

    const contectMenu = Menu.buildFromTemplate([
        {
            label: "Mostrar Aplicativo", click: function() {
                mainWindow.show();
            },
        },

        {
            label: "Fechar", click: function() {
                app.isQuitting = true;
                app.quit();
            },
        }
    ]);

    const tray = new Tray(__dirname + '/notes-icon.png');
    tray.setContextMenu(contectMenu);

    mainWindow.on('close', function(e) {
        if(!app.isQuitting){
            e.preventDefault();
            mainWindow.hide();
        }
    })
}

app.on('ready', createWindow);