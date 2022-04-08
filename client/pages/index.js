import Link from 'next/link';

const landingPage = ({ currentUser, tickets }) => {
  const ticketsList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketsList}</tbody>
      </table>
    </div>
  );
};

landingPage.getInitialProps = async (context, client, currentUser) => {
  // this gets execute before rendering
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default landingPage;
