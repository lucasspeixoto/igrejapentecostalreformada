# Plataforma Igreja Pentecostal Reformada

Uma plataforma de gestão completa para igrejas.

![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)
![PrimeNG](https://img.shields.io/badge/PrimeNG-21-DA384D?style=for-the-badge)

## 📋 Visão Geral

A **Plataforma IPR** é um sistema de gestão de igrejas que permite o gerenciamento de membros, finanças, patrimônio, atendimento pastoral e muito mais. O sistema possui controle de acesso baseado em papéis (RBAC) com diferentes níveis de permissão para administradores, secretários e tesoureiros.

## 🚀 Funcionalidades

### 🔐 Autenticação

- Login seguro com Supabase Auth
- Recuperação de senha por e-mail
- Redefinição de senha
- Proteção de rotas com guardas de autenticação

### 📊 Painel (Dashboard)

- Visualização de resumos e métricas gerais
- Acesso rápido às principais funcionalidades
- Cards informativos com dados estatísticos

### 👥 Membros

- Cadastro e gerenciamento de membros
- Categorização de membros (membro comum, obreiro, pastor, etc.)
- Controle de status (ativo, inativo, falecido)
- Busca e filtragem avanzada
- Histórico de informações

### 🏛️ Patrimônio

- Gestão de bens patrimoniais da igreja
- Cadastro de itens com valores e descrições
- Controle de localização e estado de conservação
- Relatórios de patrimônio

### 🤝 Atendimento Pastoral

- Registro de atendimentos pastorais
- Categorização de atendimentos (visita hospitalar, counseling, oração, etc.)
- Acompanhamento de casos
- Histórico de atendimentos por membro

### 💰 Financeiro

#### Notas

- Lançamento de receitas e despesas
- Categorização flexível de transações
- Filtros por data, categoria e tipo
- Exportação para Excel
- Editor visual de notas

#### Relatórios

- Relatórios mensais automáticos
- Totais por categoria
- Gráficos interativos
- Fechamento de mês
- Controle de saldo

#### Investimentos

- Registro de investimentos
- Acompanhamento de rendimentos
- Histórico de aplicações
- Atualização de valores

## 🔐 Sistema de Permissões

| Funcionalidade             | Administrador | Secretário | Tesoureiro |
| -------------------------- | :-----------: | :--------: | :--------: |
| Painel                     |      ✅       |     ✅     |     ✅     |
| Membros                    |      ✅       |     ✅     |     ❌     |
| Patrimônio                 |      ✅       |     ❌     |     ❌     |
| Atendimento Pastoral       |      ✅       |     ❌     |     ❌     |
| Financeiro - Notas         |      ✅       |     ❌     |     ✅     |
| Financeiro - Relatórios    |      ✅       |     ❌     |     ✅     |
| Financeiro - Investimentos |      ✅       |     ❌     |     ✅     |

## 🛠️ Tecnologias

- **Frontend:** Angular 21
- **UI Framework:** PrimeNG 21
- **Estilização:** TailwindCSS + SCSS
- **Backend:** Supabase (PostgreSQL + Auth)
- **Gráficos:** Chart.js
- **Excel:** xlsx
- **Testes:** Vitest

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── config/              # Configurações globais
│   ├── core/
│   │   ├── guards/         # Guards de autenticação e autorização
│   │   ├── routes/         # Definição de rotas
│   │   └── database/       # Scripts SQL
│   ├── data/
│   │   ├── repositories/   # Repositórios de dados
│   │   └── services/       # Serviços de negócio
│   ├── domain/
│   │   ├── models/         # Modelos de domínio
│   │   └── use-cases/      # Casos de uso
│   ├── ui/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── views/          # Páginas e componentes de visão
│   │   ├── view-models/    # ViewModels (MVVM)
│   │   └── pipes/          # Pipes personalizados
│   └── utils/              # Utilitários
├── assets/                 # Arquivos estáticos
└── environments/           # Configurações de ambiente
```

## ▶️ Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase

### Instalação

```bash
# Clone o repositório
git clone https://github.com/lucasspeixoto/igrejapentecostalreformada.git

# Entre no diretório
cd igrejapentecostalreformada

# Instale as dependências
npm install
```

### Configuração

1. Crie um projeto no [Supabase](https://supabase.com)
2. Configure as variáveis de ambiente em `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'SUA_URL_SUPABASE',
  supabaseKey: 'SUA_CHAVE_ANON',
};
```

3. Execute as migrações SQL presentes em `src/app/core/database/`

### Executando o projeto

```bash
# Modo desenvolvimento
npm start

# Acesse em http://localhost:4200
```

### Build para produção

```bash
npm run build
```

## 📄 Scripts Disponíveis

| Comando              | Descrição                            |
| -------------------- | ------------------------------------ |
| `npm start`          | Inicia o servidor de desenvolvimento |
| `npm run build`      | Compila o projeto para produção      |
| `npm run watch`      | Compila em modo watch                |
| `npm run test`       | Executa os testes unitários          |
| `npm run test:watch` | Executa testes em modo watch         |
| `npm run lint`       | Executa o linter                     |

## 🎨 Personalização

### Temas

O projeto utiliza PrimeNG Themes. Você pode alterar o tema em `src/app/app.config.ts`:

```typescript
import Aura from '@primeuix/themes/aura';

providePrimeNG({
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark', // opcional
    },
  },
});
```

### Cores

As cores principais podem ser configuradas em `src/app/utils/colors.ts`.

## 📱 Responsividade

A plataforma é totalmente responsiva e funciona em dispositivos móveis, tablets e desktops.

## 🔄版本

Consulte as [tags](https://github.com/lucasspeixoto/igrejapentecostalreformada/tags) para versões disponíveis.

## 📝 Licença

Este projeto está sob licença MIT.

---

Desenvolvido com ❤️ para a Igreja Pentecostal Reformada
