@echo off
setlocal enabledelayedexpansion

:: Load environment
if exist ".env" (
    for /f "tokens=1* delims==" %%A in (.env) do (
        set "%%A=%%B"
    )
)

:: Download mkcert binary
if exist "scripts\ssl\mkcert.exe" (
    echo mkcert is installed
) else (
	echo Installing mkcert for Windows...
	powershell -command "Invoke-WebRequest -Uri 'https://dl.filippo.io/mkcert/v1.4.4?for=windows/amd64' -OutFile './scripts/ssl/mkcert.exe'"
)

:: Trust and use mkcert
scripts\\ssl\\mkcert.exe -install
scripts\\ssl\\mkcert.exe -cert-file ./packages/nginx/ssl/ssl.crt -key-file ./packages/nginx/ssl/ssl.key localhost 127.0.0.1 deltahouse.no %HOST_IP% %HOST_IP_5G%

endlocal
