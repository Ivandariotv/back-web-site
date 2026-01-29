import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    // Extender GraphQL con queries personalizadas
    const extensionService = strapi.plugin('graphql').service('extension');
    
    extensionService.use({
      typeDefs: `
        type TotalYearsResponse {
          years: Int
          months: Int
          days: Int
          totalDays: Int
        }

        extend type Query {
          experienceTotalYears: TotalYearsResponse
        }
      `,
      resolvers: {
        Query: {
          experienceTotalYears: {
            resolve: async () => {
              const service = strapi.service('api::experience.experience');
              return await service.calculateTotalYears();
            },
          },
        },
      },
      resolversConfig: {
        'Query.experienceTotalYears': {
          auth: true,
        },
      },
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
