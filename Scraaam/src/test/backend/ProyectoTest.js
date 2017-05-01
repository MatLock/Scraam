import Milestone from '../../backend/models/Milestone'
import Proyecto from '../../backend/models/Proyecto'

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
