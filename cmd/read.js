const fs = require('fs');
const chalk = require('chalk');

function read(yargs){
    yargs.command({
        command: 'read',
        describe: "Visualizza lista dei Clienti",

        handler(){
            readClienti();
        }
    })
}

function readClienti(){
    const clientiJSON = fs.readFileSync('clienti.json', 'utf-8');
    const clienti = JSON.parse(clientiJSON);

    if(clienti.length > 0){
        console.log(chalk.green.bold('\n Clienti:\n'));

        clienti.forEach((cliente =>{
            if(!cliente.telefono){
                console.log(chalk.magenta(`\n Nome: ${cliente.nome}\n Cognome: ${cliente.cognome}\n Email: ${cliente.email}\n Telefono: –\n`));
            }else{
                console.log(chalk.magenta(`\n Nome: ${cliente.nome}\n Cognome: ${cliente.cognome}\n Email: ${cliente.email}\n Telefono: ${cliente.telefono}`));
            }
        }))
    }else{
        console.log(chalk.red.bold('\n Nessun cliente nel Database\n'));
    }
}

module.exports = read;