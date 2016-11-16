export default function passthrough() {
  ['http', 'https'].forEach((protocol) => {
    ['demo-', ''].forEach((env) => {
        this.passthrough(`${protocol}://${env}api.ig.com/**`);
    });
  });
  ['demo-', '', 'live-'].forEach((env) => {
    this.passthrough(`https://${env}apd.marketdatasystems.com/lightstreamer/create_session.js`);
  });
  this.passthrough(`https://apd119b.marketdatasystems.com/lightstreamer/control.js`);
}
