@echo off
title Activation de FixMyDrone.fr

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
    echo      ACTIVATION DU DOMAINE LOCAL FIXMYDRONE.FR
    echo ========================================================
    echo.
    set HOSTS_FILE=%WINDIR%\System32\drivers\etc\hosts

    :: Verifier si fixmydrone.fr est deja present
    findstr /i "fixmydrone.fr" "%HOSTS_FILE%" >nul
    if %errorlevel% equ 0 (
        echo [OK] Le domaine fixmydrone.fr est deja present dans votre fichier hosts.
    ) else (
        echo. >> "%HOSTS_FILE%"
        echo 127.0.0.1 fixmydrone.fr >> "%HOSTS_FILE%"
        echo 127.0.0.1 www.fixmydrone.fr >> "%HOSTS_FILE%"
        echo [OK] fixmydrone.fr a ete ajoute avec succes dans : %HOSTS_FILE%
    )

    :: Vider le cache DNS de Windows
    ipconfig /flushdns >nul
    echo [OK] Cache DNS Windows actualise.
    echo.
    echo ========================================================
    echo   SUCCES ! Ouverture automatique du site dans le navigateur...
    echo ========================================================
    timeout /t 2 >nul
    start http://fixmydrone.fr
    exit
