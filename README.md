# opencode-web-ui-enhancer

Migliora la **grafica di `opencode web` in Chrome** senza modificare il codice ufficiale di OpenCode.

> Target reale: `opencode web` (browser).  
> Non usiamo OpenCode Desktop.  
> I plugin server/GUI ufficiali **non possono** restylare questa UI web: usiamo **CSS + userscript**.

Repo: https://github.com/zema-tech/opencode-web-ui-enhancer

## Riferimenti design (i tuoi file)

| File | Uso |
|------|-----|
| `Grok.mht` | Riferimento look Grok (nero, minimale) |
| `Nuova sessione - Claude.mht` | Riferimento look Claude (caldo, soft) |
| `DESIGN.md` | Direzione unificata e token |

## Come provarlo (2 minuti)

### Opzione A — Stylus (solo CSS, consigliata)

1. Installa [Stylus](https://chromewebstore.google.com/detail/stylus) su Chrome  
2. Apri il file [`browser/opencode-web-enhancer.user.css`](./browser/opencode-web-enhancer.user.css)  
3. Copia tutto → in Stylus: **Write style for this URL** sulla pagina di OpenCode web → incolla → Save  
4. Ricarica `opencode web`

### Opzione B — Tampermonkey

1. Installa [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey)  
2. Nuovo script → incolla [`browser/opencode-web-enhancer.user.js`](./browser/opencode-web-enhancer.user.js)  
3. Salva e ricarica la pagina OpenCode web

> Se la pagina non è su `localhost` / `127.0.0.1`, aggiungi il tuo `@match` (host:porta reali).

## Struttura repo

```
.
├── DESIGN.md                 # direzione design (Claude + Grok)
├── Grok.mht                  # riferimento UI Grok
├── Nuova sessione - Claude.mht
├── browser/
│   ├── opencode-web-enhancer.user.css   # Stylus
│   └── opencode-web-enhancer.user.js    # Tampermonkey
└── src/                      # vecchio scaffold plugin Desktop (non usato per opencode web)
```

## Prossimi passi (design su GitHub)

1. Apri `opencode web` in Chrome  
2. Ispettore elementi sui pezzi brutti (sidebar, composer, messaggi, code)  
3. Incolli qui class/id reali → affiniamo i selettori CSS  
4. Iteriamo palette / densità / radius finché ti piace

## Note

- Non tocchiamo il binario OpenCode  
- Gli override CSS possono rompersi se OpenCode cambia le class CSS  
- Per questo i selettori iniziali sono **best-effort**; li stringiamo con la DOM reale
