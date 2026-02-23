export function safeText(text) {
  return String(text)
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}
