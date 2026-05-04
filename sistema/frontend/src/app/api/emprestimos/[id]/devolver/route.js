export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const response = await fetch(`http://localhost:3002/api/emprestimos/${id}/devolver`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Erro ao registrar devolução:', error);
    return Response.json(
      { sucesso: false, erro: 'Erro ao registrar devolução', mensagem: error.message },
      { status: 500 }
    );
  }
}
