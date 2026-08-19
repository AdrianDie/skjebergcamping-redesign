# Overlevering til permanent domene

Dette redesignet driftes foreløpig på en demo-URL
(`adriandie.github.io/skjebergcamping-redesign/`). Denne filen samler ting
som må sjekkes/endres den dagen siden legges ut på et permanent domene —
skrevet ned nå fordi originalsiden (skjebergcamping.no) ikke nødvendigvis
finnes lenger på det tidspunktet.

## Cookie-samtykke (CookieYes) — bytter automatisk, ingen manuell handling

Originalen bruker CookieYes, domenelåst til `skjebergcamping.no`. Redesignet
har derfor en egenbygd, funksjonelt likeverdig samtykke-banner (se
`app.js` — 5 kategorier: Nødvendig/Funksjonell/Analytics/Ytelse/Annonse,
ordrett tekst hentet fra originalens eget samtykke-panel, pluss en
"gjenåpne innstillinger"-knapp).

**Dette bytter seg selv i koden** — øverst i cookie-IIFE-en i `app.js` sjekkes
`window.location.hostname` mot `skjebergcamping.no`/`www.skjebergcamping.no`.
Kjører siden på et av de domenene, injiserer koden automatisk den ekte
CookieYes-linjen og hopper over den egenbygde banneren. Kjører den et
annet sted (som demo-domenet nå), brukes den egenbygde banneren som før.
**Ingen skal manuelt lime inn linjen noe sted** — flytt bare de ferdige
filene til domenet, så gjør koden resten.

Ekte embed-linje (for referanse/verifisering — den samme som står i `app.js`):

```html
<script id="cookieyes" type="text/javascript" src="https://cdn-cookieyes.com/client_data/aa0f08b0e64e0f664a43d37a/script.js"></script>
```

**Havner redesignet på et helt ANNET domene** enn `skjebergcamping.no` (kunden
vil ha nytt domene): legg det nye domenet til i `LIVE_DOMAINS`-lista i `app.js`
BARE hvis kunden registrerer CookieYes på nytt for det domenet selv (vi har
ikke tilgang til deres konto til å gjøre det for dem). Ellers: la
`LIVE_DOMAINS` stå som den er — den egenbygde banneren fortsetter da å
fungere uendret, uten at noe knekker.

## Kontaktskjema

Fjernet bevisst (se commit "Fjern kontaktskjema, pek direkte pa e-post i
stedet"). Siden peker nå rett på `info@skjebergcamping.no` i header, footer
og kontakt-seksjonen — ingen tredjeparts skjematjeneste, ingen kontoavhengighet.
Ikke legg til et skjema igjen uten å diskutere det med Adrian først.
