const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { handleError, ErrorHandler } = require('./helper/error');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

require('./router/category')(app);
require('./router/image')(app);
require('./router/order_detail')(app);
require('./router/order')(app);
require('./router/payment')(app);
require('./router/product_category')(app);
require('./router/product_image')(app);
require('./router/product')(app);
require('./router/role')(app);
require('./router/shop')(app);
require('./router/sub_category')(app);
require('./router/user_payment')(app);
require('./router/user_role')(app);
require('./router/user_shop')(app);
require('./router/user')(app);

// app.use((err, req, res, next) => {
//   handleError(err, res);
// });

module.exports = app;
