import { useEffect, useRef } from "react";

function LogViewer({
  logs,
  search,
  paused,
  connected,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!paused) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [logs, paused]);

  const filteredLogs = logs.filter((line) =>
    line.toLowerCase().includes(search.toLowerCase())
  );

  const getLogClass = (line) => {
    const text = line.toLowerCase();

    if (text.includes("error")) {
      return "log-error";
    }

    if (
      text.includes("warn") ||
      text.includes("warning")
    ) {
      return "log-warning";
    }

    if (
      text.includes("info") ||
      text.includes("started") ||
      text.includes("created") ||
      text.includes("pulled")
    ) {
      return "log-info";
    }

    return "log-default";
  };

  return (
    <div className="log-viewer">
      <div className="log-status">
        <span
          className={`status-badge ${
            connected ? "running" : "pending"
          }`}
        >
          {connected
            ? "🟢 Connected"
            : "🔴 Disconnected"}
        </span>
      </div>

      <div className="log-console">
        {filteredLogs.length === 0 ? (
          <p className="empty-log">
            Waiting for logs...
          </p>
        ) : (
          filteredLogs.map((line, index) => (
            <div
              key={index}
              className={`log-line ${getLogClass(
                line
              )}`}
            >
              {line}
            </div>
          ))
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default LogViewer;