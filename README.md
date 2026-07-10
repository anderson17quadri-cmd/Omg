# OMG · Oh My Grill — Landing Page

Landing page de alta conversão do restaurante **OMG - Oh My Grill**
(Carregal do Sal, Portugal). Site estático, sem dependências de build.

Direção de arte **"Brasa"** — uma casa de grelhados editorial, iluminada por
brasas: fundo carvão quente, tipografia serifada de alto contraste (*Fraunces*)
com grotesca limpa (*Archivo*), gradiente de fogo como motivo e animações
subtis (partículas de brasa em canvas, revelações no scroll, micro-interações).

## 📁 Ficheiros

| Ficheiro                  | Descrição                                   |
|---------------------------|---------------------------------------------|
| `index.html`              | Landing page (estrutura e conteúdo)         |
| `cardapio.html`           | Cardápio visual com as fotos reais de cada prato |
| `styles.css`              | Design "Brasa" (tema escuro, responsivo)    |
| `script.js`               | Brasas em canvas, reveal on scroll, carrossel, formulário |
| `assets/`                 | Logótipo, foto de prato e ementa            |
| `galeria/foto-01..42.jpeg`| 42 fotos reais (carrossel)                  |

## ▶️ Ver no telemóvel (Termux + navegador)

```bash
cd ~
git clone https://github.com/anderson17quadri-cmd/omg.git
cd omg
python3 -m http.server 8000
```

Depois abra no navegador do telemóvel: **http://localhost:8000**

> As tipografias (Fraunces + Archivo) carregam do Google Fonts; com internet
> aparecem no telemóvel. Sem internet, caem num fallback elegante (Georgia +
> system-ui) e o site continua bonito.

## ✨ Destaques do design

- **Hero** com partículas de brasa (canvas) e foto que **roda entre os melhores pratos** (crossfade)
- **Ementa completa redesenhada** em HTML, nas cores da marca — categorias, selos 🌱, preços em dourado e o Menu do Dia em destaque (a imagem original fica acessível em "ver ementa original")
- **Destaques em degustação** — nome · · · preço, com linhas pontilhadas
- **Menu do Dia** em painel dividido com foto e preço em destaque
- **Galeria** cinematográfica: 42 fotos reais em carrossel automático (setas,
  contador, barra de progresso, pontos e *swipe*)
- **Revelações no scroll** escalonadas + micro-interações (hover, brilho de calor)
- **Formulário → WhatsApp** (351 964 558 043)
- Acessível: respeita `prefers-reduced-motion`, foco visível, `noscript` de reserva

## ⚙️ Personalizar

1. **WhatsApp** — `WHATSAPP_NUMERO` no topo do `script.js` (já: `351964558043`)
2. **Morada / horário / contactos** — secção `#contactos` e rodapé do `index.html`
3. **Pratos e preços** — blocos `.dish` em `#ementa-destaques`
4. **Fotos** — substitua os ficheiros em `assets/` e `galeria/`
5. **Avaliações** — troque os depoimentos (comentário no `index.html`) pelas reais
6. **Cores** — variáveis `--char`, `--ember`, `--gold`… no início do `styles.css`

> Dados: Menu do Dia 11,95€ · Take Away 9,50€ · Seg–Sex 9h–16h ·
> 964 558 043 / 232 968 488 · Av. Dr. José Augusto Capelo, 32, Carregal do Sal.
