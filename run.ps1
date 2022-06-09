param
(
  $Env = "uat", 
  $Disclaimer = "0",
  $Tag = ""
)

Clear-Host

Set-Item -Path Env:\SLUIE2ET_ENV -Value $Env
switch ($Env)                         
    {                        
        "uat" {
            Set-Item -Path Env:\SLUIE2ET_URL -Value $Env:SLUIE2ET_URL_UAT
        }                        
        "pav" {
            Set-Item -Path Env:\SLUIE2ET_URL -Value $Env:SLUIE2ET_URL_PAV
        }                        
        Default {
            Set-Item -Path Env:\SLUIE2ET_URL -Value $Env:SLUIE2ET_URL_UAT
        }                        
    }
    
if ($Disclaimer -eq "0") {
    Set-Item -Path Env:\SLUIE2ET_HAS_DISCLAIMER -Value "0"
} else {
    Set-Item -Path Env:\SLUIE2ET_HAS_DISCLAIMER -Value "1"
}

"Running tests on $Env:SLUIE2ET_URL with disclaimer set to $Env:SLUIE2ET_HAS_DISCLAIMER and with filter @$Tag"

if ($Tag.length -gt 0) {
    npx `playwright test --grep @$Tag`
} else {
    npx playwright test
}

if($Env -eq "uat") {
    Start-Process "file:///$(Get-Location)/playwright-report/index.html"
    "Check your browser for the report"
} else {
    azcopy copy .\playwright-report\* $Env:SLUIE2ET_BLOB_URL --recursive
    "To see the result, visit $Env:SLUIE2ET_REPORT_URL"
}
