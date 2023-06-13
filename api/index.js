const express = require('express');
const app = express();
const pg = require('pg');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Dados iniciais
let clientes = [];
let pedidos = [];


// Conexão com o banco de dados

const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);

client.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    app.listen(PORT, () => console.log(`A API VIVE! Está rodando em http://localhost:${PORT}`));
  }
});

// Cadastro de Cliente
app.post('/api/clientes/cadastrar', (req, res) => {
  const { nome, email, endereco, contato, senha} = req.body;
  const cliente = { nome, email, endereco, contato, senha};

  const sqlQuery = 'INSERT INTO clientes (nome, email, endereco, contato, senha) VALUES ($1, $2, $3, $4, $5)';
  const values = [cliente.nome, cliente.email, cliente.endereco, cliente.contato, cliente.senha];

  client.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar o cliente' });
    }

    const cliente = result.rows[0];
    console.log('Cliente cadastrado com sucesso no banco de dados');

    res.status(201).json(cliente);
  });
});

// Obter todos os clientes
app.get('/api/clientes', (req, res) => {
  const sqlQuery = 'SELECT * FROM clientes';

  client.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao obter os clientes' });
    }

    const clientes = result.rows;
    res.status(200).json(clientes);
  });
});

// Obter um cliente por ID
app.get('/api/clientes/:id', (req, res) => {
  const { id } = req.params;
  const sqlQuery = 'SELECT * FROM clientes WHERE id = $1';
  const values = [id];

  client.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao obter o cliente' });
    }

    const cliente = result.rows[0];
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.status(200).json(cliente);
  });
});

// Atualizar um cliente
app.put('/api/clientes/:id/atualizar', (req, res) => {
  const { id } = req.params;
  const { nome, email, endereco, contato } = req.body;
  const cliente = { nome, email, endereco, contato };

  const sqlQuery = 'UPDATE clientes SET nome = $1, email = $2, endereco = $3, contato = $4 WHERE id = $5';
  const values = [cliente.nome, cliente.email, cliente.endereco, cliente.contato, id];

  client.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao atualizar o cliente' });
    }

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    console.log('Cliente atualizado com sucesso no banco de dados');

    res.status(200).json(cliente);
  });
});

// Remover um cliente
app.delete('/api/clientes/:id/deletar', (req, res) => {
  const { id } = req.params;
  
  const sqlQuery = 'DELETE FROM clientes WHERE id = $1';
  const values = [id];
  
  client.query(sqlQuery, values, (err, result) => {
  if (err) {
  console.error('Erro ao executar a consulta:', err);
  return res.status(500).json({ error: 'Erro ao remover o cliente' });
  }
  if (result.rowCount === 0) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  
  console.log('Cliente removido com sucesso do banco de dados');
  
  res.status(204).send();
});
});

//Obter todos os pedidos de um cliente
app.get('/api/clientes/:id/pedidos', (req, res) => {
  const { id } = req.params;
  const sqlQuery = 'SELECT * FROM pedidos WHERE cliente_id = $1';
  const values = [id];

  client.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao obter os pedidos do cliente' });
    }

    const pedidos = result.rows;
    res.status(200).json(pedidos);
  });
});

// Processo de Pedido - Adicionar Item ao Carrinho
app.post('/api/pedidos/:id_pedido/itens/:id_item/adicionar', (req, res) => {
  const { id_pedido } = req.params;
  const { produto_id, quantidade } = req.body;

  const sqlQuery = 'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade) VALUES ($1, $2, $3)';
  const values = [id_pedido, produto_id, quantidade];

  client.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao adicionar item ao carrinho' });
    }

    console.log('Item adicionado ao carrinho com sucesso');

    res.status(201).send();
  });
});

// Processo de Pedido - Remover Item do Carrinho
app.delete('/api/pedidos/:id_pedido/itens/:id_item/remover', (req, res) => {
  const { id_pedido, id_item } = req.params;

  const sqlQuery = 'DELETE FROM itens_pedido WHERE pedido_id = $1 AND id = $2';
  const values = [id_pedido, id_item];

  client.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao remover item do carrinho' });
    }

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    console.log('Item removido do carrinho com sucesso');

    res.status(204).send();
  });
});

//Obter detalhes de um pedido, incluindo os itens:
app.get('/api/pedidos/:id_pedido', (req, res) => {
  const { id_pedido } = req.params;

  const sqlQuery = 'SELECT pedidos.id, pedidos.status, pedidos.data, itens_pedido.produto_id, itens_pedido.quantidade FROM pedidos LEFT JOIN itens_pedido ON pedidos.id = itens_pedido.pedido_id WHERE pedidos.id = $1';
  const values = [id_pedido];

  client.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao obter os detalhes do pedido' });
    }

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    const pedido = {
      id: result.rows[0].id,
      status: result.rows[0].status,
      data: result.rows[0].data,
      itens: result.rows.map(row => ({
        produto_id: row.produto_id,
        quantidade: row.quantidade
      }))
    };

    res.status(200).json(pedido);
  });
});

// Atualizar um pedido
app.put('/api/pedidos/:id_pedido/atualizar', (req, res) => {
  const { id_pedido } = req.params;
  const { status } = req.body;

  const sqlQuery = 'UPDATE pedidos SET status = $1 WHERE id = $2';
  const values = [status, id_pedido];

  client.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao atualizar o pedido' });
    }

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    console.log('Pedido atualizado com sucesso');

    res.status(200).send();
  });
});

// Obter todos os pedidos
app.get('/api/pedidos', (req, res) => {
  const sqlQuery = 'SELECT * FROM pedidos';

  client.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao obter os pedidos' });
    }

    const pedidos = result.rows;
    res.status(200).json(pedidos);
  });
});

// Obter todos os itens de um pedido
app.get('/api/pedidos/:id_pedido/itens', (req, res) => {
  const { id_pedido } = req.params;

  const sqlQuery = 'SELECT * FROM itens_pedido WHERE pedido_id = $1';
  const values = [id_pedido];

  client.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao obter os itens do pedido' });
    }

    const itens = result.rows;
    res.status(200).json(itens);
  });
});

// Cancelar um pedido
app.put('/api/pedidos/:id_pedido/cancelar', (req, res) => {
  const { id_pedido } = req.params;

  const sqlQuery = 'UPDATE pedidos SET status = $1 WHERE id = $2';
  const values = ['cancelado', id_pedido];

  client.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao cancelar o pedido' });
    }

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    console.log('Pedido cancelado com sucesso');

    res.status(204).send();
  });
});

// Criar um novo produto
app.post('/api/produtos/criar', (req, res) => {
  const { nome, preco } = req.body;

  const sqlQuery = 'INSERT INTO produtos (nome, preco) VALUES ($1, $2) RETURNING *';
  const values = [nome, preco];

  client.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao criar o produto' });
    }

    const novoProduto = result.rows[0];
    res.status(201).json(novoProduto);
  });
});

// Obter todos os produtos
app.get('/api/produtos', (req, res) => {
  const sqlQuery = 'SELECT * FROM produtos';

  client.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao obter os produtos' });
    }

    const produtos = result.rows;
    res.status(200).json(produtos);
  });
});

// Obter um produto por ID
app.get('/api/produtos/:id_produto', (req, res) => {
  const { id_produto } = req.params;

  const sqlQuery = 'SELECT * FROM produtos WHERE id = $1';
  const values = [id_produto];

  client.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao obter o produto' });
    }

    const produto = result.rows[0];
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.status(200).json(produto);
  });
});

// Remover um produto
app.delete('/api/produtos/:id_produto/deletar', (req, res) => {
  const { id_produto } = req.params;

  const sqlQuery = 'DELETE FROM produtos WHERE id = $1';
  const values = [id_produto];

  client.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao remover o produto' });
    }

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    console.log('Produto removido com sucesso');

    res.status(204).send();
  });
});