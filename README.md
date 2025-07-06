# MoneyDashboard - Gestione delle Finanze Personali💰
## Descrizione del Progetto
MoneyDashboard è un'applicazione web sviluppata con Angular che ti permette di gestire le tue finanze personali e le tue spese su base mensile. Con MoneyDashboard, puoi monitorare le tue entrate e uscite, creare budget, e avere una visione chiara delle tue finanze per prendere decisioni informate.

## Caratteristiche Principali
- Monitoraggio delle Entrate e delle Uscite: Registra tutte le tue transazioni finanziarie.
- Visualizzazione Grafica: Grafici e tabelle per visualizzare l'andamento delle tue finanze.
- Report Mensili: Report dettagliati delle tue finanze mensili.

## Requisiti di Sistema
Node.js (versione 12.x o superiore)
Angular CLI (versione 10.x o superiore)

## Installazione e avvio del FE
Segui questi passaggi per clonare e avviare il progetto in locale:
- Clona il repository: git clone https://github.com/tuo-username/money-dashboard.git
- Esegui cd money-dashboard e installa le dipendenze, assicurati di avere Node.js installato, poi esegui: npm install
- avviare il backend(guarda sotto)
- Dopo aver installato le dipendenze, avvia il server di sviluppo Angular: ng serve
- Apri il tuo browser e naviga a http://localhost:4200. Ora puoi iniziare a utilizzare MoneyDashboard per gestire le tue finanze.

## Avviare il BE
Per avviare il backend è necessario seguire questi steps:
- installare le dipendenze --> cd BE => npm i
- avere docker attivo
- eseguire docker compose up(meglio da estensione di VSC)

Altrimenti disattivando il servizio di node sul docker compose potete fare:
- cd BE/src
- npm start index.ts --> server produzione
- nodemon index.ts --> server sviluppo(hot reload)

in tal caso dovete:
- recarvi in \BE\src\dbconnection.ts
- host: 'moneydashboard_postgres_db' => host: 'localhost',

## PORTE USATE
Le porte usate da tenere libere sono le seguenti:
- 4200 -> angular
- 3000 -> node
- 5432 -> postgress(docker)

## Script Utili
ng serve: Avvia il server di sviluppo.
ng build: Compila il progetto per la distribuzione.
ng test: Esegue i test unitari.
ng lint: Esegue il linting del codice per assicurare la conformità agli standard di codice.

## Contributi
I contributi sono benvenuti! Se desideri contribuire, per favore apri una issue o invia una pull request.

## Contatti
Per qualsiasi domanda o suggerimento, puoi contattare il team di sviluppo a [bacarotech@gmail.com].