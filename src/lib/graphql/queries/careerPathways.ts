export const GET_CAREER_PATHWAYS = `
  query GetCareerPathways {
    careerPathways(first: 100, where: { status: PUBLISH }) {
      nodes {
        id
        title
        slug
        careerPathwayFields {
          description
          outcomes
          salaryRange
          jobGrowth
          icon {
            sourceUrl
          }
        }
      }
    }
  }
`;
