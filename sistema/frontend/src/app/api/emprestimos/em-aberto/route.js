export async function GET(request) {
  try {
    const response = await fetch('http://localhost:3000/api/emprestimos/em-aberto', {
      method: 'GET',
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Erro ao buscar empréstimos em aberto:', error);
    return Response.json(
      { sucesso: false, erro: 'Erro ao buscar empréstimos em aberto', mensagem: error.message },
      { status: 500 }
    );
  }
}
