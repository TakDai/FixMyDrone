@echo off
:: FixMyDrone.fr - Script de configuration locale du domaine
:: Ce script ajoute fixmydrone.fr pointant vers 127.0.0.1 dans votre fichier hosts
echo =======================================================
echo   FixMyDrone.fr - Configuration du Domaine Local
echo =======================================================
echo.
echo Verification des droits Administrateur...
net session >nul 2>&1
if %errorLevel% == 0 (
    echo [OK] Droits Administrateur detectes.
) else (
    echo [ERREUR] Ce script necessite les droits Administrateur.
    echo Clic droit sur ce fichier ^> "Executer en tant qu'administrateur".
    pause
    exit /b 1
)

set HOSTS_PATH=%WINDIR%\System32\drivers\etc\hosts

findstr /i "fixmydrone.fr" %HOSTS_PATH% >nul
if %errorLevel% == 0 (
    echo [INFO] Le domaine fixmydrone.fr est deja present dans votre fichier hosts.
) else (
    echo 127.0.0.1 fixmydrone.fr >> %HOSTS_PATH%
    echo [SUCCES] 127.0.0.1 fixmydrone.fr ajoute avec succes dans %HOSTS_PATH% !
)

echo.
echo Vous pouvez maintenant ouvrir votre navigateur sur :
echo http://fixmydrone.fr:3001
echo.
pause
