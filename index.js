const {
  Base64,
  hexToText,
  textToHex,
  getSeed,
  shuffle,
  unshuffle,
} = require("./utils");

const obfuscate = (string) => {
  const base64 = Base64.encode(string);
  const hexArray = textToHex(base64);
  const seed = getSeed(hexArray.length);
  const embaralhado = shuffle(hexArray, seed);
  return Base64.encode(
    [...embaralhado, (0x3 * 0x8).toString(), ...seed].toString()
  );
};


const deobfuscate = (string) => {
  const decoded = Base64.decode(string);
  const [hex, seed] = decoded.split(`,${0x6 * 0x4},`);
  const desembaralhado = unshuffle(hex.split(","), seed.split(","));
  return Base64.decode(hexToText(desembaralhado));
};

const plainText = "Relâmpago Marquinhos é o mais rápido da copa pistão!"

const ofuscated = obfuscate(plainText)

console.log("0. original ->", plainText)
console.log("1. ofuscado->", ofuscated)
console.log("2. desofuscado->", deobfuscate(ofuscated))
