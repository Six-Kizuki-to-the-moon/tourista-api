import { Storage } from '@google-cloud/storage';

const serviceKey = 'tourista-gcs.json';
const projectId = 'tourista-apps';

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: projectId,
});

export default storage;