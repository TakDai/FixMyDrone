@echo off
title Forcer IP OVH FixMyDrone.fr

:: Verification et demande automatique des droits Administrateur (UAC)
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' (
    echo Demande des droits Administrateur en cours...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    echo UAC.ShellExecute "cmd.exe", "/c ""%~s0""", "", "runas", 1 >> "%temp%\getadmin.vbs"
    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    echo ========================================================
    echo      CONNEXION DIRECTE A VOTRE HEBERGEMENT OVH
    echo ========================================================
    echo.
    set HOSTS_FILE=%WINDIR%\System32\drivers\etc\hosts

    :: Supprimer les anciennes lignes fixmydrone si existantes
    findstr /v /i "fixmydrone" "%HOSTS_FILE%" > "%temp%\hosts.tmp"
    copy /y "%temp%\hosts.tmp" "%HOSTS_FILE%" >nul
    del "%temp%\hosts.tmp"

    :: Ajouter la vraie adresse IP de votre serveur web OVH
    echo 51.91.236.255 fixmydrone.fr >> "%HOSTS_FILE%"
    echo 51.91.236.255 www.fixmydrone.fr >> "%HOSTS_FILE%"
    echo [OK] 51.91.236.255 fixmydrone.fr ajoute au fichier hosts !

    :: Vider le cache DNS de Windows
    ipconfig /flushdns >nul
    echo [OK] Cache DNS Windows reinitialise !
    echo.
    echo ========================================================
    echo   SUCCES ! Ouverture de votre site OVH dans le navigateur...
    echo ========================================================
    timeout /t 2 >nul
    start http://fixmydrone.fr
    exit
