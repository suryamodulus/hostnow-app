const fastify = require('fastify')({ logger: false })
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Declare a route
fastify.get('/sites/check', async (request, reply) => {
    const { domain } = request.query
    const site = await prisma.site.findUnique({
        where: { hostname: domain }
    })
    if(site){
        return reply.code(200).send()
    }
    else{
        return reply.code(404).send()
    }
})

fastify.post('/sites/add', async (request, reply) => {
    return { sucess: true }
})

fastify.put('/sites/update', async (request, reply) => {
    return { sucess: true }
})

fastify.delete('/sites/remove', async (request, reply) => {
    return { sucess: true }
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