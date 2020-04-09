
const growth = (a: number, b: number) => (b - a)

export default (velocities: number[]) => {

  if (!velocities.length) {
    return 0;
  }
  else if (velocities.length === 1) {
    return velocities[0];
  }

  const accelerations = velocities.slice(1).reduce((final: number[], velocity: number, index) => {
    return [
      ...final,
      growth(velocities[index], velocity)
    ];
  }, []);

  const average = accelerations.reduce((a, b) => a + b, 0) / accelerations.length;

  return velocities[velocities.length - 1] + average;
}
