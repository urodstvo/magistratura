export const highSpeedFunc = (x: number) => {
  if (x <= 1) return 1;
  if (x > 1 && x <= 3) return -0.5 * x + 1.5;

  return undefined;
};

export const lowSpeedFunc = (x: number) => {
  if (x === 5) return 0;
  if (x > 5) return 1;

  return undefined;
};

export const medSpeedFunc = (x: number) => {
  if (x >= 2 && x < 3) return x - 2;
  if (x >= 3 && x <= 4) return 1;
  if (x > 4 && x <= 6) return -0.5 * x + 3;

  return undefined;
};

export const highQualityFunc = (x: number) => {
  if (x <= 100 && x > 69) return 1;
  if (x >= 50 && x < 70) return 0.05 * x - 2.5;

  return undefined;
};

export const lowQualityFunc = (x: number) => {
  if (x >= 0 && x < 21) return 1;
  if (x > 20 && x <= 30) return -0.1 * x + 3;

  return undefined;
};

export const medQualityFunc = (x: number) => {
  if (x >= 20 && x < 30) return 0.1 * x - 2;
  if (x >= 30 && x <= 50) return 1;
  if (x > 50 && x <= 60) return -0.1 * x + 6;

  return undefined;
};
