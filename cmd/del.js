const fs = require('fs');
const readlineSync = require('readline-sync');
const chalk = require('chalk');

function del(yargs){
    yargs.command({
        command: 'del',
        describe: 'Rimozione di un Cliente',
        builder: {
            nome: {
                describe: 'nome del cliente',
                demandOption: true,
            },

            cognome: {
                describe: 'nome del cliente',
                demandOption: true,
            },

            email: {
                describe: 'nome del cliente',
                demandOption: true,
            },
        },

        handler(argv){
            const passwordCorretta = 'root';
            let attemptCount = 0;
            let maxAttempts = 3;

            while (attemptCount < maxAttempts) {
                const password = readlineSync.question(chalk.cyan.bold('\n Inserire Password: '), { hideEchoBack: true, mask: '' });

                if (password === passwordCorretta) {
                    delCliente(argv.nome, argv.cognome, argv.email);
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

function delCliente(nome, cognome, email){
    const clientiJSON = fs.readFileSync('clienti.json', 'utf-8');
    const clienti = JSON.parse(clientiJSON);

    console.log("Clients before deletion:", clienti);

    const clienteIndex = clienti.findIndex(cliente => cliente.nome.toLowerCase() === nome.toLowerCase() && cliente.cognome.toLowerCase() === cognome.toLowerCase() && cliente.email.toLowerCase() === email.toLowerCase());

    const cliente = clienti.find(cliente => cliente.nome.toLowerCase() === nome.toLowerCase() && cliente.cognome.toLowerCase() === cognome.toLowerCase() && cliente.email.toLowerCase() === email.toLowerCase());

    // -1 sta ad indicare la mancata presenza di un elemento; ovvero, che non vi sono elementi (in questo caso, oggetti, cioè i clienti) nell'array di oggetti relativo al file JSON di partenza,tradotto attraverso il metodo .parse()
    if(clienteIndex === -1){
        console.log(chalk.red.bold('\n Nessun Cliente Trovato\n'));
        return;
    }else{
        clienti.splice(clienteIndex, 1);
        fs.writeFileSync('clienti.json', JSON.stringify(clienti));

        if(!cliente.telefono){
            console.log(chalk.green.bold("\n E' stato rimosso il cliente: \n"));
            console.log(chalk.magenta(` Nome: ${nome}\n Cognome: ${cognome}\n Email: ${email}\n Telefono: –\n`));
        }else{
            console.log(chalk.green.bold("\n E' stato rimosso il cliente: \n"));
            console.log(chalk.magenta(` Nome: ${nome}\n Cognome: ${cognome}\n Email: ${email}\n Telefono: ${cliente.telefono}\n`));
        }
    }
}

module.exports = del;
