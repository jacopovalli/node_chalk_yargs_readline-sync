const fs = require('fs');
const readlineSync = require('readline-sync');
const chalk = require('chalk');

function get (yargs){
    yargs.command({
        command: 'get',
        describe: "Ricerca Cliente",
        builder: {
            nome: {
                describe: "nome del cliente",
                demandOption: false,
                type: 'string'
            },
            cognome: {
                describe: "cognome dell'utente",
                demandOption: false,
                type: 'string'
            },
            email: {
                describe: "email dell'utente",
                demandOption: false,
                type: 'string'
            },
        },

        handler(argv){
            const ris = getCliente(argv.nome, argv.cognome, argv.email);

            if(argv.nome && argv.cognome && argv.email){
                console.log(chalk.red.bold('\n Ricercare per Nome e Cognome, oppure per Email\n'));
            }else{
                if(ris.status){
                    console.log(chalk.green.bold('\n Clienti Trovati:\n'));
                    ris.clients.forEach((cliente =>{
                        console.log(chalk.magenta(`\n Nome: ${cliente.nome}\n Cognome: ${cliente.cognome}\n Email: ${cliente.email}`));
                        if (cliente.telefono){
                            console.log(chalk.magenta(` Telefono: ${cliente.telefono}\n`));
                        }
                    }))
                }else{
                    console.log(chalk.red.bold('\n Nessun Cliente Trovato\n'));
                }
            }
        }
    })
}

function getCliente(nome, cognome, email){
    const clientiJSON = fs.readFileSync('clienti.json', 'utf-8');
    const clienti = JSON.parse(clientiJSON);

    let clients = [];

    clienti.forEach((singoloCliente => {
        if((singoloCliente.nome.toLowerCase() === nome.toLowerCase() && singoloCliente.cognome.toLowerCase() === cognome.toLowerCase())){
            clients.push(singoloCliente);
        }else if ((singoloCliente.email.toLowerCase() === email.toLowerCase())){
            clients.push(singoloCliente);
        }
    }));

    const ris = {status: false, clients: []};

    if(clients.length > 0){
        ris.status = true;
        ris.clients = clients;

        return ris;
    }else{
        ris.status = false;
        ris.clients = [];

        return ris;
    }
}

module.exports = get;
