<h1 align="center">NLW Agents – API (Backend)</h1>

Este projeto faz parte do evento **NLW Agents** promovido pela [Rocketseat](https://www.rocketseat.com.br/). Aqui você encontra a API responsável pelo backend da aplicação, desenvolvida com foco em IA, transcrição de áudio e gerenciamento de salas e perguntas.

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/) + [pgvector](https://github.com/pgvector/pgvector)
- [Google Gemini API](https://ai.google.dev/)
- [Zod](https://zod.dev/) (validação)
- [dotenv](https://github.com/motdotla/dotenv) (variáveis de ambiente)
- [Docker](https://www.docker.com/) (infraestrutura)
- [Prettier](https://prettier.io/) (formatação)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)

## ⚙️ Instalação

> **Obs.:** Este projeto utiliza o gerenciador de pacotes [pnpm](https://pnpm.io/). Caso não tenha instalado, siga as instruções na documentação oficial.

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/kauankarvalho/nlw-agents.git
   cd nlw-agents/server
   ```
2. **Instale as dependências:**
   ```bash
   pnpm install
   ```
3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` com:
   ```json
   {
     "DATABASE_URL": "postgresql://docker:docker@localhost:5432/nlw_agents_server_db",
     "PORT": "sua porta",
     "GEMINI_API_KEY": "<sua-chave-google-gemini>"
   }
   ```
4. **Suba o banco de dados:**
   ```bash
   docker compose up -d
   ```

## ▶️ Como usar

1. **Inicie o banco de dados (caso ainda não tenha feito):**
   ```bash
   docker compose up -d
   ```
2. **Rode as migrações do banco de dados:**
   ```bash
   pnpm db:migrate
   ```
3. **(Opcional) Popule o banco com dados iniciais (seed):**
   ```bash
   pnpm db:seed
   ```
4. **Inicie o servidor em modo desenvolvimento:**
   ```bash
   pnpm start:dev
   ```
   A API estará disponível em `http://localhost:3333`.
5. **Para rodar em produção:**
   ```bash
   pnpm start
   ```

## 🔗 Rotas da API

- **GET `/health`**
  - Verifica se a API está online.

- **GET `/rooms`**
  - Lista todas as salas cadastradas.

- **POST `/rooms`**
  - Cria uma nova sala.
  - Corpo esperado (JSON):
    ```json
    {
      "name": "Nome da sala",
      "description": "Descrição opcional"
    }
    ```

- **GET `/rooms/:roomId/questions`**
  - Lista todas as perguntas de uma sala.

- **POST `/rooms/:roomId/questions`**
  - Cria uma nova pergunta e obtém resposta automática.
  - Corpo esperado (JSON):
    ```json
    {
      "question": "Sua pergunta aqui"
    }
    ```

- **POST `/rooms/:roomId/audio`**
  - Faz upload de um áudio para a sala (multipart/form-data, campo: file).

## 🗂️ Estrutura de Pastas

```
server/
  docker/           # Setup do banco
  src/
    db/             # Banco de dados
    env/            # Variáveis de ambiente
    routes/         # Rotas da API
    services/       # Integrações externas
    server.ts       # Inicialização do servidor
  docker-compose.yml
  package.json
```

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](../LICENSE) para mais informações.
