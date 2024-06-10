import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProductsController } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
    return res.send('Hi, dev!')
});

router.post('/Create', 
    ProductsController.createValidation, 
    ProductsController.create
);

router.put('/Update/:id',
    ProductsController.updateValidation,
    ProductsController.updateProduct
);

router.delete('/Delete/:id',
    ProductsController.deleteValidation,
    ProductsController.deleteProduct
);

router.get('/getName/:name',
    ProductsController.getByName
);

/*router.get('/getAll',
    ProductsController.getAllProducts
)*/

export { router };