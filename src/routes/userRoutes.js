import MySop from '../components/sop/MySop'
import AllSop from '../components/sop/AllSop'
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
}, {
  path: '/allsop',
  component: AllSop,
}];

export default userRoutes