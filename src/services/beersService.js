// src/services/beersService.js
import { beers } from "../data/beers.js"

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getBeers() {
  // simula rede
  await sleep(300)

  // simula erro aleatório (treino de erro)
  // if (Math.random() < 0.1) throw new Error("Falha de rede (mock)")

  return beers
}