import { useEffect, useMemo, useState } from "react";
import { getPods } from "../services/podService";
import PodTable from "../components/tables/PodTable";
import PodDetails from "../components/ui/PodDetails";

function Pods() {
  const [pods, setPods] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPod, setSelectedPod] = useState(null);

  const fetchPods = async () => {
    try {
      const data = await getPods();
      setPods(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPods();

    const interval = setInterval(fetchPods, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredPods = useMemo(() => {
    return pods.filter((pod) =>
      pod.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [pods, search]);

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Pods</h1>
          <p>{filteredPods.length} Pods Found</p>
        </div>

        <input
          type="text"
          placeholder="Search Pods..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
      </div>

      <div className="pods-layout">
            <PodTable
                pods={filteredPods}
                onSelectPod={setSelectedPod}
            />

            <PodDetails
                pod={selectedPod}
                onClose={() => setSelectedPod(null)}
            />
        </div>
    </>
  );
}

export default Pods;