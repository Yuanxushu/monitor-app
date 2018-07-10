var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    bodyParser = require('body-parser'),
    path = require('path'),
    logger = require('morgan'),
    cors = require('cors'),
    forward = require('http-port-forward')
    //port = 3000,

    broker = require('./broker.js');
//socket = require('./services/socket.js');

broker.connectToBroker();
//socket.startSocketServer(server);

app.use(bodyParser.json()); // parse application/json

// parse application/www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(logger('dev'));
app.use(cors());

var port = process.env.PORT||8000;
app.listen(port);
console.log('Listening on port ',port);
// app.set('port', process.env.PORT || 8000);

// server.listen(app.get('port'), function () {
//     console.log("Listening on port: " + app.get('port'))
// });


app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

// set the view engine to support ejs (html is default)
app.set('view engine', 'ejs');


app.get("/", function (req, res) {
    // res.render('pages/index', {
    //     page: req.url
    // });
    console.log('hi');
    res.send('hello world');

});

app.post('/', function (req, res) {
    //console.log((typeof(req.body.input)));
    //console.log(req.body)
    res.send({
        passed: true,
        message: 'Your input: ' + req.body.input
    });
    broker.testMsg(req.body.input);
});

app.get('/:input', function (req, res) {
    res.json({
        input: req.params.input
    })
   
    //console.log(typeof(req.params.input))
    //broker.testMsg(data);
    broker.getMessage();
    //res.json("Welcome");

});

/******* 1-light control *******/
app.post('/light', function (req, res) {
    res.send({
        passed: true,
        message: 'Light value: ' + req.body.lightValue
    });
    broker.light_Msg(req.body.lightValue);
    broker.getMessage();
});

app.get('/light/:lightValue', function (req, res) {
    res.json({
        light: req.params.lightValue
    })
});


/*******  2-temperature control *******/
app.post('/temp', function (req, res) {
    res.send({
        passed: true,
        message: 'Temperature value: ' + req.body.tempValue
    });
    var data={
        temperature: req.body.tempValue
    }
    broker.temp_Msg(data);
    
});

app.get('/temp/:tempValue', function (req, res) {
    
    res.json({
        temp: req.params.tempValue
    })
    
    // var data={
    //     temp: req.params.tempValue
    // }
    
    //broker.temp_Msg(data);
    broker.getMessage();
});


/******* 3-pressure control *******/
app.post('/pressure', function (req, res) {
    res.send({
        passed: true,
        message: 'Pressure value: ' + req.body.pressureValue
    });
    var data={
        pressure: req.body.pressureValue
    }
    broker.pressure_Msg(data);
    
});

app.get('/pressure/:pressureValue', function (req, res) {
    res.json({
        pressure: req.params.pressureValue
    })
    broker.getMessage();
});

/******* 4-humidity control *******/
app.post('/humidity', function (req, res) {
    res.send({
        passed: true,
        message: 'humidity value: ' + req.body.humiValue
    });
    var data={
        humi: req.body.humiValue
    }
    broker.humidity_Msg(data);
    
});

app.get('/humidity/:humidityValue', function (req, res) {
    res.json({
        humidity: req.params.humidityValue
    });
    broker.getMessage();
});




/*********************************************************************************** */
// var logger = require('morgan'),
//     cors = require('cors'),
//     http = require('http'),
//     express = require('express'),
//     errorhandler = require('errorhandler'),
//     bodyParser = require('body-parser'),
//     mongoose = require('mongoose'),
//     helmet = require('helmet'),
//     config = require('./config.json');

// var app = express();
// app.use(helmet())

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());
// app.use(cors());

// if (process.env.NODE_ENV === 'development') {
//     app.use(logger('dev'));
//     app.use(errorhandler()) 
// }

// var port = process.env.PORT || 3001;

// mongoose.Promise = global.Promise;
// mongoose.connect(config.database);

// app.use(require('./routes/home-route'));

// http.createServer(app).listen(port, function (err) {
//     console.log('listening in http://localhost:' + port);
// });