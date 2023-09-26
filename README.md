# Consultório Médico

## Em que consite o projeto?

O projeto é uma API - REST que servirá para operação dia a dia de um consultório médico.

Através desta aplicação será possível

- Criar consulta médica
- Listar consultas médicas
- Atualizar os dados de uma consulta
- Excluir uma consulta médica
- Finalizar uma consulta médica
- Listar o laudo de uma consulta
- Listar as consultas que um médico atendeu

## Como o projeto funciona?

## Persistências dos dados

Os dados serão persistidos em memória, no objeto existente dentro do arquivo `bancodedados.js`. **Todas as informações e consultas médicas são inseridas dentro deste objeto, seguindo a estrutura que já existe.**

### Estrutura do objeto no arquivo `bancodedados.js`

```javascript
{
  consultorio: {
    nome: "Cubos Healthcare",
    identificador: 1,
    cnes: "1001",
    senha: "CubosHealth@2022",
    medicos: [
      {
        identificador: 1,
        nome: "Bill",
        especialidade: "GERAL",
      },
      {
        identificador: 2,
        nome: "Irineu",
        especialidade: "ODONTOLOGIA"
      },
    ]
  },
  consultas: [
    // array de consultas médicas
  ],
  consultasFinalizadas: [
    // array de consultas finalizadas
  ],
  laudos: [
    // array de laudos médicos
  ]
}
```
**Sempre que a validação de uma requisição falhar, a aplicação responde com código de erro e mensagem adequada à situação**

**Exemplo**

```javascript
// Quando é informado que uma consulta não existe:
// HTTP Status
{
  "mensagem": "Consulta inexistente!"
}
```

## Informações

- A API segue o padrão REST
- O código está organizado, delimitando as responsabilidades de cada arquivo adequadamente e tem a seguinte estrutura:
  - src/
    - controladores/
      - **_os controladores vão aqui_**
    - bancodedados.js
    - rotas.js
    - index.js

![organização API REST](https://github.com/vitor-valerio/consultorio-medico/assets/142065931/b188720a-0cf1-45a0-8d71-cba006c99793)

- Os valores (dinheiro) são representados em centavos (Ex.: R$ 10,00 reais = 1000).

## Endpoints

### Listar consultas médicas

#### `GET` `/consultas?cnes_consultorio=1001&senha_consultorio=CubosHealth@2022`

Esse end-point lista todas as consultas médicas.

  - Verifica se o cnes e a senha do consultório foram informados (passado como query params na url).
  - Valida se o cnes a senha do consultório estão corretos.

- **Requisição** - query params

  - cnes_consultorio
  - senha_consultorio

- **Resposta**
  - Listagem de todas as consultas.

#### Exemplo de resposta

![lista de consultas](https://github.com/vitor-valerio/consultorio-medico/assets/142065931/2861394e-6958-45a0-b746-bc79bd0339b2)

### Criar Consulta médica

#### `POST` `/consulta`

Esse endpoint cria uma consulta médica, onde é gerado um identificador único para identificação da consulta (identicador da consulta).

  - Verifica se todos os campos foram informados (todos são obrigatórios)
  - Verifica se o valor da consulta é numérico
  - Verifica se o CPF informado já não está vinculado a nenhuma consulta que não foi finalizada
  - Valida se o tipo da consulta informado consta nas especialidade dos médicos na base
  - Vincula o identificador do médico especializado que irá atender a consulta em questão no momento de criação da consulta
  - Define _finalizada_ como false
  - Cria uma consulta médica cuja o identificador é único

- **Requisição** - O corpo (body) possui um objeto com as seguintes propriedades (respeitando estes nomes):

  - tipoConsulta
  - valorConsulta
  - paciente
    - nome
    - cpf
    - dataNascimento
    - celular
    - email
    - senha

- **Resposta**

  Em caso de **sucesso**, não envia conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta possui **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **mensagem** que possui como valor um texto explicando o motivo da falha.
  
#### Exemplo de Resposta

![cadastro consulta](https://github.com/vitor-valerio/consultorio-medico/assets/142065931/fdf5262e-fc41-46c4-a148-a76f5d54f8d0)

### Atualizar informações da consulta médica

#### `PUT` `/consulta/:identificadorConsulta/paciente`

Esse endpoint atualiza apenas os dados do paciente de uma consulta médica que não esteja finalizada.

  - Verifica se foi passado todos os campos no body da requisição
  - Verifica se o identificador da consulta passado como parametro na URL é válido
  - Se o CPF for informado, verifica se já existe outro registro com o mesmo CPF
  - Se o E-mail for informado, verifica se já existe outro registro com o mesmo E-mail
  - Verifica se a consulta não esta finalizada
  - Atualiza os dados do usuário de uma consulta médica

- **Requisição** - O corpo (body) possui um objeto com todas as seguintes propriedades (respeitando estes nomes):

  - nome
  - cpf
  - dataNascimento
  - celular
  - email
  - senha

- **Resposta**

  Em caso de **sucesso**, não envia conteúdo no corpo (body) da resposta.
  Em caso de **falha na validação**, a resposta possui **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **mensagem** que possui como valor um texto explicando o motivo da falha.
  
#### Exemplo de Resposta

![atualizar nome pt1](https://github.com/vitor-valerio/consultorio-medico/assets/142065931/dbbd4ffc-88c9-4eb8-8322-e91339f59aa8)
![atualizar nome pt2](https://github.com/vitor-valerio/consultorio-medico/assets/142065931/a1a24c5b-b66a-4f92-adc9-72add3d338af)

### Cancelar Consulta

#### `DELETE` `/consulta/:identificadorConsulta`

Esse endpoint cancela uma consulta médica existente, esta consulta não pode estar _finalizada_.

  - Verifica se o identificador da consulta médica passado como parametro na URL é válido
  - Permite excluir uma consulta apenas se _finalizada_ for igual a false
  - Remove a consulta do objeto de persistência de dados

- **Requisição**

  - Identificador da consulta (passado como parâmetro na rota)

- **Resposta**

  Em caso de **sucesso**, não envia conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta possui **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **mensagem** que possui como valor um texto explicando o motivo da falha.

#### Exemplo de Resposta

![cancelar pt1](https://github.com/vitor-valerio/consultorio-medico/assets/142065931/1aad3a97-d2a4-4f6a-813a-85c9e5e7e2ba)
![cancelar pt2](https://github.com/vitor-valerio/consultorio-medico/assets/142065931/d93cee95-11f9-42e5-9c3d-6f0fcaba820b)

### Finalizar uma consulta

#### `POST` `/consulta/finalizar`

Esse endpoint finaliza uma consulta com um texto de laudo válido do médico e registra esse laudo e essa consulta finalizada.

  - Verifica se foi passado todos os campos no body da requisição
  - Verifica se o identificador da consulta existe
  - Verifica se a consulta já esta finalizada
  - Verifica se o texto do médico possui um tamanho > 0 e <= 200 carácteres
  - Armazena as informações do laudo na persistência de dados
  - Armazena a consulta médica finalizada na persistência de dados

- **Requisição** - O corpo (body) possui um objeto com as seguintes propriedades (respeitando estes nomes):

  - identificadorConsulta
  - textoMedico

- **Resposta**

  Em caso de **sucesso**, não envia conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta possui **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **mensagem** que possui como valor um texto explicando o motivo da falha.

#### Exemplo de Resposta

![finalizando consulta](https://github.com/vitor-valerio/consultorio-medico/assets/142065931/36333650-9824-4aff-87cf-7b3a450216aa)

### Laudo

#### `GET` `/consulta/laudo?identificador_consulta=1&senha=1234`

Esse endpoint retorna informações do laudo de uma consulta junto as informações adicionais das entidades relacionadas aquele laudo.

  - Verifica se o identificador da consulta e a senha foram informados (passado como query params na url)
  - Verifica se a consulta médica informada existe
  - Verifica se a senha informada é uma senha válida
  - Verifica se existe um laudo para consulta informada
  - Exibe o laudo da consulta médica em questão junto as informações adicionais

- **Requisição** - query params

  - identificador_consulta
  - senha

- **Resposta**

  - Informações do laudo e das entidades relacionadas

#### Exemplo de Resposta

![laudo](https://github.com/vitor-valerio/consultorio-medico/assets/142065931/04ae9627-55d0-4fb8-bca1-dd0c9068a134)

### Médico

#### `GET` `/consultas/medico?identificador_medico=1`

Esse endpoint retorna todas as consultas que um profissional **_atendeu_**, ou seja, finalizadas.

  - Verifica se o identificador do medico foi informado (passado como query params na url)
  - Verifica se o médico existe
  - Exibe as consultas vinculadas ao médico

- **Requisição** - query params

  - identificador_medico

- **Resposta**

  - Listagem das consultas vinculadas ao médico

#### Exemplo de Resposta
![consultas finalizadas de um médico](https://github.com/vitor-valerio/consultorio-medico/assets/142065931/3e87dc02-8c37-4f63-9f8e-15e1baf30680)
