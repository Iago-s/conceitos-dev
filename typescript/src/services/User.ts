interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export function createUser({ name, email, password }: CreateUserData) {
  const user = {
    name,
    email, 
    password,
  }

  return user;
}

interface UpdateUserData {
  name: string;
}

export function updateUser({ name }: UpdateUserData) {
  const user = { name, email: 'email@email.com', password: 'password' }

  return user;
}