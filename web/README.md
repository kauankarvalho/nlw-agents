<h1 align="center">NLW Agents – Web (Frontend)</h1>

Este projeto corresponde à interface web do **NLW Agents**, desenvolvida durante o evento promovido pela [Rocketseat](https://www.rocketseat.com.br/). Aqui você encontra o frontend da aplicação, construído em React e integrado à API do backend.

## 🚀 Tecnologias

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (estilização)
- [Shadcn UI](https://ui.shadcn.com/) (componentes UI)
- [Day.js](https://day.js.org/) (datas)
- [Prettier](https://prettier.io/) (formatação)

## ⚙️ Instalação

> **Obs.:** Este projeto utiliza o gerenciador de pacotes [pnpm](https://pnpm.io/). Caso não tenha instalado, siga as instruções na documentação oficial.

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/kauankarvalho/nlw-agents.git
   cd nlw-agents/web
   ```
2. **Instale as dependências:**
   ```bash
   pnpm install
   ```
3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` (se necessário) para definir a URL da API backend:
   ```json
   {
     "VITE_API_URL": "http://localhost:3333"
   }
   ```

## ▶️ Como usar

1. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm start:dev
   ```
   O app estará disponível em `http://localhost:5173`.
2. **Para build de produção:**
   ```bash
   pnpm build
   ```
3. **Para rodar o preview da build:**
   ```bash
   pnpm preview
   ```
4. **Para formatar o código com Prettier:**
   ```bash
   pnpm prettier
   ```

## 🔗 Páginas principais

- **/** – Criar nova sala e ver lista de salas
- **/sala/:roomId** – Visualizar perguntas e interagir em uma sala
- **/sala/:roomId/audio** – Enviar/gravar áudio para uma sala

## 🗂️ Estrutura de Pastas

```
web/
  public/           # Arquivos estáticos
  src/
    components/     # Componentes reutilizáveis
    css/            # Estilos globais
    http/           # Hooks e tipos para requisições
    lib/            # Utilitários
    pages/          # Páginas da aplicação
    main.tsx        # Entrada principal do app
    app.tsx         # Componente raiz
  index.html
  package.json
```

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](../LICENSE) para mais informações.
