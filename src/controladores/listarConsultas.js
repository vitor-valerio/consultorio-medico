const { consultorio, consultas, consultasFinalizadas } = require('../bancodedados');

const listarConsultas = (req, res) => {
    const { cnes_consultorio, senha_consultorio } = req.query;
    if (cnes_consultorio !== consultorio.cnes) {
        return res.status(401).json({ mensagem: 'Cnes ou senha inválidos!' });
    }

    if (senha_consultorio !== consultorio.senha) {
        return res.status(401).json({ mensagem: 'Cnes ou senha inválidos!' });
    }
    let consultasCombinadas = [...consultas, ...consultasFinalizadas];
    return res.status(200).send(consultasCombinadas);
}

module.exports = listarConsultas