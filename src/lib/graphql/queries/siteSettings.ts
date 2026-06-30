export const GET_SITE_SETTINGS = `
  query GetSiteSettings {
    siteSettings {
      siteSettingsFields {
        contactEmail
        phoneNumber
        address
        socialLinks {
          facebook
          instagram
          linkedin
          twitter
        }
        ctaLabels {
          primaryCta
          secondaryCta
        }
        footerText
        businessInformation {
          rtoCode
          abn
        }
      }
    }
  }
`;
