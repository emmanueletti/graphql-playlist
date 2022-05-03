import { useQuery, gql } from '@apollo/client';

const getBooksQuery = gql`
  {
    books {
      name
      genre
    }
  }
`;

function BookList() {
  return (
    <div>
      <ul id='book-list'>
        <li>Book Name</li>
      </ul>
    </div>
  );
}

export default BookList;
