const  express = require('express'),
       app = express(),
       bodyParser = require('body-parser'),
       cors = require('cors');


var mysql      = require('mysql');  
/* var connection = mysql.createConnection({  
  host     : 'localhost',  
  user     : 'root',  
  password : 'Venus#88',  
  database : 'hermes'    
}); */

var conexion = mysql.createPool({
  host     : 'localhost',  
  user     : 'root',  
  password : 'Venus#88',  
  database : 'hermes'
})

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/marcas', function (req, res) {
  //connection.connect();  

  conexion.query('SELECT * FROM marcas', function(err, rows, fields)   
  {  
      //connection.end();

      if (err) throw err;  

      res.json(rows); 

  });
  
});

app.get('/usuarios', (req,res) => {
  conexion.query('SELECT * FROM usuarios', (err, resultados, campos) => {
    if (err) {
      res.status(500).json({
        message: 'error al traer los usuarios',
        err
      })
      throw err;
    }
    res.json(resultados);
  })
})

app.listen(3000, function () {
  console.log('Esta vivo');
});
      