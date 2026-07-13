const { exec } = require("child_process");

const getNodeMetrics = () => {
  return new Promise((resolve, reject) => {
    exec("kubectl top nodes --no-headers", (error, stdout) => {
      if (error) {
        return reject(error);
      }

      const line = stdout.trim();

      if (!line) {
        return resolve(null);
      }

      const parts = line.split(/\s+/);

      resolve({
        cpu: parts[2],
        memory: parts[4],
      });
    });
  });
};

module.exports = {
  getNodeMetrics,
};