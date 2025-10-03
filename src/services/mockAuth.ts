interface User {
  id: string;
  name: string;
  email: string;
  role: {
    name: string;
  };
}

interface LoginResponse {
  user: User;
  token: string;
}

const mockUsers = [
  {
    id: '1',
    name: 'Anderson Jatai',
    email: 'anderson.jatai@admin.com',
    password: '123456',
    role: {
      name: 'Administrador'
    }
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'joao@coleta.com',
    password: '123456',
    role: {
      name: 'Coleta'
    }
  },
  {
    id: '3',
    name: 'Maria Santos',
    email: 'maria@operador.com',
    password: '123456',
    role: {
      name: 'Operador'
    }
  }
];

const generateMockToken = (userId: string): string => {
  const expirationTime = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7);
  const issuedAt = Math.floor(Date.now() / 1000);

  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: userId,
    exp: expirationTime,
    iat: issuedAt
  }));
  const signature = btoa(`mock-signature-${userId}`);

  return `${header}.${payload}.${signature}`;
};

export const mockLogin = async (email: string, password: string): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);

      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        const token = generateMockToken(user.id);

        resolve({
          user: userWithoutPassword,
          token
        });
      } else {
        reject({
          response: {
            status: 401,
            data: {
              message: 'Email ou senha inválidos'
            }
          }
        });
      }
    }, 800);
  });
};
