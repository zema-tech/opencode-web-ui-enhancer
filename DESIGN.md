# Design direction — OpenCode Web UI enhancer

Riferimenti utente nel repo:

- `Grok.mht` — UI Grok (xAI)
- `Nuova sessione - Claude.mht` — UI Claude

Target: **`opencode web` in Chrome**, non OpenCode Desktop.
Metodo: **CSS override + userscript** (non plugin server/GUI ufficiale).

## Direzione visiva

Mix pragmatico:

| Fonte | Cosa prendiamo |
|-------|----------------|
| **Grok** | Canvas quasi nero, monochrome, poco “rumore”, chat come transcript |
| **Claude** | Superfici calde, radius generosi, composer soft, tipografia leggibile |

Obiettivo: OpenCode web più **calmo, denso e moderno**, senza sembrare un clone pixel-perfect di Claude o Grok.

## Token proposti (dark-first)

```css
--ocx-bg: #0a0a0a;           /* canvas (Grok-like) */
--ocx-surface: #141414;      /* sidebar / panels */
--ocx-surface-2: #1c1c1c;    /* cards / elevated */
--ocx-border: rgba(255,255,255,0.08);
--ocx-text: #e8e6e3;         /* warm off-white (Claude-like) */
--ocx-muted: #8a8680;
--ocx-accent: #d97757;       /* warm accent tipo Claude */
--ocx-accent-soft: rgba(217, 119, 87, 0.15);
--ocx-radius-sm: 8px;
--ocx-radius-md: 14px;
--ocx-radius-lg: 20px;
--ocx-shadow: 0 8px 28px rgba(0,0,0,0.35);
```

## Layout prioritario

1. **Sidebar** più scura, bordi sottili, meno peso visivo
2. **Area messaggi** più ariosa ma compatta (meno padding inutile)
3. **Composer** centrato/soft, radius alto, bordo delicato
4. **Code block** contrastati, radius medio, scrollbar sottili
5. **Bottoni** più piccoli e meno “boxed”

## Fuori scope (per ora)

- Non modifichiamo HTML/JS del binario OpenCode
- Non usiamo GUI plugin Desktop
- Non facciamo fork del frontend ufficiale

## Iterazioni successive

Dopo il primo CSS base, ispezioniamo la DOM reale di `opencode web` e affinamo i selettori.
