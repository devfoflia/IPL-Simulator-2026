import React, { useState } from "react";

const TEAM_COLORS = {
  SRH: "#F7A721",
  GT: "#0B2135",
  PBKS: "#ED1B24",
  RCB: "#2B2A29",
  RR: "#EA1A85",
  CSK: "#FFFF00",
  KKR: "#3A225D",
  DC: "#00008B",
  MI: "#004BA0",
  LSG: "#0057E2",
};

const toDecimal = (ov) => {
  const str = (ov || "0").toString();
  if (!str.includes(".")) return parseFloat(str) || 0;
  const [overs, balls] = str.split(".").map(Number);
  return (overs || 0) + (balls || 0) / 6;
};

const initialData = {
  // Update these totals after every game from the official IPL standings
  standings: [
    {
      team: "SRH",
      p: 11,
      w: 7,
      l: 4,
      pts: 14,
      scored: 2100,
      faced: 210.0,
      conceded: 1950,
      bowled: 215.0,
    },
    {
      team: "GT",
      p: 11,
      w: 7,
      l: 4,
      pts: 14,
      scored: 1980,
      faced: 212.4,
      conceded: 1900,
      bowled: 218.2,
    },
    {
      team: "PBKS",
      p: 10,
      w: 6,
      l: 3,
      pts: 13,
      scored: 1850,
      faced: 195.0,
      conceded: 1740,
      bowled: 195.0,
    },
    {
      team: "RCB",
      p: 10,
      w: 6,
      l: 4,
      pts: 12,
      scored: 1950,
      faced: 198.0,
      conceded: 1720,
      bowled: 200.0,
    },
    {
      team: "RR",
      p: 11,
      w: 6,
      l: 5,
      pts: 12,
      scored: 2040,
      faced: 216.3,
      conceded: 2020,
      bowled: 220.0,
    },
    {
      team: "CSK",
      p: 10,
      w: 5,
      l: 5,
      pts: 10,
      scored: 1780,
      faced: 198.0,
      conceded: 1750,
      bowled: 200.0,
    },
    {
      team: "KKR",
      p: 10,
      w: 4,
      l: 5,
      pts: 9,
      scored: 1650,
      faced: 192.1,
      conceded: 1680,
      bowled: 190.0,
    },
    {
      team: "DC",
      p: 11,
      w: 4,
      l: 7,
      pts: 8,
      scored: 1800,
      faced: 218.0,
      conceded: 2050,
      bowled: 215.4,
    },
    {
      team: "MI",
      p: 10,
      w: 3,
      l: 7,
      pts: 6,
      scored: 1720,
      faced: 200.0,
      conceded: 1850,
      bowled: 200.0,
    },
    {
      team: "LSG",
      p: 10,
      w: 3,
      l: 7,
      pts: 6,
      scored: 1680,
      faced: 200.0,
      conceded: 1860,
      bowled: 200.0,
    },
  ],
  matches: [
    // Change 'upcoming' to 'completed' once the real game ends
    {
      id: 53,
      home: "CSK",
      away: "LSG",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 54,
      home: "RCB",
      away: "MI",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 55,
      home: "PBKS",
      away: "DC",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 56,
      home: "GT",
      away: "SRH",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 57,
      home: "RCB",
      away: "KKR",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 58,
      home: "PBKS",
      away: "MI",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 59,
      home: "LSG",
      away: "CSK",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 60,
      home: "KKR",
      away: "GT",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 61,
      home: "PBKS",
      away: "RCB",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 62,
      home: "DC",
      away: "RR",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 63,
      home: "CSK",
      away: "SRH",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 64,
      home: "RR",
      away: "LSG",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 65,
      home: "KKR",
      away: "MI",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 66,
      home: "GT",
      away: "CSK",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 67,
      home: "SRH",
      away: "RCB",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 68,
      home: "LSG",
      away: "PBKS",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 69,
      home: "MI",
      away: "RR",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
    {
      id: 70,
      home: "KKR",
      away: "DC",
      hR: "",
      hO: "20",
      aR: "",
      aO: "20",
      win: "",
      status: "upcoming",
    },
  ],
};

export default function App() {
  const [matches, setMatches] = useState(initialData.matches);

  const updateMatch = (id, field, value) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = { ...m, [field]: value };
          const hR = parseInt(next.hR);
          const aR = parseInt(next.aR);
          if (!isNaN(hR) && !isNaN(aR)) {
            if (hR > aR) next.win = next.home;
            else if (aR > hR) next.win = next.away;
          }
          return next;
        }
        return m;
      })
    );
  };

  const calculateTable = () => {
    let table = JSON.parse(JSON.stringify(initialData.standings));

    // Only simulate matches that are NOT completed yet
    matches
      .filter((m) => m.status === "upcoming")
      .forEach((m) => {
        if (!m.win) return;
        const h = table.find((t) => t.team === m.home);
        const a = table.find((t) => t.team === m.away);

        h.p += 1;
        a.p += 1;
        if (m.win === m.home) {
          h.pts += 2;
          h.w += 1;
          a.l += 1;
        } else {
          a.pts += 2;
          a.w += 1;
          h.l += 1;
        }

        const hr = parseInt(m.hR);
        const ar = parseInt(m.aR);

        if (!isNaN(hr) && !isNaN(ar)) {
          if (hr === ar) return; // NRR Rule: No change on tie
          h.scored += hr;
          h.conceded += ar;
          a.scored += ar;
          a.conceded += hr;
          h.faced += toDecimal(m.hO);
          h.bowled += toDecimal(m.aO);
          a.faced += toDecimal(m.aO);
          a.bowled += toDecimal(m.hO);
        }
      });

    return table
      .map((t) => {
        const nrr = t.scored / t.faced - t.conceded / t.bowled;
        return { ...t, nrrDisplay: nrr.toFixed(3) };
      })
      .sort(
        (a, b) =>
          b.pts - a.pts || parseFloat(b.nrrDisplay) - parseFloat(a.nrrDisplay)
      );
  };

  const standings = calculateTable();

  return (
    <div
      style={{
        padding: "15px",
        background: "#f1f5f9",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <h2
        style={{ textAlign: "center", color: "#1e3a8a", marginBottom: "25px" }}
      >
        IPL 2026 Simulator & Predictor
      </h2>

      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1e3a8a", color: "white" }}>
              <th style={{ padding: "12px" }}>#</th>
              <th style={{ textAlign: "left" }}>TEAM</th>
              <th>P</th>
              <th>PTS</th>
              <th>NRR</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((t, i) => (
              <tr
                key={t.team}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                  background: i < 4 ? "#f0fdf4" : "white",
                }}
              >
                <td style={{ padding: "12px", textAlign: "center" }}>
                  {i + 1}
                </td>
                <td
                  style={{
                    fontWeight: "bold",
                    borderLeft: `6px solid ${TEAM_COLORS[t.team]}`,
                  }}
                >
                  &nbsp;{t.team}
                </td>
                <td style={{ textAlign: "center" }}>{t.p}</td>
                <td style={{ textAlign: "center" }}>
                  <strong>{t.pts}</strong>
                </td>
                <td
                  style={{
                    textAlign: "center",
                    color:
                      parseFloat(t.nrrDisplay) >= 0 ? "#15803d" : "#b91c1c",
                  }}
                >
                  {t.nrrDisplay}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          maxWidth: "850px",
          margin: "35px auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {matches
          .filter((m) => m.status === "upcoming")
          .map((m) => (
            <div
              key={m.id}
              style={{
                background: "white",
                padding: "18px",
                borderRadius: "12px",
                border:
                  m.hR !== "" && m.hR === m.aR
                    ? "2px solid #f59e0b"
                    : "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#64748b",
                  marginBottom: "12px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>MATCH {m.id}</span>
                {m.hR !== "" && m.hR === m.aR && (
                  <span style={{ color: "#d97706", fontWeight: "bold" }}>
                    SUPER OVER MODE
                  </span>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <button
                    onClick={() => updateMatch(m.id, "win", m.home)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      background:
                        m.win === m.home ? TEAM_COLORS[m.home] : "white",
                      color: m.win === m.home ? "white" : "black",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    {m.home}
                  </button>
                  <div
                    style={{ display: "flex", gap: "4px", marginTop: "8px" }}
                  >
                    <input
                      style={{
                        width: "50%",
                        padding: "6px",
                        borderRadius: "4px",
                        border: "1px solid #cbd5e1",
                      }}
                      type="number"
                      placeholder="Runs"
                      value={m.hR}
                      onChange={(e) => updateMatch(m.id, "hR", e.target.value)}
                    />
                    <input
                      style={{
                        width: "50%",
                        padding: "6px",
                        borderRadius: "4px",
                        border: "1px solid #cbd5e1",
                      }}
                      type="text"
                      placeholder="Overs"
                      value={m.hO}
                      onChange={(e) => updateMatch(m.id, "hO", e.target.value)}
                    />
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: "center",
                    fontWeight: "bold",
                    color: "#94a3b8",
                  }}
                >
                  VS
                </div>
                <div style={{ flex: 1 }}>
                  <button
                    onClick={() => updateMatch(m.id, "win", m.away)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      background:
                        m.win === m.away ? TEAM_COLORS[m.away] : "white",
                      color: m.win === m.away ? "white" : "black",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    {m.away}
                  </button>
                  <div
                    style={{ display: "flex", gap: "4px", marginTop: "8px" }}
                  >
                    <input
                      style={{
                        width: "50%",
                        padding: "6px",
                        borderRadius: "4px",
                        border: "1px solid #cbd5e1",
                      }}
                      type="text"
                      placeholder="Overs"
                      value={m.aO}
                      onChange={(e) => updateMatch(m.id, "aO", e.target.value)}
                    />
                    <input
                      style={{
                        width: "50%",
                        padding: "6px",
                        borderRadius: "4px",
                        border: "1px solid #cbd5e1",
                      }}
                      type="number"
                      placeholder="Runs"
                      value={m.aR}
                      onChange={(e) => updateMatch(m.id, "aR", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={() => setMatches(initialData.matches)}
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "20px auto",
          display: "block",
          padding: "15px",
          background: "#ef4444",
          color: "white",
          borderRadius: "10px",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        RESET PREDICTIONS
      </button>
    </div>
  );
}
