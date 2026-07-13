import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>☸️ ClusterSight</h2>

      <nav>
        <NavLink to="/" end>
          Dashboard
        </NavLink>

        <NavLink to="/pods">
          Pods
        </NavLink>

        <NavLink to="/nodes">
          Nodes
        </NavLink>

        <NavLink to="/deployments">
          Deployments
        </NavLink>

        <NavLink to="/services">
          Services
        </NavLink>

        <NavLink to="/events">
           Events
        </NavLink>

        <NavLink to="/logs">
          Logs
        </NavLink>

      </nav>
    </aside>
  );
}

export default Sidebar;