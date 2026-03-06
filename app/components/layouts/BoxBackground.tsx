const BoxBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        background: "#F8F9FB",
        height: "auto",
      }}
    >
      {children}
    </div>
  );
};

export { BoxBackground };
export default BoxBackground;
