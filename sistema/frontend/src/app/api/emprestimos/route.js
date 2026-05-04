export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pagina = searchParams.get('pagina') || '1';
    const limite = searchParams.get('limite') || '100';
    const emAberto = searchParams.get('em-aberto');

    let url = `http://localhost:3000/api/emprestimos?pagina=${pagina}&limite=${limite}`;
    if (emAberto) {
      url = `http://localhost:3000/api/emprestimos/em-aberto`;
    }

    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Erro ao buscar empréstimos:', error);
    return Response.json(
      { sucesso: false, erro: 'Erro ao buscar empréstimos', mensagem: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch('http://localhost:3000/api/emprestimos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Erro ao criar empréstimo:', error);
    return Response.json(
      { sucesso: false, erro: 'Erro ao criar empréstimo', mensagem: error.message },
      { status: 500 }
    );
  }
}
