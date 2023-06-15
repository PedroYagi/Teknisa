$('#cpf').inputmask("999.999.999-99");

function validaCPF(){
    const cpfFormatado = document.getElementById("cpf").value;
    cpf = limpaFormatacao(cpfFormatado);
    if(cpf.length !==11){
        mostraResultado("CPF deve conter 11 digitos.", "red");
        return;
    }

    if(verificaDigitoRepetido(cpf)){
        mostraResultado("CPF não pode ser digitos repetidos","red");
        return;
    }

    if(!calculaDigitoVerificador(cpf,1)){
        mostraResultado("CPF inválido","red");
        return;
    }
    if(!calculaDigitoVerificador(cpf,2)){
        mostraResultado("CPF inválido","red");
        return;
    }

    mostraResultado("CPF válido","green");
}

function limpaFormatacao(cpfFormatado){
    cpf = cpfFormatado.replace(/\D/g,'');
    return cpf;
}

function mostraResultado(texto, cor){
    const span = document.getElementById("resultado");
    span.innerHTML = texto;
    span.style.color = cor;
}

function verificaDigitoRepetido(cpf){
    return cpf.split('').every((d) => d === cpf[0]);
}

function calculaDigitoVerificador(cpf, posicao) {
    const sequencia = cpf.slice(0, 8 + posicao). split('');

    let soma = 0;
    let multiplicador = 9 + posicao;

    for (const numero of sequencia){
        soma += multiplicador * Number(numero);
        multiplicador--;
    }

    const  restoDivisao = (soma * 10 ) % 11;
    const  digito = cpf.slice(8 + posicao, 9 + posicao);

    return restoDivisao == digito;
}