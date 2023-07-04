import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import ForgottenPassword from '../views/ForgottenPassword.vue'
import MyAccount from '../views/MyAccount.vue'
import BookDetails from '../views/BookDetails.vue'
import MyEbooks from '../views/MyEbooks.vue'
import MyFavorites from '../views/MyFavorites.vue'
import MyHistory from '../views/MyHistory.vue'
import BorrowBook from '../views/BorrowBook.vue'
import ReadBook from '../views/ReadBook.vue'
import SearchBook from '../views/SearchBook.vue'
import ShareBook from '../views/ShareBook.vue'
import MainPage from '../views/MainPage.vue'
import ManageUsers from '../views/ManageUsers.vue'
import AddBook from '../views/AddBook.vue'
import ManageBooks from '../views/ManageBooks.vue'


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/LogIn',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/ForgottenPassword',
    name: 'ForgottenPassword',
    component: ForgottenPassword
  },
  {
    path: '/MyAccount',
    name: 'MyAccount',
    component: MyAccount
  },
  {
    path: '/BookDetails',
    name: 'BookDetails',
    component: BookDetails
  },
  {
    path: '/MyEbooks',
    name: 'MyEbooks',
    component: MyEbooks
  },
  {
    path: '/MyFavorites',
    name: 'MyFavorites',
    component: MyFavorites
  },
  {
    path: '/MyHistory',
    name: 'MyHistory',
    component: MyHistory
  },
  {
    path: '/BorrowBook',
    name: 'BorrowBook',
    component: BorrowBook
  },
  {
    path: '/ReadBook',
    name: 'ReadBook',
    component: ReadBook
  },
  {
    path: '/SearchBook',
    name: 'SearchBook',
    component: SearchBook
  },
  {
    path: '/ShareBook',
    name: 'ShareBook',
    component: ShareBook
  },
  {
    path: '/MainPage',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/ManageUsers',
    name: 'ManageUsers',
    component: ManageUsers
  },
  {
    path: '/ManageBooks',
    name: 'ManageBooks',
    component: ManageBooks
  },
  {
    path: '/AddBook',
    name: 'AddBook',
    component: AddBook
  }
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
