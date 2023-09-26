const express = require('express');
const rotas = express();

const listarConsultas = require('./controladores/listarConsultas');
const criarConsulta = require('./controladores/criarConsulta');
const atualizarConsulta = require('./controladores/atualizarConsulta');
const cancelarConsulta = require('./controladores/cancelarConsulta');
const finalizarConsulta = require('./controladores/finalizarConsulta');
const apresentarLaudo = require('./controladores/apresentarLaudo');
const consultasDoMedico = require('./controladores/consultasDoMedico');

rotas.get('/consultas', listarConsultas);

rotas.post('/consulta', criarConsulta);

rotas.put('/consulta/:identificadorConsulta/paciente', atualizarConsulta);

rotas.delete('/consulta/:identificadorConsulta', cancelarConsulta);

rotas.post('/consulta/finalizar', finalizarConsulta);

rotas.get('/consulta/laudo', apresentarLaudo);

rotas.get('/consultas/medico', consultasDoMedico);

module.exports = rotas