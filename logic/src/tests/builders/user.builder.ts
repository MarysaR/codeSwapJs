import { User, UserRole } from "@prisma/client";

export const userBuilder = ({
  id = crypto.randomUUID(),
  email = "test@example.com",
  password = "hashed_password",
  role = UserRole.DEVELOPER,
  createdAt = new Date(),
}: Partial<User> = {}): any => {
  const props: User = {
    id,
    email,
    password,
    role,
    createdAt,
  };

  return {
    withId: (id: string) => userBuilder({ ...props, id }),
    withEmail: (email: string) => userBuilder({ ...props, email }),
    withPassword: (password: string) => userBuilder({ ...props, password }),
    withRole: (role: UserRole) => userBuilder({ ...props, role }),
    withCreatedAt: (createdAt: Date) => userBuilder({ ...props, createdAt }),
    build: (): User => ({ ...props }),
  };
};
