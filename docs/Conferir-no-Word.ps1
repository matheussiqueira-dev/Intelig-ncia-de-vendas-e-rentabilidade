# Run in the user's normal Windows PowerShell session with Microsoft Word installed.
param([string]$DocumentPath = (Join-Path $PSScriptRoot 'System-Design.docx'))
$ErrorActionPreference = 'Stop'
$resolved = (Resolve-Path -LiteralPath $DocumentPath).Path
$pdfPath = [IO.Path]::ChangeExtension($resolved, '.pdf')
$word = $null
$document = $null
try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0
    $document = $word.Documents.Open($resolved, $false, $true)
    $document.Repaginate()
    $pageCount = $document.ComputeStatistics(2)
    $document.ExportAsFixedFormat($pdfPath, 17)
    Write-Output "PDF para revisão visual: $pdfPath"
    Write-Output "Páginas: $pageCount"
    Write-Output 'Confira todas as páginas antes de considerar a formatação aprovada.'
} finally {
    if ($document) { $document.Close(0); [void][Runtime.InteropServices.Marshal]::ReleaseComObject($document) }
    if ($word) { $word.Quit(); [void][Runtime.InteropServices.Marshal]::ReleaseComObject($word) }
}
