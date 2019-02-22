const http = require('http');
const app = require('./backend/app');

/********************************************/
/*   # Port                                */
/******************************************/
const PORT = process.env.PORT || '3000';
app.set('port', PORT);

/********************************************/
/*   # Server                              */
/******************************************/
const server = http.createServer(app);

/********************************************/
/*   # Listen                              */
/******************************************/
const onListening = () => {
  console.log(
`
 ***********************************
 *   Server running on port ${PORT}   *
 ***********************************
`
  );
}
server.on('listening', onListening);
server.listen(PORT);
