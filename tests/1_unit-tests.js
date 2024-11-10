const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

     // Test for getNum function
     suite('Function convertHandler.getNum(input)', function () {
          test('Whole number input', function () {
               assert.equal(convertHandler.getNum('32L'), 32);
          });

          test('Decimal input', function () {
               assert.equal(convertHandler.getNum('3.5kg'), 3.5);
          });

          test('Fractional input', function () {
               assert.equal(convertHandler.getNum('1/2mi'), 0.5);
          });

          test('Fractional input with decimal', function () {
               assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8);
          });

          test('Double-fraction input', function () {
               assert.isNull(convertHandler.getNum('3/7.2/4kg'), 'Should return null for invalid fraction');
          });

          test('No numerical input', function () {
               assert.equal(convertHandler.getNum('kg'), 1);
          });
     });

     // Test for getUnit function
     suite('Function convertHandler.getUnit(input)', function () {
          test('Valid unit inputs', function () {
               const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
               input.forEach(function (ele) {
                    assert.equal(convertHandler.getUnit(ele), ele);
               });
          });

          test('Unknown unit input', function () {
               assert.isNull(convertHandler.getUnit('kilomegagram'), 'Should return null for invalid unit');
          });
     });

     // Test for getReturnUnit function
     suite('Function convertHandler.getReturnUnit(initUnit)', function () {
          test('Valid return units', function () {
               const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
               const expected = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
               input.forEach(function (ele, i) {
                    assert.equal(convertHandler.getReturnUnit(ele), expected[i]);
               });
          });
     });

     // Test for spellOutUnit function
     suite('Function convertHandler.spellOutUnit(unit)', function () {
          test('Valid spell-out for units', function () {
               const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
               const expected = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
               input.forEach(function (ele, i) {
                    assert.equal(convertHandler.spellOutUnit(ele), expected[i]);
               });
          });
     });

     // Test for convert function
     suite('Function convertHandler.convert(num, unit)', function () {
          test('Gal to L', function () {
               assert.approximately(convertHandler.convert(5, 'gal'), 18.9271, 0.1); // 5 gal to L
          });

          test('L to gal', function () {
               assert.approximately(convertHandler.convert(5, 'L'), 1.32086, 0.1); // 5 L to gal
          });

          test('Mi to Km', function () {
               assert.approximately(convertHandler.convert(5, 'mi'), 8.0467, 0.1); // 5 mi to km
          });

          test('Km to Mi', function () {
               assert.approximately(convertHandler.convert(5, 'km'), 3.10686, 0.1); // 5 km to mi
          });

          test('Lbs to Kg', function () {
               assert.approximately(convertHandler.convert(5, 'lbs'), 2.26796, 0.1); // 5 lbs to kg
          });

          test('Kg to Lbs', function () {
               assert.approximately(convertHandler.convert(5, 'kg'), 11.0231, 0.1); // 5 kg to lbs
          });
     });
});
