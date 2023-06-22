import { router } from './index.js'

export function link_MyAccount(event){
    this.$router.push({path: '/MyAccount'})
}

export function link_HomePage(event){
    this.$router.push({path: '/'})
}
export function link_LogIn(event){
    this.$router.push({path: '/LogIn'})
}
export function link_SignUp(event){
    this.$router.push({path: '/SignUp'})
}
export function link_ForgottenPassword(event){
    this.$router.push({path: '/ForgottenPassword'})
}
export function link_BookDetails(event){
    this.$router.push({path: '/BookDetails'})
}
export function link_MyEbooks(event){
    this.$router.push({path: '/MyEbooks'})
}
export function link_MyFavorites(event){
    this.$router.push({path: '/MyFavorites'})
}
export function link_MyHistory(event){
    this.$router.push({path: '/MyHistory'})
}
export function link_BorrowBook(event){
    this.$router.push({path: '/BorrowBook'})
}
export function link_ReadBook(event){
    this.$router.push({path: '/ReadBook'})
}
export function link_SearchBook(event){
    this.$router.push({path: '/SearchBook'})
    // Forcer le rechargement de la page
}
export function link_ShareBook(event){
    this.$router.push({path: '/ShareBook'})
}
export function link_ManageUsers(event){
    this.$router.push({path: '/ManageUsers'})
}

// Exportez les fonctions sous forme d'objet
export default {
    link_MyAccount,
    link_HomePage,
    link_LogIn,
    link_SignUp,
    link_ForgottenPassword,
    link_BookDetails,
    link_MyEbooks,
    link_MyFavorites,
    link_MyHistory,
    link_BorrowBook,
    link_ReadBook,
    link_SearchBook,
    link_ShareBook,
    link_ManageUsers

}