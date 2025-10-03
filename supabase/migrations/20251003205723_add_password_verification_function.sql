/*
  # Adicionar Função de Verificação de Senha
  
  Cria uma função PostgreSQL para verificar senhas de forma segura
  usando a extensão pgcrypto.
*/

-- Criar função para verificar senha
CREATE OR REPLACE FUNCTION verify_password(
  email text,
  password text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stored_hash text;
BEGIN
  -- Buscar hash da senha armazenada
  SELECT password_hash INTO stored_hash
  FROM users
  WHERE users.email = verify_password.email;
  
  -- Se usuário não existe, retornar false
  IF stored_hash IS NULL THEN
    RETURN false;
  END IF;
  
  -- Comparar senha fornecida com hash armazenado
  RETURN (stored_hash = crypt(password, stored_hash));
END;
$$;
