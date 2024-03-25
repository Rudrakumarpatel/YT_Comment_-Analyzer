import "./SentimentChart.css";

export const SentimentChart = ({ positive, negative, neutral, data }) => {
  const total = positive + negative + neutral;

  const positivePercentage =  (positive / total) * 100;
  const negativePercentage = (negative / total) * 100;
  const neutralPercentage = (neutral / total) * 100;
  return (
    <>
      {data && (
        <ul style={{marginLeft:"1.5rem"}}>
          <li style={{color:"green"}}>{positivePercentage}%</li>
          <li style={{color:"red"}}>{negativePercentage}%</li>
          <li>{neutralPercentage}%</li>
        </ul>
      )}
    </>
  );
};
