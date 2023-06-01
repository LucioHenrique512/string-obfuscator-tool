# Ofuscação avançada de string
Nosso cliente necessitava de uma forma avançada de ofuscação de string. Essa técnica foi projetada para proteger o conteúdo das strings do aplicativo, impedindo que ele seja revelado por meio de engenharia reversa. A ofuscação foi feita de maneira complexa, mas ainda é possível reverter a ofuscação durante a execução do aplicativo, permitindo que elas sejam acessadas sem serem expostas. 


## Pré-requisitos
Certifique-se de ter os seguintes pré-requisitos instalados em seu sistema:

- Node.js: [Baixar e Instalar o Node.js](https://nodejs.org)

## Executando o projeto 
1. Clone o repositório ou faça o download dos arquivos da aplicação.
```shell
git clone https://lambda3@dev.azure.com/lambda3/Extracao%20Samples%20de%20clientes/_git/ofuscacao-string-avancada
```
2. Abra o terminal e navegue até o diretório raiz da aplicação.
```shell
cd ofuscacao-string-avancada
```

3. Instale as dependências da aplicação.
```shell
npm install
```
4. Execute a aplicação
```shell
node index.js
```
</br>

## Explicação do funcionamento da ofuscação


### Funcionamento da função de ofuscação

A função de ofuscação ocorre em 7 etapas são elas

1. Primeiramente executamos a função com o texto a ser ofuscado.
```javascript 
obfuscate("Relâmpago Marquinhos")
```
2. Em seguida o texto é convertido para base64.
```
UmVsw6JtcGFnbyBNYXJxdWluaG9z
```
3. O valor base64 é convertido em um array de hexadecimal.
```javascript
[
  '55', '6d', '56', '73', '77',
  '36', '4a', '74', '63', '47',
  '46', '6e', '62', '79', '42',
  '4e', '59', '58', '4a', '78',
  '64', '57', '6c', '75', '61',
  '47', '39', '7a'
]
```
4. Em seguida é gerado um array de números randômicos utilizando como base o lenght do array de hexadecimal, esse array denominado como seed será utilizado para desofuscar a string posteriormente.
```javascript
[
  '04', '09', '05',
  '10', '06', '03',
  '02', '04', '06',
  '10', '09', '01',
  '08', '04'
]
```
5. O array de hex é embaralhado trocando as posições dos elementos com base no array de seed gerado randomicamente.
```javascript
[
  '77', '47', '64', '78', '7a',
  '59', '6c', '4a', '39', '61',
  '75', '47', '36', '74', '79',
  '6d', '46', '73', '63', '56',
  '55', '42', '4a', '58', '4e',
  '6e', '62', '57'
]
```
> O algoritmo de embaralhamento que foi utilizado foi inspirado [neste gitgist](https://gist.github.com/iSWORD/13f715370e56703f6c973b6dd706bbbd?permalink_comment_id=2150530).

6. Feito isso, concatenamos o array de seed no final do array embaralhado, utilizamos o numero 24 para separar o array de seed do array hexadecial para facilitar a identificação dos valores posteriormente na função de desofuscamento.
```javascript
[
  '77', '47', '64', '78', '7a', '59',
  '6c', '4a', '39', '61', '75', '47',
  '36', '74', '79', '6d', '46', '73',
  '63', '56', '55', '42', '4a', '58',
  '4e', '6e', '62', '57', '24', '04',
  '09', '05', '10', '06', '03', '02',
  '04', '06', '10', '09', '01', '08',
  '04'
]
```
7. Por ultimo convertemos o array resultante em string e em seguida o convertemos novamente para base64.
```
NzcsNDcsNjQsNzgsN2EsNTksNmMsNGEsMzksNjEsNzUsNDcsMzYsNzQsNzksNmQsNDYsNzMsNjMsNTYsNTUsNDIsNGEsNTgsNGUsNmUsNjIsNTcsMjQsMDQsMDksMDUsMTAsMDYsMDMsMDIsMDQsMDYsMTAsMDksMDEsMDgsMDQ=
```

### Funcionamento da função de desofuscamento

1. Executamos a função de desofuscamento passando o texto ofuscado.
```javascript
deobfuscate(
"NzcsNDcsNjQsNzgsN2EsNTksNmMsNGEsMzksNjEsNzUsNDcsMzYsNzQsNzksNmQsNDYsNzMsNjMsNTYsNTUsNDIsNGEsNTgsNGUsNmUsNjIsNTcsMjQsMDQsMDksMDUsMTAsMDYsMDMsMDIsMDQsMDYsMTAsMDksMDEsMDgsMDQ="
);
```
2. Em seguida descodificamos o base64, e temos acesso a uma string contendo os valores em hexadecimal e os valores do array de seed concatenados separados pelo numero **24**.

77,47,64,78,7a,59,6c,4a,39,61,75,47,36,74,79,6d,46,73,63,56,55,42,4a,58,4e,6e,62,57,24,**04,09,05,10,06,03,02,04,06,10,09,01,08,04**

3. E realizado um split no numero 24 para separar os valores hexadecimal do array de seed, nesse ponto temos duas strings com os valores separados por virgula.
 
```
valor em hexadecimal
77,47,64,78,7a,59,6c,4a,39,61,75,47,36,74,79,6d,46,73,63,56,55,42,4a,58,4e,6e,62,57 

valor do array de seed
04,09,05,10,06,03,02,04,06,10,09,01,08,04
```

4. Convertemos as strings em array com ```.split(',')```

```javascript
//Array de Hexadecimal
[
  '77', '47', '64', '78', '7a',
  '59', '6c', '4a', '39', '61',
  '75', '47', '36', '74', '79',
  '6d', '46', '73', '63', '56',
  '55', '42', '4a', '58', '4e',
  '6e', '62', '57'
]

//Array de seed
[
  '04', '09', '05',
  '10', '06', '03',
  '02', '04', '06',
  '10', '09', '01',
  '08', '04'
]
```
5. é realizado o desembaralhamento utilizando o hexadecimal e o array de seed
```javascript
[
  '77', '47', '64', '78', '7a', '59',
  '6c', '4a', '39', '61', '75', '47',
  '36', '74', '79', '6d', '46', '73',
  '63', '56', '55', '42', '4a', '58',
  '4e', '6e', '62', '57', '24', '04',
  '09', '05', '10', '06', '03', '02',
  '04', '06', '10', '09', '01', '08',
  '04'
]
```
6. Convertemos o array de hexadecimal desembaralhado em texto novamente o texto retornado é um base64
``` 
UmVsw6JtcGFnbyBNYXJxdWluaG9z 
```

7. Por fim decodificamos o base64 obtido

```
Relâmpago Marquinhos
```



## Conclusão

A técnica de ofuscação implementada neste caso atendeu com sucesso às necessidades do cliente. O time de segurança da informação do cliente solicitou uma forma de ofuscação que fosse altamente resistente à engenharia reversa. Ao apresentar essa solução ao time de segurança da informação do cliente, eles elogiaram a abordagem adotada.

A ofuscação demonstrou ser eficiente ao proteger o conteúdo sensível do aplicativo, dificultando sua análise estática e possibilitando a reversão da ofuscação em tempo de execução. O cliente expressou satisfação com a solução.



