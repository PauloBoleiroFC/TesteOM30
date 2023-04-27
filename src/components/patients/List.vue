<template>
  <div>

    <v-container>
      <v-row
        class="mb-6"
        no-gutters
      >
      <v-col cols="3"><h1>Pacientes</h1></v-col>
      <v-col cols="9" class="float-right">

        <EditPatient @returnSavePatient="returnSavePatient" :action="'Novo'"></EditPatient>

      </v-col>
      </v-row>

      <v-row
        class="mb-6"
        no-gutters
      >

      <v-row no-gutters>
        <v-col cols="12">

          <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  ID
                </th>
                <th class="text-left">
                  Nome
                </th>
                <th class="text-left">
                  Nome da mãe
                </th>
                <th class="text-left">
                  CPF
                </th>
                <th class="text-left">
                  CNS
                </th>
                <th class="text-left">
                  Data Nascimento
                </th>
                <th colspan="2" >
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(patient, index) in patients" :key="patient.id" >
                <td>{{ patient.id }}</td>
                <td>{{ patient.name }}</td>
                <td>{{ patient.mother_name }}</td>
                <td>{{ patient.cpf }}</td>
                <td>{{ patient.cns }}</td>
                <td>{{ patient.birth_date }}</td>
                <td class="td-btn">
                  <div class="float-right">
                    <EditPatient @returnSavePatient="returnSavePatient" :action="'Editar'" :id="patient.id"></EditPatient>
                  </div>
                </td>
                <td class="td-btn">
                  <div class="float-right">
                    <v-btn
                      :disabled="loading"
                      :loading="loading"
                      class="text-none"
                      color="red-darken-2"
                      variant="flat"
                      @click="deleteItem(patient.id, index)"
                    >
                      <v-icon icon="mdi-trash-can-outline"></v-icon> Deletar
                    </v-btn> &nbsp;
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>

        </v-col>
      </v-row>

    </v-row>
    </v-container>

  </div>
</template>

<script>
import axios from 'axios'
import EditPatient from './EditPatient.vue'

export default ({
  components: {EditPatient},
  data(){
    return{
      patients: {}
    }
  },
  created(){
    this.listItem()
  },
  methods:{
    listItem()
    {
      axios.get('/api/pacientes/lista')
      .then(response => {
        console.log(response.data)
        this.patients = response.data.patients
      })
    },
    deleteItem(id, index){
      axios.delete('/api/pacientes/delete/'+id)
        .then(response => {
          this.listItem()
        })
    },
    editItem()
    {
      alert('ok')
    },
    returnSavePatient()
    {
      this.listItem()
    }
  }
})
</script>

<style scoped>
.float-right{
  text-align: right;
}
.td-btn{
  width: 150px;
}
</style>
