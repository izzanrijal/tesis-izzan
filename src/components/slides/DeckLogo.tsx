const logo = { url: "/figures/logos-instansi.png" };

/** Logo instansi kecil di sudut kanan atas setiap slide. */
export function DeckLogo() {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        top: 20,
        right: 24,
        background: "#ffffff",
        borderRadius: 10,
        padding: "8px 14px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.10)",
      }}
    >
      <img
        src={logo.url}
        alt="Logo Universitas Hasanuddin, Departemen Kardiologi, dan RS Wahidin Sudirohusodo"
        style={{ width: 300, height: "auto", display: "block" }}
      />
    </div>
  );
}
