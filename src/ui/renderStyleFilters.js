export function renderStyleFilters(container, styles, selectedStyle) {
  container.innerHTML = ""

  const allStyles = styles.includes("All")
    ? styles
    : ["All", ...styles]

  allStyles.forEach(style => {
    const btn = document.createElement("button")
    btn.dataset.style = style
    btn.textContent = style

    const isActive = style === selectedStyle

    btn.className = `
    px-3 py-1 rounded-full border text-sm font-medium transition
    ${
      isActive
        ? "bg-amber-500 text-white border-amber-500"
        : "bg-white text-slate-700 border-slate-300 hover:bg-amber-100"
    }
`

    container.appendChild(btn)
  })
}