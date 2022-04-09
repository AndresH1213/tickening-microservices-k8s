import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreaterListener } from '../order-created-listener';
import { OrderCreatedEvent, OrderStatus } from '@eahbtickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/Order';

const setup = async () => {
  const listener = new OrderCreaterListener(natsWrapper.client);

  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: 'nousing',
    expiresAt: 'nomatter',
    status: OrderStatus.Created,
    ticket: {
      id: 'nomatter',
      price: 10,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('replicates the order info', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);

  expect(order!.price).toEqual(data.ticket.price);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
