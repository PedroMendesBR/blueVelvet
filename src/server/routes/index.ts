import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProductsController } from '../controllers';
import path  from 'path';

const router = Router();

router.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });

router.post('/Create', 
    ProductsController.createValidation, 
    ProductsController.create
);

router.put('/Update',
    ProductsController.updateValidation,
    ProductsController.updateProduct
);

router.delete('/Delete',
    ProductsController.deleteValidation,
    ProductsController.deleteProduct
);

router.get('/getName/:name',
    ProductsController.getByName
);

router.get('/getAll',
    ProductsController.getAllValidation,
    ProductsController.getAll
);

export { router };