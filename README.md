# Easy News
## Front-End
### Pré-Requisitos
- Node.js
- npm
### Instalação e Execução
1. Clonar este repositório
2. No terminal, ir até a raíz do repositório
3. Instalação do expo local:
    ```
    npm install --save-dev-expo-cli
    ```
4. Criação do projeto:
    ```
    npx create-expo-app --template
    ```
   **OBS:** Preencha os campos do jeito que preferir.
5. Rodar o projeto:
    ```
    npx expo start
    ```
6. No app do Expo Go, escaneie o QR-code ou entre manualmente com a URL

## Back-End
### Instalação e execução

OBS: Usar Java 17-, pois as versões superiores ainda [não são compatíveis com as anotações do Lombok](https://cursos.alura.com.br/forum/topico-error-java-java-lang-nosuchfielderror-class-com-sun-tools-javac-tree-jctree-jcimport-does-not-have-member-field-com-sun-tools-javac-tree-jctree-qualid-311806).

## Observações Gerais
A chave da API da OpenAI deve ser adicionada para cada instância local do programa. Caso upada neste repositório remoto ela é desativada automaticamente como medida de segurança.
