export default function calculateGrowthRate(prev: number, actual: number) {
  return (actual - prev) / prev * 100;
}
