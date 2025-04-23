# iProAPI

Este projeto é uma API simples para manipulação de imagens, agora migrada para o NestJS.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/algelinplayer/iProAPI.git
   cd iProAPI
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Executando a Aplicação

Execute a aplicação em modo de desenvolvimento:

```bash
npm run start
```

## Endpoints

### GET /ipro/images

Este endpoint redimensiona e retorna uma imagem.

**Parâmetros de Query:**
- `filename`: Nome do arquivo de imagem (ex: `icelandwaterfall.jpg`)
- `width`: Largura desejada da imagem
- `height`: Altura desejada da imagem

**Exemplo de Requisição:**
```http
GET /ipro/images?filename=icelandwaterfall.jpg&width=300&height=300
```
Exemplo: http://localhost:3000/ipro/images?filename=icelandwaterfall.jpg&width=300&height=300

## Estrutura do Projeto

```plaintext
iProAPI/
├── images/                 # Diretório para armazenar imagens
│   └── icelandwaterfall.jpg
├── src/                    # Código-fonte do projeto
│   ├── app.controller.ts   # Controlador principal
│   ├── app.module.ts       # Módulo principal
│   ├── app.service.ts      # Serviço principal
│   └── main.ts             # Arquivo de inicialização
├── test/                   # Testes do projeto
│   └── indexSpec.ts
├── package.json            # Dependências e scripts do projeto
└── README.md               # Este arquivo
```

## Testes

Para rodar os testes, use o comando:

```bash
npm run test
```

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Para isso, siga os passos abaixo:

1. Faça um fork do projeto
2. Crie uma nova branch (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -am 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT. Para mais detalhes sobre a licença, veja MIT License.

https://mit-license.org/


