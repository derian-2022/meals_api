const express = require('express');
const morgan = require('morgan');


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');




const app = express();


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


const usersRoutes = require("./routes/users.routes")
const restaurantsRoutes = require("./routes/restaurants.routes")
const mealsRoutes = require("./routes/meals.routes")
const ordersRoutes = require("./routes/orders.routes")


app.use(express.json());


app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/restaurants', restaurantsRoutes);
app.use("/api/v1/meals", mealsRoutes)
app.use("/api/v1/orders", ordersRoutes)

app.all('*', (req, res, next) => {
  return next(
    new AppError(`cannot find ${req.originalUrl} on this server! 🍖`, 404)
  );
});


app.use(globalErrorHandler);


module.exports = app;