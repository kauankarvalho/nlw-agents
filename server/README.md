# ⚙️ API - NLW Agents

API desenvolvida durante o evento **NLW Agents** da [Rocketseat](https://www.rocketseat.com.br/), responsável pelo backend da aplicação de salas de perguntas com integração de IA.

## 🚀 Tecnologias

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[Fastify](https://www.fastify.io/)** - Framework web rápido e eficiente
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Drizzle ORM](https://orm.drizzle.team/)** - ORM TypeScript-first
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[pgvector](https://github.com/pgvector/pgvector)** - Extensão PostgreSQL para vetores
- **[Google Gemini AI](https://ai.google.dev/)** - API de inteligência artificial
- **[Zod](https://zod.dev/)** - Validação de esquemas TypeScript
- **[Docker](https://www.docker.com/)** - Containerização

## 📁 Estrutura de Pastas

```
src/
├── db/
│   ├── migrations/         # Migrações do banco de dados
│   ├── schema/            # Esquemas das tabelas
│   │   ├── audio-chunks.ts
│   │   ├── questions.ts
│   │   ├── rooms.ts
│   │   └── index.ts
│   ├── connection.ts      # Configuração da conexão
│   └── seed.ts           # Dados iniciais
├── env/
│   └── index.ts          # Configuração de variáveis de ambiente
├── routes/
│   ├── create-question.ts    # Criação de perguntas
│   ├── create-room.ts        # Criação de salas
│   ├── get-room-questions.ts # Listagem de perguntas
│   ├── get-rooms.ts          # Listagem de salas
│   └── upload-audio.ts       # Upload de áudio
├── services/
│   └── gemini.ts         # Integração com Gemini AI
└── server.ts             # Arquivo principal do servidor
```

## 🛣️ Rotas da API

### Health Check
- **GET** `/health` - Verificação de saúde da API

### Salas (Rooms)
- **GET** `/rooms` - Lista todas as salas
- **POST** `/rooms` - Cria uma nova sala
  ```json
  {
    "name": "Nome da sala",
    "description": "Descrição da sala"
  }
  ```

### Perguntas (Questions)
- **GET** `/rooms/:roomId/questions` - Lista perguntas de uma sala
- **POST** `/rooms/:roomId/questions` - Cria uma pergunta em uma sala
  ```json
  {
    "question": "Sua pergunta aqui"
  }
  ```

### Upload de Áudio
- **POST** `/upload-audio` - Faz upload de arquivo de áudio (multipart/form-data)

## ⚡ Funcionalidades

- **Gerenciamento de Salas**: Criação e listagem de salas de perguntas
- **Sistema de Perguntas**: Criação e listagem de perguntas por sala
- **Integração com IA**: Processamento de perguntas usando Google Gemini AI
- **Upload de Áudio**: Suporte para upload de arquivos de áudio
- **Validação de Dados**: Validação robusta usando Zod
- **CORS**: Configurado para permitir requisições do frontend
- **TypeScript**: Tipagem estática em todo o projeto

## 🗄️ Banco de Dados

O projeto utiliza **PostgreSQL** com a extensão **pgvector** para suporte a vetores, essencial para funcionalidades de IA. As principais tabelas são:

- **rooms**: Armazena informações das salas
- **questions**: Armazena as perguntas de cada sala
- **audio_chunks**: Armazena chunks de áudio processados

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm start:dev          # Inicia o servidor em modo desenvolvimento com watch

# Produção
pnpm start              # Inicia o servidor em modo produção

# Banco de dados
pnpm db:generate        # Gera migrações do banco
pnpm db:migrate         # Executa migrações
pnpm db:seed            # Popula o banco com dados iniciais

# Formatação
pnpm prettier           # Formata o código
```

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- pnpm
- Docker e Docker Compose

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd server
```

### 2. Instale as dependências
```bash
pnpm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL=postgresql://docker:docker@localhost:5432/nlw_agents_server_db
PORT=3333
GEMINI_API_KEY=sua_chave_do_gemini_aqui
```

### 4. Inicie o banco de dados
```bash
docker-compose up -d
```

### 5. Execute as migrações
```bash
pnpm db:migrate
```

### 6. (Opcional) Popule o banco com dados iniciais
```bash
pnpm db:seed
```

### 7. Inicie o servidor
```bash
# Desenvolvimento
pnpm start:dev

# Produção
pnpm start
```

## 🌐 Como Usar

1. **Inicie o servidor** seguindo os passos de instalação
2. **Acesse a API** em `http://localhost:3333`
3. **Teste as rotas** usando o arquivo `client.http` ou ferramentas como Postman/Insomnia
4. **Verifique a saúde** da API acessando `/health`

### Exemplo de uso com curl:

```bash
# Criar uma sala
curl -X POST http://localhost:3333/rooms \
  -H "Content-Type: application/json" \
  -d '{"name": "Minha Sala", "description": "Descrição da sala"}'

# Listar salas
curl http://localhost:3333/rooms

# Criar uma pergunta
curl -X POST http://localhost:3333/rooms/{roomId}/questions \
  -H "Content-Type: application/json" \
  -d '{"question": "Como funciona a IA?"}'
```

## 🔑 Variáveis de Ambiente

| Variável | Descrição | Obrigatória | Padrão |
|----------|-----------|-------------|---------|
| `DATABASE_URL` | URL de conexão com PostgreSQL | ✅ | - |
| `PORT` | Porta do servidor | ❌ | 3333 |
| `GEMINI_API_KEY` | Chave da API do Google Gemini | ✅ | - |

## 🐳 Docker

O projeto inclui um `docker-compose.yml` que configura:
- **PostgreSQL 17** com extensão pgvector
- **Porta**: 5432
- **Banco**: nlw_agents_server_db
- **Usuário/Senha**: docker/docker

## 📝 Notas Importantes

- O servidor roda por padrão na porta **3333**
- CORS está configurado para aceitar requisições de `http://localhost:5173` (frontend)
- A API utiliza validação de tipos com Zod
- Suporte nativo ao TypeScript sem necessidade de compilação

---

Desenvolvido durante o **NLW Agents** da [Rocketseat](https://www.rocketseat.com.br/) 🚀