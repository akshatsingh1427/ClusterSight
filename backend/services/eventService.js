const { exec } = require("child_process");
const util = require("util");

const execAsync = util.promisify(exec);

const getAllEvents = async () => {
  const { stdout } = await execAsync(
    "kubectl get events -A -o json"
  );

  const events = JSON.parse(stdout);

  return events.items
    .sort(
      (a, b) =>
        new Date(b.lastTimestamp || b.eventTime || b.metadata.creationTimestamp) -
        new Date(a.lastTimestamp || a.eventTime || a.metadata.creationTimestamp)
    )
    .map((event) => ({
      namespace: event.metadata.namespace,

      type: event.type,

      reason: event.reason,

      object:
        event.involvedObject.kind +
        "/" +
        event.involvedObject.name,

      message: event.message,

      time:
        event.lastTimestamp ||
        event.eventTime ||
        event.metadata.creationTimestamp,
    }));
};

module.exports = {
  getAllEvents,
};