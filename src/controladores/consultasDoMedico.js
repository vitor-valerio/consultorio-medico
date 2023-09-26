const { consultasFinalizadas } = require('../bancodedados');

const consultasDoMedico = (req, res) => {
    const { identificador_medico } = req.query;

    if (!identificador_medico) {
        return res.status(400).json({ mensagem: 'O identificador do médico é obrigatório' });
    }

    const consulta = consultasFinalizadas.find((consulta) => {
        return consulta.identificadorMedico === Number(identificador_medico);
    })

    if (!consulta) {
        return res.status(404).json({ mensagem: 'O médico informado não existe na base ou ainda não finalizou uma consulta' });
    }

    const consultaFinalizada = consultasFinalizadas.filter((consultaFinalizada) => {
        return consultaFinalizada.identificadorMedico === Number(identificador_medico);
    })

    return res.status(200).json(consultaFinalizada);
}

module.exports = consultasDoMedico;