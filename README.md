# Cadastro de Currículos

Aplicação web para cadastro e gerenciamento de currículos, desenvolvida como teste técnico.

O sistema permite cadastrar candidatos manualmente ou a partir de um arquivo PDF. Quando um currículo em PDF é enviado, o back-end realiza a leitura do conteúdo e tenta identificar automaticamente informações como nome, e-mail, telefone, área/cargo de interesse e resumo profissional. Os dados extraídos são preenchidos no mesmo formulário utilizado no cadastro manual e podem ser corrigidos antes do salvamento.

## Tecnologias

### Front-end

* React
* Vite
* Tailwind CSS
* React Router

### Back-end

* Node.js
* Express
* Multer
* pdf-parse
* mssql
* CORS
* dotenv

### Banco de dados

* SQL Server

### Versões utilizadas

As versões abaixo são as declaradas nos arquivos `package.json`. O prefixo `^` permite atualizações compatíveis dentro da mesma versão principal; os arquivos `package-lock.json` registram as versões efetivamente instaladas.

| Tecnologia | Versão declarada |
| ---------- | ---------------- |
| Node.js | 20.19+ ou 22.12+ (compatível com Vite 8) |
| React / React DOM | `^19.2.8` |
| Vite | `^8.3.0` |
| Tailwind CSS | `^4.3.3` |
| React Router | `^7.18.4` |
| Express | `^5.2.1` |
| Multer | `^2.4.0` |
| pdf-parse | `^2.4.5` |
| mssql | `^12.7.2` |
| CORS | `^2.8.6` |
| dotenv | `^18.0.4` |

O projeto não fixa uma versão específica do SQL Server. Informe a versão utilizada no seu ambiente de avaliação.

## Estrutura do projeto

```text
resume-manager/
├── backend/
│   ├── config/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── pages/
│   └── package.json
├── database/
│   └── schema.sql
├── .env.example
├── .gitignore
├── README.md
└── DESENVOLVIMENTO.md
```

## Funcionalidades

* Cadastro manual de candidatos.
* Cadastro a partir de currículo em PDF.
* Extração automática de informações do PDF.
* Possibilidade de corrigir os dados extraídos antes do cadastro.
* Validação de nome e e-mail.
* Validação do formato do e-mail.
* Limite de 5 MB para arquivos PDF.
* Mensagens para arquivos inválidos ou erros na leitura.
* Listagem de candidatos.
* Busca por nome, e-mail ou área.
* Paginação.
* Visualização dos detalhes do candidato.
* Visualização do currículo em PDF quando disponível.
* Edição de candidatos.
* Exclusão de candidatos.
* Persistência dos dados em SQL Server.

## Requisitos

Para executar o projeto localmente, é necessário ter:

* Node.js instalado.
* SQL Server instalado e em execução.
* SQL Server Management Studio (SSMS) ou outra ferramenta para executar scripts SQL.
* Git, caso o projeto seja clonado do repositório.

O front-end utiliza Vite 8. Para executá-lo, use Node.js 20.19 ou superior da linha 20, ou 22.12 ou superior da linha 22.

## Configuração do banco de dados

O script para criação do banco e da tabela está localizado em:

```text
database/schema.sql
```

Execute o script no SQL Server para criar o banco `CadastroCurriculos` e a tabela `Candidates`.

O projeto utiliza uma conexão SQL Server configurada através de variáveis de ambiente.

Crie um arquivo `.env` dentro da pasta `backend` com as configurações da sua máquina:

```env
SERVER=localhost
DATABASE=CadastroCurriculos
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
```

Não utilize credenciais reais no repositório.

O arquivo `.env` está incluído no `.gitignore`.

### Usuário do banco

O projeto foi desenvolvido utilizando autenticação SQL Server para a conexão da aplicação.

Caso seja utilizado um usuário específico para a aplicação, ele precisa ter permissão de leitura e escrita no banco `CadastroCurriculos`.

## Executando o back-end

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Execute o servidor:

```bash
node server.js
```

O back-end será iniciado, por padrão, na porta:

```text
http://localhost:3000
```

É possível alterar a porta definindo a variável de ambiente `PORT` antes de iniciar o servidor.

A API de candidatos está disponível em:

```text
http://localhost:3000/candidates
```

Os arquivos PDF enviados ficam armazenados na pasta:

```text
backend/uploads/
```

O servidor também disponibiliza os arquivos salvos em `/uploads`. Execute `node server.js` a partir da pasta `backend`, como nos comandos acima, para que os caminhos de upload e acesso correspondam a essa pasta.

## Executando o front-end

Em outro terminal, entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação.

## Fluxo de cadastro manual

1. Acesse a tela de candidatos.
2. Clique em **Novo cadastro**.
3. Preencha o nome completo.
4. Preencha um e-mail válido.
5. Telefone, área/cargo e resumo profissional podem ser preenchidos conforme necessário.
6. Clique em **Salvar**.
7. O candidato será persistido no SQL Server e aparecerá na listagem.

No cadastro manual, somente nome e e-mail são obrigatórios.

## Fluxo de cadastro por PDF

1. Acesse **Novo cadastro**.
2. Selecione um arquivo PDF.
3. O back-end salva o arquivo e realiza a leitura do conteúdo.
4. O sistema tenta identificar os dados do candidato.
5. Os dados encontrados são preenchidos no formulário.
6. O usuário pode corrigir ou completar as informações.
7. O cadastro pode ser salvo normalmente.

O PDF não substitui a validação do formulário. A extração é baseada em regras heurísticas e pode não identificar corretamente informações em todos os formatos de currículo.

O tamanho máximo permitido para o arquivo é de **5 MB**.

## API

### Candidatos

| Método | Rota              | Descrição                     |
| ------ | ----------------- | ----------------------------- |
| GET    | `/candidates`     | Lista os candidatos           |
| GET    | `/candidates/:id` | Busca um candidato específico |
| POST   | `/candidates`     | Cadastra um candidato         |
| PUT    | `/candidates/:id` | Atualiza um candidato         |
| DELETE | `/candidates/:id` | Exclui um candidato           |

### PDF

| Método | Rota                    | Descrição                            |
| ------ | ----------------------- | ------------------------------------ |
| POST   | `/candidates/parse-pdf` | Envia e processa um currículo em PDF |

O cadastro (`POST /candidates`) recebe JSON com `fullName` e `email` obrigatórios. `phone`, `desiredPosition` e `professionalSummary` são opcionais; o front-end também pode enviar `origin` e `pdfPath`. A API valida o formato do e-mail e responde com HTTP `201` quando o cadastro é criado.

O processamento do PDF espera um arquivo no campo `pdf` de uma requisição `multipart/form-data`. A resposta inclui os dados identificados em `candidate` e o caminho do arquivo em `pdfPath`. Erros de validação do arquivo retornam HTTP `400`; erros de leitura retornam HTTP `500`.

Na edição (`PUT /candidates/:id`), somente `fullName` e `email` são obrigatórios. `phone`, `desiredPosition` e `professionalSummary` podem ficar vazios.

## Validações

O sistema possui validações no front-end e no back-end.

No cadastro, os campos obrigatórios são:

* Nome completo.
* E-mail.

O e-mail também precisa possuir um formato válido.

No upload:

* Apenas arquivos PDF são aceitos.
* O tamanho máximo é de 5 MB.
* Falhas na leitura do PDF não impedem que o usuário realize o cadastro manualmente.

## Testes manuais

Os principais fluxos podem ser verificados através da própria aplicação:

* Cadastro manual com nome e e-mail.
* Tentativa de cadastro sem nome.
* Tentativa de cadastro sem e-mail.
* Tentativa de cadastro com e-mail inválido.
* Cadastro utilizando PDF.
* Upload de arquivo que não seja PDF.
* Upload de PDF maior que 5 MB.
* Correção dos dados extraídos do PDF.
* Consulta dos detalhes do candidato.
* Edição de candidato.
* Exclusão de candidato.
* Indisponibilidade do servidor/banco durante o cadastro.

### Verificações disponíveis

Na pasta `frontend`, os comandos disponíveis são:

```bash
npm run build
npm run lint
```

O back-end ainda não possui testes automatizados. O comando `npm test` está configurado como placeholder e termina com erro; por isso, não o execute como uma verificação válida do projeto. Até que sejam adicionados testes automatizados, valide os fluxos pela lista manual acima.

## Banco de dados

A tabela principal utilizada pela aplicação é `Candidates`.

Ela armazena:

* Identificador do candidato.
* Nome completo.
* E-mail.
* Telefone.
* Área/cargo desejado.
* Resumo profissional.
* Origem do cadastro.
* Caminho do arquivo PDF.
* Data de criação.

A coluna `Origin` identifica se o cadastro foi realizado manualmente ou através de PDF.

## Limitações conhecidas

A extração do PDF utiliza regras heurísticas, portanto não existe garantia de identificação correta para todos os formatos de currículo.

Currículos digitalizados, PDFs compostos por imagens ou documentos com estruturas muito diferentes podem apresentar resultados incompletos ou incorretos.

Por esse motivo, os dados extraídos sempre são apresentados no formulário antes do cadastro, permitindo que o usuário faça as correções necessárias.

O nome é identificado por heurísticas que procuram uma linha com aparência de nome próprio, dando preferência a linhas próximas ao e-mail ou telefone. E-mail e telefone são identificados por expressões regulares, e área/cargo e resumo dependem de seções com títulos específicos. Como o formato dos currículos varia, a extração ainda pode retornar campos vazios ou incorretos; confira os dados preenchidos antes de salvar.

O repositório inclui um PDF de exemplo com dados fictícios em `curriculo-teste/Currículo Fictício.pdf`. Use-o para testar o fluxo de cadastro por PDF. Confirme também que nenhum currículo real ou dado pessoal foi versionado em `backend/uploads/`.

## Desenvolvimento

As decisões técnicas, o processo de desenvolvimento, o uso de ferramentas de inteligência artificial, as validações realizadas e as limitações encontradas estão documentados em:

```text
DESENVOLVIMENTO.md
```

## Segurança e configuração

Não devem ser adicionadas ao repositório:

* Senhas do banco de dados.
* Arquivos `.env`.
* Credenciais pessoais.
* Currículos reais contendo dados pessoais.

O projeto utiliza `.env` para armazenar as configurações locais de conexão com o banco.
