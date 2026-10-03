# Desenvolvimento

## 1. Objetivo do projeto

O projeto foi desenvolvido como solução para o teste técnico de cadastro e gerenciamento de currículos.

O objetivo foi criar uma aplicação web que permita cadastrar candidatos manualmente ou através do envio de um currículo em PDF.

No cadastro por PDF, o sistema realiza a leitura do documento e tenta identificar algumas informações do candidato, como nome, e-mail, telefone, área ou cargo de interesse e informações para o resumo profissional.

Os dados identificados pelo PDF são preenchidos no mesmo formulário utilizado no cadastro manual. Assim, o usuário pode revisar, corrigir ou completar as informações antes de realizar o cadastro.

Depois do cadastro, os candidatos podem ser consultados, pesquisados, editados e excluídos pela aplicação.

Durante o desenvolvimento, procurei manter o projeto simples e funcional, seguindo o que foi solicitado no teste e evitando adicionar funcionalidades ou tecnologias desnecessárias para o objetivo da aplicação.

## 2. Organização do projeto

O projeto foi dividido em três partes principais:

* `backend`: responsável pela API, regras de validação, comunicação com o banco e processamento dos arquivos PDF.
* `database`: responsável pelo script de criação da estrutura do banco de dados.
* `frontend`: responsável pela interface da aplicação e pela interação com o usuário.

A estrutura principal ficou organizada da seguinte forma:

```text
resume-manager/
├── backend/
├── database/
└── frontend/
```

### Front-end

O front-end foi desenvolvido utilizando React.

Dentro dele, o código foi separado em páginas, componentes, hooks e funções responsáveis pela comunicação com a API.

As páginas ficam responsáveis pelas telas da aplicação, enquanto os componentes são utilizados para partes que podem ser reutilizadas, como o formulário de cadastro.

Os hooks foram utilizados para separar parte da lógica das telas. Por exemplo, o cadastro de um novo candidato possui um hook próprio para controlar os dados do formulário, validações e envio para a API.

### Back-end

O back-end foi desenvolvido utilizando Node.js e Express.

Ele possui as rotas responsáveis pelo cadastro, consulta, edição e exclusão dos candidatos, além da rota responsável pelo processamento dos arquivos PDF.

A conexão com o SQL Server também é feita pelo back-end.

### Banco de dados

O banco utilizado foi o SQL Server.

Foi criado um banco chamado `CadastroCurriculos` e uma tabela `Candidates` para armazenar os dados dos candidatos.

O arquivo `database/schema.sql` contém o script utilizado para criar essa estrutura.

## 3. Tecnologias utilizadas e decisões

### React

Foi utilizado React no desenvolvimento do front-end.

A escolha foi feita porque React permite dividir a interface em componentes e facilita a reutilização de partes do sistema.

No projeto, por exemplo, o formulário de candidato foi criado como um componente que pode ser utilizado tanto no cadastro quanto na edição.

### Vite

O Vite foi utilizado para criar e executar o projeto React durante o desenvolvimento.

A escolha foi feita por ser uma ferramenta simples para iniciar um projeto React e também por oferecer um processo rápido de desenvolvimento e build.

### Tailwind CSS

O Tailwind CSS foi utilizado para a estilização da aplicação.

A escolha foi feita para manter a parte visual simples e permitir a criação dos estilos diretamente nos componentes, sem precisar criar uma grande quantidade de arquivos CSS separados.

Uma curiosidade, é a primeira vez que estou utilizando o TailWind CSS, me indicaram a utilizar ele e pensei em desenvolver ele nesse projeto
### React Router

O React Router foi utilizado para controlar a navegação entre as telas da aplicação.

Foram criadas rotas para:

* listagem de candidatos;
* novo cadastro;
* edição de candidato.

### Node.js e Express

O back-end foi desenvolvido utilizando Node.js com Express.

O Express foi utilizado para criar as rotas da API e organizar a comunicação entre o front-end e o banco de dados.

A escolha do Node.js também permite utilizar JavaScript tanto no front-end quanto no back-end.

### SQL Server

Foi utilizado SQL Server porque o teste técnico solicitava esse banco de dados.

A aplicação utiliza uma tabela `Candidates` para armazenar os dados dos candidatos.

### mssql

A biblioteca `mssql` foi utilizada para realizar a comunicação entre o Node.js e o SQL Server.

Não foi utilizado ORM no projeto.

A decisão de utilizar consultas SQL diretamente foi tomada porque o projeto possui uma estrutura simples e poucas tabelas. Dessa forma, foi possível manter as consultas mais diretas e fáceis de entender.

### Multer

O Multer foi utilizado para receber os arquivos enviados pelo formulário.

Ele também foi utilizado para controlar o limite de tamanho dos arquivos e permitir que o back-end salve os PDFs enviados.

### pdf-parse

O `pdf-parse` foi utilizado para realizar a leitura do conteúdo dos arquivos PDF.

Depois que o texto é extraído, o back-end utiliza algumas regras para tentar encontrar as informações do candidato.

### dotenv

O `dotenv` foi utilizado para carregar as configurações do banco de dados através de variáveis de ambiente.

Dessa forma, informações como usuário e senha do banco não precisam ficar diretamente no código.

### CORS

O CORS foi utilizado para permitir a comunicação entre o front-end e o back-end durante o desenvolvimento local, já que as duas aplicações são executadas em portas diferentes.

## 4. Desenvolvimento do CRUD

Depois da configuração inicial do projeto e do banco de dados, foi desenvolvido o CRUD dos candidatos.

### Cadastro

Para cadastrar um candidato, foi criada a rota:

```text
POST /candidates
```

O front-end envia os dados do formulário para essa rota.

Antes de salvar o candidato, o back-end verifica se o nome e o e-mail foram informados e também verifica se o e-mail possui um formato válido.

Depois das validações, os dados são inseridos na tabela `Candidates` do SQL Server.

O cadastro também pode informar a origem do registro e o caminho do PDF, quando o candidato foi cadastrado através de um currículo em PDF.

### Consulta

Para consultar os candidatos foi criada a rota:

```text
GET /candidates
```

Essa rota retorna os candidatos cadastrados no banco.

Também foi criada uma rota para consultar um candidato específico:

```text
GET /candidates/:id
```

Na interface, os dados retornados pela API são utilizados para apresentar a lista de candidatos e os detalhes de cada registro.

### Atualização

Para editar um candidato foi criada a rota:

```text
PUT /candidates/:id
```

Na aplicação, o usuário pode abrir os detalhes de um candidato e acessar a opção de edição.

A tela de edição reutiliza o mesmo componente de formulário utilizado no cadastro.

Depois que o usuário altera os dados e salva, o front-end envia as informações para a API, que atualiza o registro no banco de dados.

### Exclusão

Para excluir um candidato foi criada a rota:

```text
DELETE /candidates/:id
```

Antes de excluir o registro, a interface apresenta uma confirmação para o usuário.

Caso a exclusão seja confirmada, o front-end envia a solicitação para a API e o registro é removido do banco de dados.

Após a exclusão, o candidato também é removido da lista apresentada na aplicação.

## 5. Cadastro e processamento do PDF

Foi implementado um fluxo específico para permitir o cadastro de candidatos através de um currículo em PDF.

O arquivo é enviado para o back-end através da rota:

```text
POST /candidates/parse-pdf
```

O upload é realizado utilizando o Multer, com limite de 5 MB e validação para aceitar somente arquivos PDF.

Depois que o arquivo é recebido, ele é salvo na pasta `backend/uploads/` e seu conteúdo é lido utilizando a biblioteca `pdf-parse`.

Após a leitura do texto, foram criadas regras heurísticas para tentar identificar informações como:

* nome;
* e-mail;
* telefone;
* área ou cargo de interesse;
* informações para o resumo profissional.

Essas informações são retornadas pelo back-end e preenchidas automaticamente no mesmo formulário utilizado no cadastro manual.

O usuário pode revisar os dados extraídos, corrigir informações incorretas ou completar campos que não tenham sido identificados antes de salvar o cadastro.

Quando o cadastro é realizado através de um PDF, a origem do registro é armazenada como `PDF` e o caminho do arquivo também é salvo no banco de dados.

O PDF pode posteriormente ser visualizado através dos detalhes do candidato.

Para identificar o nome, a lógica procura linhas com aparência de nome próprio e dá preferência às que aparecem próximas do e-mail ou telefone. Essa abordagem evita depender exclusivamente da primeira linha do PDF, que pode conter um título ou outra informação. Ainda assim, como os currículos variam de formato, a extração não garante a identificação correta em todos os documentos. O usuário pode revisar e corrigir os dados antes do cadastro.

Caso o PDF seja inválido, ultrapasse o limite de 5 MB ou ocorra algum problema durante a leitura, o sistema apresenta uma mensagem de erro. O cadastro manual continua disponível independentemente do processamento do PDF.

## 6. Interface e experiência de uso

A interface foi desenvolvida buscando manter o fluxo de utilização simples e direto.

Na tela de candidatos, é possível visualizar os registros cadastrados, realizar buscas por nome, e-mail ou área de interesse e navegar entre as páginas da listagem.

Ao selecionar um candidato, são apresentados seus principais dados em uma tela de detalhes. Quando o cadastro possui um PDF associado, também é disponibilizada a opção de visualizar o arquivo.

A partir dos detalhes, o usuário pode acessar a edição ou excluir o candidato. A exclusão possui uma confirmação antes de ser realizada.

O formulário utilizado no cadastro também é reutilizado na edição, mantendo uma estrutura semelhante entre os dois fluxos.

A interface foi desenvolvida com Tailwind CSS, mantendo uma estrutura visual simples e consistente entre as telas.

## 7. Uso de ferramentas de IA

Durante o desenvolvimento do projeto, utilizei ferramentas de inteligência artificial como apoio, principalmente o ChatGPT e o chat integrado ao Visual Studio Code.

O uso foi maior no back-end, principalmente por eu estar estudando Node.js e Express e ainda ter algumas dúvidas sobre essas tecnologias. A IA foi utilizada para entender conceitos, tirar dúvidas sobre a implementação e ajudar a identificar possíveis problemas no código.

Durante esse processo, também foram indicados sites, documentações e vídeos para complementar os estudos, principalmente quando era necessário entender melhor algum conceito antes de aplicá-lo no projeto.

Também utilizei a IA para auxiliar na implementação de algumas partes do código, revisar soluções, analisar erros e organizar a documentação. Mais recentemente, busquei apoio especificamente para melhorar a identificação do nome durante a leitura do PDF. A sugestão foi substituir a dependência da primeira linha por uma heurística que procura linhas com aparência de nome próprio e considera a proximidade com informações de contato, como e-mail e telefone.

As sugestões recebidas foram analisadas e adaptadas conforme a necessidade do projeto. A heurística para o nome foi testada com o currículo fictício incluído no repositório e com outros exemplos de linhas, incluindo casos sem um nome identificável. Também realizei testes durante o desenvolvimento para verificar se o código funcionava e se estava de acordo com os requisitos do teste.

Um exemplo foi a validação dos campos do cadastro. Inicialmente, alguns campos estavam sendo tratados como obrigatórios, mas durante a revisão dos requisitos percebi que somente nome e e-mail deveriam ser obrigatórios. A implementação foi ajustada para seguir essa regra.

Outro exemplo foi o tratamento de erros na comunicação entre o front-end e o back-end. Durante os testes, foi adicionada uma mensagem para informar quando não fosse possível conectar ao servidor.

A IA foi utilizada como ferramenta de apoio durante o desenvolvimento, principalmente para estudo e esclarecimento de dúvidas, mas as alterações finais foram feitas de acordo com as necessidades do projeto e com os testes realizados.

## 8. Correções e adaptações durante o desenvolvimento

Durante o desenvolvimento, algumas partes da implementação precisaram ser ajustadas após testes e revisão dos requisitos.

Um dos principais ajustes foi nas validações do cadastro e da edição. Inicialmente, área ou cargo de interesse e resumo profissional estavam sendo tratados como obrigatórios. Depois de revisar o enunciado do teste, a implementação foi ajustada para que somente nome e e-mail sejam obrigatórios nos dois fluxos.

Também foram realizados ajustes no tratamento de erros do front-end. Durante os testes, foi verificado o comportamento da aplicação quando o back-end ou o banco de dados não estavam disponíveis. A partir disso, foram adicionadas mensagens para informar o usuário quando não fosse possível realizar a comunicação com o servidor.

No processamento dos PDFs, a extração foi mantida como uma tentativa de identificação dos dados, em vez de exigir que todas as informações fossem encontradas automaticamente. Dessa forma, o usuário pode corrigir ou completar os dados antes de salvar o candidato.

Essas alterações foram feitas após testes da aplicação e comparação do comportamento implementado com os requisitos do teste técnico.

## 9. Testes e verificação

Durante o desenvolvimento, foram realizados testes manuais para verificar o funcionamento das principais partes da aplicação.

Foram testados os seguintes fluxos:

* cadastro manual de candidato;
* cadastro através de PDF;
* preenchimento automático dos dados a partir do PDF;
* correção dos dados extraídos antes do cadastro;
* validação de nome e e-mail;
* validação de formato do e-mail;
* limite de 5 MB para arquivos PDF;
* tentativa de envio de arquivo que não seja PDF;
* consulta e visualização dos candidatos cadastrados;
* busca por nome, e-mail e área;
* paginação da lista;
* visualização dos detalhes do candidato;
* edição de candidatos;
* exclusão de candidatos com confirmação;
* visualização do PDF associado ao cadastro;
* comunicação entre front-end, back-end e SQL Server.

Também foi realizado um teste com o servidor ou banco de dados indisponível para verificar o comportamento da aplicação quando não fosse possível realizar a comunicação com o back-end.

Os testes foram realizados durante o desenvolvimento e, quando algum comportamento não correspondia ao esperado, o código foi ajustado e testado novamente.

## 10. Dificuldades e limitações

Uma das dificuldades durante o desenvolvimento foi trabalhar com Node.js e Express, principalmente por ainda estar estudando essas tecnologias. Foi necessário pesquisar alguns conceitos e testar diferentes formas de implementar determinadas partes do back-end.

Também tive algumas dificuldades no desenvolvimento do front-end web, pois minha experiência mais recente estava voltada para desenvolvimento mobile. Durante o projeto, precisei retomar alguns conceitos específicos do React para aplicações web e me adaptar novamente a esse ambiente.

Outra dificuldade foi o processamento das informações do PDF. Como os currículos podem possuir estruturas diferentes, não é possível garantir que todas as informações sejam identificadas corretamente. A solução utiliza regras simples para tentar encontrar os dados no texto extraído, por isso alguns campos podem precisar de correção ou preenchimento manual.

Também foi necessário testar diferentes situações de erro, como arquivos inválidos, arquivos maiores que o limite permitido e indisponibilidade do back-end ou do banco de dados.

Como limitação atual, a aplicação não possui uma extração avançada capaz de interpretar diferentes modelos de currículo ou PDFs digitalizados como uma solução de OCR. A implementação foi mantida mais simples para atender aos requisitos do desafio e facilitar a manutenção do projeto.

## 11. Melhorias futuras

Com mais tempo para evoluir o projeto, algumas melhorias poderiam ser implementadas.

Uma delas seria aprimorar a extração dos dados dos currículos, permitindo lidar melhor com diferentes formatos de PDF e também com documentos digitalizados.

Também poderia ser adicionada uma estrutura de testes automatizados para o front-end e o back-end, além de uma cobertura maior das regras de validação e das rotas da API.

Na interface, poderiam ser adicionadas opções para alterar o idioma da aplicação e alternar entre os modos claro e escuro.

A busca e os filtros da listagem também poderiam ser aprimorados, permitindo realizar filtros mais específicos e combinar diferentes critérios de pesquisa.

Outra melhoria seria revisar a organização do código, buscando separar melhor algumas responsabilidades e facilitar a manutenção e evolução do projeto.

Atualmente, ao acessar a rota inicial (`/`), a aplicação redireciona para a listagem de candidatos (`/candidates`). Como evolução futura, essa entrada poderia apresentar uma tela de login antes de permitir o acesso às funcionalidades do sistema.

Essas melhorias não foram priorizadas durante o desafio porque o objetivo principal foi entregar uma solução simples, funcional e alinhada aos requisitos solicitados.

## 12. Tempo aproximado de desenvolvimento

O desenvolvimento foi iniciado no dia 30/09 e finalizado no dia 02/10.

Considerando o tempo utilizado para desenvolvimento, configuração do ambiente, estudos, testes, correções e documentação, o tempo total dedicado ao desafio foi de aproximadamente 15 horas.

## 13. Considerações finais

O desenvolvimento deste projeto permitiu colocar em prática conhecimentos de front-end, back-end, banco de dados e integração entre diferentes partes da aplicação.

Minha experiência até o momento é maior na área de front-end, principalmente com desenvolvimento mobile, mas tenho como objetivo evoluir também no desenvolvimento back-end e me tornar um profissional full-stack.

Durante o desafio, tive a oportunidade de estudar e utilizar tecnologias com as quais ainda não tinha tanta experiência, principalmente Node.js e Express, além de retomar o desenvolvimento web com React.

O objetivo principal foi entregar uma aplicação simples, funcional e que atendesse aos requisitos apresentados no desafio, mantendo o código compreensível e permitindo futuras melhorias.
