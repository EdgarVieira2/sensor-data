# Sensor Data Project

## Visão Geral

Este projeto é uma solução para a coleta e monitoramento de dados de sensores em tempo real. Ele utiliza uma stack baseada em Node.js, Prisma, PostgreSQL e React para construir um sistema completo que permite a recepção, armazenamento, visualização e análise dos dados de sensores.

## Funcionalidades

- **Recepção de dados em tempo real:** Recebe dados JSON de sensores via API REST.
- **Armazenamento de dados:** Armazena os dados em um banco de dados PostgreSQL.
- **Upload de arquivos CSV:** Suporta upload de arquivos CSV para preencher lacunas de dados causadas por falhas técnicas.
- **Visualização e análise:** Interface gráfica para visualizar a média dos valores dos sensores em períodos específicos (24h, 48h, 1 semana, 1 mês).
- **Responsivo:** Interface web responsiva construída com React.

## Tecnologias Utilizadas

- **Backend:** Node.js, Express, Prisma
- **Frontend:** React.js
- **Banco de Dados:** PostgreSQL
- **Gerenciamento de Dependências:** Docker, Docker Compose
- **Controle de Versão:** Git, GitHub

## Estrutura do Projeto

sensor-data
├── backend
│ ├── prisma
│ │ ├── schema.prisma
│ │ └── migrations/
│ ├── src
│ │ ├── controllers
│ │ │ └── sensorController.ts
│ │ ├── routes
│ │ │ └── sensorRoutes.ts
│ │ ├── index.ts
│ └── .env
├── frontend
│ ├── src
│ │ ├── components
│ │ │ ├── SensorDataView.tsx
│ │ │ ├── SensorChart.tsx
│ │ │ └── UploadCSV.tsx
│ │ ├── App.tsx
│ │ └── index.tsx
│ ├── public
│ └── package.json
└── docker-compose.yml

## Configuração e Instalação

### Requisitos

- Docker
- Docker Compose
- Node.js (opcional para desenvolvimento local)

### Passos de Instalação

## Configuração do Docker

    docker-compose up --build -d
    docker exec -it backend sh
    npx prisma migrate dev --name init
    npx prisma generate

## Esses comandos irão:

Criar as tabelas necessárias no banco de dados.
Gerar o cliente Prisma para que o backend possa interagir com o banco de dados.

### Acessando a Aplicação

Depois de configurar o Prisma, você pode acessar as diferentes partes da aplicação:

Backend API: A API estará disponível em http://localhost:3000.
Frontend: A interface estará disponível em http://localhost.
