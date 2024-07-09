let prompt = require('prompt-sync')();

let atividades = [];

// Função para adicionar uma nova atividade
function addAtividade(atividade, data, categoria) {
    atividades.push({
        atividade: atividade,
        data: data,
        comentario: [],
        realizacao: 0,
        nota: [],
        meta: [],
        categoria: categoria
    });
    console.log('Atividade adicionada com sucesso');
}

// Função para iterar sobre as atividades
function iterarAtividade() {
    let percorrer = [];
    for (let i = 0; i < atividades.length; i++) {
        let atividade = atividades[i];
        let numeroAtvd = i + 1;
        percorrer.push({ atividade, numeroAtvd });
    }
    return percorrer;
}

// Função auxiliar para encontrar uma atividade pelo número
function acharAtividadePeloNumero(numeroAtvd) {
    if (typeof numeroAtvd === 'number' && numeroAtvd > 0 && numeroAtvd <= atividades.length) {
        return atividades[numeroAtvd - 1];
    } else {
        console.log('Número de atividade inválido ou fora dos limites.');
        return null;
    }
}

// Função auxiliar para verificar se um número de atividade é válido
function numeroValido(numeroAtvd) {
    return numeroAtvd > 0 && numeroAtvd <= atividades.length;
}

// Função para listar as atividades
function atividadesAdicionadas() {
    console.log('Lista de Atividades:');
    let listAtividades = iterarAtividade();
    for (let i = 0; i < listAtividades.length; i++) {
        let numeroAtvd = listAtividades[i].numeroAtvd;
        let atividade = listAtividades[i].atividade;
        console.log(`#${numeroAtvd} - Atividade: ${atividade.atividade}, Data: ${atividade.data}`);
    }
}

// Função para adicionar nota a uma atividade
function addNota(numeroAtvd, nota) {
    if (numeroValido(numeroAtvd)) {
        let atividade = acharAtividadePeloNumero(numeroAtvd);
        atividade.nota.push(nota);
        console.log('Nota adicionada com sucesso :)');
    }
}

// Função para adicionar meta a uma atividade
function addMeta(numeroAtvd, meta) {
    if (numeroValido(numeroAtvd)) {
        let atividade = acharAtividadePeloNumero(numeroAtvd);
        if (atividade) {
            atividade.meta.push(meta);
            console.log('Meta adicionada com sucesso :)');
        } else {
            console.log(`Atividade não encontrada para o número ${numeroAtvd}.`);
        }
    }
}

// Função para adicionar comentário a uma atividade
function addComentario(numeroAtvd, comentario) {
    if (numeroValido(numeroAtvd)) {
        let atividade = acharAtividadePeloNumero(numeroAtvd);
        atividade.comentario.push(comentario);
        console.log('Comentário adicionado com sucesso :)');
    }
}

// Função para adicionar a categoria a uma atividade
function addCategoria(numeroAtvd, categoria) {
    if (numeroValido(numeroAtvd)) {
        let atividade = acharAtividadePeloNumero(numeroAtvd);
        atividade.categoria.push(categoria);
        console.log('Categoria adicionada com sucesso :)');
    }
}

// Função para gerar relatório de categorias e atividades
function relatorioCategoria() {
    let categorias = {};

    for (let atividade of atividades) {
        for (let categoria of atividade.categoria) {
            if (!categorias[categoria]) {
                categorias[categoria] = {
                    totalHoras: 0,
                    atividades: []
                };
            }
            categorias[categoria].totalHoras += atividade.realizacao;
            categorias[categoria].atividades.push({
                atividade: atividade.atividade,
                realizacao: atividade.realizacao
            });
        }
    }

    console.log('Relatório de Categorias e Atividades:');
    for (let categoria in categorias) {
        console.log(`Categoria: ${categoria}`);
        console.log(`Total de horas: ${categorias[categoria].totalHoras}`);
        console.log('Atividades:');
        for (let atividade of categorias[categoria].atividades) {
            console.log(`- Atividade: ${atividade.atividade}, Realização: ${atividade.realizacao} horas`);
        }
    }
}

// Função para visualizar atividades em um período de tempo
function visualizarAtividadeNoTempo(data) {
    let encontrouAtividade = false;
    for (let i = 0; i < atividades.length; i++) {
        let atividade = atividades[i];
        if (atividade.data === data) {
            encontrouAtividade = true;
            console.log(`#${i + 1} - Atividade: ${atividade.atividade}`);
            console.log(`Data: ${atividade.data}`);
            console.log(`Realização: ${atividade.realizacao} horas`);
            console.log(`Comentários: ${atividade.comentario}`);
        }
    }
    if (!encontrouAtividade) {
        console.log("Não foram encontradas atividades para a data especificada.");
    }
}

// Função para realizar uma atividade com um número específico de horas
function realizarAtividade(numeroAtvd, horasRealizadas) {
    if (numeroValido(numeroAtvd)) {
        let atividade = acharAtividadePeloNumero(numeroAtvd);
        atividade.realizacao += horasRealizadas;
        console.log(`Realização adicionada com sucesso`);
    } else {
        console.log("Número da atividade inválido");
    }
}

// Função para gerar relatório de metas e realizações
function metasRealizacoes() {
    console.log('Relatório de Metas e Realizações:');
    for (let i = 0; i < atividades.length; i++) {
        let atividade = atividades[i];
        console.log(`#${i + 1} - Atividade: ${atividade.atividade}`);
        console.log(`Meta: ${atividade.meta} horas`);
        console.log(`Realização: ${atividade.realizacao} horas`);
        if (atividade.realizacao >= atividade.meta) {
            console.log('Meta alcançada!');
        } else {
            console.log(`Faltam ${atividade.meta - atividade.realizacao} horas para alcançar a meta.`);
        }
    }
}

// Função para calcular frequência de uma atividade específica ao longo do tempo
function calcularFrequenciaAtividade(atividadeNome) {
    let frequencia = {};

    for (let i = 0; i < atividades.length; i++) {
        let atividade = atividades[i];
        if (atividade.atividade === atividadeNome) {
            let data = atividade.data;
            if (!frequencia[data]) {
                frequencia[data] = 0;
            }
            frequencia[data]++;
        }
    }

    console.log(`Frequência de '${atividadeNome}' ao longo do tempo:`);
    for (let data in frequencia) {
        console.log(`- Data: ${data}, Frequência: ${frequencia[data]} vezes`);
    }
}

// Função para mostrar resultados gerais
function mostrarResultado() {
    let tempoTotal = 0;
    let tipoAtividades = {};
    let countAtividades = {};

    for (let atividade of atividades) {
        tempoTotal += atividade.realizacao;

        if (!(atividade.categoria in tipoAtividades)) {
            tipoAtividades[atividade.categoria] = 0;
            countAtividades[atividade.categoria] = 0;
        }
        tipoAtividades[atividade.categoria] += atividade.realizacao;
        countAtividades[atividade.categoria] += 1;
    }

    console.log(`Tempo médio gasto por dia: ${(tempoTotal / atividades.length).toFixed(2)} horas`);
    console.log(`Número total de atividades: ${atividades.length}`);

    console.log('Tempo total gasto por tipo de atividade:');
    for (let tipo in tipoAtividades) {
        console.log(`- ${tipo}: ${tipoAtividades[tipo]} horas - ${countAtividades[tipo]} atividades`);
    }
}
function usuario() {
    let nome = prompt("Qual o seu nome?");
    console.log(`Bem vindo ao seu diário, ${nome} :)`);

    while (true) {
        console.log('\nMENU:');
        console.log("1. Adicionar nova atividade");
        console.log("2. Adicionar nota a uma atividade");
        console.log("3. Adicionar meta a uma atividade");
        console.log("4. Adicionar comentário a uma atividade");
        console.log("5. Listar todas as atividades");
        console.log("6. Realizar atividade");
        console.log("7. Visualizar atividades em um período de tempo");
        console.log("8. Gerar relatório de categorias e atividades");
        console.log("9. Gerar relatório de metas e realizações");
        console.log("10. Calcular frequência de uma atividade");
        console.log("11. Mostrar resultados gerais");
        console.log("0. Sair do programa");

        let escolha = prompt('Escolha uma opção com o número correspondente: ');

        switch (escolha) {
            case '1':
                let nomeAtividade = prompt("Digite o nome da atividade: ");
                let dataAtividade = prompt("Digite a data da atividade (formato YYYY-MM-DD): ");
                let categoriaAtividade = prompt("Digite a categoria da atividade: ");
                addAtividade(nomeAtividade, dataAtividade, categoriaAtividade);
                break;
            case '2':
                let numAtvdNota = parseInt(prompt("Digite o número da atividade para adicionar nota: "));
                let nota = prompt("Digite a nota a ser adicionada: ");
                addNota(numAtvdNota, nota);
                break;
            case '3':
                let numAtvdMeta = parseInt(prompt("Digite o número da atividade para adicionar a meta: "));
                let meta = parseFloat(prompt("Digite a meta em horas: "));
                addMeta(numAtvdMeta, meta);
                break;
            case '4':
                let numAtvdComentario = parseInt(prompt("Digite o número da atividade para adicionar comentário: "));
                let comentario = prompt("Digite o comentário a ser adicionado: ");
                addComentario(numAtvdComentario, comentario);
                break;
            case '5':
                atividadesAdicionadas();
                break;
            case '6':
                let numAtvdRealizacao = parseInt(prompt("Digite o número da atividade para realizar: "));
                let horasRealizadas = parseFloat(prompt("Digite as horas realizadas nesta atividade: "));
                realizarAtividade(numAtvdRealizacao, horasRealizadas);
                break;
            case '7':
                let dataConsulta = prompt("Digite a data para visualizar as atividades (formato YYYY-MM-DD): ");
                visualizarAtividadeNoTempo(dataConsulta);
                break;
            case '8':
                relatorioCategoria();
                break;
            case '9':
                metasRealizacoes();
                break;
            case '10':
                let nomeAtividadeFreq = prompt("Digite o nome da atividade para calcular a frequência: ");
                calcularFrequenciaAtividade(nomeAtividadeFreq);
                break;
            case '11':
                mostrarResultado();
                break;
            case '0':
                console.log("Saindo do programa...");
                return;
            default:
                console.log("Opção inválida. Por favor, escolha uma opção válida.");
        }
    }
}

// Exemplo de inicialização do programa
usuario();
