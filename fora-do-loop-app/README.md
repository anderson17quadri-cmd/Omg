# Fora do Loop

Jogo de festa para um celular só, 3 a 9 jogadores. Empacotado como app Android via Capacitor.

Inspirado no formato de *Out of the Loop* (Tasty Rook) — mesmas mecânicas de jogo,
com identidade visual, textos e banco de palavras próprios, em português.

## Como funciona

Cada rodada: o grupo escolhe uma **categoria**, o celular passa de mão em mão e todos
veem a mesma **palavra secreta** — menos um, o **infiltrado**, que só vê a categoria.

Depois o app sorteia os pares: cada jogador lê uma pergunta para outro, que responde em
voz alta. Todo mundo pergunta uma vez e responde uma vez. Em seguida vem a votação
(secreta por padrão) e a apuração.

Se o infiltrado for pego, ele ainda tem uma chance de **chutar a palavra**. Se acertar,
o acerto do grupo é anulado.

### Pontos
| Situação | Pontos |
|---|---|
| Grupo pega o infiltrado (e ele erra o chute) | +1 para cada jogador do grupo |
| Infiltrado escapa (ou dá empate na votação) | +2 para o infiltrado |
| Infiltrado é pego mas acerta a palavra | Grupo não pontua, +2 para o infiltrado |

## Ajustes da partida
Rodadas (3 / 5 / 8 / sem limite) · tempo por resposta (sem tempo / 20s / 30s / 45s) ·
votação secreta ou em grupo · quais das 15 categorias entram no sorteio.

## Gerar o APK
O workflow `.github/workflows/build-apk.yml` na raiz do repositório compila sozinho a
cada push. O APK sai como o artefato `fora-do-loop-apk`.

## Rodar sem build
Abra `www/index.html` em qualquer navegador.
