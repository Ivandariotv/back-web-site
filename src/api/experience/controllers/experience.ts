/**
 * experience controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::experience.experience', ({ strapi }) => ({
    async getTotalYears(ctx) {
        try {
            // Obtener todas las experiencias publicadas
            const experiences = await strapi.entityService.findMany('api::experience.experience', {
                publicationState: 'live',
                filters: {},
            });

            if (!experiences || experiences.length === 0) {
                ctx.body = { totalYears: 0, experiences: [] };
                return;
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

                // Calcular años, meses y días para esta experiencia
                let years = endDate.getFullYear() - startDate.getFullYear();
                let months = endDate.getMonth() - startDate.getMonth();
                let daysInPeriod = endDate.getDate() - startDate.getDate();

                // Ajustar si los días son negativos
                if (daysInPeriod < 0) {
                    months--;
                    const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
                    daysInPeriod += prevMonth.getDate();
                }

                // Ajustar si los meses son negativos
                if (months < 0) {
                    years--;
                    months += 12;
                }
            });

            // Convertir días totales a años, meses y días
            const totalYears = Math.floor(totalDays / 365);
            const remainingDaysAfterYears = totalDays % 365;
            const totalMonths = Math.floor(remainingDaysAfterYears / 30);
            const remainingDays = remainingDaysAfterYears % 30;

            ctx.body = {
                years: totalYears,
                months: totalMonths,
                days: remainingDays,
                totalDays: totalDays
            };
        } catch (error) {
            ctx.throw(500, 'Error al calcular total de años de experiencia');
        }
    }
}));
