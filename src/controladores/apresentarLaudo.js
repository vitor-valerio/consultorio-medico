const { consultas, consultasFinalizadas, laudos } = require('../bancodedados');

const apresentarLaudo = (req, res) => {
    const { identificador_consulta, senha } = req.query;

    if (!identificador_consulta) {
        return res.status(400).json({ mensagem: 'O identificador da consulta é obrigatório' });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha do paciente é obrigatória' });
    }

    const consultaFinalizadaValid = consultasFinalizadas.find((consultaFinalizadaValid) => {
        return consultaFinalizadaValid.identificador === Number(identificador_consulta);
    })

    const consulta = consultas.find((consulta) => {
        return consulta.identificador === Number(identificador_consulta);
    })

    if (consulta) {
        return res.status(400).json({ mensagem: 'Essa consulta ainda não foi finalizada' });
    }

    if (!consultaFinalizadaValid) {
        return res.status(404).json({ mensagem: 'Consulta médica não encontrada!' });
    }

    if (consultaFinalizadaValid.paciente.senha !== senha) {
        return res.status(400).json({ mensagem: 'A senha está incorreta' });
    }

    const laudo = laudos.find((laudo) => {
        return laudo.identificadorConsulta === Number(identificador_consulta);
    })

    return res.status(200).json(laudo);
}

module.exports = apresentarLaudo;