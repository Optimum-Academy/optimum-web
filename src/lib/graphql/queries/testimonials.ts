export const GET_TESTIMONIALS = `
  query GetTestimonials {
    testimonials(first: 100, where: { status: PUBLISH }) {
      nodes {
        id
        title
        testimonialFields {
          studentName
          courseGraduated
          quoteContent
          avatar {
            sourceUrl
          }
        }
      }
    }
  }
`;
