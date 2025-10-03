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

export const mockLogin = async (email: string, password: string): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);

      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        resolve({
          user: userWithoutPassword,
          token: `mock_token_${Date.now()}_${user.id}`
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
