import { safeText } from "../utils/safeText.js"

export function renderPanel(panel, beer) {
  panel.classList.add("opacity-0")

  setTimeout(() => {
    panel.innerHTML = `
      <img
        src="${beer.image}"
        alt="${safeText(beer.name)}"
        class="w-full max-h-80 object-contain rounded-2xl mb-8 shadow-2xl bg-white/30 p-6"
      />

      <h2 class="text-2xl font-bold text-orange-700">
        ${safeText(beer.name)}
      </h2>

      <p class="mt-2 text-slate-600">
        ${safeText(beer.description)}
      </p>

      <div class="mt-4 space-y-2 text-slate-700">
        <p><strong>Estilo:</strong> ${safeText(beer.style)}</p>
        <p><strong>Teor alcoólico:</strong> ${safeText(beer.abv)}</p>
        <p><strong>IBU:</strong> ${beer.ibu}</p>
        <p><strong>Cor (EBC):</strong> ${beer.ebc}</p>
        <p><strong>Avaliação:</strong> ${"⭐".repeat(beer.rating)}</p>
      </div>
    `
    panel.classList.remove("opacity-0")
  }, 150)
}
