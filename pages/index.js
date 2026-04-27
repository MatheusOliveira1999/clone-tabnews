import { useState } from "react";

function Home() {
  const [mostrarAmor, setMostrarAmor] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>

      <button onClick={() => setMostrarAmor(true)} style={{ padding: "10px 16px" }}>
        Clique aqui
      </button>

      {mostrarAmor && (
        <div style={{ marginTop: "20px", fontSize: "32px", color: "#e11d48" }}>
          ❤️ Eu te amo, já ja to ai
                  </div>
      )}
    </div>
  );
}

export default Home;
