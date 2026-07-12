# 📋 Documentação de Contexto do Projeto - Sistema de Pizzaria

## 📖 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Tecnologias e Versões](#tecnologias-e-versões)
4. [Estrutura de Pastas](#estrutura-de-pastas)
5. [Modelagem do Banco de Dados](#modelagem-do-banco-de-dados)
6. [Middlewares](#middlewares)
7. [Validação com Schemas](#validação-com-schemas)
8. [Endpoints](#endpoints)
9. [Fluxo de Requisição](#fluxo-de-requisição)
10. [Configurações do Projeto](#configurações-do-projeto)

---

## 🎯 Visão Geral

Sistema backend de gerenciamento de pizzaria desenvolvido em Node.js com TypeScript, utilizando Express como framework web, Prisma ORM para comunicação com banco de dados PostgreSQL, e Zod para validação de dados.

---

## 🏗️ Arquitetura

O projeto segue o padrão **MVC + Service Layer**, com a seguinte estrutura:

```
Requisição HTTP → Rotas → Middlewares → Controller → Service → Banco de Dados → Service → Controller → Resposta HTTP
```

### Camadas da Arquitetura:

1. **Rotas (`routes.ts`)**: Define os endpoints e aplica os middlewares
2. **Middlewares**: Validação de schema, autenticação e autorização
3. **Controllers**: Recebem a requisição, extraem dados e delegam para o Service
4. **Services**: Contêm toda a lógica de negócio e comunicação com o banco de dados
5. **Prisma Client**: ORM que gerencia a comunicação com PostgreSQL

### Princípios Seguidos:

- **Separação de Responsabilidades**: Cada camada tem uma responsabilidade específica
- **Single Responsibility Principle**: Um controller/service para cada operação
- **Reutilização**: Middlewares compartilhados entre rotas
- **Validação Centralizada**: Schemas Zod validam dados antes de chegarem ao controller

---

## 🚀 Tecnologias e Versões

### Dependências de Produção

| Tecnologia         | Versão  | Finalidade                                   |
| ------------------ | ------- | -------------------------------------------- |
| **express**        | ^5.2.1  | Framework web para criação de APIs REST      |
| **@prisma/client** | ^7.6.0  | ORM para comunicação com banco de dados      |
| **typescript**     | ^5.9.3  | Superset JavaScript com tipagem estática     |
| **zod**            | ^4.3.6  | Biblioteca de validação de schemas e tipagem |
| **bcryptjs**       | ^3.0.3  | Criptografia de senhas                       |
| **jsonwebtoken**   | ^9.0.3  | Geração e validação de tokens JWT            |
| **cors**           | ^2.8.6  | Middleware para habilitar CORS               |
| **dotenv**         | ^17.4.0 | Carregamento de variáveis de ambiente        |
| **tsx**            | ^4.21.0 | Executor TypeScript para desenvolvimento     |
| **multer**         | ^2.2.0  | Middleware para upload de arquivos           |
| **cloudinary**     | ^2.10.0 | Upload de imagens para o Cloudinary          |

### Dependências de Desenvolvimento

| Tecnologia              | Versão   | Finalidade                         |
| ----------------------- | -------- | ---------------------------------- |
| **@types/express**      | ^5.0.6   | Tipos TypeScript para Express      |
| **@types/cors**         | ^2.8.19  | Tipos TypeScript para CORS         |
| **@types/jsonwebtoken** | ^9.0.10  | Tipos TypeScript para JWT          |
| **@types/node**         | ^25.5.2  | Tipos TypeScript para Node.js      |
| **@types/multer**       | ^2.2.0   | Tipos TypeScript para Multer       |
| **prisma**              | ^6.19.3  | CLI do Prisma ORM                  |


### Banco de Dados

- **PostgreSQL** (gerenciado via Prisma ORM)

---

## 📁 Estrutura de Pastas

```
backend/
├── prisma/
│   ├── migrations/           # Histórico de migrações do banco
│   │   └── 20251110200355_create_tables/
│   │       └── migration.sql
│   ├── migration_lock.toml   # Lock de migrações
│   └── schema.prisma         # Schema do banco de dados
├── src/
│   ├── @types/               # Definições de tipos TypeScript customizados
│   │   └── express/
│   │       └── index.d.ts    # Extensão de tipos do Express
│   ├── controllers/          # Controllers (recebem requisições)
│   │   ├── category/
│   │   │   ├── CreateCategoryController.ts
│   │   │   └── ListCategoriesController.ts
│   │   ├── product/
│   │   │   └── RegisterProductsController.ts
│   │   └── user/
│   │       ├── AuthUserController.ts
│   │       ├── CreateUserController.ts
│   │       └── UserDetailsController.ts
│   ├── config/               # Configurações auxiliares
│   │   ├── cloudinary.ts
│   │   └── multer.ts
│   ├── generated/            # Código gerado pelo Prisma
│   │   └── prisma/
│   │       ├── client.ts
│   │       ├── enums.ts
│   │       └── models/
│   ├── middlewares/          # Middlewares customizados
│   │   ├── isAdmin.ts        # Verifica se usuário é admin
│   │   ├── isAuthenticated.ts # Valida JWT token
│   │   └── validateSchema.ts  # Valida requisições com Zod
│   ├── prisma/               # Configuração do Prisma Client
│   │   └── index.ts
│   ├── schemas/              # Schemas de validação Zod
│   │   ├── categorySchema.ts
│   │   ├── orderSchema.ts
│   │   ├── productSchema.ts
│   │   └── userSchema.ts
│   ├── services/             # Services (lógica de negócio)
│   │   ├── category/
│   │   │   ├── CreateCategoryService.ts
│   │   │   └── ListCategoriesService.ts
│   │   ├── products/
│   │   │   └── RegisterProductsService.ts
│   │   └── user/
│   │       ├── AuthUserService.ts
│   │       ├── CreateUserService.ts
│   │       └── UserDetailsSerivice.ts
│   ├── routes.ts             # Definição de todas as rotas
│   └── server.ts             # Configuração e inicialização do servidor
├── .env                      # Variáveis de ambiente
├── package.json              # Dependências e scripts
├── prisma.config.ts          # Configurações adicionais do Prisma
└── tsconfig.json             # Configurações do TypeScript

```

### Convenções de Nomenclatura:

- **Controllers**: `<Action><Entity>Controller.ts` (ex: `CreateUserController.ts`, `ListCategoriesController.ts`)
- **Services**: `<Action><Entity>Service.ts` (ex: `CreateUserService.ts`, `ListCategoriesService.ts`)
- **Exceção**: detalhes do usuário autenticado usam `UserDetailsController.ts` e `UserDetailsSerivice.ts` (classe `UserDetailsService`)
- **Schemas**: `<entity>Schema.ts` (ex: `userSchema.ts`)
- **Middlewares**: `<description>.ts` (ex: `isAuthenticated.ts`)

---

## 🗄️ Modelagem do Banco de Dados

### Diagrama de Relacionamentos

```
User (1)
  └─ role: STAFF | ADMIN

Category (1) ─────< (N) Product
                         │
                         └─< (N) OrderItem >─┐
                                            │
Order (1) ─────────────────────────────────┘
  └─ order_items: OrderItem[]
```

### Entidades e Atributos

#### **User** (Usuários do Sistema)

```typescript
{
  id: string(UUID); // Identificador único
  name: string; // Nome completo
  email: string(unique); // Email (único)
  password: string; // Senha criptografada (bcrypt)
  role: Role; // STAFF ou ADMIN
  createdAt: DateTime; // Data de criação
  updatedAt: DateTime; // Data de atualização
}
```

**Enum Role:**

- `STAFF` - Funcionário padrão
- `ADMIN` - Administrador (acesso total)

#### **Category** (Categorias de Produtos)

```typescript
{
  id: string (UUID)          // Identificador único
  name: string               // Nome da categoria
  createdAt: DateTime        // Data de criação
  updatedAt: DateTime        // Data de atualização
  products: Product[]        // Produtos desta categoria
}
```

#### **Product** (Produtos/Pizzas)

```typescript
{
  id: string (UUID)          // Identificador único
  name: string               // Nome do produto
  price: number (int)        // Preço em centavos
  description: string        // Descrição do produto
  bunner: string             // URL da imagem
  disable: boolean           // Produto ativo/inativo (default: false)
  category_id: string        // FK para Category
  category: Category         // Relação com categoria
  orderItems: OrderItem[]    // Itens de pedidos deste produto
  createdAt: DateTime        // Data de criação
  updatedAt: DateTime        // Data de atualização
}
```

**Observação sobre preço**: O preço é armazenado em **centavos** (inteiro) para evitar problemas com aritmética de ponto flutuante.

#### **Order** (Pedidos)

```typescript
{
  id: string (UUID)          // Identificador único
  table: number (int)        // Número da mesa
  status: boolean            // false = pendente, true = pronto
  draft: boolean             // true = rascunho, false = confirmado
  customer_name: string?     // Nome opcional do cliente
  order_items: OrderItem[]   // Itens do pedido
  createdAt: DateTime        // Data de criação
  updatedAt: DateTime        // Data de atualização
}
```

#### **OrderItem** (Itens dos Pedidos)

```typescript
{
  id: string (UUID)          // Identificador único
  amount: number (int)       // Quantidade
  order_id: string           // FK para Order
  order: Order               // Relação com pedido
  product_id: string         // FK para Product
  product: Product           // Relação com produto
  createdAt: DateTime        // Data de criação
  updatedAt: DateTime        // Data de atualização
}
```

### Regras de Deleção (Cascade)

- **Product** deletado → Deleta todos os **OrderItems** relacionados
- **Order** deletado → Deleta todos os **OrderItems** relacionados
- **Category** deletada → Deleta todos os **Products** relacionados

---

## 🛡️ Middlewares

### 1. **isAuthenticated** (`middlewares/isAuthenticated.ts`)

**Função**: Valida se o usuário está autenticado verificando o token JWT.

**Fluxo**:

1. Extrai o token do header `Authorization: Bearer <token>`
2. Verifica a validade do token usando `jsonwebtoken`
3. Extrai o `user_id` do payload do token
4. Adiciona `user_id` ao objeto `req` para uso nos próximos middlewares/controllers
5. Chama `next()` se válido, ou retorna erro 401 se inválido

**Uso**:

```typescript
router.get("/me", isAuthenticated, new UserDetailsController().handle);
```

**Respostas de Erro**:

- `401`: Token não fornecido ou inválido

---

### 2. **isAdmin** (`middlewares/isAdmin.ts`)

**Função**: Verifica se o usuário autenticado tem permissão de ADMIN.

**Pré-requisito**: Deve ser usado **após** o middleware `isAuthenticated`.

**Fluxo**:

1. Obtém `user_id` do `req` (adicionado pelo `isAuthenticated`)
2. Busca o usuário no banco de dados
3. Verifica se o campo `role` é igual a `"ADMIN"`
4. Chama `next()` se for admin, ou retorna erro 401 se não for

**Uso**:

```typescript
router.post(
  "/categories",
  isAuthenticated,
  isAdmin,
  validateSchema(createCategorySchema),
  new CreateCategoryController().handle
);
```

**Respostas de Erro**:

- `401`: Usuário sem permissão

---

### 3. **validateSchema** (`middlewares/validateSchema.ts`)

**Função**: Valida dados da requisição (body, query, params) usando schemas Zod.

**Fluxo**:

1. Recebe um schema Zod como parâmetro
2. Valida `req.body`, `req.query` e `req.params` contra o schema
3. Chama `next()` se válido
4. Retorna erro 400 com detalhes da validação se inválido

**Uso**:

```typescript
router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle
);
```

**Respostas de Erro**:

- `400`: Erro de validação com detalhes dos campos inválidos
- `500`: Erro interno do servidor

**Exemplo de resposta de erro**:

```json
{
  "error": "Validation error",
  "details": [
    {
      "field": "name",
      "message": "O nome deve ter pelo menos 3 caracteres"
    },
    {
      "field": "email",
      "message": "Precisa ser um email válido"
    }
  ]
}
```

---

## ✅ Validação com Schemas

Utilizamos **Zod** para validação de dados de entrada. Os schemas ficam organizados na pasta `src/schemas/`.

### User Schemas (`schemas/userSchema.ts`)

#### **createUserSchema**

Valida criação de novos usuários:

```typescript
{
  body: {
    name: string (min: 3 caracteres),
    email: email válido,
    password: string (min: 6 caracteres)
  }
}
```

**Mensagens de erro customizadas**:

- Nome inválido: "O nome deve ter pelo menos 3 caracteres"
- Email inválido: "Precisa ser um email válido"
- Senha inválida: "A senha precisa ter pelo menos 6 caracteres"

#### **authUserSchema**

Valida autenticação de usuários:

```typescript
{
  body: {
    email: email válido,
    password: string (obrigatório)
  }
}
```

### Category Schemas (`schemas/categorySchema.ts`)

#### **createCategorySchema**

Valida criação de categorias:

```typescript
{
  body: {
    name: string (min: 3 caracteres)
  }
}
```

**Mensagens de erro**:

- Nome inválido: "O nome da categoria precisa ter pelo menos 3 caracteres"

### Product Schemas (`schemas/productSchema.ts`)

#### **registerProductSchema**

Valida o cadastro de produtos:

```typescript
{
  body: {
    name: string (obrigatório),
    description: string (obrigatório),
    price: string numérica (mínimo 3 caracteres),
    category_id: string (obrigatório)
  }
}
```

**Observação**: a imagem do produto é enviada via multipart/form-data no campo `bunner` e validada no controller, antes da criação do produto.

### Order Schemas (`schemas/orderSchema.ts`)

#### **createOrderSchema**

Valida criação de pedidos:

```typescript
{
  body: {
    table: number inteiro,
    products: string[] (IDs dos produtos)
  }
}
```

---

## 🌐 Endpoints

### **Usuários**

#### **POST /users**

Cria um novo usuário no sistema.

**Middlewares**: `validateSchema(createUserSchema)`

**Body**:

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (200)**:

```json
{
  "id": "uuid-gerado",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "STAFF",
  "createdAt": "2025-11-11T10:30:00.000Z"
}
```

**Observações**:

- Senha é criptografada com bcrypt (salt: 8)
- Role padrão é STAFF
- Senha não é retornada na resposta

---

#### **POST /login**

Autentica um usuário e retorna token JWT.

**Middlewares**: `validateSchema(authUserSchema)`

**Body**:

```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (200)**:

```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "STAFF",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Observações**:

- Token JWT com expiração de 30 dias
- Token contém o `user_id` no campo `sub`

---

#### **GET /me**

Retorna informações do usuário autenticado.

**Middlewares**: `isAuthenticated`

**Headers**:

```
Authorization: Bearer <token>
```

**Resposta de Sucesso (200)**:

```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "STAFF",
  "createdAt": "2025-11-11T10:30:00.000Z"
}
```

---

### **Categorias**

#### **GET /categories**

Lista todas as categorias cadastradas.

**Middlewares**: `isAuthenticated`

**Permissão**: Usuários autenticados (`STAFF` ou `ADMIN`)

**Headers**:

```
Authorization: Bearer <token>
```

**Resposta de Sucesso (200)**:

```json
[
  {
    "id": "uuid-da-categoria",
    "name": "Pizzas Doces",
    "createdAt": "2025-11-11T10:30:00.000Z"
  }
]
```

---

#### **POST /categories**

Cria uma nova categoria de produtos.

**Middlewares**: `isAuthenticated`, `isAdmin`, `validateSchema(createCategorySchema)`

**Permissão**: Apenas usuários com role ADMIN

**Headers**:

```
Authorization: Bearer <token>
```

**Body**:

```json
{
  "name": "Pizzas Doces"
}
```

**Resposta de Sucesso (201)**:

```json
{
  "id": "uuid-gerado",
  "name": "Pizzas Doces",
  "createdAt": "2025-11-11T10:30:00.000Z"
}
```

---

### **Produtos**

#### **POST /products**

Cadastra um novo produto no sistema, incluindo upload de imagem para o Cloudinary.

**Middlewares**: `isAuthenticated`, `isAdmin`, `upload.single("bunner")`, `validateSchema(registerProductSchema)`

**Permissão**: Apenas usuários com role ADMIN

**Headers**:

```
Authorization: Bearer <token>
```

**Body** (multipart/form-data):

```text
name: "Pizza Pepperoni"
description: "Pizza saborosa com pepperoni"
price: "3500"
category_id: "uuid-da-categoria"
bunner: <arquivo de imagem>
```

**Resposta de Sucesso (200)**:

```json
{
  "id": "uuid-gerado",
  "name": "Pizza Pepperoni",
  "description": "Pizza saborosa com pepperoni",
  "price": 3500,
  "category_id": "uuid-da-categoria",
  "bunner": "https://res.cloudinary.com/....jpg",
  "createdAt": "2025-11-11T10:30:00.000Z"
}
```

**Observações**:

- A imagem é enviada para o Cloudinary e o link retornado é salvo no campo `bunner`
- O campo `price` é recebido como string e convertido para inteiro em centavos
- O produto só é criado se a categoria informada existir

---

## 🔄 Fluxo de Requisição

### Exemplo Completo: Criação de Usuário

```
1. POST /users
   ↓
2. Middleware: validateSchema(createUserSchema)
   - Valida name, email, password
   - Se inválido → 400 com erros
   ↓
3. CreateUserController.handle()
   - Extrai dados do req.body
   - Instancia CreateUserService
   - Chama service.execute()
   ↓
4. CreateUserService.execute()
   - Verifica se email já existe
   - Se existe → throw Error("Usuário já cadastrado")
   - Criptografa senha com bcrypt
   - Cria usuário no banco via Prisma
   - Retorna dados do usuário (sem senha)
   ↓
5. CreateUserController.handle()
   - Recebe dados do service
   - Retorna res.json(user)
   ↓
6. Resposta HTTP 200 com dados do usuário
```

### Fluxo com Autenticação e Autorização

```
1. POST /categories
   ↓
2. Middleware: isAuthenticated
   - Valida token JWT
   - Adiciona user_id ao req
   - Se inválido → 401
   ↓
3. Middleware: isAdmin
   - Busca usuário no banco
   - Verifica role === "ADMIN"
   - Se não for admin → 401
   ↓
4. Middleware: validateSchema(createCategorySchema)
   - Valida dados
   - Se inválido → 400
   ↓
5. CreateCategoryController → CreateCategoryService
   - Lógica de negócio
   - Criação no banco
   ↓
6. Resposta HTTP 201
```

### Fluxo: Listagem de Categorias

```
1. GET /categories
   ↓
2. Middleware: isAuthenticated
   - Valida token JWT
   - Adiciona user_id ao req
   - Se inválido → 401
   ↓
3. ListCategoriesController → ListCategoriesService
   - Busca categorias no banco via Prisma
   - Ordena por nome (asc)
   ↓
4. Resposta HTTP 200 com array de categorias
```

### Fluxo: Cadastro de Produto

```
1. POST /products
   ↓
2. Middleware: isAuthenticated
   - Valida token JWT
   - Se inválido → 401
   ↓
3. Middleware: isAdmin
   - Verifica se o usuário é ADMIN
   - Se não for → 401
   ↓
4. Middleware: upload.single("bunner")
   - Recebe o arquivo de imagem do formulário
   ↓
5. Middleware: validateSchema(registerProductSchema)
   - Valida name, description, price e category_id
   ↓
6. RegisterProductsController → RegisterProductsService
   - Valida se a categoria existe
   - Verifica se o produto já está cadastrado
   - Faz upload da imagem para o Cloudinary
   - Cria o produto no banco
   ↓
7. Resposta HTTP 200 com os dados do produto criado
```

---

## ⚙️ Configurações do Projeto

### TypeScript (`tsconfig.json`)

**Configurações Principais**:

- **Target**: ES2020
- **Module**: CommonJS (compatível com Node.js)
- **Strict Mode**: Ativado (todas verificações rigorosas)
- **Output**: `./dist`
- **Root**: `./src`
- **Source Maps**: Habilitado

**Verificações Estritas Ativas**:

- `noImplicitAny`: Proíbe tipos `any` implícitos
- `strictNullChecks`: Tratamento rigoroso de null/undefined
- `noUnusedLocals`: Erro para variáveis não usadas
- `noUnusedParameters`: Erro para parâmetros não usados
- `noImplicitReturns`: Todos os caminhos devem retornar valor

---

### Prisma (`prisma/schema.prisma`)

**Generator**:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
```

Cliente Prisma é gerado em `src/generated/prisma/`.

**Datasource** (`prisma/schema.prisma` + `prisma.config.ts`):

```prisma
datasource db {
  provider = "postgresql"
}
```

A URL de conexão é definida em `prisma.config.ts`:

```typescript
datasource: {
  url: env("DATABASE_URL"),
}
```

**Convenções**:

- Nomes de models em PascalCase (ex: `User`)
- Nomes de tabelas em snake_case (ex: `users`)
- IDs: UUID gerado automaticamente
- Timestamps automáticos: `createdAt`, `updatedAt`

---

### Express Server (`server.ts`)

**Middlewares Globais**:

1. `express.json()` - Parse de requisições JSON
2. `cors()` - Habilita CORS para todas as origens
3. `router` - Rotas da aplicação

**Error Handler Global**:

```typescript
app.use((error: Error, _, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: "Internal server error!" });
});
```

**Porta**:

- Padrão: `3333`
- Configurável via variável de ambiente `PORT`

---

### Variáveis de Ambiente (`.env`)

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/pizzaria?schema=public"

# JWT
JWT_SECRET="sua-chave-secreta-aqui"

# Server
PORT=3333
```

**Variáveis Obrigatórias**:

- `DATABASE_URL`: String de conexão PostgreSQL
- `JWT_SECRET`: Chave secreta para assinar tokens JWT

---

### Scripts NPM (`package.json`)

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts"
  }
}
```

**Comando de Desenvolvimento**:

```bash
npm run dev
```

- Executa servidor com hot-reload
- Usa `tsx` para executar TypeScript diretamente

**Comandos Prisma**:

```bash
# Criar migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações
npx prisma migrate deploy

# Abrir Prisma Studio
npx prisma studio

# Gerar Prisma Client
npx prisma generate
```

---

## 🔐 Segurança

### Autenticação

- **JWT (JSON Web Tokens)** para autenticação stateless
- Tokens devem ser enviados no header: `Authorization: Bearer <token>`
- Token contém `user_id` no campo `sub`

### Autorização

- Sistema de roles: `STAFF` e `ADMIN`
- Rotas protegidas por middlewares `isAuthenticated` e `isAdmin`

### Criptografia

- **bcryptjs** com salt de 8 rounds para senhas
- Senhas nunca são retornadas nas respostas da API

### Validação

- **Zod** valida todos os inputs antes de chegarem à lógica de negócio
- Mensagens de erro customizadas e amigáveis

---

## 📝 Observações Importantes

1. **Preços em Centavos**: Todos os preços são armazenados como inteiros em centavos para evitar problemas com ponto flutuante.

2. **UUIDs**: Todos os IDs são UUIDs v4 gerados automaticamente pelo Prisma.

3. **Timestamps Automáticos**: `createdAt` e `updatedAt` são gerenciados automaticamente pelo Prisma.

4. **Cascade Delete**: Deleções em cascata estão configuradas para manter integridade referencial.

5. **Error Handling**: Todos os erros são capturados pelo error handler global do Express.

6. **Type Safety**: TypeScript configurado no modo strict garante segurança de tipos em todo o código.

7. **Prisma Client Customizado**: Cliente gerado em `src/generated/prisma` para melhor organização.

---

## 🚀 Como Iniciar o Projeto

1. **Instalar dependências**:

```bash
npm install
```

2. **Configurar variáveis de ambiente**:

```bash
cp .env.example .env
# Editar .env com suas configurações
```

3. **Executar migrações**:

```bash
npx prisma migrate dev
```

4. **Iniciar servidor**:

```bash
npm run dev
```

5. **Servidor rodando em**: `http://localhost:3333`

---

**Documento atualizado em**: 01/07/2026
**Versão do Projeto**: 1.0.0
