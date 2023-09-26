const { consultas, consultasFinalizadas } = require('../bancodedados');

const cancelarConsulta = (req, res) => {
    const { identificadorConsulta } = req.params;

    const consulta = consultas.find((consulta) => {
        return consulta.identificador === Number(identificadorConsulta);
    })

    const consultaFinalizada = consultasFinalizadas.find((consultaFinalizada) => {
        return consultaFinalizada.identificador === Number(identificadorConsulta);
    })

    if (consultaFinalizada) {
        return res.status(400).json({ mensagem: 'A consulta só pode ser removida se a mesma não estiver finalizada' });
    }

    if (!consulta) {
        return res.status(404).json({ mensagem: 'Consulta não encontrada' });
    }

    const consultasFiltradas = consultas.filter((consulta) => {
        return consulta.identificador !== Number(identificadorConsulta);
    })

    consultas.length = 0;
    consultas.push(...consultasFiltradas);
    return res.status(204).send();
}

module.exports = cancelarConsulta;