// URL base da sua API no CrudCrud
const API_URL = "https://crudcrud.com/api/3784c0d57f1648aab93d369ae0d33616/clientes";

// Elementos
const form = document.getElementById("form-cliente");
const lista = document.getElementById("lista-clientes");

// Função: listar clientes
async function listarClientes() {
  lista.innerHTML = "<li>Carregando...</li>";
  try {
    const resp = await fetch(API_URL);
    const clientes = await resp.json();

    lista.innerHTML = "";
    clientes.forEach(cliente => {
      const li = document.createElement("li");
      li.textContent = `${cliente.nome} - ${cliente.email}`;

      // Botão excluir
      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "Excluir";
      btnExcluir.onclick = () => excluirCliente(cliente._id);

      li.appendChild(btnExcluir);
      lista.appendChild(li);
    });
  } catch (err) {
    console.error("Erro ao listar clientes:", err);
    lista.innerHTML = "<li>Erro ao carregar clientes.</li>";
  }
}

// Função: cadastrar cliente
async function cadastrarCliente(nome, email) {
  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email })
    });

    if (!resp.ok) throw new Error("Erro ao cadastrar cliente");
    listarClientes();
  } catch (err) {
    console.error(err);
  }
}

// Função: excluir cliente
async function excluirCliente(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    listarClientes();
  } catch (err) {
    console.error("Erro ao excluir cliente:", err);
  }
}

// Evento do formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  if (nome && email) {
    cadastrarCliente(nome, email);
    form.reset();
  }
});

// Inicializa
listarClientes();