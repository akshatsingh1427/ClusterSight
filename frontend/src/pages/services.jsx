import { useEffect, useState } from "react";
import {
  getServices,
  getServiceDetails,
} from "../services/serviceService";

import ServiceDetails from "../components/ui/ServiceDetails";

function Services() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] =
    useState(null);
  const [search, setSearch] = useState("");

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = services.filter((service) =>
    service.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openService = async (namespace, name) => {
    try {
      const data = await getServiceDetails(
        namespace,
        name
      );

      setSelectedService(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="page">
        <div className="page-header">
          <div>
            <h1>Services</h1>

            <p>
              {filteredServices.length} Services Found
            </p>
          </div>

          <input
            className="search-box"
            placeholder="Search Services..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="table-container">
          <table className="pods-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Namespace</th>
                <th>Type</th>
                <th>Cluster IP</th>
                <th>Ports</th>
              </tr>
            </thead>

            <tbody>
              {filteredServices.map((service) => (
                <tr
                  key={`${service.namespace}-${service.name}`}
                  className="clickable-row"
                  onClick={() =>
                    openService(
                      service.namespace,
                      service.name
                    )
                  }
                >
                  <td>{service.name}</td>

                  <td>{service.namespace}</td>

                  <td>
                    <span className="status-badge running">
                      {service.type}
                    </span>
                  </td>

                  <td>{service.clusterIP}</td>

                  <td>
                    {Array.isArray(service.ports)
                      ? service.ports
                          .map((p) => p.port)
                          .join(", ")
                      : service.ports}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ServiceDetails
        service={selectedService}
        onClose={() =>
          setSelectedService(null)
        }
      />
    </>
  );
}

export default Services;