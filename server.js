import routes from './src/routes';
const app = require('./src/app');
const bodyParser = require('body-parser');
const cors = require('cors');
import db from './src/helpers/index';

app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', routes.home);
app.use('/numbers', routes.numbers);

db.connect();

app.listen(app.get('port'), () => {
    console.log('server start');
});
