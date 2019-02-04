/**
 * @param limit generated number cannot exceed limit
 * @returns Returns a random number
 */
export const generateRandomNumber = (limit: number, min: number = 0): number => {
  const randomNumber = Math.floor(Math.random() * limit)
  if (randomNumber < min) {
    return min
  } else {
    return randomNumber
  }
}

