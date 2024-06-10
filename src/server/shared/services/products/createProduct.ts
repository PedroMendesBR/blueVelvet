import { PrismaClient } from '@prisma/client';
import { IProduct } from '../../../types/product';

const prisma = new PrismaClient();

export const createProduct = async (product: IProduct) => {
    try {
        const { name, shortDescription, brand, category, listPrice, cost } = product;

        // Verifica se já existe um produto com o mesmo nome, marca e preço
        const existingProduct = await prisma.product.findFirst({
            where: {
                name: name,
                brand: brand,
                listPrice: listPrice,
            },
        });


        if (existingProduct) {
            throw {
                status: 400,
                errors: {
                    default: "This product already exists.",
                },
            };
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                shortDescription,
                brand,
                category,
                listPrice,
                cost,
            },
        });

        return newProduct;
    } catch (error) {
        throw error;
    }
};
