<#
Script de PowerShell para exportar la base de datos PostgreSQL.
Requiere tener instalado el cliente `pg_dump` en el PATH.
Uso:
  .\export-db.ps1 -Host localhost -Port 5432 -Username usuario -Database mi_base -File backup.sql
#>
param(
    [string]$Host = "localhost",
    [int]$Port = 5432,
    [string]$Username,
    [string]$Database,
    [string]$File = "backup.sql"
)

if (-not $Username -or -not $Database) {
    Write-Error "Debe especificar Username y Database"
    exit 1
}

$env:PGPASSWORD = Read-Host -Prompt "Contraseña de usuario $Username" -AsSecureString | 
    ConvertFrom-SecureString -AsPlainText

$cmd = "pg_dump -h $Host -p $Port -U $Username -F c -b -v -f $File $Database"
Write-Host "Ejecutando: $cmd"
Invoke-Expression $cmd

Remove-Item env:PGPASSWORD
Write-Host "Exportación completada: $File"