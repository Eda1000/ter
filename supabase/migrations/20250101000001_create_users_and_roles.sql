/*
  # Create users and roles tables

  1. New Tables
    - `roles`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `created_at` (timestamptz)

    - `users`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `password_hash` (text)
      - `role_id` (uuid, foreign key)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users

  3. Initial Data
    - Insert default roles
    - Insert admin user (email: anderson.jatai@admin.com, password: 123456)
*/

-- Create extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read roles"
  ON roles FOR SELECT
  TO authenticated
  USING (true);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role_id uuid REFERENCES roles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
  ('Administrador', 'Acesso total ao sistema'),
  ('Coleta', 'Acesso para operações de coleta'),
  ('Operador', 'Acesso para operações básicas')
ON CONFLICT (name) DO NOTHING;

-- Insert admin user (password: 123456)
INSERT INTO users (name, email, password_hash, role_id)
SELECT
  'Anderson Jatai',
  'anderson.jatai@admin.com',
  crypt('123456', gen_salt('bf')),
  (SELECT id FROM roles WHERE name = 'Administrador')
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'anderson.jatai@admin.com'
);
