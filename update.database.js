import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not set in the environment variables.');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function setupAdminUser() {
  try {
    // Check if a super_admin already exists
    const existingAdmin = await sql`SELECT id FROM users WHERE role = 'super_admin' LIMIT 1`;

    if (existingAdmin.length > 0) {
      console.log('Super admin user already exists. Skipping creation.');
      return;
    }

    const hashedPassword = await bcrypt.hash('Peter@2023', 10); // Hash the password
    const adminId = uuidv4();
    const merchantId = uuidv4(); // Generate a dummy merchant ID for the admin

    // First, ensure a merchant exists for the admin user
    // This is a simplified approach; in a real app, merchant creation would be more robust.
    await sql`
      INSERT INTO merchants (id, legal_name, trading_name, registration_number, tin, country, status, kyc_status, support_email, support_phone, monthly_volume, monthly_volume_currency, created_at)
      VALUES (${merchantId}, 'Admin Merchant', 'Admin Merchant', 'REG12345', 'TIN12345', 'TZ', 'active', 'verified', 'admin@peterpay.com', '+255712345678', 0.00, 'TZS', NOW())
      ON CONFLICT (id) DO NOTHING;
    `;

    await sql`
      INSERT INTO users (id, email, first_name, last_name, role, merchant_id, two_factor_enabled, created_at, last_login_at)
      VALUES (${adminId}, 'admin@peterpay.com', 'Peter', 'Joram', 'super_admin', ${merchantId}, FALSE, NOW(), NOW())
    `;

    console.log('Super admin user created successfully with email: admin@peterpay.com and password: Peter@2023');
  } catch (error) {
    console.error('Error setting up admin user:', error);
  }
}

async function main() {
  console.log('Starting database update and admin setup...');
  await setupAdminUser();
  console.log('Database update and admin setup complete.');
  process.exit(0);
}

main();
