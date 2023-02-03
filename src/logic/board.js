import { WINNER_COMBOS } from '../components/constants'

export const checkWinnerFrom = (boardToCheck) => {
  // revisar las combinaciones ganadoras
  // Checkear si x u O gano
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  // Si no hay ganador
  return null
}
