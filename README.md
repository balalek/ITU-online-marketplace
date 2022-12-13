# ITU - Online bazar
# Instalace
### Softwarové požadavky:
PHP Version: 8.1.12
mysqli library version: 5.7.40
Apache/2.4.54
MySQL version: 8.0.31
phpMyAdmin version: 5.1.1
### Postup instalace na server:
#### Nastavení webového serveru Apache:
Server nastavte na vámi vybranou složku podle návodu https://ubuntu.com/tutorials/install-and-configure-apache#5-activating-virtualhost-file
Do této složky rozbalte archiv.
Po zadání adresy složky (přesněji index.html ve složce view) by se vám měla zobrazit webová aplikace.
#### Nastavení databáze:
Přihlaste se na stránky phpMyAdmin na vašem Apache serveru.
Vytvořte novou databázi.
Otevřete tuto databázi a v horním menu zvolte Import.
Vyberte soubor ITUprojekt.sql a znakovou sadu utf-8 a proveďte import.
#### Nastavení propojení DB a web-serveru:
V phpMyAdmin přidejte nového uživatele a nastavte mu na databázi pouze práva pro operaci s daty.
Do souboru db.php ve složce model vyplňte údaje podle vašeho připojení.
$dbhost -> adresa serveru databáze (pokud je DB na stejném serveru jako webová aplikace, použijte localhost)
$dbuser -> jméno uživatele kterého jste přidali do DB (pokud je DB na jiném serveru jako web, musíte mu nastavit přihlášení z jakéholoki PC)
$dbpass -> heslo uživatele k DB.
$dbname -> název DB kterou jste vytvořili.
!!! Pokud máte DB na jiném serveru než je webová aplikace, je nutné ještě nakonfigurovat MySQL server aby odpovídal na požadavky z klienta.
Bez povolení obsluhuje pouze localhost. Pro povoleni přidejte do souboru /etc/mysql/my.cnf řádek bind-address=0.0.0.0 pro ipv4, bind-address=:: pro ipv6 nebo specifiskou adresu web serveru.
Po dokončení by měl být systém funkční.