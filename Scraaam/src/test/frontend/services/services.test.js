import chai from "chai"
import sinon from "sinon"

import { Http } from '@angular/http';
import Service  from "../../../frontend/app/services/services"

const should = chai.should()
const assert = chai.assert;

describe("Angular services", () => {

  let service;

  beforeEach(async() => {
     const http = sinon.createStubInstance(Http)

     http.get.withArgs("/proyectos").callsFake(() => createResponse([{
       _id: 1,
       nombre: "Proyecto #1"
     }, {
       _id: 2,
        nombre: "Proyecto #2"
     }]));

     http.get.withArgs("/proyectos/1").callsFake(() => createResponse({
       _id: 1,
       nombre: "Proyecto #1",
       milestones: []
     }));

    http.get.withArgs("/milestones/1").callsFake(() => createResponse({
      _id:1,
      nombre: 'Milestone #1',
      epics:[]
    }));

    service = new Service(http)
    await http.get("/proyectos").toPromise()
  })

  describe("/proyectos", () => {
    it("debe retornar todos los proyectos del servidor", () => {
      service.proyectos.should.have.lengthOf(2)
      service.proyectos[0].should.have.property("_id").that.equal(1)
      service.proyectos[1].should.have.property("_id").that.equal(2)

      service.proyectos[0].should.have.property("nombre").equal("Proyecto #1")
      service.proyectos[1].should.have.property("nombre").equal("Proyecto #2")
    });
  });

  describe("verProyecto(id)", () => {
    it("debe retornar el proyecto con el id que se pasa por parametro", async() => {
      const proyecto = await service.verProyecto(1)

      proyecto.should.have.property("_id").equal(1)
      proyecto.should.have.property("nombre").equal("Proyecto #1")
      proyecto.should.have.property("milestones").that.has.lengthOf(0)

    });
  });

  describe("obtenerDetallesDe(milestone)", () => {
    it("debe agregar la milestone al proyecto", async() => {
      let milestone = await service.obtenerDetallesDe({_id:1})
                                .then(data => milestone=data.json());
      milestone.should.have.property("_id").equal(1);
      milestone.should.have.property("nombre").equal("Milestone #1");
    });
  })





})

function createResponse(data) {
  return {
    toPromise() {
      return Promise.resolve({
        json() {
          return data;
        }
      })
    }
  }
}
