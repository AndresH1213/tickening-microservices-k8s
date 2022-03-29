import { Publisher, Subjects, TicketCreatedEvent } from '@eahbtickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
