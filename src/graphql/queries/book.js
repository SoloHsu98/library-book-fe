import { gql } from "@apollo/client";
export const GET_ALL_BOOKS = gql`
  query getAllBooks(
    $pageSize: Int
    $page: Int
    $filters: BookFiltersInput
    $data: [String]
  ) {
    books(
      pagination: { pageSize: $pageSize, page: $page }
      filters: $filters
      sort: $data
    ) {
      data {
        id
        attributes {
          title
          genre
          rating
          year
          status
          rating
          saved
          summary
          bookCover {
            data {
              id
              attributes {
                url
              }
            }
          }
          authors {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`;

export const GET_NEW_BOOKS = gql`
  query getNewBooks($pageSize: Int) {
    books(
      pagination: { pageSize: $pageSize }
      filters: { status: { eq: "new" } }
    ) {
      data {
        id
        attributes {
          title
          genre
          rating
          year
          status
          rating
          saved
          bookCover {
            data {
              id
              attributes {
                url
              }
            }
          }
          summary
          authors {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`;

export const GET_BEST_SELLER_BOOKS = gql`
  query getNewBooks($pageSize: Int) {
    books(
      pagination: { pageSize: $pageSize }
      filters: { status: { eq: "best-seller" } }
    ) {
      data {
        id
        attributes {
          title
          genre
          rating
          year
          status
          rating
          saved
          bookCover {
            data {
              id
              attributes {
                url
              }
            }
          }
          summary
          authors {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`;

export const GET_SAVED_BOOKS = gql`
  query getSavedBooks($pageSize: Int) {
    books(
      pagination: { pageSize: $pageSize }
      filters: { saved: { eq: true } }
    ) {
      data {
        id
        attributes {
          title
          genre
          rating
          year
          status
          rating
          saved
          bookCover {
            data {
              id
              attributes {
                url
              }
            }
          }
          summary
          authors {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`;

export const GET_HORROR_BOOKS = gql`
  query getHorrorBooks($pageSize: Int) {
    books(
      pagination: { pageSize: $pageSize }
      filters: { genre: { eq: "Horror" } }
    ) {
      data {
        id
        attributes {
          title
          genre
          rating
          year
          status
          rating
          saved
          bookCover {
            data {
              id
              attributes {
                url
              }
            }
          }
          summary
          authors {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`;
export const GET_ROMANCE_BOOKS = gql`
  query getRomanceBooks($pageSize: Int) {
    books(
      pagination: { pageSize: $pageSize }
      filters: { genre: { eq: "Romance" } }
    ) {
      data {
        id
        attributes {
          title
          genre
          rating
          year
          status
          rating
          saved
          bookCover {
            data {
              id
              attributes {
                url
              }
            }
          }
          summary
          authors {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`;
export const GET_MANGA_BOOKS = gql`
  query getMangaBooks($pageSize: Int) {
    books(
      pagination: { pageSize: $pageSize }
      filters: { genre: { eq: "Manga" } }
    ) {
      data {
        id
        attributes {
          title
          genre
          rating
          year
          status
          rating
          saved
          bookCover {
            data {
              id
              attributes {
                url
              }
            }
          }
          summary
          authors {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`;
export const GET_COMEDY_BOOKS = gql`
  query getComedyBooks($pageSize: Int) {
    books(
      pagination: { pageSize: $pageSize }
      filters: { genre: { eq: "Comedy" } }
    ) {
      data {
        id
        attributes {
          title
          genre
          rating
          year
          status
          rating
          saved
          bookCover {
            data {
              id
              attributes {
                url
              }
            }
          }
          summary
          authors {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`;
export const GET_BOOK_BY_ID = gql`
  query getBook($id: ID!) {
    book(id: $id) {
      data {
        id
        attributes {
          title
          genre
          rating
          year
          status
          rating
          saved
          bookCover {
            data {
              id
              attributes {
                url
              }
            }
          }
          summary
          authors {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
export const GET_SIMILAR_BOOK = gql`
  query getSimilarBooks($pageSize: Int, $genre: String!, $id: ID) {
    books(
      filters: { genre: { eq: $genre }, id: { ne: $id } }
      pagination: { pageSize: $pageSize }
    ) {
      data {
        id
        attributes {
          title
          genre
          rating
          year
          status
          rating
          saved
          bookCover {
            data {
              id
              attributes {
                url
              }
            }
          }
          summary
          authors {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`;
