import AdmZip from 'adm-zip';

async function globalSetup(c) {
  var zip = new AdmZip();
  zip.addLocalFolder('./playwright-report');
  zip.writeZip('./report.zip');

  // TODO
  // 1. Send test result to webhook
  // 2. upload report.zip to s3 or google drive
  // 3. Send email with link to report.zip
}
export default globalSetup;
