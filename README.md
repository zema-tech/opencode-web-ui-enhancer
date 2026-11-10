# opencode-web-ui-enhancer

Plugin **additivo** per migliorare il design di OpenCode **senza modificare** il repository ufficiale.

Usa le API ufficiali dei plugin OpenCode v2:

- **Server part** → `src/index.ts` (id stabile del plugin)
- **GUI part** → `src/gui.tsx` (temi, stili CSS, comandi)

## Cosa fa (v0.1)

- Tema **Aurora** (light/dark) in **Settings → Appearance → Theme**
- Stili **polished**: radius più morbidi, ombre soft, scrollbar, composer
- Comandi palette:
  - `Toggle polished UI styles`
  - `Toggle compact chat density`
- Preferenze persistenti via `Store.global`

## Installazione locale (sviluppo)

```bash
git clone https://github.com/zema-tech/opencode-web-ui-enhancer.git
cd opencode-web-ui-enhancer
bun install
bun run build
```

Aggiungi il plugin alla config **globale** (Desktop carica la GUI da lì):

`~/.config/opencode/opencode.jsonc`

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    "/percorso/assoluto/a/opencode-web-ui-enhancer"
  ]
}
```

Oppure in sviluppo con watch:

```bash
bun run dev
```

Poi ricarica il plugin da **Settings → Extensions → Plugins** oppure riavvia OpenCode Desktop.

## Nota importante: Desktop vs Web browser

Le API ufficiali `./gui-experimental` (`Style`, `Theme`, `Command`, pannelli…) sono pensate per **OpenCode Desktop**.

- Se usi **OpenCode Desktop** → questo plugin è la strada corretta.
- Se usi solo **`opencode web` nel browser** o una UI community (es. oc-web), le GUI plugin ufficiali possono non applicarsi allo stesso modo. In quel caso si può:
  1. estendere questo plugin lato server (tool/hook),
  2. oppure fare un userscript / estensione browser / fork di una web UI community.

Dimmi quale interfaccia usi davvero e che miglioramenti design vuoi (palette, densità, layout, pannelli…) e li implementiamo.

## Roadmap suggerita

- [ ] Pannello Settings del plugin (toggle polished / compact)
- [ ] Più temi (es. Nord, Catppuccin-like)
- [ ] Slot titolo / composer pills
- [ ] Modalità "focus" (nasconde rumore UI)
- [ ] Eventuale bridge per pure web UI

## Licenza

MIT
