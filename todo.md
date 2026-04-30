# Simulado Paiva - OfficeTech - TODO

## Status: Projeto Limpo e Preparado

Este projeto foi limpo para usar o banco de dados existente do repositório original (db.sql).

### Removido:
- [x] Schema Drizzle duplicado para clientes, equipamentos e empréstimos
- [x] Procedures tRPC para clientes, equipamentos e empréstimos
- [x] Páginas de Dashboard, Clientes, Equipamentos e Empréstimos
- [x] Testes Vitest para procedures removidas
- [x] Documentação temporária

### Mantido:
- [x] Autenticação Manus OAuth (tabela `users`)
- [x] Página Home com interface elegante
- [x] Layout base com DashboardLayout
- [x] Componentes Shadcn/ui e Tailwind CSS
- [x] Estrutura de projeto pronta para expansão

### Próximos Passos:
Para implementar as funcionalidades de gestão de empréstimos, você pode:

1. **Opção A - Usar Drizzle ORM:**
   - Adicionar as tabelas existentes ao schema Drizzle (schema.ts)
   - Implementar helpers em server/db.ts
   - Criar procedures tRPC
   - Desenvolver páginas React

2. **Opção B - Usar Raw SQL:**
   - Usar `db.execute()` com SQL bruto para queries
   - Implementar procedures tRPC que chamam raw SQL
   - Desenvolver páginas React

3. **Opção C - Usar outro ORM:**
   - Integrar TypeORM, Prisma ou outro ORM
   - Mapear as tabelas existentes
   - Implementar procedures tRPC
   - Desenvolver páginas React
