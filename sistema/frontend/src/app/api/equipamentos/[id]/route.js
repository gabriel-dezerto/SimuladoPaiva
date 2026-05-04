export async function GET(request, { params }) {
  try {
    const { id } = params;
    const response = await fetch(`http://localhost:3002/api/equipamentos/${id}`, {
      method: 'GET',
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Erro ao buscar equipamento:', error);
    return Response.json(
      { sucesso: false, erro: 'Erro ao buscar equipamento', mensagem: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const response = await fetch(`http://localhost:3002/api/equipamentos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Erro ao atualizar equipamento:', error);
    return Response.json(
      { sucesso: false, erro: 'Erro ao atualizar equipamento', mensagem: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const response = await fetch(`http://localhost:3002/api/equipamentos/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Erro ao excluir equipamento:', error);
    return Response.json(
      { sucesso: false, erro: 'Erro ao excluir equipamento', mensagem: error.message },
      { status: 500 }
    );
  }
}
