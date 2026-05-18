import { connect, connection, disconnect } from 'mongoose';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { info, error as _error } from '../config/logger.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/testflow';

async function backup() {
  try {
    await connect(MONGODB_URI);
    info('Connected to MongoDB for backup');

    const backupDir = join(__dirname, '../backups');
    if (!existsSync(backupDir)) {
      mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = join(backupDir, `backup-${timestamp}.json`);

    const collections = await connection.db.listCollections().toArray();
    const backupData = {};

    for (const coll of collections) {
      const data = await connection.db.collection(coll.name).find({}).toArray();
      backupData[coll.name] = data;
      info(`Backed up ${data.length} documents from ${coll.name}`);
    }

    writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
    info(`Backup saved to ${backupFile}`);

    await disconnect();
    process.exit(0);
  } catch (error) {
    _error('Backup failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  backup();
}

export default backup;