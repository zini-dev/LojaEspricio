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


### Clientes

#### GET /clientes
- **Descrição**: Obtém uma lista de clientes
- **Response**: Array de clientes
- **Parameters**: Busca um unico cliente pelo idCliente
```
/clientes?idCliente=123
```
- **Error Response (400)**: Caso o id não esteja em formato UUID
```
{ 
    erro: "Id do cliente inválido!" 
}
```

#### POST /clientes
- **Descrição**: Cria um novo cliente
- **Body**:
```
{
    "nomeCliente": "Nome Cliente",
    "cpfCliente": "12345678911"
}
```
- **Response**:
```
{
    "mensagem": "Cliente cadastrado com sucesso!"
}
```
- **Error Response (400)**: Caso os campos obrigatórios não estejam preenchidos:
```
{ 
    erro: "Campos Obrigatórios Não preenchidos" 
}
```

#### PUT /clientes/:idCliente
- **Descrição**: Atualiza um cliente a partir do seu id
- **Parameters**: É obrigatório fornecer o id do prclienteoduto
```
/clientes/123
```
- **Body**: É possível atualizar parcialmente e integralmente o produto
```
{
    "nomeCliente": "Cliente Atualizado",
    "cpfCliente": "12345678911"
}
```
- **Response**:
```
{
    "mensagem": "Cliente atualizado com sucesso!"
}
```
- **Error Response (400)**: Caso o id não esteja em formato UUID
```
{ 
    erro: "Id do cliente inválido!" 
}
```
- **Error Response (404)**: Caso o cliente não exista no banco de dados:
```
{ 
    erro: 'Cliente não encontrado!'
}
```

#### DELETE /clientes/:idCliente
- **Descrição**: Deleta um cliente a partir do seu id
- **Parameters**: É obrigatório fornecer o id do cliente
```
/clientes/123
```
- **Response**:
```
{
    "mensagem": "Cliente deletado com sucesso!"
}
```
- **Error Response (400)**: Caso o id não esteja em formato UUID
```
{ 
    erro: "Id do cliente inválido!" 
}
```
- **Error Response (404)**: Caso o cliente não exista no banco de dados:
```
{ 
    erro: 'Cliente não encontrado!'
}
```