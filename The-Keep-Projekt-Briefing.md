# The Keep — Projekt-Briefing

Ein öffentlich zugänglicher persönlicher Raum: eine „Festung", die deine Projekte, Social Posts, Letterboxd-Reviews und Shrines sammelt und zeigt. Dieses Dokument ist so geschrieben, dass du es direkt in **Claude Code / Cowork** verwenden kannst — Phase für Phase.

---

## 1. Vision & Kernidee

The Keep ist dein digitaler Ort. Herzstück ist ein **chronologischer Feed**, in dem alle deine Aktivitäten zusammenlaufen und nach Kategorie gefiltert werden können. Dazu eine **About-Seite** mit Beschreibung und Kontakt. Der visuelle Charakter ist vom **Licht/Dunkel-Motiv** von Kingdom Hearts inspiriert, mit einem **animierten, interaktiven Logo** als Wiedererkennungsmerkmal.

**Inhaltstypen:**
- **Social Posts** — kurze Beiträge (gespiegelt von extern, wo Feeds existieren)
- **Reviews** — Letterboxd-Filmkritiken (automatisch per RSS)
- **Shrines** — bewusst gestaltete Tribut-Seiten für prägende Dinge (z. B. Videospiele)
- **Portfolio** — deine Projekte

---

## 2. Getroffene Entscheidungen

| Frage | Entscheidung |
|---|---|
| Inhalte pflegen | Automatisch ziehen, wo möglich; extern posten → The Keep spiegelt |
| Code-Aufwand | Einmal aufsetzen, danach möglichst wenig Code |
| Inhalte manuell hinzufügen | Visuelles Admin-Panel im Browser (kein Code) |
| Hosting | GitHub Pages |
| Design | Licht/Dunkel-Kontrast (KH-Kernmotiv), animiertes interaktives Logo |

---

## 3. Empfohlener Technik-Stack

- **Astro** — statischer Site-Generator, ideal für inhaltsgetriebene Seiten. Schnell, SEO-freundlich, gibt reine statische Dateien aus → perfekt für GitHub Pages.
- **Content Collections** (Markdown/MDX) als Datenbasis: je eine Sammlung für `social`, `reviews`, `shrines`, `portfolio`.
- **Sveltia CMS** — visuelles Browser-Panel zum Bearbeiten aller Inhalte ohne Code. GitHub-nativ, kostenlos, Decap-kompatibel. Braucht einen kleinen **Cloudflare-Worker** für den GitHub-Login (kostenlos, einmalig eingerichtet).
- **GitHub Actions** — geplante Workflows (Cron), die externe Feeds abrufen, in Inhaltsdateien schreiben, committen → Pages baut automatisch neu.
- **Deploy** — GitHub Actions baut Astro und veröffentlicht auf GitHub Pages.

> Alles in diesem Stack ist kostenlos und ohne eigenen Server.

---

## 4. Inhalts-Pipeline (das „automatisch"-Herzstück)

Ein geplanter GitHub-Actions-Workflow (z. B. täglich) zieht Feeds und legt neue Einträge an:

| Quelle | Methode | Zuverlässigkeit |
|---|---|---|
| Letterboxd | `letterboxd.com/DEINNAME/rss/` | ✅ zuverlässig |
| Mastodon | pro Account `.rss` | ✅ zuverlässig |
| Bluesky | öffentliche API / Feed | ✅ zuverlässig |
| Blog o. Ä. mit RSS | RSS | ✅ zuverlässig |
| Instagram / X / TikTok | kein freier Feed | ⚠️ nur manuell im CMS oder kostenpflichtiger Umweg (z. B. RSS.app) |

**Empfehlung:** Poste dort, wo es Feeds gibt (Mastodon, Bluesky, Letterboxd) → spiegelt sich von selbst. IG/X bei Bedarf manuell über das CMS nachtragen.

---

## 5. Struktur & Seiten

- **/ (Feed)** — alle Inhaltstypen zusammengeführt, chronologisch sortiert. Filter-Tabs oben: *Alle · Social · Reviews · Shrines · Portfolio* (rein clientseitig, kein Backend). Jeder Typ hat ein eigenes Karten-Design.
- **/shrines/[slug]** — reiche, bildlastige Einzelseiten; das gestalterische Highlight.
- **/portfolio/[slug]** — Projektseiten.
- **/about** — Beschreibung + Kontaktangaben.
- **/admin** — Sveltia CMS (nur du).

---

## 6. Design-Richtung

**Leitidee: zwei Reiche.** Statt eines normalen Dark-Mode wird der Licht/Dunkel-Kontrast zum Feature — ein Umschalter zwischen **Licht-Reich** (strahlend, Stein, Buntglas, warmes Gold) und **Dunkel-Reich** (Nacht, Schatten, tiefe Blau-/Violetttöne). Das verbindet das KH-Motiv direkt mit einer Funktion.

- **Typografie:** elegante Display-Schrift für Wortmarke/Überschriften + gut lesbare Body-Schrift.
- **Karten:** je Inhaltstyp eigener Akzent, damit der Feed trotz Mischung lesbar bleibt.

### Interaktives Logo
Ein **eigenständiges** Emblem, das die Ästhetik aufgreift (verzierter Schlüssel, Licht/Dunkel-Dualität). Interaktions-Ideen: Schimmern bei Hover, Reich-Wechsel bei Klick, sanftes Schweben im Ruhezustand.

- **Umsetzung:** Emblem als SVG (in **Pixelmator Pro** oder Figma zeichnen, als SVG exportieren) → animieren mit CSS/JS (einfach, kostenlos) oder **Rive** (reichere Interaktion).
- **Wichtiger Hinweis zum Urheberrecht:** Die echten Keyblades und das Kingdom-Hearts-Logo sind geschütztes Eigentum von Square Enix / Disney. Lass dich von der *Stimmung* inspirieren (Schlüssel, Licht gegen Dunkel, herz-/kronenartige Formen), aber gestalte ein **originales** Emblem — kopiere keine konkreten Keyblade-Designs oder das KH-Logo. So bleibt es deins und rechtlich sauber.

---

## 7. Build-Roadmap (Phasen für Claude Code / Cowork)

1. **Gerüst & Deploy** — Astro-Projekt aufsetzen, GitHub-Repo, GitHub-Actions-Deploy auf Pages. „Hallo Welt" live.
2. **Datenmodell** — Content Collections + Schemas für `social`, `reviews`, `shrines`, `portfolio`. Ein paar Beispieleinträge.
3. **Feed & About** — vereinter chronologischer Feed mit Kategorie-Filter + Kartenkomponenten. About-Seite.
4. **Visuelles CMS** — Sveltia CMS + Cloudflare-OAuth-Worker anbinden → alle Inhalte im Browser editierbar.
5. **Auto-Spiegelung** — GitHub-Actions-Cron: Letterboxd-RSS → Reviews, Mastodon/Bluesky → Social. Duplikate vermeiden, committen.
6. **Design-System** — Licht-/Dunkel-Reich-Theming, Typografie, interaktives Logo.
7. **Feinschliff** — Übergänge, Shrine-Template (bildstark), SEO/Meta, Favicon.

---

## 8. Noch offene Entscheidungen (mit Empfehlung)

- **Social-Plattformen:** Auf welchen postest du? (Bestimmt, was auto-gespiegelt wird.) → *Empfehlung: Mastodon und/oder Bluesky als „Feed-Quelle" nutzen.*
- **CMS:** Sveltia *(empfohlen)* vs. TinaCMS.
- **Logo-Tooling:** code-animiertes SVG *(einfachster Start)* vs. Rive *(reicher)*.
- **Domain:** GitHub-Pages-Standard `deinname.github.io` vs. später eigene Domain.

---

## 9. Erster Prompt für Claude Code

> „Wir bauen ‚The Keep', eine persönliche Website. Bitte lies das beiliegende Projekt-Briefing und starte mit **Phase 1**: ein Astro-Projekt aufsetzen, ein GitHub-Repo initialisieren und Deployment auf GitHub Pages via GitHub Actions einrichten, sodass eine Platzhalter-Startseite live geht. Erkläre mir jeden Schritt kurz, bevor du ihn ausführst."
