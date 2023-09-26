const { consultas, consultasFinalizadas, laudos } = require('../bancodedados');
let idProximoLaudoCriado = 1;

const finalizarConsulta = (req, res) => {
    const { identificadorConsulta, textoMedico } = req.body;

    if (!identificadorConsulta) {
        return res.status(400).json({ mensagem: 'O identificador da consulta é obrigatório' });
    }

    if (!textoMedico) {
        return res.status(400).json({ mensagem: 'O texto no laudo é obrigatório' });
    }

    const consulta = consultas.find((consulta) => {
        return consulta.identificador === Number(identificadorConsulta);
    })

    const consultaFinalizadaValid = consultasFinalizadas.find((consultaFinalizadaValid) => {
        return consultaFinalizadaValid.identificador === Number(identificadorConsulta);
    })

    if (consultaFinalizadaValid) {
        return res.status(400).json({ mensagem: 'Essa consulta já foi finalizada' });
    }

    if (!consulta) {
        return res.status(404).json({ mensagem: 'Consulta não encontrada' });
    }

    if (!(textoMedico.length > 0 && textoMedico.length <= 200)) {
        return res.status(400).json({ mensagem: 'O tamanho do textoMedico não está dentro do esperado' });
    }
    const consultaFinalizada = {
        identificador: consulta.identificador,
        tipoConsulta: consulta.tipoConsulta,
        identificadorMedico: consulta.identificadorMedico,
        finalizada: true,
        identificadorLaudo: idProximoLaudoCriado,
        valorConsulta: consulta.valorConsulta,
        paciente: {
            nome: consulta.paciente.nome,
            cpf: consulta.paciente.cpf,
            dataNascimento: consulta.paciente.dataNascimento,
            celular: consulta.paciente.celular,
            email: consulta.paciente.email,
            senha: consulta.paciente.senha
        }
    }

    const laudo = {
        identificador: idProximoLaudoCriado,
        identificadorConsulta: consulta.identificador,
        identificadorMedico: consulta.identificadorMedico,
        finalizada: true,
        textoMedico,
        paciente: {
            nome: consulta.paciente.nome,
            cpf: consulta.paciente.cpf,
            dataNascimento: consulta.paciente.dataNascimento,
            celular: consulta.paciente.celular,
            email: consulta.paciente.email,
            senha: consulta.paciente.senha
        }
    }

    consultasFinalizadas.push(consultaFinalizada);
    laudos.push(laudo);
    idProximoLaudoCriado++;

    const consultasEmAndamento = consultas.filter((consulta) => {
        return consulta.identificador !== Number(identificadorConsulta);
    })

    consultas.length = 0;
    consultas.push(...consultasEmAndamento);

    return res.status(201).json(consultaFinalizada);
}

module.exports = finalizarConsulta;