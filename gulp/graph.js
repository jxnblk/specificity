// Custom SVG Graph Generator for Demonstration

var through = require('through2');
var path = require('path');

module.exports = function(options) {

  var options = options || {};

  return through.obj(function(file, encoding, callback) {

    var string = file.contents.toString();

    var array = JSON.parse(string);

    // Convert file to svg path
    var pathData = 'M0 0';
    var transform = 'scale(1,-1)'; // Flips the line
    var max = 0;
    for (var i = 0; i < array.length; i++) {
      var value = array[i].specificity;
      var valueArray = value.split(',');
      for (var j = 0; j < valueArray.length; j++) {
        if (parseInt(valueArray[j], 10) > 9) {
          console.log('Specificity value is greater than base 10', parseInt(valueArray[j], 10));
        }
      }
      value = value.replace(/,/g,'');
      if (parseInt(value, 10) > max) {

        max = parseInt(value, 10);
      }
      pathData += 'L' + i + ' ' + value + ' ';
      //pathData += array[i].index + ': ' + value + ' -- ';
    }

    pathData += 'V0 H0 z';
    //console.log(pathData, max);

    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + array.length + ' ' + max + '" ' +
      'width="' + array.length + '" height="' + max + '" preserveAspectRatio="none">\n' +
      '  <rect width="' + array.length + '" height="' + max + '" fill="#0cf" opacity="0.125"/>\n' +
      '  <path d="' + pathData + '" transform="scale(1,-1) translate(0, -' + max + ')" fill="#0cf" opacity="0.8"/>\n' +
      '  <text x="8" y="' + (max - 8) + '">Max: ' + max + '</text>\n' +
      '</svg>';

    file.contents = new Buffer(svg);

    var filename =  path.basename(file.path, path.extname(file.path)) + '.svg';
    file.path = path.join(path.dirname(file.path), filename);

    this.push(file);
    callback();

  });

};

