# Site Karen Bortolini

Site profissional estático (Astro 5 + Tailwind + React islands) para deploy na Hostinger via FTP.

**Não é necessário Node.js na máquina** — todo desenvolvimento e build rodam no Docker.

## Pré-requisito

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (ou Docker Engine + Compose)

## Primeira vez

```bash
make install
# ou: docker compose run --rm install
```

## Desenvolvimento

```bash
# Primeira vez (instala deps + sobe o servidor em background)
make install
docker compose up dev -d --build

# Ou em primeiro plano (logs no terminal)
make dev
# ou: docker compose up dev
```

Abra [http://localhost:4321](http://localhost:4321)

Parar o servidor:

```bash
docker compose down
```

Ver logs:

```bash
docker compose logs -f dev
```

## Build para produção (Hostinger)

```bash
make build
# ou: docker compose run --rm build
```

A pasta `dist/` será gerada no projeto. Envie **o conteúdo** de `dist/` (não a pasta em si) para `public_html/` no FTP da Hostinger.

## Preview do build

```bash
make preview
# ou: docker compose --profile preview up preview
```

## Estrutura de conteúdo

Edite arquivos YAML em `src/content/`:

| Pasta | Conteúdo |
|-------|----------|
| `services/` | Serviços (comunicação e ensino) |
| `portfolio/` | Portfólio (vídeos, editoriais, PDFs) |
| `academic/` | Produção acadêmica |
| `education/` | Formação e cursos |
| `site/settings.yaml` | Contato, redes, textos da home |

## Assets

| Pasta | Uso |
|-------|-----|
| `public/logos/` | Logos de clientes (PNG/SVG) |
| `public/images/karen-hero.webp` | Foto da Karen (substituir placeholder quando disponível) |

## Contato no site

A página de contato usa **WhatsApp, e-mail e redes** (sem formulário por enquanto). Para adicionar formulário no futuro, dá para integrar Formspree ou Web3Forms.

## Comandos Make

| Comando | Ação |
|---------|------|
| `make install` | Instalar dependências npm no volume Docker |
| `make dev` | Servidor de desenvolvimento |
| `make build` | Gerar `dist/` para FTP |
| `make preview` | Visualizar build localmente |

## Deploy Hostinger (checklist)

1. `make build`
2. Conectar FTP (FileZilla ou painel)
3. Navegar até `public_html/` (ou `www/`)
4. Enviar todos os arquivos de `dist/`
5. Verificar: `/`, `/sobre/`, `/servicos/`, `/portfolio/`, `/producao-academica/`, `/contato/`

O arquivo `public/.htaccess` é copiado automaticamente para `dist/` no build.

## Domínio

Ajuste `site` em `astro.config.mjs` quando o domínio final estiver definido.
# karen-bortolini
