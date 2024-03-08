var Agenda = require('agenda');

var connectionString = 'localhost:27017/newAgenda';
var agenda = new Agenda({ db: { address: connectionString, collection: 'jobs' } });

agenda.define('start new play', function (job) {
    console.log('new play agenda');
});

agenda.on('ready', function () {
agenda.every('2 seconds', 'start new play');


    agenda.start();
});

