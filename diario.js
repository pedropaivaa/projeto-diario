let prompt = require('prompt-sync')();

let atividades = [];

function addAtividade(atividade, data, categoria) {
    atividades.push(
        {
            atividade: atividade,
            data: data,
            comentario: [],
            realizacao: 0,
            nota: [],
            meta: [],
            categoria: categoria
        }
    )
    console.log('atividade adicionada com sucesso')
}

//percorrer a atividade
function iterarAtividade() {
    let percorrer = [];
    for (let i = 0; i < atividades.length; i++) {
        let atividade = atividades[i];
        let numeroAtvd = i + 1;
        percorrer.push({atividade, numeroAtvd})
    }
    return percorrer;
}

// Função auxiliar para encontrar uma atividade pelo número
function acharAtividadePeloNumero(numeroAtvd) {
    return atividades[numeroAtvd - 1]
}


// Função auxiliar para verificar se um número de atividade é válido
function numeroValido(numeroAtvd) {
    return  numeroAtvd > 0 && numeroAtvd <= atividades.length;
    // if(numeroAtvd > 0 && numeroAtvd < atividades.length) {
    //     return true;
    // } else {
    //     console.log('Número da Atividade inválida!');
    //     return false;
    //     }
}

//function para listar as atividades
function atividadesAdicionadas() {
    console.log('Lista de Atividade:');
    iterarAtividade(function() {
        console.log(`#${numeroAtvd} - Atividade: ${atividade.atividade}, Data: ${atividade.data}`);
    });
    // for(let i = 0; i < atividades.length; i++) {
    //     let atividade = atividades[i];
    //     let numeroAtvd = i + 1;
    //     console.log(`#${numeroAtvd} - Atividade: ${atividade.atividade}, Data: ${atividade.data}`);
    // }
}

//function para adicionar nota
function addNota(numeroAtvd, nota) {
    if(numeroValido(numeroAtvd)){
        acharAtividadePeloNumero(numeroAtvd).nota.push(nota);
        console.log('Nota adiconada com sucesso :)')
    }
    // if(numeroAtvd >= 1 && numeroAtvd <= atividades.length) {
    //     atividades[numeroAtvd - 1].nota.push(notas);
    //     console.log('Nota adicionada com sucesso :)');
    // } else {
    //     console.log('Não encontramos sua atividade!')
    // }
}

//function para adicionar meta
function addMeta(numeroAtvd, meta) {
    if(numeroValido(numeroAtvd)){
        acharAtividadePeloNumero(numeroAtvd).meta.push(meta);
        console.log('Meta adiconada com sucesso :)')
    }
    // if(numeroAtvd >= 1 && numeroAtvd <= atividades.length) {
    //     atividades[numeroAtvd - 1].meta.push(metas);
    //     console.log('Meta adicionada com sucesso :)');
    // } else {
    //     console.log('Não encontramos sua atividade!')
    // }
}


//function para adicionar comentario
function addComentario(numeroAtvd, comentario) {
    if(numeroValido(numeroAtvd)){
        acharAtividadePeloNumero(numeroAtvd).comentario.push(comentario);
        console.log('Comentário adiconada com sucesso :)')
    }
    // if(numeroAtvd >= 1 && numeroAtvd <= atividades.length) {
    //     atividades[numeroAtvd - 1].comentario.push(comentarios);
    //     console.log('Comentário adicionada com sucesso :)');
    // } else {
    //     console.log('Não encontramos sua atividade!')
    // }
}

//function para adicionar a categoria
function addCategoria(numeroAtvd, categoria) {
    if(numeroValido(numeroAtvd)){
        acharAtividadePeloNumero(numeroAtvd).categoria.push(categoria);
        console.log('Categoria adiconada com sucesso :)')
    }
}
function relatorioCategoria() {
    let categoriaRelatorio = {};
    iterarAtividade(function(){
        for(let c = 0; c < atividade.categoria.length; c++){
            let categoria = atividade.categoria[c];
            if(!categoriaRelatorio[categoria]){
                categoriaRelatorio[categoria] = {
                    totalHoras: 0,
                    atividades: []
                };
            }
            categoriaRelatorio[categoria].totalHoras += atividade.realizacao;
            categoriaRelatorio[categoria].atividade.push({
                atividade: atividade.atividade,
                realizacao: atividade.realizacao
            });
        }
    });
    for(categoria in categoriaRelatorio) {
        console.log(`categoria ${categoria}`);
        console.log(`Horas ao tyotal: ${categoriaRelatorio[categoria].totalHoras} horas`)
        console.log('Atividades:');
        for (let atividade of categoriaRelatorio[categoria].atividades) {
            console.log(`- Atividade: ${atividade.atividade}, Realização: ${atividade.realizacao} horas`);
        }

    }
}
        

//function para ve atividade em um periodo de tempo
function visualizarAtividadeNoTempo(data){
    // let atividadeNoTempo = [];
    let achouAtividade = false;
    for(let i = 0; i < atividades.length; i++) {
        let atividade = atividades[i];
        if(atividade.data === data) {
            achouAtividade = true;
            let numeroAtvd = i + 1;
            console.log(`#${numeroAtvd} - Atividade: ${atividade.atividade}, Data: ${atividade.data}`);
            console.log(`Notas: ${atividade.nota}`);
            console.log(`Metas: ${atividade.meta}`);
            console.log(`Realização: ${atividade.realizacao} horas`);
            console.log(`Comentários: ${atividade.comentario}`);
        }
        if(!achouAtividade) {
            console.log("nao achamos nenhuma ativdade")
        }
    }

    // if(atividadeNoTempo.length === 0 ) {
    //     console.log('Nao achamos nenhuma atividade nesta data')
    // }
    // } else {
    //     for(let i = 0; i < atividadeNoTempo.length; i ++) {
    //         let atividade = atividadeNoTempo[i];
    //         let numeroAtvd = i + 1;
    //         console.log(`#${numeroAtvd} - Atividade: ${atividade.atividade}, Data: ${atividade.data}`);
    //         console.log(`Notas: ${atividade.nota}`);
    //         console.log(`Metas: ${atividade.meta}`);
    //         console.log(`Realização: ${atividade.realizacao} horas`);
    //         console.log(`Comentários: ${atividade.comentario}`);
    //     }
    // }
}

//realizar horas em uma atividade específica
function realizarAtividade(numeroAtvd, horasRealizadas) {
    if(numeroValido(numeroAtvd)) {
        acharAtividadePeloNumero(numeroAtvd).realizacao += horasRealizadas;
        console.log(`Realização adcionada com sucesso`)
    } else {
        console.log("Número da atividaade invalida")
    }
    // if(numeroAtvd >= 1 && numeroAtvd <= atividades.length) {
    //     atividades[numeroAtvd - 1].realizacao += horasRealizadas;
    //     console.log(`Realização adicionada com sucesso para a atividade ${numeroAtvd}`)
    // } else {
    //     console.log('atividade nao encontrada :/')
    // }
}

//metas e realizacoes pt2
function metasRealizacoes(){
    console.log('Relatorio de Metas e Realizações')
    iterarAtividade(function() {
        let realizacao = atividade.realizacao;
        let meta = atividade.meta;
        console.log(`${numeroAtvd} - Atividade: ${atividade.atividade}`);
        console.log(`meta: ${meta} horas`);
        console.log(`Realizacao: ${realizacao} horas`)

        if(realizacao >= meta) {
            console.log('Parabens, meta alcancada! continue assim')
        } else {
            let naoAlcancou = meta - realizacao;
            console.log(`Ainda faltam ${naoAlcancou} para voce se superrar!.`);
        }
    });
}


function main() {
    console.log('Bem-vindo ao sistema de atividades!');

    while (true) {
        console.log('\nEscolha uma opção:');
        console.log('1. Adicionar atividade');
        console.log('2. Listar atividades');
        console.log('3. Adicionar nota');
        console.log('4. Adicionar meta');
        console.log('5. Adicionar comentário');
        console.log('6. Ver atividades em um período de tempo');
        console.log('7. Realizar horas em uma atividade');
        console.log('8. Relatório de metas e realizações');
        console.log('0. Sair');

        const opcao = parseInt(prompt('Opção: '));

        switch (opcao) {
            case 0:
                console.log('Encerrando o programa...');
                return;
            case 1:
                let atividade = prompt('Digite o nome da atividade: ');
                let data = prompt('Digite a data da atividade (no formato YYYY-MM-DD): ');
                let meta = parseFloat(prompt('Digite a meta de horas para esta atividade: '));
                addAtividade(atividade, data, meta);
                break;
            case 2:
                atividadesAdicionadas();
                break;
            case 3:
                let numNota = parseInt(prompt('Digite o número da atividade: '));
                let nota = prompt('Digite a nota a ser adicionada: ');
                addNota(numNota, nota);
                break;
            case 4:
                let numMeta = parseInt(prompt('Digite o número da atividade: '));
                let novaMeta = parseFloat(prompt('Digite a nova meta de horas: '));
                addMeta(numMeta, novaMeta);
                break;
            case 5:
                let numComentario = parseInt(prompt('Digite o número da atividade: '));
                let comentario = prompt('Digite o comentário a ser adicionado: ');
                addComentario(numComentario, comentario);
                break;
            case 6:
                let dataConsulta = prompt('Digite a data para consultar as atividades (no formato YYYY-MM-DD): ');
                visualizarAtividadeNoTempo(dataConsulta);
                break;
            case 7:
                let numRealizar = parseInt(prompt('Digite o número da atividade: '));
                let horasRealizadas = parseFloat(prompt('Digite as horas realizadas: '));
                realizarAtividade(numRealizar, horasRealizadas);
                break;
            case 8:
                metasRealizacoes();
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
                break;
        }
    }
}

main();