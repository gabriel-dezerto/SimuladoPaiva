export async function GET(request, { params }) {
  try {
    const { id } = params;
    const response = await fetch(`http://localhost:3000/api/clientes/${id}`, {
      method: 'GET',
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    return Response.json(
      { sucesso: false, erro: 'Erro ao buscar cliente', mensagem: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const response = await fetch(`http://localhost:3000/api/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    return Response.json(
      { sucesso: false, erro: 'Erro ao atualizar cliente', mensagem: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const response = await fetch(`http://localhost:3000/api/clientes/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    return Response.json(
      { sucesso: false, erro: 'Erro ao excluir cliente', mensagem: error.message },
      { status: 500 }
    );
  }
}
