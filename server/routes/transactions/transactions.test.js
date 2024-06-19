/* const request= require('supertest')
const app= require('../../app')
const {mongoConnect, mongoDisconnect}= require('../../services/mongo')

describe('Transactions API', ()=> {

    beforeAll(async()=> {
        await mongoConnect()
    })

    afterAll(async()=> {
        await mongoDisconnect()
    })
        
describe('Test GET /transactions', ()=> {
    test('It should respond with 200 success', async ()=> {
        const response= await request(app)
        .get('/transactions')
        .expect(200)
        .expect('Content-Type', /json/)
        
    })
})
describe('Test POST /transactions', ()=> {
    //Example objects as test data
    const completeTransactionData= {
        courseId: 5,
        courseName: 'Pole dance',
        status: 'Initiated'
    }

    const transactionDataWithoutStatus= {
        courseId: 5,
        courseName: 'Pole dance',

    }

    const transactionDataWithoutCourseId= {
        courseName: 'Pole dance',
        status: 'Initiated'
    }


    test('It should respond with 201 success,', async()=> {
        const response= await request(app)
            .post('/transactions')
            .send(completeTransactionData)
            .expect(201)
        
    })
    test('It should catch missing required properties', async ()=> {

        const response= await request(app)
            .post('/transactions')
            .send(transactionDataWithoutStatus)
            .expect(400)

        expect(response.body).toStrictEqual({
            error: 'Missing required properties'
        })
    })
    test('It should catch invalid dates', async()=> {
        const response= await request(app)
            .post('/transactions')
            .send(transactionDataWithoutCourseId)
            .expect(400)

        expect(response.body).toStrictEqual({
            error: 'Missing required properties'
        })
    })


})
})
 */