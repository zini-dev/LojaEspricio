## API Reference

### Produtos

#### GET /produtos
- **Descrição**: Obtém uma lista de produtos
- **Response**: Array de produtos
- **Parameters**: Busca um unico produto pelo idProduto
```
/produtos?idProduto=123
```
- **Error Response (400)**: Caso o id não esteja em formato UUID
```
{ 
    erro: "Id do produto inválido!" 
}
```

#### POST /produtos
- **Descrição**: Cria um novo produto
- **Body**:
```
{
    "nomeProduto": "produtoExemplo",
    "precoProduto": 0.00
}
```
- **Response**:
```
{
    "mensagem": "Produto cadastrado com sucesso!"
}
```
- **Error Response (400)**: Caso os campos obrigatórios não estejam preenchidos:
```
{ 
    erro: "Campos Obrigatórios Não preenchidos" 
}
```

#### PUT /produtos/:idProduto
- **Descrição**: Atualiza um produto a partir do seu id
- **Parameters**: É obrigatório fornecer o id do produto
```
/produtos/123
```
- **Body**: É possível atualizar parcialmente e integralmente o produto
```
{
    "nomeProduto": "produtoAtualizado",
    "precoProduto": 0.00
}
```
- **Response**:
```
{
    "mensagem": "Produto atualizado com sucesso!"
}
```
- **Error Response (400)**: Caso o id não esteja em formato UUID
```
{ 
    erro: "Id do produto inválido!" 
}
```
- **Error Response (404)**: Caso o produto não exista no banco de dados:
```
{ 
    erro: 'Produto não encontrado!'
}
```

#### DELETE /produtos/:idProduto
- **Descrição**: Deleta um produto a partir do seu id
- **Parameters**: É obrigatório fornecer o id do produto
```
/produtos/123
```
- **Response**:
```
{
    "mensagem": "Produto deletado com sucesso!"
}
```
- **Error Response (400)**: Caso o id não esteja em formato UUID
```
{ 
    erro: "Id do produto inválido!" 
}
```
- **Error Response (404)**: Caso o produto não exista no banco de dados:
```
{ 
    erro: 'Produto não encontrado!'
}
```