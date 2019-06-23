import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://127.0.0.1:3000/profile'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('auth_token') || null,
    email: localStorage.getItem('email') || null,
    first: localStorage.getItem('first') || null,
    last: localStorage.getItem('last') || null,
    userid: localStorage.getItem('userid') || null,
    bills:[],
    expenses:[],
    savings:[],
    income:[],
  },
  getters:{
    billsTotal(state){
      let total = 0
      state.bills.forEach(element => {
          total = total + element.amount
      })
      return total
    },
    expensesTotal(state){
      let total = 0
      state.expenses.forEach(element => {
        total = total + element.amount
      })
      return total
    },
    savingsTotal(state){
      let total = 0
      state.savings.forEach(element => {
        total = total + element.amount
      })
      return total    
    },
    incomeTotal(state){
      let total = 0
      state.income.forEach(element => {
        total = total + element.income
      })
      return total
    }

  },
  mutations: {
    getAllBills(state, bills){
      state.bills = bills
    },
    getAllIncome(state, income){
      state.income = income
    },
    getAllSavings(state, savings){
      state.savings = savings
    },
    getAllExpenses(state, expenses){
      state.expenses = expenses
    }
},
  actions: {
    login(context, credentials){
      return new Promise((resolve, reject) => {
        axios.post('/login',credentials)
        .then(res => {
          localStorage.setItem('auth_token', res.data.token)
          let decoded = jsonwebtoken.decode(res.data.token)
          let userid = decoded.userId
          let first = decoded.first
          let last = decoded.last
          let email = decoded.email
          localStorage.setItem('userid', userid)
          localStorage.setItem('first', first)
          localStorage.setItem('last', last)
          localStorage.setItem('email', email)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    signup(credentials){
      return new Promise((resolve, reject) => {
        axios.post('/signup', credentials)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    signout(){
      return new Promise((resolve, reject) => {
        try {
          localStorage.clear()
          resolve()
        } catch (error) {
          reject()
        }
      })
    },
    getBills(context, credentials){
      return new Promise((resolve, reject) => {
        axios.get( '/bills/' + credentials.userid, {
          headers: { Authorization: "Bearer " + credentials.token }
        })
        .then(res => {
          let bills = res.data
          context.commit('getAllBills', bills)
          resolve(res)
            
        })
        .catch(err => {
          reject(err)
        })


      })
    },
    getIncome(context){
      return new Promise((resolve, reject) => {
        axios.get(`/income/${context.profileid}`,{
          headers: { Authorization: "Bearer " + context.state.token }
        })
        .then(res => {
          context.commit('getAllIncome', res.data)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    getSavings(context){
      return new Promise((resolve,reject) => {
        axios.get(`/savings/${context.userid}`,{
          headers: { Authorization: "Bearer " + context.state.token }
        })
        .then(res => {
          context.commit('getAllSavings', res.data)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    getExpenses(context){
      return new Promise((resolve, reject) => {
        axios.get(`/expenses/${context.state.userid}`,{
          headers: { Authorization: "Bearer " + context.state.token }
        })
        .then(res => {
          context.commit('getAllExpenses', res.data)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })

      })
      
    },
    updateBill(context, dispatch, billid, bill){
      return new Promise((resolve, reject) => {
        axios.post(`/bills/${context.state.userid}/${billid}`,bill,{
          headers: { Authorization: "Bearer " + context.state.token }
        })
        .then(res => {
          dispatch.getAllBills()
          .then(() => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })

        })
        .catch(err => {
          reject(err)
        })

      })
    },
    updateIncome(context, dispatch, incomeid, income){
      return new Promise((resolve, reject) => {
        axios.post(`/income/${context.state.userid}/${incomeid}`,income, {
          headers: { Authorization: "Bearer " + context.state.token }
        })
        .then(res => {
          dispatch.getAllIncome()
          .then(() => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
          

        })
        .catch(err => {
          reject(err)
        })
      })
    },
    updateSavings(context, dispatch,savingsid, savings){
      return new Promise((resolve, reject) => {
        axios.post(`/savings/${context.state.userid}/${savingsid}`, savings, {
          headers: { Authorization: "Bearer " + context.state.token }
        })
        .then(res => {
          dispatch.getAllSavings()
          .then(() => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    updateExpenses(context, dispatch, expensesid, expenses){
      return new Promise((resolve, reject) => {
        axios.post(`/savings/${context.state.userid}/${expensesid}`, expenses, {
          headers: { Authorization: "Bearer " + context.state.token }
        })
        .then(res => {
          dispatch.getAllExpenses()
          .then(() => {
            resolve(res)

          })
          .catch(err => {
            reject(err)
          })
        })
        .catch(err => {
          reject(err)

        })
      })
    }

   },
   deleteBill(context,dispatch,expensesid){
    return new Promise((resolve, reject) => {
      axios.delete(`/bills/${context.state.userid}/${expensesid}`, {
        headers: { Authorization: "Bearer " + context.state.token }
      })
      .then(res => {
        dispatch.getAllBills()
        .then(() => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
      .catch(err => {
        reject(err)
      })  
    
    })
   },

   deleteIncome(context,dispatch,incomeid){
     return new Promise((resolve, reject) => {
      axios.delete(`/income/${context.state.userid}/${incomeid}`, {
        headers: { Authorization: "Bearer " + context.state.token }
      })
      .then(res => {
        dispatch.getAllIncome()
        .then(() => {
           resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
      .catch(err => {
        reject(err)
      })
     })
    
   },
   
   deleteSavings(context,dispatch,savingsid){
     return new Promise((resolve, reject) => {
       axios.delete(`/savings/${context.state.userid}/${savingsid}`, {
        headers: { Authorization: "Bearer " + context.state.token }
      })
      .then(res => {
        dispatch.getAllSavings()
        .then(() => {
          resolve(res)
        })
        .catch(err => {
          resolve(err)
        })
      })
      .catch(err => {
        reject(err)
      })

     })
   },
   deleteExpenses(context, dispatch, expensesid){
    return new Promise((resolve, reject) => {
      axios.delete(`/expenses/${context.state.userid}/${expensesid}`, {
       headers: { Authorization: "Bearer " + context.state.token }
     })
     .then(res => {
       dispatch.getAllExpenses()
       .then(() => {
         resolve(res)
       })
       .catch(err => {
         resolve(err)
       })
     })
     .catch(err => {
       reject(err)
     })

    })
   }
   
})