'use strict';

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const strNumRule = {
    type: String,
    default: '0',
  };
  const Covid19DailySchema = new Schema({
    confirm: strNumRule,
    suspect: strNumRule,
    heal: strNumRule,
    dead: strNumRule,
    severe: strNumRule,
    input: strNumRule,
  });
  const Covid19Schema = new Schema({
    _id: String,
    name: String,
    today: Covid19DailySchema,
    total: Covid19DailySchema,
    last_update_date: Date,
    area_level: strNumRule,
    parent_id: String,
  });

  return mongoose.model('Covid19', Covid19Schema, 'covid19');
};
