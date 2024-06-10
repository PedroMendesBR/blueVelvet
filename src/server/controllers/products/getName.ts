import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getByName(req: Request<{ name: string }>, res: Response) {
    try {
        const { name } = req.params;

        const product = await prisma.product.findFirst({
            where: {
                name: {
                    contains: name,
                },
            },
        });

        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error('Erro ao buscar produto pelo nome:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}