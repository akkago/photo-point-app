import React from 'react';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';

function Cart({ cartItems, onRemoveFromCart }: any) {
    const totalPrice = cartItems.reduce((total: any, item: any) => total + item.price * item.quantity, 0);
  
    return (
      <Container>
        <Typography variant="h4">Корзина</Typography>
        {cartItems.length === 0 ? (
          <Typography>Корзина пуста.</Typography>
        ) : (
          <>
            {cartItems.map((item: any) => (
              <Card key={item.id} style={{ marginBottom: '10px' }}>
                <CardContent>
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography>Цена: ${item.price}</Typography>
                  <Typography>Количество: {item.quantity}</Typography>
                  <Button variant="contained" color="secondary" onClick={() => onRemoveFromCart(item.id)}>
                    Удалить
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Typography variant="h5">Общая стоимость: ${totalPrice.toFixed(2)}</Typography>
          </>
        )}
      </Container>
    );
  }

  export default Cart;