# Kurtka w losowaniu outfitu + flagi na PC

## 1. Dodatkowy slot "Kurtka" w losowarce

Obecnie losowarka ma 4 stałe sloty: Buty, Spodnie, Koszulka/Bluza, Czapka/Akcesoria. Kurtki wpadają do slotu "Koszulka/Bluza", więc nie da się mieć bluzy i kurtki naraz.

Zmiany:
- Osobny slot **Kurtka** (kategorie: kurtki, kurtki przeciwdeszczowe, jacket, coat, puffer) — usunięty z dopasowania slotu Koszulka/Bluza.
- Slot kurtki jest **opcjonalny**: domyślnie wyłączony, obok kafelków pojawia się kafelek-przycisk **"+ Kurtka"**.
- Po kliknięciu slot dochodzi do outfitu i od razu się losuje; kliknięcie **×** na kafelku kurtki usuwa go z zestawu.
- Kurtka bierze udział w "Przelosuj wszystko" i ma własny przycisk 🎲, tak jak reszta; jej cena wlicza się do sumy tylko gdy jest włączona.
- Nowe teksty (nazwa slotu, "+ Kurtka", "Usuń kurtkę") dodane do PL i EN w pliku tłumaczeń.

## 2. Flagi przy wyborze języka na PC

Przełącznik języka jest wspólny dla telefonu i desktopu — używa emoji flag (🇵🇱/🇬🇧). Windows/Chrome nie renderuje emoji flag, więc na PC widać tylko "PL"/"EN".

Rozwiązanie: zamiast emoji użyć małych ikon flag rysowanych w SVG (prostokąty biało-czerwony i Union Jack) obok tekstu PL/EN. Renderują się identycznie na każdym systemie — telefon i PC.

## Szczegóły techniczne
- `src/components/OutfitGenerator.tsx` — rozszerzenie `SLOTS` o `jacket`, stan `jacketOn`, warunkowe renderowanie kafelka i liczenie sumy.
- `src/lib/i18n.tsx` — nowe klucze `outfit.jacket`, `outfit.addJacket`, `outfit.removeJacket`.
- `src/components/Header.tsx` — komponent `FlagIcon` z inline SVG w `LanguageSwitcher`.
