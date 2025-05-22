interface Props {
  overviewText: string;
}

const ProductOverview: React.FC<Props> = ({ overviewText }) => {
  // Regex to split before each number followed by a dot (e.g., 1. 2. 3.)
  const points = overviewText.split(/\s*\d+\.\s*/).filter(Boolean);
  const stars = overviewText.split("★").filter(Boolean);

  return (
    <div className="py-6 space-y-4">
      <h2 className="text-xl font-semibold">{points[0]}</h2>
      <ol className="list-decimal list-inside space-y-2">
        {points.slice(1).map((point, idx) => (
          <li key={idx}>
            <p className="text-base text-foreground font-normal leading-[24px] tracking-[0.2px] mb-3">
              {point.trim()}
            </p>
          </li>
        ))}
        {stars.slice(1).map((star, idx) => (
          <li key={idx}>
            <p className="text-base text-foreground font-normal leading-[24px] tracking-[0.2px] mb-3">
              {star.trim()}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProductOverview;
