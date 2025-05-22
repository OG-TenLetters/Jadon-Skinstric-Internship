export default function CircleProgressBar({
  percentage = 50,
  size = 150,
  strokeWidth = 10,
  circleColor = "#d6d6d6",
  progressColor = "#3e98c7",
  textColor = "#333",
  className = ""
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg className={className} viewBox={`0 0 ${size} ${size}`}>
      <circle
        stroke={circleColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />

      <circle
        stroke={progressColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.35s east-out" }}
      />

      <text
        x="50%"
        y="50%"
        dominantBaseline={"central"}
        textAnchor="middle"
        fill="textColor"
        fontSize={`${size / 8}px`}
      >
        <tspan fontSize={`${size / 8}px`}>{`${Math.round(percentage)}`}</tspan>
        <tspan fontSize={`${size / 12}px`}>%</tspan>
      </text>
    </svg>
  );
}
