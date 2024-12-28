/* eslint-disable @typescript-eslint/no-explicit-any */
export const shuffleArrayData = (array: any[]) => {
  const shuffledArray = [...array]; // Create a copy of the array to avoid mutating the original
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
};