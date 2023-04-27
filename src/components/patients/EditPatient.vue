<template>
  <div>
    <v-dialog
        transition="dialog-bottom-transition"
        width="auto"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >{{ action }}</v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar
              color="primary"
              title="Cadastrar/Editar Paciente"
            ></v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">

                <v-sheet width="500" class="mx-auto">
                  <v-form fast-fail @submit.prevent>
                    <v-text-field
                      v-model="patient.name"
                      label="Nome completo"
                      :rules="name_rules"
                    ></v-text-field>

                    <v-text-field
                      v-model="patient.mother_name"
                      label="Nome completo da mãe"
                      :rules="mother_name_rules"
                    ></v-text-field>

                    <v-text-field
                      v-model="patient.birth_date"
                      label="Data de nascimento"
                      :rules="birth_date_rules"
                    ></v-text-field>

                    <v-text-field
                      v-model="patient.cpf"
                      label="CPF"
                      :rules="cpf_rules"
                    ></v-text-field>

                    <v-text-field
                      v-model="patient.cns"
                      label="CNS"
                      :rules="cns_rules"
                    ></v-text-field>

                    <v-text-field
                      v-model="patient.zipcode"
                      label="CEP"
                      :rules="zipcode_rules"
                      @input="getAddress()"
                    ></v-text-field>

                    <v-text-field
                      v-model="patient.address"
                      label="Endereço completo"
                      :rules="address_rules"
                    ></v-text-field>

                    <v-text-field
                      v-model="patient.neighborhood"
                      label="Bairro"
                      :rules="neighborhood_rules"
                    ></v-text-field>

                    <v-text-field
                      v-model="patient.city"
                      label="Cidade/UF"
                      :rules="city_rules"
                    ></v-text-field>

                    <v-btn type="submit" block class="mt-2" @click="store()">Salvar</v-btn>
                  </v-form>
                </v-sheet>

              </div>
            </v-card-text>

            <v-card-actions class="justify-end">
              <v-btn
                variant="text"
                @click="isActive.value = false"
              >Fechar</v-btn>
            </v-card-actions>

          </v-card>

          <v-alert v-show="msgError"
            color="error"
            icon="$error"
            title="Ops"
            :text=errorMessage
          ></v-alert>

        </template>
      </v-dialog>

  </div>
</template>

<script>
import axios from 'axios'

export default({
  props: ['action', 'id'],
  components: {

  },
  data(){
    return{
      patient: {},
      msgError: false,
      errorMessage: ''
    }
  },
  created(){
    if(typeof this.id !== 'undefined'){
      axios.get("/api/pacientes/ver/"+this.id)
        .then(response => {
          this.patient = response.data.patient
        })
    }

  },
  methods:{
    store(){
      if(this.VerificaCPF(this.patient.cpf)){
        axios.post('/api/pacientes/salvar', this.patient)
        .then(
          this.$emit('returnSavePatient', { refresh: true})
        )
      }else{
        this.msgError = true,
        this.errorMessage = 'CPF inválido'
      }
    },

    getAddress()
    {
      if(this.patient.zipcode.length == 8){
        axios.get('https://viacep.com.br/ws/'+this.patient.zipcode+'/json/')
          .then(response => {
            console.log(response)
          })
      }
    },


    VerificaCPF(cpf)
    {

      cpf = cpf.replaceAll('.','').replaceAll('-','')

      cpf = cpf.replace(/[^\d]+/g,'');
      if(cpf == '') return false;
      // Elimina CPFs invalidos conhecidos
      if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
          return false;
      // Valida 1o digito
      let add = 0;
      for (let i=0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
          rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
          return false;
      // Valida 2o digito
      add = 0;
      for (let i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
      rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
        rev = 0;
      if (rev != parseInt(cpf.charAt(10)))
        return false;
      return true;
    }
  }
})
</script>
