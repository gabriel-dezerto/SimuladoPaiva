'use client';

import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, } from "@/components/ui/table";

export default function Clientes() {
  // TODO: Buscar a lista de clientes do backend ao carregar a página
  // Dica: use useEffect + fetch para chamar GET /api/clientes

  // TODO: Criar um formulário para cadastrar novos clientes
  // Dica: os dados devem ser enviados via POST /api/clientes

  return (
    <main>
      <h1>Clientes</h1>
      {/* TODO: Renderize a lista de clientes aqui */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>(123) 456-7890</TableCell>
            <TableCell>john.doe@example.com</TableCell>
            <TableCell>
              <Button>Excluir</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* TODO: Adicione o formulário de cadastro aqui */}
    </main>
  );
}
