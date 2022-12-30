// Router Configuration
import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../../views/HomePage.vue";
import EditUser from "../../views/EditUser.vue";
import UserPostPage from "../../views/UserPostPage.vue";
import OnlyRouterView from "../../views/OnlyRouterView.vue";
import SignupForm from "../../views/SignupForm.vue";
import store from "../../store/store"
Vue.use(VueRouter);

// Setting Router Paths
const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: SignupForm },
  {
    path: "/home",
    component: HomePage,
    meta : {requiresLogin: true}
  },
  {
    path: "/user",
    component: EditUser,
    meta : {requiresLogin: true},
  },
  {
    path: "/user/:id",
    component: EditUser,
   meta: {requiresLogin: true}
  },
  {
    path: "/user/:id",
    component: OnlyRouterView,
    children: [
      {
        path: "posts",
        component: UserPostPage,
        meta: {requiresLogin: true}
      },
    ],
  },
];

// const routes = [
//   {
//     path: "/signin",
//     component: SignupForm,
//     // meta: { requiresVisitor: true },
//   },
  
//   {
//     path: "/",
//     component: OnlyRouterView,
//     // meta: { requiresLogin: true },

//     children: [
//       {
//         path: "/datatables/bootstrap-grid",
//         component: SignupForm,
//         // meta: { requiresLogin: true },
//       },
//       {
//         path: "/datatables/kendo-grid",
//         component: SignupForm,
//         // meta: { requiresLogin: true },
//       },
//       {
//         path: "/user/:id",
//         component: EditUser,
//         // meta: { requiresLogin: true },
//       },
//       {
//         path: "/user/:id",
//         component: OnlyRouterView,
//         children: [
//           {
//             path: "posts",
//             component: UserPostPage,
//             // meta: { requiresLogin: true },
//           },
//         ],
//       },
//     ],
//   }
// ];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresLogin)){
    if(store.state.authenticated==false){
      next("/login");
    }else{
      next();
    }
  }else{
    next();
  }
})


export default router;
