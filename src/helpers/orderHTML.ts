import Cart from "@entities/Cart"
import Order from "@entities/Order"
import User from "@entities/User"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const orderHTML = (order: Order, user: User, cart: Cart) => {
  return `
  <html>
  <head>
    <style>
      * {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
      }

      table {
        border-collapse: separate;
        border-spacing: 0;
        overflow: hidden;
        width: 100%;
        border-radius: 4px;
        border: 1px solid #212121;
      }

      .table-container {
        max-width: 900px;
      }

      th,
      td {
        text-align: left;
        padding: 8px;
      }

      tbody tr:nth-child(2n+1) {
        background-color: #dfdfdf;
      }

      tbody tr:nth-child(2n+2) {
        background-color: #f5f5f5;
      }

      tbody tr + tr {
        border-bottom: 1px solid #e0e0e0;

      }

      th {
        background-color: #212121;
        color: white;
      }

      .total {
        text-align: right;
      }
    </style>
  </head>
  <body>
    <h1>Pedido #${order.id.split("-")[0]}</h1>
    <ul style="list-style: none;">
      <li>Nome de usuário: ${user.name}</li>
      <li>Endereço de entrega: ${user.address}</li>
      <li>Pedido criado em: ${format(
        new Date(order.createdAt),
        "dd/MM/yyyy 'às' HH:mm:ss",
        { locale: ptBR }
      )}</li>
    </ul>
    <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Nome do produto</th>
          <th>Quantidade</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
    ${cart.cartItems
      .map(
        (cartItem) => `
        <tr>
          <td>${cartItem.product.name}</td>
          <td>${cartItem.quantity} x R$ ${cartItem.product.price}</td>
          <td>R$ ${cartItem.product.price * cartItem.quantity}</td>
        </tr>
        `
      )
      .join("")}
      </tbody>
      </table>
      <h2 class="total">Total: R$ ${order.total}</h2>
      </div>
    </body>
  <html>
  `
}

export default orderHTML
