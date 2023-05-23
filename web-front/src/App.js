import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3002/api'; 

function Clientes() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/clientes/cadastrar`, {
        nome,
        email,
        endereco,
        contato,
      });

      console.log(response.data); // Exibe a resposta do servidor no console
      // Você pode atualizar a lista de clientes ou fazer outras ações necessárias após o cadastro bem-sucedido

      // Limpa os campos do formulário
      setNome('');
      setEmail('');
      setEndereco('');
      setContato('');
    } catch (error) {
      console.error(error);
      // Trate o erro de acordo com suas necessidades
    }
  };

  return (
    <div>
      <h1>Cadastro de Clientes</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Endereço:</label>
          <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
        </div>
        <div>
          <label>Contato:</label>
          <input type="text" value={contato} onChange={(e) => setContato(e.target.value)} />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Clientes;
