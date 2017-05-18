import "babel-polyfill"
import chai from "chai"
import mongoose from 'mongoose'

chai.should()


describe("comportamiento end to end de la aplicacion", () => {

  beforeEach(() => {
    mongoose.connect("mongodb://localhost/Scraaam", () => mongoose.connection.db.dropDatabase())
  });

  it("Debe crear un proyecto", async() => {
    browser.get("http://localhost:3001/#/")

    const proyectosOriginales = await element.all(by.css(".divider dropdown-divider")).count()
    proyectosOriginales.should.be.equal(0)

    element(by.buttonText("Proyecto...")).click()
    element(by.css(".dropdown-item")).click()
    element(by.css("input[formControlName=nombreProyecto]")).sendKeys("PROYECTO")
    element(by.buttonText("Aceptar")).click()


    element(by.binding("currentUser()")).getText().then(function(value) {
    			value.should.be.equal("pipo");
    			done();
    		})
    element.all(by.css(".divider dropdown-divider")).count()
          .then(function(total){
                  proyectosOriginales.should.be.equal(1)
                  done()})
  })

})
