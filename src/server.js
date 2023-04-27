import { Server, Model } from 'miragejs'
import axios from 'axios'

export function makeServer(enviroment = 'development'){
  return new Server({
    enviroment,

    models: {
      user: Model,
      patient: Model
    },

    seeds(server) {
      server.create('user', {id: 1, user: 'paulo', password: '1234'})
      server.create("patient", { id: 1, name: "Vanessa", mother_name: 'Maria', cpf: '289.548.568-58', cns: '2568554', birth_date: '1980-01-02' })
      server.create("patient", { id: 2, name: "Ana Luiza", mother_name: 'Aparecida', cpf: '345.345.567-99', cns: '345345', birth_date: '1981-04-01' })
      server.create("patient", { id: 3, name: "Elaine", mother_name: 'Nicoletti', cpf: '634.347.345-90', cns: '345345', birth_date: '1982-05-10' })

    },

    routes(){
      this.passthrough();

      this.namespace = 'api';
      this.post('/login', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        return (attrs.user == 'paulo' && attrs.password == '1234') ? true : false;
      });

      this.get('/pacientes/lista', (schema, request) => {
        return schema.patients.all()
      });

      this.post('/pacientes/salvar', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        return schema.patients.create(attrs)
      });

      this.get("/pacientes/ver/:id", (schema, request) => {
        let id = request.params.id
        return schema.patients.find(id)
      })

      this.delete('/pacientes/delete/:id', (schema, request) => {
        let id = request.params.id
        let a = schema.patients.find(id).destroy()
        console.log(a)
      })



    }
  })
}


/*
  server.create('pacientes',
        {
          'image'       : '',
          'name'        : 'Paulo Sérgio',
          'mother_name' : 'Maria',
          'birth_date'  : '1981-10-21',
          'cpf'         : '289.022.238-17',
          'cns'         : '658965236',
          'address'     : 'Rua Igaraçu, 164'
        }
      )
      server.create('pacientes',
        {
          'image'       : '',
          'name'        : 'Vanessa Frezzato',
          'mother_name' : 'Aparecida',
          'birth_date'  : '1980-08-16',
          'cpf'         : '280.422.028-14',
          'cns'         : '23423423',
          'address'     : 'Rua Igaraçu, 164'
        }
      )
      */
