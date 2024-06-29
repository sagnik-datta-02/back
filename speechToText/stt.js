const {Leopard} = require("@picovoice/leopard-node");


const handle = new Leopard('a4/zI3eyk/sIvZRTu8MTwB4q723HFT3/tu4SmlsqN+cf8OjMlbkRQQ==');


const result = handle.processFile(audioPath);
console.log(result.transcript);