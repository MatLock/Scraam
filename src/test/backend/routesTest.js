import request from "supertest"
import chai from "chai"
//const should = chai.should()

import Epic from "../../../src/backend/models/Epic"
import Milestone from "../../../src/backend/models/Milestone"
import Proyecto from "../../../src/backend/models/Proyecto"
import Tarea from "../../../src/backend/models/Tarea"
import app from "../../../src/backend/server.js"
import { setup } from "../backend/setUp"

const assert = chai.assert;


describe("test de las rutas de express (milestones y proyectos)", () => {

  setup();
  const mockData = {};

    beforeEach("Add mockdata to mockgoose", async() => {
      mockData.tarea = await new Tarea({ descripcion: "tarea"}).save()
      mockData.epic = await new Epic({ descripcion: "epic", tareas: [mockData.tarea] }).save()
      mockData.milestone = await new Milestone({ nombre: "milestone", epics: [mockData.epic] }).save()
      mockData.proyecto = await new Proyecto({ nombre: "proyecto" , milestones: mockData.milestone }).save()
    });


    describe("GET /proyectos", () => {

      it("debe retornar un proyecto con nombre 'proyecto'", async() => {
        const response = await request(app)
              .get("/proyectos")
              .expect(200)
        assert.equal(response.body.length,1);
        assert.equal(response.body[0].nombre,"proyecto");
        })
    })

    describe("GET /proyectos/:id", () => {

      it("debe retornar un proyecto dado un ID ", async() => {
        const response = await request(app)
              .get("/proyectos/"+mockData.proyecto._id)
              .expect(200)
        assert.isNotNull(response.body);
        assert.equal(response.body._id,mockData.proyecto._id);
        })

        it("debe retornar un proyecto con nombre:'proyecto' y un array de ids de milestones ", async() => {
          const response = await request(app)
                .get("/proyectos/"+mockData.proyecto._id)
                .expect(200)
          assert.isNotNull(response.body);
          assert.equal(response.body.nombre,'proyecto');
          assert.isNotNull(response.body.milestones);
          assert.equal(response.body.milestones[0].nombre,'milestone');
          })
    })

    describe("POST /proyectos", () => {

      it("dado un proyecto debe guardarlo y retornar un ID", async() => {
        const response = await request(app)
              .post("/proyectos",{nombre:'nuevoProyecto'})
              .expect(200)
        assert.isNotNull(response.body);
        })
    })

    describe("PUT /proyectos", () => {

      it("dado un proyecto debe agregar una milestone y retornar su ID", async() => {
        const response = await request(app)
              .put("/proyectos/"+mockData.proyecto._id,{nombre:'nuevaMilestone'})
              .expect(200)
        assert.isNotNull(response.body);
        })
    })



    describe("GET /milestones", () => {

      it("dado un ID de milestone debe retornar el mismo", async() => {
        const response = await request(app)
              .get("/milestones/"+mockData.milestone._id)
              .expect(200)
              assert.isNotNull(response.body);
              assert.equal(response.body.nombre,'milestone')
              assert.isNotNull(response.body.epics);
        })
    })

    describe("PUT /epic", () => {

      it("dado un ID de milestone  un nombre de epic debe agregar y debe retornar el ID del epic agregado", async() => {
        const response = await request(app)
              .put("/epic/"+mockData.milestone._id,{descripcion:'nueva tarea'})
              .expect(200)
              assert.isNotNull(response.body);
        })
    })


})
