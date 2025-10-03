/*
  # Criação de Estrutura de Usuários e Roles
  
  1. Novas Tabelas
    - `roles` - Funções/papéis dos usuários
      - `id` (uuid, chave primária)
      - `name` (text, único)
      - `description` (text)
      - `created_at` (timestamptz)
      
    - `users` - Usuários do sistema
      - `id` (uuid, chave primária)
      - `email` (text, único)
      - `password_hash` (text)
      - `name` (text)
      - `role_id` (uuid, referência para roles)
      - `is_active` (boolean)
      - `avatar_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
  2. Segurança
    - Habilitar RLS em todas as tabelas
    - Políticas para acesso autenticado
*/

-- Criar tabela de roles (funções/papéis)
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  role_id uuid REFERENCES roles(id),
  is_active boolean DEFAULT true,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Políticas para roles
CREATE POLICY "Usuários autenticados podem ler roles"
  ON roles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Apenas admins podem gerenciar roles"
  ON roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.id = auth.uid()
      AND r.name = 'Administrador'
    )
  );

-- Políticas para users
CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON users
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admins podem ver todos os usuários"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.id = auth.uid()
      AND r.name = 'Administrador'
    )
  );

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON users
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Admins podem gerenciar todos os usuários"
  ON users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.id = auth.uid()
      AND r.name = 'Administrador'
    )
  );

-- Inserir roles padrão
INSERT INTO roles (name, description) VALUES
  ('Administrador', 'Acesso total ao sistema'),
  ('Motorista', 'Acesso para motoristas'),
  ('Coleta', 'Acesso para equipe de coleta'),
  ('Operador', 'Acesso operacional padrão')
ON CONFLICT (name) DO NOTHING;
