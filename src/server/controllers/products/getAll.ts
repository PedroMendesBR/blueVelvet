/*import { PrismaClient } from '@prisma/client';
import { IProduct } from '../../types/product';

const prisma = new PrismaClient();

export const getAllProducts = async () => {
    try {
        // Busca todos os produtos cadastrados no sistema
        const allProducts = await prisma.product.findMany();

        return allProducts;
    } catch (error) {
        throw error;
    }
};*/