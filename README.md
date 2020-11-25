# we-know

## Integrantes 
- Fernando Dias Motta (180016)
- Paola Rodrigues Lopes (180115)

## Link Do Site 
https://heuristic-wilson-494688.netlify.app/

# Caso o Link não funcione
Caso não consiga acessa-lo pode realizar o fluxo abaixo de instalação do nosso projeto.
- Clonar o repositório: `git clone https://github.com/PaolaRodriguesLopes/we-know.git`
- Caso não tenha o nodemon: `npm install nodemon`
- Entrar na pasta API<br>
`npm i`<br>
`nodemon index.js`<br>
obs: Caso a API não execute com o comando acima, tentar com: ´npx nodemon´
- Entrar na pasta weKnow:<br>
`npm i`<br>
`npm run serve`
### Atenção: rodar a API e o weKnow simultaneamente(cada um em um terminal)

## Regras de Negócio 
Para facilitar os testes já deixamos criados alguns fluxos no nosso banco de dados<br>
Perfis já criados e disponíveis:

- Perfil de Root:<br>
email: `root@email.com`<br>
senha: `root`<br>

- Perfil de Professor:<br>
email: `profjoao@email.com`<br>
senha: `123`<br>

- Perfil Usuário Comum:<br>
email: `vitor@email.com`<br>
senha: `123`<br>

Nosso menu é dinâmico, ao criar uma nova matéria, a mesma é adicionada ao menu lateral, criando assim um novo filtro de artigos relacionados a nova matéria.<br>

No perfil Root é possível realizar todas as ações do nosso sistema.<br>

### Deixamos alguns fluxos criados para facilitar os testes, como por exempo: 
- Artigos aprovados pelo usuário `profjoao@email.com`<br>
- Um artigo reprovado com comentário no perfil `vitor@email.com`
- Um artigo aguardando aprovação

- ### Envio de Email 
Recomendamos informar um email válido ao criar um novo cadastro de usuário, para que seja possível a recuperação de senha, principalmente no fluxo do admin que utilizamos uma senha padrão que precisa ser trocada por email no primeiro acesso.







