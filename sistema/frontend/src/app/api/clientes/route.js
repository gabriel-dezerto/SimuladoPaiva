export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pagina = searchParams.get('pagina') || '1';
    const limite = searchParams.get('limite') || '100';

    const response = await fetch(
      `http://localhost:3002/api/clientes?pagina=${pagina}&limite=${limite}`,
      { method: 'GET' }
    );

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return Response.json(
      { sucesso: false, erro: 'Erro ao buscar clientes', mensagem: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch('http://localhost:3002/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return Response.json(
      { sucesso: false, erro: 'Erro ao criar cliente', mensagem: error.message },
      { status: 500 }
    );
  }
}
