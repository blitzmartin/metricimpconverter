'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  app.get('/api/convert', (req, res) => {
    const input = req.query.input;

    // Ottieni il numero iniziale e l'unità
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    // Gestione degli errori per numero e unità non validi
    if (initNum === null && initUnit === null) {
      return res.json({ error: 'invalid number and unit' });
    } else if (initNum === null) {
      return res.json({ error: 'invalid number' });
    } else if (initUnit === null) {
      return res.json({ error: 'invalid unit' });
    }

    // Calcola il numero convertito e l'unità di ritorno
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    // Restituisci la risposta JSON
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string
    });
  });

};
