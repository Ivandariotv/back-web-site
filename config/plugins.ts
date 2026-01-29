export default () => ({
  graphql: {
    enabled: true,
    config: {
      landingPage: true,
      depthLimit: 10,
      amountLimit: 100,
      apolloServer: {
        introspection: true,
      },
    },
  },
});