import Milestone from '../../backend/models/Milestone'
import Epic from '../../backend/models/Epic'
import { setup } from "../backend/setUp"

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

describe('Persistencia de la clase Milestone',() =>{

  setup();
  context ("Persistencia",() => {

    const milestone = new Milestone({nombre:'Milestone',epics:[]});

    it('Test de la persistencia de una Milestone',async()=>{
        await milestone.save();
        assert.isNotNull(milestone._id);
        assert.isNotNull(milestone.epics);
    });

  });

});
