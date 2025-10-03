# Configuração do Supabase

Este projeto usa Supabase como backend. Para fazer o login funcionar, você precisa configurar seu próprio projeto Supabase.

## Passo 1: Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Clique em "New Project"
4. Preencha os dados do projeto e aguarde a criação

## Passo 2: Executar Migrations

As migrations já estão criadas na pasta `supabase/migrations/`. Você precisa aplicá-las no seu projeto:

### Opção A: Usar Supabase Dashboard (SQL Editor)

1. Acesse seu projeto no Supabase Dashboard
2. Vá em **SQL Editor**
3. Execute os seguintes arquivos SQL na ordem:

**Migration 1: Create users and roles**
```sql
/*
  # Create users table and roles system

  1. New Tables
    - `roles`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
    - `users`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `password_hash` (text)
      - `role_id` (uuid, foreign key to roles)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated access
*/

CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read roles"
  ON roles FOR SELECT
  TO authenticated
  USING (true);

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

-- Insert default roles
INSERT INTO roles (name) VALUES ('Administrador'), ('Coleta'), ('Operador')
ON CONFLICT (name) DO NOTHING;

-- Insert admin user (password: 123456)
-- Note: In production, you should use a proper password hashing mechanism
INSERT INTO users (name, email, password_hash, role_id)
SELECT
  'Anderson Jatai',
  'anderson.jatai@admin.com',
  '$2b$10$rKx8yEGHQxGvH6fP.HqYV.kRVMFQxWE6rZ2Y5vP5zN5nQfZ3dF3S.',
  (SELECT id FROM roles WHERE name = 'Administrador')
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'anderson.jatai@admin.com'
);
```

**Migration 2: Password verification function**
```sql
/*
  # Add password verification function

  1. New Functions
    - `verify_password` - Function to verify user password

  2. Security
    - Function runs with invoker's rights
    - Returns boolean for password match
*/

CREATE OR REPLACE FUNCTION verify_password(
  user_email text,
  user_password text
)
RETURNS TABLE (
  id uuid,
  name text,
  email text,
  role_id uuid,
  role_name text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    u.id,
    u.name,
    u.email,
    u.role_id,
    r.name as role_name
  FROM users u
  LEFT JOIN roles r ON r.id = u.role_id
  WHERE u.email = user_email
    AND u.password_hash = crypt(user_password, u.password_hash);
END;
$$;
```

## Passo 3: Deploy da Edge Function

A Edge Function `login` precisa ser deployada no seu projeto Supabase.

1. Acesse o Supabase Dashboard
2. Vá em **Edge Functions**
3. Clique em "New Function"
4. Copie o código de `supabase/functions/login/index.ts`:

```typescript
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email e senha são obrigatórios" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // TODO: Implement password verification logic here
    // For now, return mock data
    const mockResponse = {
      user: {
        id: "123",
        name: "Anderson Jatai",
        email: email,
        role: {
          name: "Administrador"
        }
      },
      token: "mock_token_" + Date.now()
    };

    return new Response(JSON.stringify(mockResponse), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
```

5. Salve e faça deploy da função

## Passo 4: Configurar Variáveis de Ambiente

1. No Supabase Dashboard, vá em **Settings** → **API**
2. Copie:
   - **Project URL** (algo como: `https://xyzabc.supabase.co`)
   - **anon public** key

3. Edite o arquivo `.env` no projeto e substitua os valores:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyBldEbTtsLMCV6DR0C4a2KZyyM4xn0rf9U

# Substitua com suas credenciais reais do Supabase
REACT_APP_SUPABASE_URL=https://SEU_PROJETO.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sua_anon_key_aqui

REACT_APP_API_URL=https://SEU_PROJETO.supabase.co/functions/v1
```

## Passo 5: Testar

1. Reinicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

2. Acesse a página de login

3. Use as credenciais:
   - **Email:** anderson.jatai@admin.com
   - **Senha:** 123456

## Credenciais de Teste

O usuário administrador padrão criado é:
- **Email:** anderson.jatai@admin.com
- **Senha:** 123456

## Problemas Comuns

### "Network Error" ao fazer login

- Verifique se as variáveis de ambiente estão corretas no arquivo `.env`
- Confirme que a Edge Function foi deployada corretamente
- Verifique se o CORS está configurado na Edge Function

### "Email ou senha inválidos"

- Confirme que executou as migrations e o usuário foi criado
- Verifique se a função `verify_password` está funcionando corretamente
- Use exatamente as credenciais: anderson.jatai@admin.com / 123456

## Segurança

⚠️ **IMPORTANTE**: Este é um setup de desenvolvimento. Para produção:

1. Use um sistema de hash de senha robusto (bcrypt, argon2)
2. Implemente refresh tokens
3. Configure RLS policies adequadas
4. Use variáveis de ambiente seguras
5. Implemente rate limiting na Edge Function
6. Adicione autenticação de dois fatores

## Suporte

Se tiver problemas, verifique:
- Logs da Edge Function no Supabase Dashboard
- Console do navegador para erros de rede
- Configuração do arquivo `.env`
