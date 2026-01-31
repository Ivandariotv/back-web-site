export default ({ env }) => ({
  graphql: {
    enabled: true,
    config: {
      // Deshabilitar playground/sandbox en producción
      playgroundAlways: false,
      defaultLimit: 10,
      maxLimit: 100,
      apolloServer: {
        // Deshabilitar introspection en producción
        introspection: env('NODE_ENV') !== 'production',
      },
    },
  },
});