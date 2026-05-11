# WIISE LP - Landing Page & Social Contribution Platform

Esta é a plataforma de contribuição social da **WIISE**, construída com Next.js 16. O projeto permite que usuários reservem espaços para eventos sociais e projetos de impacto, integrando-se com o ecossistema WIISEWELL.

## 🚀 Como Começar

### Pré-requisitos

- **Node.js**: v18 ou superior
- **Yarn** ou **NPM**
- **Backend WIISEWELL**: O servidor backend deve estar rodando (geralmente na porta 3333)

### Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   yarn install
   # ou
   npm install
   ```

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# URL base para chamadas de API (Frontend para Backend)
NEXT_PUBLIC_API_URL=http://localhost:3333
```

> [!IMPORTANT]
> No Next.js, variáveis que começam com `NEXT_PUBLIC_` são as únicas que podem ser acessadas pelo navegador. Se você mudar a porta do backend, lembre-se de atualizar este valor.

## 🛠️ Comandos Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento em `localhost:3000` |
| `npm run build` | Cria o pacote de produção otimizado |
| `npm run start` | Inicia o servidor em modo de produção |
| `npm run lint` | Verifica erros de formatação e código |

## 📁 Estrutura do Projeto

- `/src/app`: Rotas e páginas (App Router do Next.js)
- `/src/components`: Componentes reutilizáveis (Botões, Cards, Modais)
- `/src/lib`: Lógica de utilitários e integração com a API (`api.ts`, `auth.ts`)
- `/public`: Ativos estáticos (Imagens, Ícones, Logo)

## 🔗 Integração com a API

A integração centralizada acontece em `src/lib/api.ts`. Esta função `apiFetch`:
- Adiciona automaticamente o `auth_token` do localStorage aos headers.
- Trata erros e traduz mensagens vindas do backend.
- Utiliza a variável `NEXT_PUBLIC_API_URL` configurada no ambiente.

## 🎨 Design System

A plataforma utiliza um design moderno baseado em:
- **Aesthetics**: Glassmorphism e gradientes suaves.
- **Cores**: Azul WIISE (#0071A1) e Verde Esmeralda para ações positivas.
- **Tipografia**: Outfit (Displays) e Inter (Conteúdo).

---
Desenvolvido por **WIISEWELL Team**.
