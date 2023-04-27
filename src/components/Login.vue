<template>
  <div>

    <v-row justify="center">
      <v-col align-self="center" cols="12" sm="4">
        <v-img
          class="mx-auto"
          :width="300"
          aspect-ratio="16/9"
          cover
          src="https://revistacipa.com.br/wp-content/uploads/2021/04/logo-social.png"
        ></v-img>
      </v-col>
    </v-row>

    <v-row>
      <v-sheet width="400" class="mx-auto">
          <v-form fast-fail @submit.prevent>
            <v-text-field
              v-model="credentials.user"
              label="Usuário"
            ></v-text-field>

            <v-text-field
              v-model="credentials.password"
              label="Senha"
            ></v-text-field>

            <v-btn type="submit" block class="mt-2" @click="login">Logar</v-btn><br />

            <v-alert v-show="msgError"
              color="error"
              icon="$error"
              title="Ops"
              text="Nome de usuário ou senha inválidos"
            ></v-alert>

          </v-form>
        </v-sheet>
      </v-row>


  </div>
</template>

<script>
import axios from 'axios'

export default({
    data() {
        return{
          msgError: false,
          credentials: {}
        }
      },
      methods:{
        login(){
          //axios.get('https://viacep.com.br/ws/01001000/json/')
          axios.post('api/login', this.credentials)
            .then(response => {
              if(response.data){
                return this.$router.push({ name: 'patients' })
              }else{
                this.msgError = true;
              }
            })
        }
      }
})
</script>

<style scoped>

</style>

