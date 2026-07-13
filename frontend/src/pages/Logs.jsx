import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { getPods } from "../services/podService";
import socket from "../services/socket";

import LogViewer from "../components/ui/LogViewer";

function Logs() {
  const location = useLocation();

  const [pods, setPods] = useState([]);
  const [namespace, setNamespace] = useState("");
  const [pod, setPod] = useState("");
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [paused, setPaused] = useState(false);

  const [connected, setConnected] = useState(
    socket.connected
  );

  const selectedNamespace =
    location.state?.namespace;

  const selectedPod =
    location.state?.pod;

  // -----------------------------
  // Fetch Pods
  // -----------------------------
  useEffect(() => {
    const fetchPods = async () => {
      try {
        const data = await getPods();

        setPods(data);

        if (selectedNamespace) {
          setNamespace(selectedNamespace);
        } else if (data.length > 0) {
          setNamespace(data[0].namespace);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPods();
  }, [selectedNamespace]);

  // -----------------------------
  // Namespaces
  // -----------------------------
  const namespaces = useMemo(() => {
    return [...new Set(pods.map((p) => p.namespace))];
  }, [pods]);

  // -----------------------------
  // Pods in Namespace
  // -----------------------------
  const namespacePods = useMemo(() => {
    return pods.filter(
      (p) => p.namespace === namespace
    );
  }, [pods, namespace]);

  // -----------------------------
  // Auto Select Pod
  // -----------------------------
  useEffect(() => {
    if (selectedPod) {
      setPod(selectedPod);
    } else if (namespacePods.length > 0) {
      setPod(namespacePods[0].name);
    }
  }, [namespacePods, selectedPod]);

  // -----------------------------
  // Socket Events
  // -----------------------------
  useEffect(() => {
    const handleConnect = () =>
      setConnected(true);

    const handleDisconnect = () =>
      setConnected(false);

    const handleLogs = (data) => {
      if (paused) return;

      setLogs((prev) => [
        ...prev,
        ...data
          .split("\n")
          .filter((line) => line.trim() !== ""),
      ]);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("logData", handleLogs);

    setConnected(socket.connected);

    return () => {
      socket.off("connect", handleConnect);
      socket.off(
        "disconnect",
        handleDisconnect
      );
      socket.off("logData", handleLogs);
    };
  }, [paused]);

  // -----------------------------
  // Stream Logs
  // -----------------------------
  useEffect(() => {
    if (!pod) return;

    setLogs([]);

    socket.emit("streamLogs", {
      namespace,
      name: pod,
    });

    return () => {
      socket.emit("stopLogs");
    };
  }, [namespace, pod]);

  // -----------------------------
  // Copy
  // -----------------------------
  const copyLogs = async () => {
    try {
      await navigator.clipboard.writeText(
        logs.join("\n")
      );

      toast.success("Logs copied!");
    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to copy logs."
      );
    }
  };

  // -----------------------------
  // Download
  // -----------------------------
  const downloadLogs = () => {
    const blob = new Blob(
      [logs.join("\n")],
      {
        type: "text/plain",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = `${
      pod || "logs"
    }.txt`;

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Live Log Explorer</h1>

          <p>
            Stream Kubernetes Pod Logs
          </p>
        </div>
      </div>

      <div className="log-controls">
        <select
          value={namespace}
          onChange={(e) =>
            setNamespace(
              e.target.value
            )
          }
        >
          {namespaces.map((ns) => (
            <option
              key={ns}
              value={ns}
            >
              {ns}
            </option>
          ))}
        </select>

        <select
          value={pod}
          onChange={(e) =>
            setPod(e.target.value)
          }
        >
          {namespacePods.map((p) => (
            <option
              key={p.name}
              value={p.name}
            >
              {p.name}
            </option>
          ))}
        </select>

        <input
          className="search-box"
          placeholder="Search Logs..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </div>

      <LogViewer
        logs={logs}
        search={search}
        paused={paused}
        connected={connected}
      />

      <div className="drawer-actions">
        <button
          className="action-btn"
          onClick={copyLogs}
        >
          📋 Copy
        </button>

        <button
          className="action-btn"
          onClick={downloadLogs}
        >
          💾 Download
        </button>

        <button
          className="action-btn"
          onClick={() =>
            setLogs([])
          }
        >
          🗑 Clear
        </button>

        <button
          className="action-btn secondary"
          onClick={() =>
            setPaused(
              (prev) => !prev
            )
          }
        >
          {paused
            ? "▶ Resume"
            : "⏸ Pause"}
        </button>
      </div>
    </div>
  );
}

export default Logs;