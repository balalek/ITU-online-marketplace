-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Počítač: localhost
-- Vytvořeno: Čtv 15. pro 2022, 14:45
-- Verze serveru: 8.0.31-0ubuntu0.20.04.1
-- Verze PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `ITUprojekt`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `inzerat`
--

CREATE TABLE `inzerat` (
  `id_inzeratu` int NOT NULL,
  `vytvoril` int NOT NULL,
  `kategorie` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `podkategorie` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nadpis` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `popis` varchar(2000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hlavni_fotografie` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cena` int NOT NULL,
  `tagy` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `datum_vytvoreni` date NOT NULL,
  `platnost_do` date NOT NULL,
  `prodano` int NOT NULL DEFAULT '0',
  `ohodnoceno` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Vypisuji data pro tabulku `inzerat`
--

INSERT INTO `inzerat` (`id_inzeratu`, `vytvoril`, `kategorie`, `podkategorie`, `nadpis`, `popis`, `hlavni_fotografie`, `cena`, `tagy`, `datum_vytvoreni`, `platnost_do`, `prodano`, `ohodnoceno`) VALUES
(1, 1, 'motoristika', 'auta', 'BMW 3 316i, SPORT PAKET, VÝHŘEV., 2XALU, P. SENZORY', 'BMW Řada 3 - zachovalý vůz, komplet nové přední i zadní brzdové destičky i kotouče + olej a filtr, sport paket, vyhřívaná sedadla, zadní parkovací senzory, 2x ALU kola k vozu, 6-ti stupňová manuální převodovka', '../img/bmw.jpg', 250000, 'auto, bmw', '2022-12-08', '2024-12-28', 1, 1),
(2, 2, 'motoristika', 'auta', 'ŠKODA OCTAVIA 3 FC 1,6TDi 85kW STYLE', 'r.v.2019\r\n85kW-115koní\r\nmotor Common Rail!\r\nnajeto-138.200km\r\nmodrá tmavá metalíza\r\nPravidelný servis pouze autorizovaný servis Škoda', '../img/octavia.jpg', 359900, 'auto, octavia, skoda', '2022-12-08', '2023-12-30', 0, 0),
(3, 2, 'motoristika', 'auta', 'Prodám káru na okrasu', 'Nejezdí to, ale je to stylová kára', '../img/kara.jpg', 15000, 'kára, auto, nepojízdné', '2022-12-11', '2023-11-17', 1, 1),
(5, 2, 'motoristika', 'auta', 'Audi 90 b3 2.3e R5 1988 veteran', 'Prodam oficialniho veterana.\r\nMa klubovou testaci. Stk na 2 roky.\r\nVuz vlastnim cca 6 let.\r\nHromada veci udelanych. Je to garazovane v suche teple garazi.\r\nCena zalezi na tom, v jake konfiguraci odjede.\r\nPro vice info mne kontaktujte emailem.\r\nMam k tomu volanty nardi, sport quattro.\r\nKola azev, bbs, ronal. ', '../img/veteran.jpg', 50000, 'veteran, audi, auto', '2022-12-11', '2022-12-25', 1, 1),
(7, 2, 'motoristika', 'auta', 'Audi A6 4x4 3.0TDI V6 160kW S-tronic 101tkm', '7 rychlostních stupňů, Asistent dálkových světel, Asistent rozpoznávání únavy, Automatická převodovka S Tronic, Bezdrátová nabíječka mobilu Qi, Bezklíčové startování Press&Drive, Cargo management system, Černé čalounění stropu, DCC Adaptivní tlumiče, Dešťový senzor, El. ovládané víko zav. prostoru, El. sklopné tažné zařízení, El. uzávěra diferenciálu XDS, El. vyhřívaná zpětná zrcátka, Funkce Auto Hold, FULL LED světlomety, Hlasové ovládání, Isofix, Komunikační rozhraní MMI, Kontrola trakce ASR, LED denní svícení, LED zadní světlomety, Mlhové světlomety, Nastavitelné jízdní režimy, Navigace MMI, Parkovací kamera, Parkovací senzory přední, Parkovací senzory zadní, Pohon 4x4, Tempomat, Vyhřívaná přední sedadla', '../img/audi.jpg', 1050000, 'auto, audi', '2022-12-11', '2023-01-08', 0, 0),
(14, 2, 'motoristika', 'motorky', 'cervena motorka', 'Na prodej Ducati Hyperstrada 821', '../img/motorka.jpg', 123000, 'motorka, ducati', '2022-12-12', '2023-12-30', 1, 1),
(15, 1, 'motoristika', 'motorky', 'Kawasaki Kuzuki, nová, jede na benzín', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Etiam egestas wisi a erat. Etiam commodo dui eget wisi. Nullam lectus justo, vulputate eget mollis sed, tempor sed magna. Praesent id justo in neque elementum ultrices. Nullam at arcu a est sollicitudin euismod. Aenean vel massa quis mauris vehicula lacinia. Nunc tincidunt ante vitae massa. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Praesent in mauris eu tortor porttitor accumsan. Integer pellentesque quam vel velit.', '../img/bike.jpeg', 130005, 'motorka,kawasaki', '2022-12-14', '2023-01-22', 0, 0),
(16, 3, 'zvirata', '', 'male kote', 'daruju male kote, nalezeno u popelnic, nemuzu si ho nechat', '../img/kote.jpeg', 0, 'kote, zdarma', '2022-12-14', '2023-01-08', 0, 0),
(17, 3, 'obleceni', '', 'Zimní bunda', 'prodavam dámskou zimní bundu . pro mne je příliš velká (moje výška 163 Cm ) . objednávala ze zalanda(jestli mate zájem pošlu vám link na ni)', '../img/zimnibundajpg.jpg', 3500, 'obleceni, bunda, damske, zimni', '2022-12-14', '2022-12-24', 1, 0),
(18, 3, 'zvirata', '', 'Anglický špringršpaněl s PP', 'Přijímáme rezervace na hnědobílá štěňátka plemene Anglického špringršpaněla z Chovatelské stanice z Tatarských Lipek. Otec: Nathan zo Srnčej doliny, matka: Bonnie z Tatarských Lipek. Oba rodiče vedeni jako chovní na http://ass.kchls.cz/ i na www.data-ess.cz. Po rodičích výborné předpoklady pro myslivost, i jako společníci do rodiny k dětem. Více informací na www.tatarskelipky.cz. Předpokládaný termín porodu je první týden v lednu roku 2023. Odběr bude možný v první polovině března roku 2023. Cena je včetně veškerých očkování, odčervení, čipu, mezinárodního pasu a samozřejmě PP.', '../img/kokrspanel.jpg', 25000, 'pes, stene, PP', '2022-12-14', '2022-12-31', 0, 0),
(19, 4, 'detsky_bazar', '', 'Supergaráž Hot Wheels City', 'Prodám Hot Wheels dráhu Supergaráž. 90 cm vysoká dráha s místem pro 140 autíček (nejsou součástí). Autíčka vyváží spirálový výtah s gorilou, potřeba 4 x LR20 baterie (nejsou součástí). Na střeše projedou letadlem a vydají se na jednu ze dvou cest dolů. V patrech je otočná opravna a myčka. Koupená před 2 lety. Nezničená. Ideálně osobní odběr.', '../img/hotwheels1.jpg', 2800, 'hot, wheels, hotwheels, draha', '2022-12-14', '2023-05-31', 0, 0),
(20, 4, 'hudba', '', 'Pianino Petrof model 118 Čínská růže', 'Prodám krásné pianino Petrof po prvním majiteli: 3 pedály, s moderátorem. Záruka 2 roky, doprava do 100 km zdarma. V ceně je nová italská židle a první ladění.', '../img/piano.jpg', 95000, 'piano, petrof, pianino, 118', '2022-12-14', '2023-09-09', 0, 0),
(21, 5, 'nemovitosti', '', 'Pronajmu byt 2+1 55m2 2NP, Ostrava , ul.Proskovická 667/71', 'Pronajmu byt 2+1 55m2 2NP v klidné části Ostravy poblíž CHKO Poodří. Byt je po rekonstrukci, částečně vybaven. Nástup možný ihned. Cena nájmu 10 tis + 4t služby. V ceně jsou zahrnuty veškeré poplatky (služby, energie + internet PODA) Kauce 2 měsíční nájem.', '../img/byt1.jpg', 10000, 'byt, ostrava, pronajem', '2022-12-14', '2023-01-08', 0, 0),
(22, 1, 'motoristika', 'motorky', 'motorka :D', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis nunc sed blandit libero volutpat sed. Magna fringilla urna porttitor rhoncus dolor purus non enim. Pharetra pharetra massa massa ultricies mi quis. Quisque egestas diam in arcu cursus. Consequat ac felis donec et. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Quis lectus nulla at volutpat diam ut venenatis tellus. Id leo in vitae turpis. Dolor sit amet consectetur adipiscing elit. Ultricies mi eget mauris pharetra et ultrices neque ornare aenean. Cursus in hac habitasse platea dictumst quisque sagittis purus. Sapien et ligula ullamcorper malesuada proin libero nunc. Odio morbi quis commodo odio aenean sed adipiscing diam donec. Aliquam faucibus purus in massa tempor nec feugiat nisl. Varius quam quisque id diam. Vestibulum sed arcu non odio.\r\n\r\nEget est lorem ipsum dolor sit amet con', '../img/josh-sorenson-MjIMc6uhwrE-unsplash.jpg', 650, 'motorka, cool', '2022-12-14', '2023-06-02', 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabulky `recenze`
--

CREATE TABLE `recenze` (
  `id_recenze` int NOT NULL,
  `vytvoril` int NOT NULL,
  `na` int NOT NULL,
  `pocet_hvezd` int NOT NULL,
  `popis` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `datum_vytvoreni` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Vypisuji data pro tabulku `recenze`
--

INSERT INTO `recenze` (`id_recenze`, `vytvoril`, `na`, `pocet_hvezd`, `popis`, `datum_vytvoreni`) VALUES
(1, 2, 1, 4, 'celkem v klidu, jen prisel pozde', '2022-12-11'),
(4, 1, 14, 3, 'aloha', '2022-12-07'),
(9, 4, 5, 5, 'Trvalo jí půl hodiny než vyšla z baráku. Jinak byla paní příjemná a spolupráce proběhla bez problému.', '2022-12-14'),
(11, 4, 3, 4, 'velmi pekne', '2022-12-14');

-- --------------------------------------------------------

--
-- Struktura tabulky `uzivatel`
--

CREATE TABLE `uzivatel` (
  `id_uzivatele` int NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `heslo` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jmeno` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prijmeni` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel_cislo` int DEFAULT NULL,
  `kraj` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mesto` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pamatovat` bit(1) NOT NULL DEFAULT b'0',
  `profilovka` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Vypisuji data pro tabulku `uzivatel`
--

INSERT INTO `uzivatel` (`id_uzivatele`, `email`, `heslo`, `jmeno`, `prijmeni`, `tel_cislo`, `kraj`, `mesto`, `pamatovat`, `profilovka`) VALUES
(1, 'uziv@seznam.cz', 'uziv', 'Zdeněk', 'Navrátil', 230842950, 'Kraj Vysočina', 'Jihlava', b'1', '../img/man.jpeg'),
(2, 'uziv2@seznam.cz', 'uziv2', 'Marie', 'Kamenná', 999888777, 'Liberecký kraj', 'Liberec', b'1', '../img/human.jpeg'),
(3, 'uziv3@seznam.cz', 'uziv3', 'Petr', 'Jeřábek', 886554223, 'Jihomoravský kraj', 'Brno', b'1', NULL),
(4, 'uziv4@seznam.cz', 'uziv4', 'Petr', 'Hrozen', 777555666, 'Moravskoslezský kraj', 'Jeseník', b'1', '../img/man1.webp'),
(5, 'uziv5@seznam.cz', 'uziv5', 'Klára', 'Wozniaková', 654987321, 'Moravskoslezský kraj', 'Ostrava', b'1', NULL);

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `inzerat`
--
ALTER TABLE `inzerat`
  ADD PRIMARY KEY (`id_inzeratu`),
  ADD KEY `vytvoril` (`vytvoril`);

--
-- Indexy pro tabulku `recenze`
--
ALTER TABLE `recenze`
  ADD PRIMARY KEY (`id_recenze`),
  ADD KEY `vytvoril` (`vytvoril`),
  ADD KEY `na` (`na`);

--
-- Indexy pro tabulku `uzivatel`
--
ALTER TABLE `uzivatel`
  ADD PRIMARY KEY (`id_uzivatele`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `inzerat`
--
ALTER TABLE `inzerat`
  MODIFY `id_inzeratu` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pro tabulku `recenze`
--
ALTER TABLE `recenze`
  MODIFY `id_recenze` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pro tabulku `uzivatel`
--
ALTER TABLE `uzivatel`
  MODIFY `id_uzivatele` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `inzerat`
--
ALTER TABLE `inzerat`
  ADD CONSTRAINT `inzerat_ibfk_1` FOREIGN KEY (`vytvoril`) REFERENCES `uzivatel` (`id_uzivatele`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `recenze`
--
ALTER TABLE `recenze`
  ADD CONSTRAINT `recenze_ibfk_1` FOREIGN KEY (`vytvoril`) REFERENCES `uzivatel` (`id_uzivatele`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `recenze_ibfk_2` FOREIGN KEY (`na`) REFERENCES `inzerat` (`id_inzeratu`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
