
const shuffle = (inArr, seed, unshuffle = false) => {
  let outArr = Array.from(inArr),
    len = inArr.length;

  let swap = (a, b) => ([outArr[a], outArr[b]] = [outArr[b], outArr[a]]);

  for (
    var i = unshuffle ? len - 1 : 0;
    (unshuffle && i >= 0) || (!unshuffle && i < len);
    i += unshuffle ? -1 : 1
  )
    swap(seed[i % seed.length] % len, i);

  return outArr;
};

const unshuffle = (inArr, seed) => shuffle(inArr, seed, true);

const getSeed = (length) => {
  let seed = [];
  for (var i = 0; i < length / 2; i++)
    seed.push(
      Math.ceil(Math.random() * 10)
        .toString()
        .padStart(2, 0)
    );
  return seed;
};


module.exports = { shuffle, unshuffle, getSeed };
