# Fix EPERM on Windows: stop Node processes that lock the Prisma DLL, then run prisma generate.
# Run this with "npm run dev" STOPPED (close the terminal that runs the dev server first).

$clientPath = "node_modules\.prisma\client"
$dllName = "query_engine-windows.dll.node"

Write-Host "Stopping Node.js processes to release Prisma DLL..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

$dllPath = Join-Path $clientPath $dllName
if (Test-Path $dllPath) {
  Write-Host "Removing locked file: $dllPath" -ForegroundColor Yellow
  Remove-Item -Path $dllPath -Force -ErrorAction SilentlyContinue
}
Get-ChildItem -Path $clientPath -Filter "*.tmp*" -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue

Write-Host "Running prisma generate..." -ForegroundColor Green
npx prisma generate
if ($LASTEXITCODE -ne 0) {
  Write-Host "If EPERM persists: close Cursor/VS Code, run this script again, or add the project folder to Windows Defender exclusions." -ForegroundColor Red
  exit $LASTEXITCODE
}
