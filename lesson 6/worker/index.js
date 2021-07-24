const { Worker } = require("worker_threads");

setTimeout(() => {
  const worker = new Worker("./worker.js", { workerData: { max: 1e9 } });
  worker.on("message", (message) => {
    console.log("worker message", message);
  });
  worker.postMessage("Молодец!");
}, 3000);

setInterval(() => {
  console.log("tick", new Date().getSeconds());
}, 1000);