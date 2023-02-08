import prismaClient from "../../prisma";

interface ProductRequest {
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}

class CreateProductSevice {
  async execute({
    name,
    price,
    description,
    banner,
    category_id,
  }: ProductRequest) {

    if (name === "") {
      throw new Error("Name invalid...");
    }

    //verificar se produto já está cadastrado na plataforma
    const productAlreadyExists = await prismaClient.product.findFirst({
        where: { name: name },
      });

    if (productAlreadyExists) {
        throw new Error("Product already exists...");
    }


    const product = await prismaClient.product.create({
      data:{
        name: name,
        price: price,
        description: description,
        banner: banner,
        category_id: category_id,
      }
    })

    return product;
  }
}

export { CreateProductSevice };
