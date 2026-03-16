*Instalar dependências*

1. Fazer download do git e criar conta no github
2. Instalar node server
3. Instalar um editor de texto/IDE

*Instalar projeto*

1. Instalar node server
2. Instalar npm globalmentem pnpm globalmente e pnpm install no projeto
    - Caso não execute os comandos internos, executar power shell como administrador e rodar "Set-ExecutionPolicy RemoteSigned" e "Get-ExecutionPolicy RemoteSigned"
    - Para visualizar se o node e o npm foram instalados com sucesso, "node -v", "npm -v" e "pnpm -v"
3. Para rodar o projeto "pnpm dev"

*Dúvidas:*
    - O que é o node?
        - é o lado do servidor para rodar javascript
    
    - O que é npm e pnpm?
        - São gerenciadores de pacote, permitem baixar e organizar arquivos, libs, etc. Similar ao terminal linux
        - Pnpm tem um melhor gerenciamento de dependências e cache, npm é mais defasado, mas necessário para instalação do pnpm. Além disso, existe o yarn, que é intermediário entre os dois em questões de gerenciamento. Também sendo uma boa opção.
    
    - O que o Set and Get ExecutionPolicy faz?
        - Permite que as políticas de execução sejam atualizadas sem bloqueios do windows. Isto costuma causar muito erro*
    
    - Globalmente: Instala no sistema inteiro, não apenas no projeto específico. Evita erros.*