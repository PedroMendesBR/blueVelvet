import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { Validation } from '../../shared/middleware';
import { IProduct } from '../../types/product';
import { PrismaClient } from '@prisma/client';

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
};

const prisma = new PrismaClient();

export const getAllValidation = Validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0).typeError('Page must be a number greater than 0'),
        limit: yup.number().optional().moreThan(0).typeError('Limit must be a number greater than 0'),
        filter: yup.string().optional(),
    })),
}));



export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    console.log(req.query);
    try {
        const allProducts = await prisma.product.findMany();
        return res.status(StatusCodes.OK).json(allProducts);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send((error as Error).message);
    }
};
