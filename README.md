# ABU Werkzeuge · mySkillbox

Deine Web-App für die Allgemeine Berufsschule Zürich — öffentlich erreichbar unter `abuabzh-werkzeuge.vercel.app`, kostenlos gehostet.

---

## Was du brauchst

- Einen Computer mit Internetzugang
- Etwa 30–45 Minuten Zeit
- Keine Programmierkenntnisse nötig!

Du wirst drei kostenlose Konten erstellen:
1. **GitHub** — speichert deinen Code (wie ein USB-Stick in der Cloud)
2. **Supabase** — speichert die Daten der App (z.B. Koordinationseinträge)
3. **Vercel** — macht die App im Internet erreichbar

---

## SCHRITT 1 — GitHub einrichten

GitHub ist der Ort, wo dein Code gespeichert wird. Du machst alles direkt im Browser — kein Programm installieren nötig.

### 1.1 Konto erstellen
1. Geh auf [github.com](https://github.com)
2. Klick auf **Sign up**
3. Gib E-Mail, Passwort und Benutzernamen ein
4. Bestätige deine E-Mail-Adresse
5. Melde dich an — du siehst jetzt die GitHub-Startseite

### 1.2 Ein neues Repository erstellen
Ein "Repository" (kurz: Repo) ist ein Ordner auf GitHub, der deinen Code enthält.

1. Klick oben rechts auf das **+** Symbol → **New repository**
2. Füll das Formular aus:
   - **Repository name:** `abuabzh-werkzeuge`
   - **Description:** (optional, z.B. `ABU Werkzeuge ABZH`)
   - Wähle **Public**
3. Klick ganz unten auf **Create repository**
4. Du siehst jetzt eine leere Seite mit dem Titel "Quick setup" — das ist normal

### 1.3 Dateien hochladen
Jetzt lädst du alle Projektdateien auf GitHub hoch. Das geht in mehreren Runden, weil GitHub nur Dateien in einem Ordner gleichzeitig hochladen kann.

**Runde 1 — Dateien im Hauptordner:**

1. Klick auf **uploading an existing file** (blauer Link in der Mitte der Seite)
2. Du siehst jetzt ein Upload-Fenster mit "Drag files here to add them"
3. Öffne auf deinem Computer den `abu-werkzeuge` Ordner
4. Wähle diese Dateien aus und ziehe sie ins Upload-Fenster (oder klick "choose your files"):
   - `index.html`
   - `package.json`
   - `vite.config.js`
   - `vercel.json`
   - `.env.example`
   - `.gitignore`
   - `README.md`
5. Warte bis alle Dateien hochgeladen sind (du siehst sie aufgelistet)
6. Unten bei **Commit changes** schreib: `Erste Dateien`
7. Klick auf **Commit changes**

**Runde 2 — Ordner `src`:**

1. Klick oben rechts auf **Add file → Upload files**
2. Öffne auf deinem Computer den Unterordner `abu-werkzeuge/src`
3. Wähle alle drei Dateien darin aus (`App.jsx`, `main.jsx`, `storage.js`) und ziehe sie rein
4. **Wichtig:** Schreib in das Textfeld oberhalb des Upload-Bereichs den Pfad `src/`
   → Das Feld heisst "Upload to" — trag dort `src/` ein, damit die Dateien im richtigen Ordner landen
5. Bei **Commit changes** schreib: `src Ordner`
6. Klick auf **Commit changes**

**Runde 3 — Ordner `api`:**

1. Klick oben rechts auf **Add file → Upload files**
2. Öffne auf deinem Computer den Unterordner `abu-werkzeuge/api`
3. Wähle `claude.js` aus und ziehe es rein
4. Schreib in das "Upload to" Feld: `api/`
5. Bei **Commit changes** schreib: `api Ordner`
6. Klick auf **Commit changes**

**Ergebnis prüfen:**
Geh zurück zur Hauptseite deines Repos (klick oben auf `abuabzh-werkzeuge`). Du solltest jetzt diese Struktur sehen:
```
api/
src/
.env.example
.gitignore
index.html
package.json
README.md
vercel.json
vite.config.js
```

Falls ein Ordner oder eine Datei fehlt, wiederhole den entsprechenden Upload-Schritt.

---

## SCHRITT 2 — Supabase einrichten

Supabase ist eine kostenlose Datenbank. Die App speichert dort z.B. welche Koordinationseinträge gemacht wurden.

### 2.1 Konto erstellen
1. Geh auf [supabase.com](https://supabase.com)
2. Klick auf **Start your project**
3. Klick auf **Continue with GitHub** — du musst dich so nicht extra registrieren
4. Bestätige die Verbindung mit GitHub

### 2.2 Neues Projekt erstellen
1. Klick auf **New Project**
2. Füll das Formular aus:
   - **Name:** `abuabzh-werkzeuge`
   - **Database Password:** Wähle ein sicheres Passwort und schreib es irgendwo auf
   - **Region:** `West EU (Ireland)` — das ist am nächsten zur Schweiz
3. Klick auf **Create new project**
4. Warte ca. 1–2 Minuten bis die grüne Meldung "Project is ready" erscheint

### 2.3 Datenbanktabelle anlegen
Die App braucht eine Tabelle um Daten zu speichern.

1. Klick links in der Navigation auf **SQL Editor** (sieht aus wie `>_`)
2. Klick auf **New query**
3. Lösche alles was im Textfeld steht
4. Kopiere den folgenden Text und füge ihn ein:

```sql
CREATE TABLE abu_storage (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

5. Klick auf den grünen **Run** Button (oben rechts im Editor)
6. Unten erscheint: `Success. No rows returned` — das ist korrekt!

### 2.4 Zugangsdaten notieren
Öffne ein leeres Textdokument und notiere diese zwei Werte — du brauchst sie gleich in Schritt 3.

1. Klick links in der Navigation ganz unten auf **Settings** (Zahnrad-Symbol)
2. Klick auf **API**
3. Notiere:
   - **Project URL** → sieht aus wie `https://abcdefghijk.supabase.co`
     Schreib dahinter: *(das ist VITE_SUPABASE_URL)*
   - **anon / public** unter "Project API keys" → sehr langer Text der mit `eyJ` beginnt
     Schreib dahinter: *(das ist VITE_SUPABASE_ANON_KEY)*

---

## SCHRITT 3 — Vercel einrichten

Vercel macht die App im Internet erreichbar und liest den Code automatisch von GitHub.

### 3.1 Konto erstellen
1. Geh auf [vercel.com](https://vercel.com)
2. Klick auf **Sign Up**
3. Wähle **Continue with GitHub**
4. Bestätige die Verbindung

### 3.2 Projekt importieren
1. Klick auf **Add New... → Project**
2. Du siehst deine GitHub-Repos — finde `abuabzh-werkzeuge` und klick auf **Import**

### 3.3 Umgebungsvariablen eintragen
Hier gibst du die geheimen Zugangsdaten ein. Scroll runter bis du **Environment Variables** siehst.

Trage diese drei Einträge ein — nach jedem auf **Add** klicken:

---

**Eintrag 1 — Anthropic API-Key:**
- Name: `ANTHROPIC_API_KEY`
- Value: Dein persönlicher API-Key (beginnt mit `sk-ant-...`)
  → Falls du ihn nicht weisst: [platform.anthropic.com](https://platform.anthropic.com) → API Keys

---

**Eintrag 2 — Supabase URL:**
- Name: `VITE_SUPABASE_URL`
- Value: Die URL aus Schritt 2.4, z.B. `https://abcdefghijk.supabase.co`

---

**Eintrag 3 — Supabase Key:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: Der lange `eyJ...` Text aus Schritt 2.4

---

**Achtung:** Keine Leerzeichen am Anfang oder Ende der Werte — direkt copy-pasten!

### 3.4 Projektnamen festlegen
Damit deine App unter `abuabzh-werkzeuge.vercel.app` erreichbar ist:

1. Scroll rauf bis du das Feld **Project Name** siehst
2. Ändere den Namen auf: `abuabzh-werkzeuge`

### 3.5 Deployen
1. Klick auf den blauen **Deploy** Button
2. Warte 2–3 Minuten — du siehst wie Vercel die App baut
3. Wenn alles klappt, erscheint eine Erfolgsmeldung mit Konfetti 🎉
4. Deine App ist jetzt erreichbar unter: **`abuabzh-werkzeuge.vercel.app`**

---

## Was jetzt?

**App teilen:**
Schicke diese URL an alle Lehrpersonen:
`https://abuabzh-werkzeuge.vercel.app`
Kein Login, kein Download — einfach öffnen.

**App aktualisieren (wenn du neue Dateien bekommst):**
1. Geh auf `github.com/DEIN-USERNAME/abuabzh-werkzeuge`
2. Klick auf die Datei die du ersetzen möchtest
3. Klick auf den Stift-Symbol ✏️ oben rechts (Edit)
4. Ersetze den Inhalt, dann klick **Commit changes**
5. Oder: Klick auf **Add file → Upload files** um neue Dateien hochzuladen
6. Vercel aktualisiert die App automatisch innerhalb von 2–3 Minuten

---

## Kosten

| Dienst   | Plan  | Preis     |
|----------|-------|-----------|
| GitHub   | Free  | CHF 0     |
| Supabase | Free  | CHF 0     |
| Vercel   | Hobby | CHF 0     |
| **Total**|       | **CHF 0** |

Die einzigen Kosten entstehen durch Anthropic (die KI in der Erstellen-Funktion) — du zahlst nur was tatsächlich genutzt wird.

---

## Etwas klappt nicht?

**Vercel zeigt einen Fehler beim Deploy:**
→ Geh zu Vercel → dein Projekt → **Settings → Environment Variables** und prüfe ob alle drei Einträge da sind und keine Leerzeichen enthalten.

**Die App lädt, aber die KI-Funktion geht nicht:**
→ Prüfe ob `ANTHROPIC_API_KEY` korrekt ist: [platform.anthropic.com](https://platform.anthropic.com) → API Keys.

**Die Koordinationsdaten werden nicht gespeichert:**
→ Geh in Supabase → **Table Editor** und prüfe ob die Tabelle `abu_storage` existiert. Falls nicht, wiederhole Schritt 2.3.

**Die Dateistruktur auf GitHub stimmt nicht:**
→ Prüfe ob `api/claude.js` und `src/App.jsx` vorhanden sind. Falls nicht, lade die fehlenden Dateien nochmals hoch (Schritt 1.3).

**Du siehst "Page Not Found":**
→ Warte 2–3 Minuten und lade die Seite neu. Falls es weiter nicht klappt, prüfe den Projektnamen in Vercel (Schritt 3.4).
