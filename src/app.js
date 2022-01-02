const fastify = require('fastify')({ logger: true })
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Declare a route
fastify.get('/sites/check', async (request, reply) => {
    const { domain } = request.query
    const site = await prisma.site.findUnique({
        where: { hostname: domain }
    })
    if(!site){
        return reply.code(404).send()
    }
    return reply.code(200).send()
})

fastify.get('/sites/list', async (request, reply) => {
    const sites = await prisma.site.findMany({})
    return reply.code(200).send({
        statusCode: 200,
        message: 'All Sites',
        data: {
            sites
        }
    })
})

fastify.post('/sites/add', async (request, reply) => {
    const { hostname, email } = request.body
    const existingSite = await prisma.site.findUnique({
        where: { hostname }
    })
    if(existingSite){
        return reply.code(400).send({
            statusCode: 400,
            message: 'Site Already Exists',
            error: 'Bad Request'
        })
    }
    const newSite = await prisma.site.create({
        data: {
            hostname,
            email,
            delete_key: uuidv4()
        }
    })
    return reply.code(200).send({
        statusCode: 200,
        message: 'New Site Created',
        data: {
            site: newSite
        }
    }) 
})

fastify.patch('/sites/update/:id', async (request, reply) => {
    return { success: true }
})

fastify.delete('/sites/remove', async (request, reply) => {
    const { delete_key } = request.query
    const site = await prisma.site.findFirst({
        where: { delete_key },
    })
    if(!site){
        return reply.code(404).send({
            statusCode: 404,
            message: 'Site Not Found',
            error: 'Not Found'
        })
    }
    await prisma.site.delete({
        where: { id: site.id },
    })
    return reply.code(200).send({
        statusCode: 200,
        message: 'Deleted Site',
    })
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(4000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()