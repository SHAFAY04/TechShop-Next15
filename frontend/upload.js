// npm install @aws-sdk/client-s3

const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const fs = require('fs');

const s3Client = new S3Client({
  region: 'auto',
  endpoint: 'https://8aa6b560be1a84835b57f38d74ebfe67.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: '6f1cc883ea18f8c0498eaf6bf188c314',
    secretAccessKey: 'c4229cb1b44ba9a36623fe95b72280699267c00f32a6c91ba3b7aea4b984efbe',
  },
});

async function getAllFiles() {
  const allFiles = [];
  let continuationToken;

  console.log('Fetching files...');

  try {
    do {
      const command = new ListObjectsV2Command({
        Bucket: 'techstop',
        MaxKeys: 1000,
        ContinuationToken: continuationToken,
      });

      const response = await s3Client.send(command);
      
      if (response.Contents) {
        response.Contents.forEach(obj => {
          allFiles.push(obj.Key);
        });
        console.log(`Found ${allFiles.length} files so far...`);
      }

      continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
      
    } while (continuationToken);

    console.log(`\nTotal files: ${allFiles.length}`);
    
    fs.writeFileSync('files.txt', allFiles.join('\n'));
    console.log('✅ Saved to files.txt');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

getAllFiles();