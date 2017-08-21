var os = require('os')
var express = require('express')
var spaceBro = require('spacebro-client')
var app = express()
var moment = require('moment')
var fs = require('fs')
const settings = require('./settings/settings.json')

spaceBro.connect(settings.service.spacebro.host, settings.service.spacebro.port,{
  clientName: os.hostname(),
  channelName: settings.service.spacebro.channelName,
  verbose: true,
  sendBack: false
})

spaceBro.on(settings.service.spacebro.client.in.inMedia.eventName , function (data) {
  let datelog = moment()
  let prefix = '[' + datelog.format('YYYY-MM-DDTHH:mm:ss.SSSZ') + ']'
  
  fs.appendFileSync(settings.folder.logJson, prefix + JSON.stringify(data) + '\n');
})
    
app.use('/', express.static(__dirname));

app.listen(settings.server.port, function() {
  console.log('listening on port: ' + settings.server.port);
});

