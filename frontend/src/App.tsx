
import { useMemo, useState } from "react";
import "./App.css";

type Parameter = {
  name: string;
  value: number;
  unit: string;
  group: string;
};

const demoParameters: Parameter[] = [
  { name: "WBT Calculated", value: 17.814, unit: "°C", group: "Cooling Performance" },
  { name: "WBT Measured", value: 17.852, unit: "°C", group: "Cooling Performance" },
  { name: "Process Load", value: 62.273, unit: "%", group: "Cooling Performance" },
  { name: "Supply Temperature", value: 21.900, unit: "°C", group: "Cooling Performance" },
  { name: "Circulation Flow", value: 5921.986, unit: "m³/h", group: "Cooling Performance" },
  { name: "Supply Pressure", value: 2.788, unit: "bar", group: "Cooling Performance" },
  { name: "Range", value: 7.219, unit: "°C", group: "Cooling Performance" },
  { name: "Approach", value: 4.048, unit: "°C", group: "Cooling Performance" },
  { name: "Makeup Flow", value: 98.638, unit: "m³/h", group: "Water Balance" },
  { name: "Blowdown Flow", value: 18.306, unit: "m³/h", group: "Water Balance" },
  { name: "Basin Level", value: 70.036, unit: "%", group: "Water Balance" },
  { name: "Makeup Valve", value: 48.748, unit: "%", group: "Water Balance" },
  { name: "Blowdown Valve", value: 20.955, unit: "%", group: "Water Balance" },
  { name: "Estimated Evaporation", value: 73.334, unit: "m³/h", group: "Water Balance" },
  { name: "Unaccounted Water", value: -0.108, unit: "m³/h", group: "Water Balance" },
  { name: "Makeup Conductivity", value: 222.237, unit: "µS/cm", group: "Water Quality" },
  { name: "Basin Conductivity", value: 1118.032, unit: "µS/cm", group: "Water Quality" },
  { name: "Supply Conductivity", value: 1114.139, unit: "µS/cm", group: "Water Quality" },
  { name: "Return Conductivity", value: 1117.735, unit: "µS/cm", group: "Water Quality" },
  { name: "pH", value: 8.074, unit: "pH", group: "Water Quality" },
  { name: "ORP", value: 649.239, unit: "mV", group: "Water Quality" },
  { name: "Free Chlorine", value: 0.532, unit: "mg/L", group: "Water Quality" },
  { name: "Basin Hardness", value: 499.107, unit: "mg/L", group: "Water Quality" },
  { name: "Basin Alkalinity", value: 413.343, unit: "mg/L", group: "Water Quality" },
  { name: "Basin Silica", value: 69.922, unit: "mg/L", group: "Water Quality" },
  { name: "Iron", value: 0.148, unit: "mg/L", group: "Water Quality" },
  { name: "Corrosion Rate", value: 0.747, unit: "mpy", group: "Water Quality" },
  { name: "Basin Turbidity", value: 5.775, unit: "NTU", group: "Filtration" },
  { name: "Basin TSS", value: 8.377, unit: "mg/L", group: "Filtration" },
  { name: "Return Turbidity", value: 3.886, unit: "NTU", group: "Filtration" },
  { name: "Supply Turbidity", value: 2.893, unit: "NTU", group: "Filtration" },
  { name: "Filter Inlet TSS", value: 9.195, unit: "mg/L", group: "Filtration" },
  { name: "Filter Inlet Turbidity", value: 6.607, unit: "NTU", group: "Filtration" },
  { name: "Filter Outlet Turbidity", value: 1.927, unit: "NTU", group: "Filtration" },
  { name: "Oil in Water", value: 0.090, unit: "ppm", group: "Filtration" },
  { name: "Filter Differential Pressure", value: 19.783, unit: "kPa", group: "Filtration" },
  { name: "Filter Flow", value: 519.395, unit: "m³/h", group: "Filtration" },
  { name: "Backwash Flow", value: 0, unit: "m³/h", group: "Filtration" },
  { name: "Cleaning Active", value: 0, unit: "state", group: "Filtration" },
  { name: "Cleaning Count", value: 0, unit: "count", group: "Filtration" },
  { name: "Filter Removal Efficiency", value: 70.835, unit: "%", group: "Filtration" },
  { name: "Fan Speed", value: 61.560, unit: "%", group: "Fans & Pumps" },
  { name: "Fan Power", value: 21.704, unit: "kW", group: "Fans & Pumps" },
  { name: "Fan Current", value: 31.855, unit: "A", group: "Fans & Pumps" },
  { name: "Fan Vibration", value: 1.776, unit: "mm/s", group: "Fans & Pumps" },
  { name: "Pump Speed", value: 79.805, unit: "%", group: "Fans & Pumps" },
  { name: "Pump Power", value: 102.615, unit: "kW", group: "Fans & Pumps" },
  { name: "Pump Current", value: 141.908, unit: "A", group: "Fans & Pumps" },
  { name: "Pump Vibration", value: 1.764, unit: "mm/s", group: "Fans & Pumps" },
  { name: "Fan Specific Energy", value: 3.665, unit: "kWh/1000m³", group: "Energy & Calculated" },
  { name: "Pump Specific Energy", value: 17.328, unit: "kWh/1000m³", group: "Energy & Calculated" },
  { name: "Cycles of Concentration", value: 5.031, unit: "ratio", group: "Energy & Calculated" },
  { name: "Approx. CoC Flow", value: 5.388, unit: "m³/h", group: "Energy & Calculated" },
  { name: "CoC Mismatch", value: 7.106, unit: "%", group: "Energy & Calculated" },
  { name: "Return Conductivity Delta", value: 3.596, unit: "µS/cm", group: "Energy & Calculated" },
  { name: "Specific Biocide", value: 0.007, unit: "L/m³", group: "Chemical Dosing" },
  { name: "Biocide Flow", value: 0.678, unit: "L/h", group: "Chemical Dosing" },
  { name: "Acid Flow", value: 0.291, unit: "L/h", group: "Chemical Dosing" },
  { name: "Chemical Tank Level", value: 90.923, unit: "%", group: "Chemical Dosing" },
  { name: "LSI Engineering Index", value: 1.423, unit: "index", group: "Energy & Calculated" },
  { name: "Synthetic Corrosion Risk", value: 34.492, unit: "index", group: "Energy & Calculated" },
  { name: "Synthetic Biological Risk", value: 23.235, unit: "index", group: "Energy & Calculated" },
  { name: "WBT Sensor Error", value: 0.038, unit: "°C", group: "Energy & Calculated" },
  { name: "Basin Conductivity Rate of Change", value: 0, unit: "µS/cm/h", group: "Energy & Calculated" },
  { name: "Filter DP Rate of Change", value: 0, unit: "kPa/h", group: "Energy & Calculated" },
  { name: "Theoretical Blowdown Saving", value: 1.897, unit: "m³/h", group: "Energy & Calculated" },
  { name: "Recommended CoC (test only)", value: 5, unit: "ratio", group: "Energy & Calculated" },
  { name: "Target Makeup Flow (1h)", value: 98.516, unit: "m³/h", group: "Forecast & Reference" },
  { name: "Target Supply Temperature (1h)", value: 21.518, unit: "°C", group: "Forecast & Reference" },
  { name: "Target Approach (1h)", value: 4.143, unit: "°C", group: "Forecast & Reference" },
  { name: "Target Filter DP (1h)", value: 19.916, unit: "kPa", group: "Forecast & Reference" },
  { name: "Target ORP (1h)", value: 646.905, unit: "mV", group: "Forecast & Reference" },
  { name: "Makeup Reference P10", value: 94.575, unit: "m³/h", group: "Forecast & Reference" },
  { name: "Makeup Reference P50", value: 98.516, unit: "m³/h", group: "Forecast & Reference" },
  { name: "Makeup Reference P90", value: 102.456, unit: "m³/h", group: "Forecast & Reference" },
  { name: "Supply Temperature Reference P10", value: 21.218, unit: "°C", group: "Forecast & Reference" },
  { name: "Supply Temperature Reference P50", value: 21.518, unit: "°C", group: "Forecast & Reference" },
  { name: "Supply Temperature Reference P90", value: 21.818, unit: "°C", group: "Forecast & Reference" },
];

const groups = [
  "Cooling Performance",
  "Water Balance",
  "Water Quality",
  "Filtration",
  "Fans & Pumps",
  "Chemical Dosing",
  "Energy & Calculated",
  "Forecast & Reference",
];

function getPhStatus(value: number) {
  // Example display limits only; confirm actual operating limits with the plant.
  if (value >= 7 && value <= 8.5) return "Good";
  if ((value >= 6.5 && value < 7) || (value > 8.5 && value <= 9)) return "Warning";
  return "Bad";
}

function App() {
  const [page, setPage] = useState("Live Parameters");
  const [selectedGroup, setSelectedGroup] = useState("All Parameters");
  const [search, setSearch] = useState("");

  const visibleParameters = useMemo(() => {
    return demoParameters.filter((p) => {
      const groupMatches =
        selectedGroup === "All Parameters" || p.group === selectedGroup;
      const searchMatches = p.name.toLowerCase().includes(search.toLowerCase());
      return groupMatches && searchMatches;
    });
  }, [selectedGroup, search]);

  const ph = demoParameters.find((p) => p.name === "pH")!;
  const phStatus = getPhStatus(ph.value);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">S</div>
          <div>
            <strong>SMAYA.ai</strong>
            <small>COOLING WATER SCADA</small>
          </div>
        </div>

        <p className="menu-heading">MENU</p>
        <button
          className={`menu-item ${page === "Dashboard" ? "active" : ""}`}
          onClick={() => setPage("Dashboard")}
        >
          <span>▦</span> Dashboard
        </button>
        <button
          className={`menu-item ${page === "Live Parameters" ? "active" : ""}`}
          onClick={() => setPage("Live Parameters")}
        >
          <span>◉</span> Live Parameters
        </button>

        <div className="sidebar-bottom">
          <span className="status-dot" />
          Demo mode
          <small>Hardware not connected</small>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">MONITORING / PARAMETERS</p>
            <h1>{page}</h1>
          </div>
          <span className="demo-badge">DEMO DATA</span>
        </header>

        {page === "Dashboard" ? (
          <section className="empty-panel">
            <h2>Dashboard</h2>
            <p>
              This first version focuses on Live Parameters. Select it from the
              menu to view the parameter values.
            </p>
            <button className="primary-button" onClick={() => setPage("Live Parameters")}>
              Open Live Parameters
            </button>
          </section>
        ) : (
          <>
            <section className="notice">
              <strong>Sample data only</strong>
              <span>
                These values are taken from the uploaded synthetic dataset.
                They are not live sensor readings.
              </span>
            </section>

            <section className="summary-row">
              <div className="summary-card">
                <span>Total parameters</span>
                <strong>{demoParameters.length}</strong>
                <small>Across all groups</small>
              </div>
              <div className="summary-card">
                <span>Data source</span>
                <strong className="source-text">Excel demo</strong>
                <small>Real controller not connected</small>
              </div>
              <div className="summary-card">
                <span>pH example status</span>
                <strong className={`status-text ${phStatus.toLowerCase()}`}>
                  {phStatus}
                </strong>
                <small>Example limits only</small>
              </div>
            </section>

            <section className="parameter-section">
              <div className="section-title">
                <div>
                  <h2>Parameter values</h2>
                  <p>Choose a group or search for a parameter.</p>
                </div>
                <input
                  aria-label="Search parameters"
                  placeholder="Search parameters..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="group-tabs">
                {["All Parameters", ...groups].map((group) => (
                  <button
                    key={group}
                    className={selectedGroup === group ? "selected" : ""}
                    onClick={() => setSelectedGroup(group)}
                  >
                    {group}
                  </button>
                ))}
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Value</th>
                      <th>Unit</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleParameters.map((p) => (
                      <tr key={p.name}>
                        <td>{p.name}</td>
                        <td className="value-cell">{p.value.toLocaleString("en-IN", {
                          maximumFractionDigits: 3,
                        })}</td>
                        <td>{p.unit}</td>
                        <td>
                          {p.name === "pH" ? (
                            <span className={`pill ${phStatus.toLowerCase()}`}>
                              {phStatus}
                            </span>
                          ) : (
                            <span className="pill unset">Limit not set</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {visibleParameters.length === 0 && (
                      <tr>
                        <td colSpan={4} className="no-results">
                          No matching parameters found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <p className="table-footnote">
                Status limits have not been configured for the other parameters.
                A displayed value alone does not determine whether a parameter is safe.
              </p>
            </section>

            <section className="range-section">
              <div className="section-title">
                <div>
                  <p className="eyebrow">EXAMPLE LIMIT CONFIGURATION</p>
                  <h2>pH operating zones</h2>
                  <p>Current demo pH: <strong>{ph.value.toFixed(2)}</strong></p>
                </div>
                <span className={`pill ${phStatus.toLowerCase()}`}>{phStatus}</span>
              </div>

              <div className="range-bar" aria-label="Example pH zones">
                <div className="zone bad-zone">Bad<br /><small>Below 6.5</small></div>
                <div className="zone warning-zone">Warning<br /><small>6.5–7.0</small></div>
                <div className="zone good-zone">Good<br /><small>7.0–8.5</small></div>
                <div className="zone warning-zone">Warning<br /><small>8.5–9.0</small></div>
                <div className="zone bad-zone">Bad<br /><small>Above 9.0</small></div>
              </div>
              <p className="range-note">
                These are illustrative thresholds for the interface only. Replace
                them with limits approved for the actual cooling-water treatment
                process before using this page operationally.
              </p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;