export default function Footer() {
  return (
    <footer
      style={{
        background: '#09090b',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '32px 0',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: 12,
            fontWeight: 300,
            color: '#52525b',
          }}
        >
          &copy; 2026 Abdul Wahid. Frontiers of Robotics &amp; AI.
        </span>
        <span
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: 12,
            fontWeight: 300,
            color: '#52525b',
          }}
        >
          Built with precision.
        </span>
      </div>
    </footer>
  );
}
