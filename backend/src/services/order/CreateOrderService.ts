import prismaClient from "../../prisma";

interface OrderRequest {
  table: number;
  name: string;
}

class CreateOrderService {
  async execute({ table, name }: OrderRequest) {
   
      // verificar se enviou uma mesa
      if (!table) {
        throw new Error("Email incorrect");
      }
      
       // verificar se  mesa já existe
      const orderAlreadyExists = await prismaClient.order.findFirst({
          where: { table: table },
        });
    
      if (orderAlreadyExists) {
        throw new Error("Order already exists");
      }

    const order = await prismaClient.order.create({
      data: {
        table: table,
        name: name,
      },
    });

    return order;
  }
}

export { CreateOrderService };
