import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: 'demo@boostnegocios.com' },
    update: {},
    create: {
      email: 'demo@boostnegocios.com',
      name: 'Demo User Premium',
      agents: '150',
      subscription: 'premium-active'
    }
  })
  console.log('Demo user PREMIUM 150 agentes criado!')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())

