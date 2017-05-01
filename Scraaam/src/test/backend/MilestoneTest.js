import Milestone from '../../backend/models/Milestone'
import Epic from '../../backend/models/Epic'

import chai from "chai";
const assert = chai.assert;

describe("Comportamiento de la clase Milestone", () =>{

  context ("Metodos basicos de la clase",() => {

    //const epic = new Epic({descripcion:'descripcion',comentarios:[],tareas:[]});
    const ml = new Milestone({nombre:'milestone',epics:[]});

    it("El objeto debe tener nombre 'milestone' al construirse", () => {
      assert.isNotNull(ml);
		  assert.strictEqual(ml.nombre,'milestone');
  	});

    it("El objeto debe crear una Epic y retornarla", () => {
      const epic = ml.crearEpic('nueva Epic');
      assert.equal(epic.descripcion,'nueva Epic');
    });

  });
});
