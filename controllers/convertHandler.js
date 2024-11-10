function ConvertHandler() {

  this.getNum = function (input) {
    let result;

    // Check for multiple slashes, which is invalid
    if ((input.match(/\//g) || []).length > 1) {
      return null;
    }

    let numRegex = /^(\d+(\.\d+)?(\/\d+(\.\d+)?)?)?/;
    let match = input.match(numRegex)[0];

    if (!match) {
      result = 1;
    } else if (match.includes('/')) {
      let [numerator, denominator] = match.split('/');
      if (denominator === '0' || isNaN(denominator)) return null;
      result = parseFloat(numerator) / parseFloat(denominator);
    } else {
      result = parseFloat(match);
    }

    return isNaN(result) ? null : result;
  };


  this.getUnit = function (input) {
    let unitRegex = /[a-zA-Z]+$/;
    let match = input.match(unitRegex);
    if (!match) return null;

    const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    let unit = match[0].toLowerCase();
    if (unit === 'l') unit = 'L';

    return validUnits.includes(unit) ? unit : null;
  };


  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };

    return unitMap[initUnit] || null;
  };

  this.spellOutUnit = function (unit) {
    const unitNames = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };

    return unitNames[unit] || null;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal': result = initNum * galToL; break;
      case 'L': result = initNum / galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg': result = initNum / lbsToKg; break;
      case 'mi': result = initNum * miToKm; break;
      case 'km': result = initNum / miToKm; break;
      default: return null;
    }

    return parseFloat(result.toFixed(5)); // Arrotondamento a 5 decimali
  };


  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let spelledOutInitUnit = this.spellOutUnit(initUnit);
    let spelledOutReturnUnit = this.spellOutUnit(returnUnit);
    return `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOutReturnUnit}`;
  };


}

module.exports = ConvertHandler;
