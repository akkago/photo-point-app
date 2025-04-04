import React from 'react';
import {
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
} from '@mui/material';
import './Catalog.css';

function Catalog({ products, addToCart }: any) {
    return (
        <Container className='product-list'>
            {products.length > 0 ? (
                products.map((product: any) => (
                    <div key={product.id} className='product'>
                        <Card >
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.image}
                                alt={product.title}
                            />
                            <CardContent >
                                <Typography variant="h6" style={{ height: 100 }}>{product.title}</Typography>
                                <Typography style={{ height: 200, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: '6' }}>{product.description}</Typography>
                                <Typography>Цена: ${product.price}</Typography>
                            </CardContent>
                            <Button style={{ margin: '20px' }} variant="contained" color="primary" onClick={() => addToCart(product)}>
                                Добавить в корзину
                            </Button>
                        </Card>
                    </div>
                ))
            ) : (
                <div>
                    <Typography>Продукты не найдены.</Typography>
                </div>
            )}
        </Container>
    );
}

export default Catalog;