import Editor from "@monaco-editor/react";
import toast from "react-hot-toast";

function YamlViewer({
  open,
  yaml,
  title,
  onClose,
}) {
  if (!open) return null;

  const copyYaml = async () => {
    try {
      await navigator.clipboard.writeText(yaml);
      toast.success("YAML copied to clipboard!");
    } catch (err) {
      console.error(err);
    }
  };

  const downloadYaml = () => {
    const blob = new Blob([yaml], {
      type: "text/yaml",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `${title}.yaml`;

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="yaml-overlay">
      <div className="yaml-modal">

        <div className="yaml-header">

          <h2>
            📄 {title} YAML
          </h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <Editor
          height="70vh"
          defaultLanguage="yaml"
          value={yaml}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: {
              enabled: false,
            },
            fontSize: 14,
            wordWrap: "on",
            scrollBeyondLastLine: false,
          }}
        />

        <div className="yaml-actions">

          <button
            className="action-btn"
            onClick={copyYaml}
          >
            📋 Copy
          </button>

          <button
            className="action-btn secondary"
            onClick={downloadYaml}
          >
            💾 Download
          </button>

        </div>

      </div>
    </div>
  );
}

export default YamlViewer;