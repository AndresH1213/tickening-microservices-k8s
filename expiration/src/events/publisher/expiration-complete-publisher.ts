import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@eahbtickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
