const { consultorio, consultas } = require('../bancodedados');
let idProximaConsultaCriada = 1;

const criarConsulta = (req, res) => {
    const { tipoConsulta, valorConsulta, paciente } = req.body;

    if (!tipoConsulta) {
        return res.status(400).json({ mensagem: 'O tipo de consulta é obrigatório' });
    }

    if (!valorConsulta) {
        return res.status(400).json({ mensagem: 'O valor da consulta é obrigatório' });
    }

    if (!paciente.nome) {
        return res.status(400).json({ mensagem: 'O nome do paciente é obrigatório' });
    }

    if (!paciente.cpf) {
        return res.status(400).json({ mensagem: 'O CPF do paciente é obrigatório' });
    }

    if (!paciente.dataNascimento) {
        return res.status(400).json({ mensagem: 'A data de nascimento do paciente é obrigatória' });
    }

    if (!paciente.celular) {
        return res.status(400).json({ mensagem: 'O número de celular do paciente é obrigatório' });
    }

    if (!paciente.email) {
        return res.status(400).json({ mensagem: 'O email do paciente é obrigatório' });
    }

    if (!paciente.senha) {
        return res.status(400).json({ mensagem: 'A senha do paciente é obrigatória' });
    }

    if (isNaN(valorConsulta)) {
        return res.status(400).json({ mensagem: 'O valor da consulta não é numérico' });
    }

    const cpf = consultas.find((pessoa) => {
        return pessoa.paciente.cpf === paciente.cpf
    })

    if (cpf) {
        return res.status(400).json({ mensagem: 'Esse CPF já está vinculado a uma consulta que não foi finalizada' });
    }

    const enderecoDeEmail = consultas.find((pessoa) => {
        return pessoa.paciente.email === paciente.email
    })

    if (enderecoDeEmail) {
        return res.status(400).json({ mensagem: 'Esse email já está vinculado a uma consulta que não foi finalizada' });
    }

    const medicos = consultorio.medicos;

    const medicoEncontrado = medicos.find((tipo) => {
        return tipo.especialidade === tipoConsulta;
    })

    if (!medicoEncontrado) {
        return res.status(400).json({ mensagem: 'Essa especialidade não consta nos médicos na base' });
    }

    const identificadorMedico = medicoEncontrado.identificador;

    const consulta = {
        identificador: idProximaConsultaCriada,
        tipoConsulta,
        identificadorMedico,
        finalizada: false,
        valorConsulta,
        paciente: {
            nome: paciente.nome,
            cpf: paciente.cpf,
            dataNascimento: paciente.dataNascimento,
            celular: paciente.celular,
            email: paciente.email,
            senha: paciente.senha
        }
    }
    consultas.push(consulta);
    idProximaConsultaCriada++
    return res.status(201).json(consulta);
}

module.exports = criarConsulta;