import Amplify, * as AmplifyModules from 'aws-amplify'
import { Storage } from 'aws-amplify'
import { AmplifyPlugin, AmplifyEventBus } from 'aws-amplify-vue'
import AwsExports from '../aws-exports'
Amplify.configure(AwsExports)

Storage.configure({
  bucket: 'quasar-print-20200327111617-hostingbucket-dev',
  level: 'protected',
  region: 'eu-central-1',
  identityPoolId: AwsExports.aws_cognito_identity_pool_id
})

export default async ({ router, Vue }) => {
  Vue.use(AmplifyPlugin, AmplifyModules)
  Vue.prototype.$Amplify = Amplify
  Vue.prototype.$AmplifyEventBus = AmplifyEventBus
  Vue.prototype.$Auth = AmplifyModules.Auth
  Vue.prototype.$Storage = Storage

  router.beforeResolve((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
        .then(data => {
          if (data && data.signInUserSession) {
            next()
          }
          next()
        })
        .catch(e => {
          next({
            path: '/auth'
          })
        })
    }
    next()
  })
}
