<template>
 
<div id="signup">
  <v-app>
    <v-content>
      <v-container fluid fill-height width='500'>
        <v-layout align-center justify-center>
          <v-form>
           <v-alert v-show='success' type='error'>{{message}}</v-alert>

          <v-layout row justify-center>
            <v-flex xs6 class='mx-1'>
              <v-text-field v-model.lazy='$v.form.first.$model' type='text' label='First' >

              </v-text-field>
              <div v-if='errors'>
              <span class='error' v-if='!$v.form.first.required'><p>First Name is Required</p></span>
              </div>
            </v-flex>
            <v-flex xs6 class='mx-1'>
              <v-text-field v-model.lazy='$v.form.last.$model' type='text' label='Last'>

              </v-text-field>
              <div v-if="errors">
              <span class='error' v-if='!$v.form.last.required'><p>Last Name is Required</p></span>
              </div>
            </v-flex>
          </v-layout>
          <div class='my-5'>
          <v-text-field v-model.lazy='$v.form.email.$model' label='Email' type='email' >

          </v-text-field>
          <div v-if="errors">
          <span class='error' v-if='!$v.form.email.required'><p>Email is Required</p></span>
          <span class='error' v-if='!$v.form.email.email'><p>Email isn't Valid</p></span>

          </div>
          </div>
          <div class='my-5'>
          <v-text-field v-model.lazy='$v.form.password.$model' type='password' label='Password'>

          </v-text-field>
          <div v-if="errors">
          <span class='error' v-if='!$v.form.password.required'><p>Password is Required</p></span>
          <span class='error' v-if='!$v.form.password.minLength'><p>Password must be at least 6 characters</p></span>
          </div>
          </div>
          <div class='my-5'>
          <v-text-field  v-model.lazy='$v.form.retype.$model' label='Retype Password' type='password'>

          </v-text-field>
          <div v-if="errors">
          <span class='error' v-if='!$v.form.retype.required'><p>Retype Password Required</p></span>
          <span class='error' v-if='!$v.form.retype.sameAsPassword'><p>Password and Retype Doesnt Match</p></span>
          </div>
          </div>
          <v-btn class='primary my-5' @click.prevent="submitForm" >Sign Up </v-btn>
          <div v-if="errors">
            <span class='error'><p>Errors In Form</p></span> 
          </div>
          <div v-else-if="empty && uiState === 'submit clicked'">
            <span class='error'><p>The Form is Empty</p></span>
          </div>
          <div v-else-if="uiState === 'form submitted'">
            <p>Form Successfully Submitted</p>
          </div> 
          </v-form>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
    
</template>

<script>
import {required, email, sameAs, minLength} from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
    name:'Signup',
    mixins:[validationMixin],
    
    data(){
        return{
            uiState:'submit not clicked',
            errors:false,
            empty:true,
            success:false,
            message:'',
            form:{
              first:'',
              last:'',
              email:'',
              password:'',
              retype:''
            }
        }

    },
    validations:{

      form:{
        first:{
          required
        },
        last:{
          required
        },
        email:{
          required,
          email,
        },
        password:{
          required,
          minLength: minLength(6)
        },
        retype:{
          required,
          sameAsPassword: sameAs('password')
        }

      }


    },
    methods:{
      submitForm() {
      this.empty = !this.$v.form.$anyDirty;
      this.errors = this.$v.form.$anyError;
      this.uiState = "submit clicked";
      if (this.errors === false && this.empty === false) {
        this.$store.dispatch('signup', {first: this.form.first, last: this.form.last, email: this.form.email, password: this.form.password})
        .then(() => {
          this.success = true
          this.$router.push({name:'login'})
        })
        .catch((err) => {
          this.success = true
          this.message = err
        })
      }
    }

   

}
}
</script>

<style>
#title{
    color: white
}
.error{
  color: red
}
</style>
