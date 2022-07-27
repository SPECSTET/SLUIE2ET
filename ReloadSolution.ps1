stop-process -name Chromium -Force

Set-Location -Path C:\Repos\SLUIE2ET
Clear-Host

git reset --hard HEAD
git fetch --all;
git pull;

Write-Host "Newest version of tests pulled..."
Out-File  -Append -FilePath C:\Repos\SLUIE2ET\Process.txt -InputObject "$(get-date -Format 'hh:mm, dd/MM/yyyy') - Newest version of tests pulled" -Encoding ASCII -Width 50