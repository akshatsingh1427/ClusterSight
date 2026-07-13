const { spawn } = require("child_process");

function initializeSocket(io) {
  io.on("connection", (socket) => {
    console.log("Client Connected:", socket.id);

    let logProcess = null;

    socket.on("streamLogs", ({ namespace, name }) => {
      console.log(`Streaming logs for ${namespace}/${name}`);

      // Kill previous stream if one exists
      if (logProcess) {
        logProcess.kill();
      }

      logProcess = spawn("kubectl", [
        "logs",
        "-f",
        name,
        "-n",
        namespace,
        "--tail=100",
      ]);

      logProcess.stdout.on("data", (data) => {
        socket.emit("logData", data.toString());
      });

      logProcess.stderr.on("data", (data) => {
        socket.emit("logData", `ERROR: ${data}`);
      });

      logProcess.on("close", () => {
        console.log("Log stream closed");
      });
    });

    socket.on("stopLogs", () => {
      if (logProcess) {
        logProcess.kill();
        logProcess = null;
      }
    });

    socket.on("disconnect", () => {
      console.log("Client Disconnected:", socket.id);

      if (logProcess) {
        logProcess.kill();
        logProcess = null;
      }
    });
  });
}

module.exports = initializeSocket;