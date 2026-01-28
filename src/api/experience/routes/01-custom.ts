export default {
    routes: [
        {
            method: 'GET',
            path: '/experiences/total-years',
            handler: 'experience.getTotalYears',
            config: {
                policies: [],
                middlewares: []
            }
        }
    ]
};
