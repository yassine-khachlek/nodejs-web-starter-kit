var os = require('os');

function loadAvgCpus(){

    var cpus = os.cpus();

    var total=0;
    var idle =0;

    for (var i = 0; i<cpus.length ; i++) {
        Object.keys(cpus[i].times).forEach(function(type){
          total += parseFloat(cpus[i].times[type]);
        });
        idle += parseFloat(cpus[i].times.idle);
    };

    return {idle: idle, total: total};

}

var firstCpusMeasure = loadAvgCpus();

function socketEmitGauValue(socket){

    
    var secondCpusMeasure = loadAvgCpus();
    var cpusIdleDiff = secondCpusMeasure.idle - firstCpusMeasure.idle;
    var cpusTotalDiff = secondCpusMeasure.total - firstCpusMeasure.total;
    var usedCpus = 100 - ((cpusIdleDiff / cpusTotalDiff)*100);
    var secondCpusMeasure = loadAvgCpus();

    socket.emit('gaugeValue', {
        loadavg: os.loadavg(),
        totalmem: os.totalmem(),
        freemem: os.freemem(),
        cpus: os.cpus(),
        loadavgcpus: {used: usedCpus},
    });

}

var IO = function (io) {
 
  io.on('connection', function (socket) {

    socketEmitGauValue(socket);

    var setIntervalGaugeValue = setInterval(function(socket){

        socketEmitGauValue(socket);

    }, 1500, socket); 

  });

};

module.exports = IO;