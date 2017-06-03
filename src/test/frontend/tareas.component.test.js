/*import chai from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"

chai.should()
chai.use(sinonChai)

import { Component } from "@angular/core"
import { ActivatedRoute, ROUTER_DIRECTIVES, Router, RouteParams } from "@angular/router"
import { By } from "@angular/platform-browser"
//import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
//import { TareasComponent} from '../../frontend/app/components/tareas.component'

import Service from '../../frontend/app/services/services';

const assert = chai.assert;

//Mock para mcoker NewPostComponent que no quiero probar
@Component({ selector: "nuevaTarea", template: "" })
class nuevaTareaFake {}

describe("TareasComponent", () => {

  let fixture;

  beforeEach(() => {
    const fakeMilestone = {
      nombre:'fakeMilestone',
      epics:[ { tareas: [{ "_id": "id0",
                           "descripcion": "descripcion fake uno"
                          },
                          {
                            "_id": "id1",
                            "title": "descripcion fake dos"
                          }]
               }
             ]
    }

    const fakeService ={

    }

    TestBed.configureTestingModule({
      declarations: [
        nuevaTareaFake
      ],
      imports: [RouterTestingModule],
      inputs: [fakeMilestone],
      providers: [{
        provide: Service,
        useValue: fakeService
      }]
    });

    fixture = TestBed.createComponent(TareasComponent);
  })


  it("post list should contain two posts inside", () => {
    //fixture.detectChanges();
    assert.equal(0,0);
    //const postElements = fixture.debugElement.queryAll(By.css("post"))
    //postElements.should.have.lengthOf(2)
  })
/*
  it("when new element is added to the service it should be rendered", () => {
    const postServiceQueEstaUsandoAngular = TestBed.get(PostService)
    postServiceQueEstaUsandoAngular.posts.push({
      "_id": "id3",
      "title": "Some title",
      "body": "Some body",
      "author": "Some author",
      "upvotes": 10
    })
    fixture.detectChanges();

    const postElements = fixture.debugElement.queryAll(By.css("post"))
    postElements.should.have.lengthOf(3)
  })

  it("when user click on any post it should navigate", () => {
    const router = TestBed.get(Router)
    sinon.stub(router, "navigateByUrl")

    fixture.detectChanges();

    const postElements = fixture.debugElement.queryAll(By.css("post"))
    postElements[0].triggerEventHandler("click", { button: 0 })

    router.navigateByUrl.should.have.been.called.once
    router.navigateByUrl.firstCall.args[0].toString().should.be.equal("/noticia/id0")
  })

  afterEach(() => {
    const router = TestBed.get(Router)
    router.navigateByUrl.restore && router.navigateByUrl.restore()
  });

})*/
