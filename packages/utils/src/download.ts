export const download = (arraybuffer: ArrayBuffer, filename?: string) => {
    const name = filename ?? String(Date.now())
    const blob = new Blob([arraybuffer])
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()

    window.URL.revokeObjectURL(a.href)
}