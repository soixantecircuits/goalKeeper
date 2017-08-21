var os = require('os')
var express = require('express')
var spaceBro = require('spacebro-client')
var app = express()
var moment = require('moment')
var fs = require('fs')

spaceBro.connect('127.0.0.1', 8888,{
  clientName: os.hostname(),
  channelName: 'galaxy',
  verbose: true,
  sendBack: false
})

spaceBro.on('unsent-mail', function (data) {
  let datelog = moment()
  let prefix = '[' + datelog.format('YYYY-MM-DDTHH:mm:ss.SSSZ') + ']'
  
  fs.appendFileSync('log.json', prefix + JSON.stringify(data) + '\n');
  console.log('unsent-mail has been received')
})
    
app.use('/', express.static(__dirname));

app.listen(8987, function() {
  console.log('listening on port: 8987');
});

