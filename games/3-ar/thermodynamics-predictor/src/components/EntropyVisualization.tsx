interface EntropyVisualizationProps {
  deltaS: number;
}

export function EntropyVisualization({ deltaS }: EntropyVisualizationProps) {
  const isIncreasing = deltaS > 0;
  const particleCount = 16;

  return (
    <div className="entropy-container">
      {[...Array(particleCount)].map((_, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;

        let style: React.CSSProperties;
        if (isIncreasing) {
          // Disordered - random positions
          style = {
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 80 + 10}%`,
            // @ts-ignore - CSS custom properties
            '--float-x': `${Math.random() * 40 - 20}px`,
            '--float-y': `${Math.random() * 40 - 20}px`,
            '--float-x2': `${Math.random() * 40 - 20}px`,
            '--float-y2': `${Math.random() * 40 - 20}px`,
          };
        } else {
          // Ordered - grid pattern
          style = {
            left: `${col * 22 + 15}%`,
            top: `${row * 22 + 15}%`,
          };
        }

        return (
          <div
            key={i}
            className={`particle ${isIncreasing ? 'particle-disordered' : 'particle-ordered'}`}
            style={style}
          />
        );
      })}
    </div>
  );
}
