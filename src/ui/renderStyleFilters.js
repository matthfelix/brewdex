export function renderStyleFilters(container, styles, selectedStyle) {
  container.innerHTML = ""

  const allStyles = ["All", ...styles]

  allStyles.forEach(style => {
    const btn = document.createElement("button")
    btn.dataset.style = style
    btn.textContent = style

    const isActive = style === selectedStyle

    btn.className = `
      px-3 py-1 rounded-full text-sm font-medium transition
      ${
        isActive
          ? "bg-amber-600 text-white shadow"
          : "bg-amber-100 text-slate-700 hover:bg-amber-200"
      }
    `

    container.appendChild(btn)
  })
}