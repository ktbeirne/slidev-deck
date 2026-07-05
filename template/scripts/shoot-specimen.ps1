# specimen.html を headless Edge で撮影する（提示前の自己検品用）
# 使い方: .\shoot-specimen.ps1                              → theme.css で撮影
#         .\shoot-specimen.ps1 -Theme themes/candidate-c.css → 候補を指定して撮影
param(
  [string]$Theme = '',
  [string]$Out = '',
  [int]$Width = 1440,
  [int]$Height = 5200
)
$ErrorActionPreference = 'Stop'
$edge = @(
  'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
  'C:\Program Files\Microsoft\Edge\Application\msedge.exe'
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $edge) { throw 'Microsoft Edge が見つからない。specimen.html を手動でブラウザ確認すること' }

$specimen = (Resolve-Path (Join-Path $PSScriptRoot '..\specimen.html')).Path
$url = 'file:///' + ($specimen -replace '\\', '/')
if ($Theme) { $url += "?theme=$Theme" }

if (-not $Out) {
  if ($Theme) { $name = [IO.Path]::GetFileNameWithoutExtension($Theme) } else { $name = 'theme' }
  $Out = Join-Path (Split-Path $specimen) "specimen-$name.png"
}

# Start-Process 経由で起動する（& 直接呼び出し + 2>$null は PS5.1 で Edge の無害な
# stderr ログが NativeCommandError 化し、$ErrorActionPreference='Stop' と組むと即死するため）
$edgeArgs = @('--headless', '--disable-gpu', "--screenshot=`"$Out`"", "--window-size=`"$Width,$Height`"", '--virtual-time-budget=10000', "`"$url`"")
Start-Process -FilePath $edge -ArgumentList $edgeArgs -Wait -WindowStyle Hidden

# Edge はファイル書き込み完了前に制御を返すことがある。生成を待ってから返す
# （呼び出し側が直後に Read しても空振りしないようにするための待機）
$deadline = (Get-Date).AddSeconds(15)
while (-not (Test-Path $Out) -and (Get-Date) -lt $deadline) { Start-Sleep -Milliseconds 300 }
if (-not (Test-Path $Out)) { throw "スクリーンショットが生成されなかった: $Out" }
Write-Output $Out
