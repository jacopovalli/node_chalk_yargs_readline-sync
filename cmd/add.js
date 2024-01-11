const fs = require('fs');
const readlineSync = require('readline-sync');
const chalk = require('chalk');

function add(yargs){
    yargs.command({
        command: 'add',
        describe: 'Aggiungi un cliente',
        builder: {
            nome: {
                describe: 'nome del cliente',
                demandOption: false,
                type: 'string'
            },

            cognome: {
                describe: 'cognome del cliente',
                demandOption: false,
                type: 'string'
            },

            email: {
                describe: 'email del cliente',
                demandOption: false,
                type: 'string'
            },

            telefono: {
                describe: 'telefono del cliente',
                demandOption: false,
                type: 'string'
            }
        },

        handler(argv){
            const passwordCorretta = 'root';
            let attemptCount = 0;
            let maxAttempts = 3;

            while (attemptCount < maxAttempts) {
                const password = readlineSync.question(chalk.cyan.bold('\n Inserire Password: '), { hideEchoBack: true, mask: '' });

                if (password === passwordCorretta) {
                    addCliente(argv);
                    return;
                } else {
                    attemptCount++;
                    let attemptsLeft = maxAttempts - attemptCount;

                    if (attemptsLeft > 0){
                        console.log(chalk.yellow.bold(`\n Password Errata. ${attemptsLeft} tentativo(i) rimasti. Riprovare.`));
                    }else{
                        console.log(chalk.red.bold('\n Password Errata dopo 3 tentativi. Accesso negato.'));
                    }
                }
            }
        }
    })
}

function addCliente({nome, cognome, email, telefono}){
    const clientiJSON = fs.readFileSync('clienti.json', 'utf-8');
    const clienti = JSON.parse(clientiJSON);

    const clienteEsistente = clienti.find(cliente => cliente.nome.toLowerCase() === nome.toLowerCase() && cliente.cognome.toLowerCase() === cognome.toLowerCase() && cliente.email.toLowerCase() === email.toLowerCase());

    if(clienteEsistente){
        console.log(chalk.red.bold('\n Cliente già registrato\n'));
    }else if (nome && cognome && email){
        clienti.push({nome, cognome, email, telefono});
        fs.writeFileSync('clienti.json', JSON.stringify(clienti));

        if(telefono === undefined){
            console.log(chalk.green.bold("\n E' stato aggiunto un Cliente:\n"));
            console.log(chalk.magenta(` Nome: ${nome}\n Cognome: ${cognome}\n Email:${email}\n Telefono: –\n`));
        }else{
            console.log(chalk.green.bold("\n E' stato aggiunto un Cliente:\n"));
            console.log(chalk.magenta(` Nome: ${nome}\n Cognome: ${cognome}\n Email:${email}\n Telefono: ${telefono}\n`));
        }
    }else{
        console.log(chalk.red.bold('\n Nome, Cognome ed Email sono dati necessari per aggiungere un cliente\n'));
    }
}

module.exports = add;