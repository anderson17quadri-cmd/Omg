# OMG - Oh My Grill · Landing Page de Alta Conversão

Landing page estática (HTML + CSS + JS puro, sem dependências) do restaurante
**OMG - Oh My Grill** (Carregal do Sal, Portugal), otimizada para converter
visitantes em reservas e pedidos Take Away.

Usa as **fotos reais** do restaurante (logótipo, foto de prato e ementa),
guardadas em `assets/`.

## 📁 Ficheiros

| Ficheiro        | Descrição                                        |
|-----------------|--------------------------------------------------|
| `index.html`    | Estrutura e conteúdo da página                   |
| `styles.css`    | Estilo visual (tema "carvão + brasa", responsivo)|
| `script.js`     | Integração do formulário com o WhatsApp          |
| `assets/logo.png`        | Logótipo oficial                        |
| `assets/restaurante.jpeg`| Foto de prato (hero + Menu do Dia)      |
| `assets/menu.jpeg`       | Imagem da ementa completa               |
| `galeria/foto-01..42.jpeg` | 42 fotos reais da galeria (carrossel) |

## 🎠 Galeria em carrossel

A secção **Galeria** mostra as 42 fotos reais do restaurante (pasta `galeria/`)
num carrossel que **passa sozinho** a cada ~3,8s. Tem setas, contador, pontos de
navegação, pausa ao passar o rato e suporte a *swipe* no telemóvel. Respeita
`prefers-reduced-motion` (não roda sozinho para quem prefere menos movimento).

Para adicionar/remover fotos: coloque os ficheiros `foto-NN.jpeg` numerados
em sequência na pasta `galeria/` e ajuste a constante `TOTAL` no `script.js`.

## 🚀 Como visualizar

Basta abrir o `index.html` no navegador, ou servir a pasta:

```bash
cd landing-page
python3 -m http.server 8000
# acesse http://localhost:8000
```

## 🎯 Elementos de conversão incluídos

- **Barra de urgência** com contador regressivo até o fim do dia
- **Hero** com proposta de valor clara, prova social e CTA duplo
- **Faixa de números** (pedidos, nota, tempo de entrega, recompra)
- **Cardápio destaque** com preços "de/por" (âncora de preço)
- **Combo em oferta** com escassez ("restam poucas unidades")
- **Diferenciais**, **depoimentos 5★** e **FAQ** para quebrar objeções
- **Formulário rápido** que finaliza direto no WhatsApp
- **Botão flutuante do WhatsApp** sempre visível
- **CTA final** de reforço

## ⚙️ Como personalizar

1. **Número do WhatsApp** — `WHATSAPP_NUMERO` no topo do `script.js`
   (já configurado: `351964558043`).
2. **Morada, horário e contactos** — secção `#local` e `footer` do `index.html`.
3. **Pratos e preços** — cartões em `#destaques` e opções do `<select>`.
4. **Fotos** — substitua os ficheiros em `assets/` para atualizar as imagens.
5. **Avaliações** — troque os depoimentos de exemplo (marcados com um comentário
   no `index.html`) pelas avaliações reais do Google/Tripadvisor.
6. **Cores** — variáveis `--ember`, `--gold` etc. no início do `styles.css`.

> Dados usados: Menu do Dia 11,95€ · Take Away 9,50€ · Seg–Sex 9h–16h ·
> 964 558 043 / 232 968 488 · Av. Dr. José Augusto Capelo, 32, Carregal do Sal.

## 📱 Responsivo e acessível

- Layout adaptado para celular, tablet e desktop.
- Respeita `prefers-reduced-motion`.
- Marcação semântica com `aria-label` nos pontos-chave.
