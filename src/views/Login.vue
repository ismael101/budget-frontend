<template>
<div id="login">
  <v-app>

    <v-content>
       <v-alert class='error' v-show='serverError'>Authentication Error</v-alert>

      <v-container fluid fill-height width='500'>
        <v-layout align-center justify-center>
          <v-form>
          <v-text-field class='my-5' v-model.lazy="$v.form.email.$model" type='email' name='email' label='Email'>

          </v-text-field>
          <div v-if='errors'>
            <span class='error' v-if='!$v.form.email.required'>
                <p>Email is Required</p>
            </span>
            <span class='error' v-if='!$v.form.email.email'>
              <p>Email isnt Valid</p>
            </span>
          </div>
          <v-text-field class='my-5' v-model.lazy='$v.form.password.$model' type='password' name='password' label='Password'>
          </v-text-field>
          <div v-if='errors'>
            <span class='error' v-if='!$v.form.password.required'>
              <p>Password is Required</p>
            </span>
          </div>

          <v-btn class='primary my-5' @click.prevent='submitForm'>Log In</v-btn> <v-btn class='success my-5' @click.prevent = 'signup'>Sign Up</v-btn>
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
import {email, required} from 'vuelidate/lib/validators'


export default {
 
  name: 'Login',

  data(){
    return{
       uiState:'submit not clicked',
      errors:false,
      empty:true,
      serverError:false,
      form:{
        email:'',
        password:''
      }
    }
  },
  validations:{
    form:{
      email:{
        required,
        email
      },
      password:{
        required
      }
    }
  },
  methods:{
    submitForm(){
      this.empty = !this.$v.form.$anyDirty;
      this.errors = this.$v.form.$anyError;
      this.uiState = "submit clicked";
      if (this.errors === false && this.empty === false) {
        //this is where you send the responses
        this.uiState = "form submitted";
        this.$store.dispatch('login', {email:this.form.email, password:this.form.password})
        .then(() => {
          this.serverError = false
          this.$router.push({name:'profile'})
        })
        .catch(err => {
            this.serverError = true
        })
      }

    },
    signup(){
      this.$router.push({name:'signup'})
    }
  }

}
</script>

<style>

</style>
