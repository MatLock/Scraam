import mongoose from "mongoose"
import mockgoose from "mockgoose"


export function setup() {

	before("Mock mongoose", async() => {
		await mockgoose(mongoose)
		mongoose.connect(process.env.MONGO_TEST || 'mongodb://localhost/Scraaam-test')
	})

	after("Restore mongoose", done => {
  	mongoose.unmock(done);
	})

	afterEach("Reset mock mongo database", done => {
	  mockgoose.reset(done);
	})
}
