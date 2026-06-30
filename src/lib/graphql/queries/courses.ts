export const GET_COURSES = `
  query GetCourses {
    courses(first: 100, where: { status: PUBLISH }) {
      nodes {
        id
        title
        slug
        content
        courseFields {
          qualificationCode
          cricosCode
          audience
          duration
          deliveryMode
          careerOutcomes
          entryRequirements
          externalEnrolmentLink
          brochureLink
          price
          level
          totalHours
          vocationalPlacement
          whyStudy
          whatYouWillLearn
          structure
          units {
            code
            title
            type
          }
          faqs {
            question
            answer
          }
          resources {
            provided
            required
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG = `
  query GetCourseBySlug($slug: ID!) {
    course(id: $slug, idType: SLUG) {
      id
      title
      slug
      content
      courseFields {
        qualificationCode
        cricosCode
        audience
        duration
        deliveryMode
        careerOutcomes
        entryRequirements
        externalEnrolmentLink
        brochureLink
        price
        level
        totalHours
        vocationalPlacement
        whyStudy
        whatYouWillLearn
        structure
        units {
          code
          title
          type
        }
        faqs {
          question
          answer
        }
        resources {
          provided
          required
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;
