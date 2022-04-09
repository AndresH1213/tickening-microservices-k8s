import {
  Listener,
  Subjects,
  OrderCreatedEvent,
  OrderStatus,
} from '@eahbtickets/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/Order';
import { queueGroupName } from './queue-group-name';

export class OrderCreaterListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();

    msg.ack();
  }
}
