import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    // Check if Session table exists by trying to query it
    const result = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'Session'
    `;
    
    console.log('Session table exists:', result.length > 0);
    
    // List all tables
    const allTables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    console.log('\nAll tables in database:');
    allTables.forEach(table => {
      console.log('  -', table.table_name);
    });
    
    // Check _prisma_migrations table
    const migrations = await prisma.$queryRaw`
      SELECT migration_name, applied_steps_count, finished_at, rolled_back_at
      FROM _prisma_migrations
      ORDER BY started_at
    `;
    
    console.log('\nApplied migrations:');
    migrations.forEach(m => {
      console.log(`  - ${m.migration_name} (applied: ${m.finished_at ? 'Yes' : 'No'}, rolled_back: ${m.rolled_back_at ? 'Yes' : 'No'})`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();

