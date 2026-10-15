# Coletivo Pilates — site v14

Site estático oficial do Coletivo Pilates, publicado pelo GitHub Pages.

## Desenvolvimento local

```sh
python3 -m http.server 4173
```

Acesse `http://localhost:4173/`.

Os arquivos `assets/style.css` e `assets/app.js` são as fontes editáveis. A publicação usa as versões minificadas `assets/style.min.css` e `assets/app.min.js`.

## Publicação

Todo push na branch `main` executa o workflow de GitHub Pages. A versão anterior à v14 está preservada na branch `backup/pre-v14-2026-10-15`.
