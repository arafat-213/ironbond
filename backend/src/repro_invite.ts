import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testInvitation() {
  console.log("Starting invitation test...");

  // 1. Create User A (Inviter)
  const userA = await prisma.user.create({
    data: {
      email: `userA_${Date.now()}@example.com`,
      name: "User A",
      inviteCode: `INVITE_${Date.now()}`
    }
  });
  console.log(`Created User A with invite code: ${userA.inviteCode}`);

  // 2. Create User B (Invitee)
  const userB = await prisma.user.create({
    data: {
      email: `userB_${Date.now()}@example.com`,
      name: "User B"
    }
  });
  console.log(`Created User B with ID: ${userB.id}`);

  // 3. Simulate calling the /accept endpoint logic
  const inviteCode = userA.inviteCode;
  const userId = userB.id;

  const partner = await prisma.user.findUnique({ where: { inviteCode } });
  if (!partner || partner.duoId) {
    throw new Error("Invalid invite");
  }

  const currentUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!currentUser || currentUser.duoId) {
    throw new Error("User already in a duo");
  }

  const newDuo = await prisma.duo.create({
    data: {
      users: { connect: [{ id: userId }, { id: partner.id }] }
    }
  });

  console.log("Duo created successfully:", newDuo);

  // 4. Verify linking
  const updatedUserA = await prisma.user.findUnique({ where: { id: userA.id } });
  const updatedUserB = await prisma.user.findUnique({ where: { id: userB.id } });

  if (updatedUserA?.duoId === updatedUserB?.duoId && updatedUserA?.duoId === newDuo.id) {
    console.log("Verification successful: Both users are in the same duo.");
  } else {
    console.log("Verification failed: Users are not linked correctly.");
  }
}

// Note: This script requires a running database as configured in .env
// To run: npx ts-node src/repro_invite.ts
if (require.main === module) {
  testInvitation()
    .catch(e => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
