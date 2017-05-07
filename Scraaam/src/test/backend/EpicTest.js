import chai from "chai";

import Tarea from '../../backend/models/Tarea'
import Epic from '../../backend/models/Epic'
import { setup } from "../backend/setUp"

const assert = chai.assert;

describe("Comportamiento de la clase Tarea", () =>{

  context ("Metodos basicos de la clase",() => {

    const epic = new Epic({descripcion:'descripcion',comentarios:[],tareas:[]});
    const tarea = {descripcion:'tarea'};

    it("El objeto debe tener una descripcion al construirse", () => {
      assert.isNotNull(epic);
		  assert.strictEqual(epic.descripcion,'descripcion');
  	});

    it("El objeto debe crear agregar un comentario", () => {
      assert.equal(epic.comentarios.length,0);
      epic.agregarComentario('nuevo comentario');
      assert.equal(epic.comentarios.length,1);
    });


    it("El objeto debe crear una tarea,agregarla y retornarla", () => {
      assert.equal(epic.tareas.length,0);
      let t = epic.agregarTarea(tarea);
      assert.equal(epic.tareas.length,1);
      assert.isNotNull(t);
    });

  });
});

describe('Persistencia de la clase Epic',() =>{

  setup();
  context ("Persistencia",() => {

    const epic = new Epic({descripcion:'descripcion',comentarios:[],tareas:[]});

    it('Test de la persistencia de una Epic',async()=>{
        await epic.save();
        assert.isNotNull(epic._id);
        assert.isNotNull(epic.comentarios);
        assert.isNotNull(epic.tareas);
    });

  });

});
