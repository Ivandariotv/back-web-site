/**
 * experience controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::experience.experience', ({ strapi }) => ({
    async getTotalYears(ctx) {
        try {
            const service = strapi.service('api::experience.experience');
            const result = await service.calculateTotalYears();
            ctx.body = result;
        } catch (error) {
            ctx.throw(500, 'Error al calcular total de años de experiencia');
        }
    }
}));
