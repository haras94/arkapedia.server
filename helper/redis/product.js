const redis = require('redis');
const client = redis.createClient(process.env.PORT_REDIS);
const { ErrorHandler } = require('../error');

exports.chaceGetAllProducts = (req, res, next) => {
  client.get('getAllProducts', (err, data) => {
    console.log(data);
    if(err){
      throw new ErrorHandler(500, 'Cant get data from redis');
    }
    else if(data !== null){
      res.status(200).json({
        data: JSON.parse(data),
        message: 'Alhamdulillah'
      })
    }
    else{
      next();
    }
  }) 
};

exports.clearGetAllProducts = (req, res, next) => {
  client.del('getAllProducts');
  next();
};