const { desofuscar, ofuscar } = require("./ofuscate");

const endpoints = {};

const JsonDeEndpoins = {};

// const desofuscarEndpoint = (nomeEndpoint, pathParams) => {
//   const encriptado = JsonDeEndpoins[nomeEndpoint];

//   const decriptado = desofuscar(encriptado);
//   const uarlArray = decriptado.split("/:");

//   if (uarlArray.length === 1) return decriptado;

//   const newUrl = uarlArray
//     .map((key, index) => {
//       console.log(key);
//       if (index > 0) {
//         const isKey = pathParams
//           ? Object.keys(pathParams).includes(key)
//           : false;
//         if (!isKey)
//           throw new Error(
//             `O parametro ${key} não foi fornecido no objeto de parametros`
//           );

//         return `/${pathParams[key]}`;
//       }
//       return key;
//     })
//     .join("");

//   return newUrl;
// };

// const gerarEndpointsEncriptado = (endpoints) => {
//   let arrayEndpoints = [];
//   Object.keys(endpoints).forEach((key) => {
//     arrayEndpoints.push(`"${key}": "${ofuscar(endpoints[key])}"`);
//   });
//   return `{${arrayEndpoints.join(",")}\n}`;
// };

const url = (nomeEndpoint, uris) => {
  const encriptado = JsonDeEndpoins[nomeEndpoint];
  const decriptado = desofuscar(encriptado);
  const regex = /\/:([^/]+)/g;

  const endpointUris = [...decriptado.matchAll(regex)].reduce(
    (prev, current) => {
      prev.push(current[1]);
      return prev;
    },
    []
  );

  if (endpointUris.length === 0) return decriptado;

  if (!uris)
    throw new Error(
      `Variáveis ${endpointUris.join(
        ", "
      )} são necesárias, favor as forneça no segundo parametro como um objeto`
    );

  endpointUris.forEach((item) => {
    const naoPossui = !Object.keys(uris).includes(item);
    if (naoPossui)
      throw new Error(
        `Variável ${item} não encontrada, favor pass-a no segundo parametro dentro de um objeto`
      );
  });

  const outputString = decriptado.replace(regex, (_, capture) => {
    return `/${uris[capture]}`;
  });
  return outputString;
};

const urlToString = (nomeEndpoint, uris) => {
  const encriptado = endModule[nomeEndpoint];
  const decriptado = desofuscar(encriptado);
  const regex = /\/:([^/]+)/g;

  const endpointUris = [...decriptado.matchAll(regex)].reduce(
    (prev, current) => {
      prev.push(current[1]);
      return prev;
    },
    []
  );

  if (endpointUris.length === 0) return decriptado;

  if (!uris)
    throw new Error(
      `Variáveis ${endpointUris.join(
        ", "
      )} são necesárias, favor as forneça no segundo parametro como um objeto`
    );

  endpointUris.forEach((item) => {
    const naoPossui = !Object.keys(uris).includes(item);
    if (naoPossui)
      throw new Error(
        `Variável ${item} não encontrada, favor a forneça no segundo parametro dentro de um objeto`
      );
  });

  const outputString = decriptado.replace(regex, (_, capture) => {
    return `/${uris[capture]}`;
  });
  return outputString;
};

console.log(
  desofuscar(
    "NjgsNTksNDcsNzgsNTQsNzksNTUsNTksNGYsNjksNWEsN2EsNTQsNDUsNTIsNTcsNGUsMzQsNTMsMzAsNTksMzAsNmQsNGEsNGUsNGQsNzQsNjcsNGMsNmQsN2EsNDcsNjcsNzQsNGYsN2EsNGYsNGQsNjMsNTQsNGUsNTcsMzIsNDksNTYsNzgsNDQsNmIsMjQsMDcsMDQsMDksMDksMDcsMDUsMDMsMDIsMTAsMDIsMDgsMDksMDcsMDYsMDMsMDUsMDcsMDIsMDIsMDIsMDgsMDIsMDYsMDM="
  )
);
