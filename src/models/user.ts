import { Prisma, PrismaClient, User } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

const prisma = new PrismaClient({});

export const getUsers = async (args?: {
  select?: Prisma.UserSelect<DefaultArgs>;
  include?: Prisma.UserInclude<DefaultArgs>;
  where?: Prisma.UserWhereInput;
  orderBy?:
    | Prisma.UserOrderByWithRelationInput
    | Prisma.UserOrderByWithRelationInput[];
  cursor?: Prisma.UserWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
}): Promise<User[]> => {
  const users = await prisma.user.findMany(args);
  return users;
};

// export const createUser = async (args: {
//   select?: Prisma.UserSelect<DefaultArgs>;
//   include?: Prisma.UserInclude<DefaultArgs>;
//   data:
//     | (Prisma.Without<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput> &
//         Prisma.UserUncheckedCreateInput)
//     | (Prisma.Without<Prisma.UserUncheckedCreateInput, Prisma.UserCreateInput> &
//         Prisma.UserCreateInput);
// }): Promise<User> => {
//   const user = await prisma.user.create(args);
//   return user;
// };
