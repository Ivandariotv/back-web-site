/**
 * experience service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::experience.experience', ({ strapi }) => ({
    async calculateTotalYears() {
        // Obtener todas las experiencias publicadas
        const experiences = await strapi.entityService.findMany('api::experience.experience', {
            publicationState: 'live',
            filters: {},
        });

        if (!experiences || experiences.length === 0) {
            return { totalYears: 0, experiences: [] };
        }

        const today = new Date();
        let totalDays = 0;

        // Calcular años, meses y días para cada experiencia
        experiences.forEach(exp => {
            const startDate = new Date(exp.start_date);
            const endDate = exp.is_employed ? today : new Date(exp.end_date);

            // Calcular diferencia en días
            const diffTime = endDate.getTime() - startDate.getTime();
            const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            totalDays += days;
        });

        // Convertir días totales a años, meses y días
        const totalYears = Math.floor(totalDays / 365);
        const remainingDaysAfterYears = totalDays % 365;
        const totalMonths = Math.floor(remainingDaysAfterYears / 30);
        const remainingDays = remainingDaysAfterYears % 30;

        return {
            years: totalYears,
            months: totalMonths,
            days: remainingDays,
            totalDays: totalDays
        };
    }
}));
