var cron = require('node-cron');
cron.schedule('15 16 24 8 THU', () => {
  console.log('running every second');
});


// 12 bje raat ko mail jae 