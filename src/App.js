import React from 'react';
import logo from './logo/BRM.gif';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import JSONDATA from "./MOCK_DATA.json";

/*Array de datos de contacto*/
const contactos = [
  { "id": 1, "full_name": "Beret Jewiss", "phone": "335-665-4712", "datetime": "10/10/1990", "street_address": "6 Rusk Crossing", "email": "bjewiss0@yandex.ru" },
  { "id": 2, "full_name": "Karlee Newdick", "phone": "430-739-7327", "datetime": "03/03/1980", "street_address": "785 Grim Circle", "email": "knewdick1@yandex.ru" },
  { "id": 3, "full_name": "Jacqueline Andreasen", "phone": "812-332-4512", "datetime": "04/25/1960", "street_address": "5393 Barby Park", "email": "jandreasen2@blogger.com" },
  { "id": 4, "full_name": "Carolann Lockitt", "phone": "858-381-3092", "datetime": "03/01/1970", "street_address": "6733 Carberry Junction", "email": "clockitt3@fc2.com" },
  { "id": 5, "full_name": "Alex Friend", "phone": "793-506-3567", "datetime": "08/13/1975", "street_address": "1446 Schiller Parkway", "email": "afriend4@domainmarket.com" },
  { "id": 6, "full_name": "Kahlil Rantoul", "phone": "424-475-4209", "datetime": "01/24/1985", "street_address": "32 American Ash Park", "email": "krantoul5@ft.com" },
  { "id": 7, "full_name": "Else Zima", "phone": "804-460-6586", "datetime": "02/11/1978", "street_address": "79228 Dahle Alley", "email": "ezima6@webs.com" },
  { "id": 8, "full_name": "Edd Caghy", "phone": "120-638-8449", "datetime": "05/03/1990", "street_address": "5702 Thierer Drive", "email": "ecaghy7@discovery.com" },
  { "id": 9, "full_name": "Felicdad Portress", "phone": "602-282-2168", "datetime": "07/27/1992", "street_address": "0872 Brown Way", "email": "fportress8@microsoft.com" },
  { "id": 10, "full_name": "Ianthe Mac Giany", "phone": "963-453-9526", "datetime": "12/13/2000", "street_address": "63047 Sundown Way", "email": "imac9@digg.com" }
];


class App extends React.Component {

  state = {
    contactos: contactos,
    form: {
      id: "",
      full_name: "",
      phone: "",
      datetime: "",
      street_address: "",
      email: "",
    },
    modalInstertar: false,
    modalEditar: false,
    modalEliminar: false,
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    })
  }

  /*Ventana de registro*/
  mostrarModalRegistrar = () => {
    this.setState({ modalInstertar: true });
  }

  cerrarModalRegistrar = () => {
    this.setState({ modalInstertar: false });
  }

  /*Ventana de edición*/
  mostrarModalEditar = (registro) => {
    this.setState({ modalEditar: true, form: registro });
  }

  cerrarModalEditar = () => {
    this.setState({ modalEditar: false });
  }

  /*Función insertar nuevo usuario*/
  insertarUsuario = () => {
    let nuevoValor = { ...this.state.form };
    nuevoValor.id = this.state.contactos.length + 1;
    let listado = this.state.contactos;
    listado.push(nuevoValor);
    this.setState({ contactos: listado, modalInstertar: false });
  }

  /*Función editar usuario*/
  editarUsuario = (dato) => {
    let contador = 0;
    let listado = this.state.contactos;
    listado.map((registro) => {
      if (dato.id == registro.id) {
        listado[contador].full_name = dato.full_name;
        listado[contador].phone = dato.phone;
        listado[contador].datetime = dato.datetime;
        listado[contador].street_address = dato.street_address;
        listado[contador].email = dato.email;
      }
      contador++;
    });
    this.setState({ contactos: listado, modalEditar: false });
  }

  /*Función eliminar usuario*/
  eliminarUsuario = (dato) => {
    let opcion = window.confirm("¿Deseas eliminar el registro? " + dato.id);
    if (opcion) {
      let contador = 0;
      let listado = this.state.contactos;
      listado.map((registro) => {
        if (registro.id == dato.id) {
          listado.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ contactos: listado });
    }
  }




  render() {
    return (
      <>
        <Container class="container">
          <div class="row d-flex justify-content-evenly m-5">
            <br />
            <button type="button" class="btn btn-primary col-3" onClick={() => this.mostrarModalRegistrar()}>Registrar nuevo usuario</button>
            <br /><br />
          </div>

          <table class="text-center table table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Fecha de Nacimiento</th>
                <th>Dirección</th>
                <th>Correo electrónico</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {this.state.contactos.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.full_name}</td>
                  <td>{elemento.phone}</td>
                  <td>{elemento.datetime}</td>
                  <td>{elemento.street_address}</td>
                  <td>{elemento.email}</td>
                  <td>
                    <button type="button" class="btn btn-warning" onClick={() => this.mostrarModalEditar(elemento)} >Editar</button>{"  "}
                    <button type="button" class="btn btn-danger" onClick={() => this.eliminarUsuario(elemento)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>

        <Modal isOpen={this.state.modalInstertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Usuario</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly value={this.state.contactos.length + 1} name="id" />
            </FormGroup>

            <FormGroup>
              <label>Nombre Completo:</label>
              <input className="form-control" name="full_name" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Teléfono:</label>
              <input className="form-control" name="phone" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Fecha de nacimiento:</label>
              <input className="form-control" name="datetime" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Dirección:</label>
              <input className="form-control" name="full-street_address" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Correo electrónico</label>
              <input className="form-control" name="email" onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <button type="button" class="btn btn-primary" onClick={() => this.insertarUsuario()} >Insertar</button>
            <button type="button" class="btn btn-danger" onClick={() => this.cerrarModalRegistrar()}>Cancelar</button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar Usuario</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly value={this.state.form.id} />
            </FormGroup>

            <FormGroup>
              <label>Nombre Completo:</label>
              <input className="form-control" name="full_name" onChange={this.handleChange} value={this.state.form.full_name} />
            </FormGroup>

            <FormGroup>
              <label>Teléfono:</label>
              <input className="form-control" name="phone" onChange={this.handleChange} value={this.state.form.phone} />
            </FormGroup>

            <FormGroup>
              <label>Fecha de nacimiento:</label>
              <input className="form-control" name="datetime" onChange={this.handleChange} value={this.state.form.datetime} />
            </FormGroup>

            <FormGroup>
              <label>Dirección:</label>
              <input className="form-control" name="street_address" onChange={this.handleChange} value={this.state.form.street_address} />
            </FormGroup>

            <FormGroup>
              <label>Correo electrónico</label>
              <input className="form-control" name="email" onChange={this.handleChange} value={this.state.form.email} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <button type="button" class="btn btn-primary" onClick={() => this.editarUsuario(this.state.form)} >Confirmar</button>
            <button type="button" class="btn btn-danger" onClick={() => this.cerrarModalEditar()} >Cancelar</button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            ¿Deseas eliminar el registro?
          </ModalBody>
          <ModalFooter>
            <button class="btn btn-danger">Sí</button>
            <button class="btn btn-danger">No</button>
          </ModalFooter>
        </Modal>

        <div class="container">
          <p class="row d-flex justify-content-end m-5 fs-6 fw-bolder text-center">Desarrollado en React Js <br/> Por: Juan David Lizarralde Niño <br/>Para BRM</p>
        </div>

      </>)
  }
}

export default App;