const express = require('express');
const app = express();
const { proxy } = require('rtsp-relay')(app);

const handler1 = proxy({
  //url: `rtsp://admin:admin@10.0.1.2:554/feed`,
  //url: `rtsp://202.50.121.42/live/ch00_0`,
  url:`rtsp://116.197.222.158/live/ch00_0`,
   //url:`rtsp://tester:AsDfJkL-1234@clawcam.thddns.net:9773/cam/realmonitor?channel=1&subtype=0`, 
  // if your RTSP stream need credentials, include them in the URL as above
  verbose: false,
 
  });

const handler2 = proxy({
  url: `rtsp://195.46.114.132/live/ch00_0`,
  verbose: false,
})

const handler3 = proxy({
  url: `rtsp://192.162.98.201/live/ch00_0`,
  verbose: false,
})



// the endpoint our RTSP uses
app.ws('/api/stream1', handler1)
app.ws('/api/stream2', handler2)
app.ws('/api/stream3', handler3)

// this is an example html page to view the stream
app.get('/', (req, res) =>

  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>RTSP IP Camera Streaming Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>
<body>
<div class="container">
<div class="row">
  <div class="col-sm-2"></div>
  <div class="col-sm-8">
     <canvas id='canvas1' style="display:block;width:100%;height:100%;"></canvas>
  <script>
   $(document).ready(function(){
      $('#canvas1').click(function(){
            setTimeout(function(){ 
             window.location.href = '/cam2'
            }, 1000);
      })

   })
  </script>

  <script src='https://cdn.jsdelivr.net/gh/phoboslab/jsmpeg@9cf21d3/jsmpeg.min.js'></script>
  <script>
    new JSMpeg.Player('wss://' + location.host + '/api/stream1', {
      canvas: document.getElementById('canvas1')
      
    })
    
  </script>
  </div>
  <div class="col-sm-2"></div>
  </div>
  
  </body>
  </html>
`),


);
app.get('/cam2', (req, res) =>
 

  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>
<body>
  <div class="container">
<div class="row">
  <div class="col-sm-2"></div>
  <div class="col-sm-8">
  <canvas id='canvas1' style="display:block;width:100%;height:100%;"></canvas>
  <script>
   $(document).ready(function(){
      $('#canvas1').click(function(){
            setTimeout(function(){ 
             window.location.href = '/'
            }, 1000);
      })

   })
  </script>
  <script src='https://cdn.jsdelivr.net/gh/phoboslab/jsmpeg@9cf21d3/jsmpeg.min.js'></script>
  <script>
    
    new JSMpeg.Player('wss://' + location.host + '/api/stream2', {
      canvas: document.getElementById('canvas1')
      
    })
  </script>
  </div>
  <div class="col-sm-2"></div>
  </div>
  </body>
  </html>
`),


);

app.get('/cam3', (req, res) =>
 

  res.send(`
  
  <canvas id='canvas1' style="display:block;width:60%;height:60%;"></canvas>

  <script src='https://cdn.jsdelivr.net/gh/phoboslab/jsmpeg@9cf21d3/jsmpeg.min.js'></script>
  <script>
    
    new JSMpeg.Player('ws://' + location.host + '/api/stream3', {
      canvas: document.getElementById('canvas1')
      
    })
  </script>
`),


);

console.log("Server Start on port: 8000")
app.listen(process.env.PORT||8000);
