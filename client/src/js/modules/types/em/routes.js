import MarionetteView from 'app/views/marionette/marionette-wrapper.vue'

// Import style for lazy loading of Vue Single File Component
const RelionView = () => import(/* webpackChunkName: "em" */ 'modules/types/em/relion/views/relion.vue')
const RelionAddProcessing = () => import(/* webpackChunkName: "em" */ 'modules/types/em/relion/views/add-processing-job.vue')
const ScipionView = import(/* webpackChunkName: "em" */ 'modules/types/em/scipion/views/scipion')

const routes = [
    {
        path: '/em/process/relion/session/:session_str',
        component: RelionView,
        props: route => ({
            session_str: route.params.session_str,
        }),
        beforeEnter: (to, from, next) => {
            // Copying the logic from types/em/relion/controller.js
            if (to.params.session_str) {
                app.cookie(to.params.session_str.split('-')[0]);
                next()
            } else {
                // This path should never be entered. If there is no session_str then this path will not match
                app.message({title: 'Visit not specified', message: 'No visit specified'})
                next('/notfound')
            }
        }
    },
    {
        path: '/em/process/relion/session/:session_str/jobs/add',
        component: RelionAddProcessing,
        props: route => ({
            session_str: route.params.session_str,
        }),
        beforeEnter: (to, from, next) => {
            // Copying the logic from types/em/relion/controller.js
            if (to.params.session_str) {
                app.cookie(to.params.session_str.split('-')[0]);
                next()
            } else {
                // This path should never be entered. If there is no session_str then this path will not match
                app.message({title: 'Visit not specified', message: 'No visit specified'})
                next('/notfound')
            }
        }
    },
    {
        path: '/em/process/scipion/visit/:visit_str',
        component: MarionetteView,
        props: route => ({
            mview: ScipionView,
            options: {
                visit_str: route.params.visit_str
            },
            breadcrumbs: [{ title: 'Scipion Processing' }, { title: route.params.visit_str }]
        }),
        beforeEnter: (to, from, next) => {
            // Copying the logic from types/em/scipion/controller.js
            if (to.params.visit_str) {
                app.cookie(to.params.visit_str.split('-')[0]);
                next()
            } else {
                // This path should never be entered. If there is no session_str then this path will not match
                app.message({title: 'Visit not specified', message: 'No visit specified'})
                next('/notfound')
            }
        }
    }
]

export default routes