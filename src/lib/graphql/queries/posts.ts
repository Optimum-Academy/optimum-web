export const GET_POSTS = `
  query GetPosts {
    posts(first: 100, where: { status: PUBLISH }) {
      nodes {
        id
        title
        slug
        excerpt
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      excerpt
      content
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
    }
  }
`;
