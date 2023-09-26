const { consultas, consultasFinalizadas } = require('../bancodedados');

const atualizarConsulta = (req, res) => {
    const { identificadorConsulta } = req.params;
    const { nome, cpf, dataNascimento, celular, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome do paciente é obrigatório' });
    }

    if (!cpf) {
        return res.status(400).json({ mensagem: 'O CPF do paciente é obrigatório' });
    }

    if (!dataNascimento) {
        return res.status(400).json({ mensagem: 'A data de nascimento do paciente é obrigatória' });
    }

    if (!celular) {
        return res.status(400).json({ mensagem: 'O número de celular do paciente é obrigatório' });
    }

    if (!email) {
        return res.status(400).json({ mensagem: 'O email do paciente é obrigatório' });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha do paciente é obrigatória' });
    }

    const consultaFinalizada = consultasFinalizadas.find((consulta) => {
        return consulta.identificador === Number(identificadorConsulta);
    })

    if (consultaFinalizada) {
        return res.status(400).json({ mensagem: 'Essa consulta já está finalizada' })
    }

    const consulta = consultas.find((consulta) => {
        return consulta.identificador === Number(identificadorConsulta);
    })

    if (!consulta) {
        return res.status(404).json({ mensagem: 'Consulta não encontrada' })
    }

    const pessoa = consultas.find((pessoa) => {
        return pessoa.paciente.cpf === cpf
    })

    if (pessoa) {
        return res.status(400).json({ mensagem: 'Esse CPF já está vinculado a uma consulta que não foi finalizada' });
    }

    const enderecoDeEmail = consultas.find((pessoa) => {
        return pessoa.paciente.email === email
    })

    if (enderecoDeEmail) {
        return res.status(400).json({ mensagem: 'Esse email já está vinculado a uma consulta que não foi finalizada' });
    }

    consulta.paciente.nome = nome;
    consulta.paciente.cpf = cpf;
    consulta.paciente.email = email;
    consulta.paciente.celular = celular;
    consulta.paciente.dataNascimento = dataNascimento;
    consulta.paciente.senha = senha;

    return res.status(203).send();
}

module.exports = atualizarConsulta;