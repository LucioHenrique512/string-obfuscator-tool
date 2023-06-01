const textToHex = (text) => {
  var bytes = [];
  for (var i = 0; i < text.length; i++) {
    bytes.push(text.charCodeAt(i).toString(16));
  }
  return bytes;
};

const hexToText = (hexArray) => {
  return hexArray
    .map(function (c) {
      return String.fromCharCode(parseInt(c, 16));
    })
    .reduce(function (a, b) {
      return a + b;
    });
};

module.exports = { textToHex, hexToText };
