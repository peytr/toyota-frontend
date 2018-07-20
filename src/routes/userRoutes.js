import MySop from '../components/sop/MySop'
import MyProfile from '../components/user/MyProfile'
import ChangePassword from '../components/user/ChangePassword'


const userRoutes = [{
  path: '/mysop',
  component: MySop,
}, {
  path: '/myprofile',
  component: MyProfile,
}, {
  path: '/password',
  component: ChangePassword,
}];

export default userRoutes