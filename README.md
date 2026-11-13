# Formació Digital: La IA per a Docents de Primària
## Escola Giroi · La Garriga
### Elaborat per la Comissió Digital de l'Escola Giroi

Recurs web educatiu per a la formació d'una hora del claustre de primària de l'Escola Giroi, elaborat i dinamitzat per la **Comissió Digital de l'Escola Giroi**.
Dissenyat per explorar l'ús de la intel·ligència artificial en l'educació de forma reflexiva, pràctica i compartida.

---

## Pàgines del projecte

| Pàgina | Fitxer | Descripció |
|--------|--------|------------|
| 🏠 Benvinguda | `index.html` | Presentació de la formació d'1h, agenda i conceptes bàsics d'IA |
| 📝 Enquesta Claustre | `questionar.html` | Formulari anònim de 6 preguntes sobre l'ús de la IA (sense retroalimentació individual) |
| 📊 Gràfica del Claustre | `resultats.html` | Pantalla de projecció amb la visió general agregada de tots els docents (percentatges i gràfiques) |
| 🛠️ Eines d'IA | `eines.html` | Repositori de 15 eines d'IA educatives (destacades i freemium) |
| 🚀 Crea amb Antigravity | `antigravity.html` | Proposta de formació futura per aprendre a crear recursos web amb Antigravity |

---

## Estructura del projecte

```
escola-giroi-ia/
├── index.html          # Pàgina de benvinguda
├── questionar.html     # Qüestionari autocorrectiu
├── eines.html          # Repositori d'eines d'IA
├── css/
│   └── styles.css      # Estils globals (sense dependències externes)
├── js/
│   ├── quiz.js         # Lògica del qüestionari (vanilla JS)
│   └── nav.js          # Navegació i filtres compartits
└── README.md           # Aquest fitxer
```

---

## Publicació a GitHub Pages

1. Crea un nou repositori a GitHub (p.ex. `escola-giroi-ia`).
2. Puja tots els fitxers mantenint l'estructura de directoris.
3. Vés a **Settings → Pages → Source: Deploy from branch → main / (root)**.
4. El lloc estarà disponible a `https://<usuari>.github.io/escola-giroi-ia/`

---

## Proves en local

Obre directament `index.html` al navegador. No requereix servidor local.

---

## Requisits tècnics

- **Navegadors**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **JavaScript**: Necessari per al qüestionari interactiu (el `<noscript>` informa si no és actiu)
- **Dependències externes**: Cap. Tot el CSS i JS és propi del projecte.

---

## Accessibilitat (WCAG 2.1 AA)

- ✅ Contrast de text ≥ 4.5:1 en tots els elements de text
- ✅ Salt de contingut (`skip-link`) visible en focus
- ✅ Tota la interacció accessible per teclat (Tab, Enter, Espai)
- ✅ Regions ARIA: `banner`, `main`, `contentinfo`, `navigation`
- ✅ Alertes `aria-live` per a retroacció dinàmica
- ✅ No depèn únicament del color (icones + text com a indicadors)
- ✅ `prefers-reduced-motion` respectat

---

## Protecció de dades

No es recull, processa ni emmagatzema cap dada personal. No hi ha:
- Formularis d'identificació
- Cookies de seguiment
- Peticions a serveis externs d'analítica
- Emmagatzematge de respostes (ni localStorage ni sessionStorage)

---

## 🤖 Transparència: ús d'IA

El codi i el contingut d'aquest recurs han estat generats amb suport d'intel·ligència artificial (Antigravity/Gemini) i **revisats i validats per l'equip de la Comissió Digital**.

Les fonts acadèmiques citades a cada pregunta del qüestionari han estat verificades manualment:
- UNESCO (2023). *Guidance for generative AI in education and research*.
- Comissió Europea (2024). *AI competence framework for educators (DigCompEdu)*.
- AEPD (2023). *Guia d'ús de serveis d'intel·ligència artificial*.
- Redecker, C. (2017). *European Framework for the Digital Competence of Educators: DigCompEdu*.
- White, J. et al. (2023). *A prompt pattern catalog to enhance prompt engineering with ChatGPT*.

---

## Llicència

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) · Escola Giroi, La Garriga · 2026
