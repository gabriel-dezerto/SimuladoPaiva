export async function GET(request, { params }) {
  try {
    const { id } = params;
    const response = await fetch(`http://localhost:3002/api/emprestimos/${id}`, {
      method: 'GET',
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Erro ao buscar empréstimo:', error);
    return Response.json(
      { sucesso: false, erro: 'Erro ao buscar empréstimo', mensagem: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const response = await fetch(`http://localhost:3002/api/emprestimos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Erro ao atualizar empréstimo:', error);
    return Response.json(
      { sucesso: false, erro: 'Erro ao atualizar empréstimo', mensagem: error.message },
      { status: 500 }
    );
  }
}
