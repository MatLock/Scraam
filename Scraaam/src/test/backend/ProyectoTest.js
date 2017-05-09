import Milestone from '../../backend/models/Milestone'
import Proyecto from '../../backend/models/Proyecto'
import { setup } from "../backend/setUp"

import chai from "chai";
const assert = chai.assert;

describe("Comportamiento de la clase Proyecto", () =>{

  context ("Metodos basicos de la clase",() => {

    const pr = new Proyecto({nombre:'test',milestones:[]});
    const ml = new Milestone({nombre:'milestone',epics:[]});

    it("El objeto debe tener nombre 'test' al construirse", () => {
      assert.isNotNull(pr);
		  assert.strictEqual(pr.nombre,'test');
  	});

    it("El objeto debe agregar una milestone", () => {
      assert.equal(pr.milestones.length,0);
      pr.agregarMilestone(ml);
      assert.equal(pr.milestones.length,1);
    });

  });
});

describe('Persistencia de la clase Proyecto',() =>{

  setup();
  context ("Persistencia",() => {

    const proyecto = new Proyecto({nombre:'Proyecto',milestones:[]});

    it('Test de la persistencia de un Proyecto',async()=>{
        await proyecto.save();
        assert.isNotNull(proyecto._id);
        assert.isNotNull(proyecto.milestones);
    });

  });

});
