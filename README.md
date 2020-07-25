# country-user

Esta aplicação teve como objetivo criar um backend com a biblioteca npm json-server e trabalhar com múltiplas API's, relacionando-as.

## Instalação

É necessário instalar a biblioteca json-server para poder criar as API's locais com base em 2 arquivos JSON que se encontram no diretório ./backend

```bash
npm init -y
npm install json-server
```

## Principais funcionalidades

```javascript
start(); // Inicializa as variávies globais e as principais funções que envolvem requisiçoes na aplicação logo após o carregamento da página. Para isso, foi utilziado atributo defer na tag <script> no documento index.html.

fetchUsers(); // Carrega os dados da API local que contem as informações referentes aos usuários.

fetchCountries(); // Carrega os dados da API local que contem as informações referentes a todos os países.

promiseUsers(); // Promise para a requsição à API de usuários.

promiseCountries(); // Promise para a requisição à API de países.

hideSpinner(); // Adiciona a classe css 'hide' do Materialize para esconder o spinner após o carregamento das requisições na função start().

mergeUsersAndCountries(); // Criação de um novo array a partir da junção dos dados retornados de ambas as API's. Esse laço é feito a partir dos dados { nat } retornado dos usuários e { alpha2Code } retornado dos países.

render(); // Carrega os dados de todos os usuários retornados na tela.

configFilter(); // Criação dos eventos para o mecanismo de busca de usuários. Essa função cria eventos tanto para o input[text] quando para o botão de busca.

handleSearchBtn(); // Realiza o filtro dos usuários com base na string digitada no input.
```
