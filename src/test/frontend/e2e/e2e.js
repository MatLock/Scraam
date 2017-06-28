import "babel-polyfill"
import chai from "chai"
import mongoose from 'mongoose'

import Proyecto from '../../../backend/models/Proyecto'

chai.should()
const mongo = process.env.MONGO || "mongodb://localhost/Scraaam";
const server = process.env.SERVER || "http://localhost:3001/";

describe("comportamiento end to end de la aplicacion => ",() => {

  after(() => {
    mongoose.connect(mongo,{db:{safe:false}}, (err) =>{
      if(err){
        console.log(err);
      }
      mongoose.connection.db.dropDatabase()
    });
  })

/*
  beforeEach(() =>{
    browser.driver.manage().window().setSize(1280,1024);
    browser.get("http://localhost:3001/#/")
  })*/

  it("Debe crear un proyecto", async() => {
    browser.driver.manage().window().setSize(1280,1024);
    browser.get(server)

    const proyectosOriginales = await element.all(by.css(".proyecto")).count()
    proyectosOriginales.should.be.equal(0)

    await element(by.id("altaProyecto")).click()
    await element(by.css(".dropdown-item")).click()
    await element(by.id("nombreProyecto")).sendKeys("PROYECTO")
    await element(by.buttonText("Aceptar")).click()

    let proyectosTotales = await element.all(by.css(".proyecto")).count();
    proyectosTotales.should.be.equal(1);
  });

  it("Debe crear una milestone", async () =>{

      await element(by.id("altaProyecto")).click()
      await element.all(by.css(".dropdown-item")).first().click()
      await element(by.id("nuevoMilestone")).sendKeys("NUEVO MILESTONE")
      await element(by.id("crearMilestoneButton")).click();
      let milestones = await element.all(by.css(".milestone")).count();
      milestones.should.be.equal(1);
  });

  it("Debe crear una Epic", async () =>{

      await element.all(by.css(".milestone")).first().click()
      await element(by.id("nuevaEpic")).sendKeys("NUEVO EPIC")
      await element(by.id("nuevaEpicButton")).click()
      let epics = await element.all(by.css(".epic")).count();
      epics.should.be.equal(1);
  });

  it("Debe crear una Tarea", async () =>{

      await element.all(by.css(".epic")).first().click()
      await element(by.id("nuevaTareaInput")).sendKeys("NUEVO Tarea")
      await element(by.id("nuevaTareaButton")).click()
      let tareas = await element.all(by.css(".tarea")).count();
      tareas.should.be.equal(1);
  });

})
