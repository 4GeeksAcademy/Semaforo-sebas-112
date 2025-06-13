import React, { useState, useEffect } from "react";

const TrafficLight = () => {
  const [color, setColor] = useState("red");
  const [showPurple, setShowPurple] = useState(false);
  const [autoCycle, setAutoCycle] = useState(true);

  const colors = ["red", "yellow", "green"];
  if (showPurple) colors.push("purple");

  const colorValues = {
    red: "#dc3545",       // Bootstrap red
    yellow: "#ffc107",    // Bootstrap yellow
    green: "#198754",     // Bootstrap green
    purple: "purple",     // Custom purple
    off: "#6c757d",       // Bootstrap secondary (apagado)
  };

  useEffect(() => {
    if (!autoCycle) return;

    const interval = setInterval(() => {
      setColor((prev) => {
        const currentIndex = colors.indexOf(prev);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [autoCycle, showPurple]);

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <div
        className="bg-dark p-4 rounded d-flex flex-column align-items-center"
        style={{ width: "100px" }}
      >
        {colors.map((c) => (
          <div
            key={c}
            onClick={() => setColor(c)}
            className="rounded-circle mb-3"
            style={{
              width: "60px",
              height: "60px",
              cursor: "pointer",
              backgroundColor: color === c ? colorValues[c] : colorValues.off,
              transition: "background-color 0.3s",
            }}
          ></div>
        ))}
      </div>

      <div className="mt-3 d-flex gap-2">
        <button className="btn btn-primary" onClick={() => setAutoCycle(!autoCycle)}>
          {autoCycle ? "Detener ciclo" : "Iniciar ciclo"}
        </button>
        <button className="btn btn-secondary" onClick={() => setShowPurple(true)}>
          Agregar púrpura
        </button>
      </div>
    </div>
  );
};

export default TrafficLight;
