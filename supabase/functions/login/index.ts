import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: 'Email e senha são obrigatórios' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Buscar usuário e validar senha
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select(`
        id,
        email,
        name,
        password_hash,
        is_active,
        avatar_url,
        role:roles(name)
      `)
      .eq('email', email)
      .single();

    if (userError || !userData) {
      return new Response(
        JSON.stringify({ message: 'Email ou senha inválidos' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!userData.is_active) {
      return new Response(
        JSON.stringify({ message: 'Usuário inativo' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validar senha usando pgcrypto
    const { data: validPassword, error: pwError } = await supabase.rpc(
      'verify_password',
      {
        email: email,
        password: password
      }
    );

    if (pwError || !validPassword) {
      return new Response(
        JSON.stringify({ message: 'Email ou senha inválidos' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Gerar token JWT simples (em produção, use uma biblioteca JWT apropriada)
    const token = btoa(JSON.stringify({
      userId: userData.id,
      email: userData.email,
      timestamp: Date.now()
    }));

    const user = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      avatar_url: userData.avatar_url,
      role: userData.role
    };

    return new Response(
      JSON.stringify({
        user,
        token
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});