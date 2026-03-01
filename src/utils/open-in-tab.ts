export function openInTab(element: HTMLElement, title: string): void {
	const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #6b6b6b; }
    body { display: flex; justify-content: center; padding: 24px; min-height: 100vh; }
    @media print {
      html, body { background: white; padding: 0; }
      body { display: block; }
    }
  </style>
</head>
<body>${element.outerHTML}</body>
</html>`

	const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
	const url = URL.createObjectURL(blob)
	const win = window.open(url, '_blank')
	if (win) setTimeout(() => URL.revokeObjectURL(url), 30_000)
}
