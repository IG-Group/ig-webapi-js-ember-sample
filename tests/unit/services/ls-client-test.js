/* jshint expr:true */
/*global Lightstreamer:true */
import {
  expect
} from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import createLs from '../../helpers/create-ls';
import sinon from 'sinon';

describeModule(
  'service:ls-client',
  'LsClientService', {},
  function() {
    const session = {
      session: {
        content: {
          authenticated: {
            api: 'demo',
            lsEndPoint: 'demo',
            cstToken: 'mockCst',
            ssoToken: 'mockSso'
          }
        }
      }
    };

    it('grabs lsClient', function() {
      let service = this.subject();
      service.lsClient = 'got me';
      expect(service.getLsClient()).to.be.equal('got me');
    });

    it('creates a lsClient object', function() {
      let service = this.subject();
      service.session = session;

      Lightstreamer = createLs();
      service.connectToLs();
      expect(service.lsClient.id).to.equal(Lightstreamer.LightstreamerClient().id);
    });

    it('logs when listener starts', sinon.test(function() {
      let service = this.subject();
      sinon.spy(console, 'log');

      service.onListenStart();
      expect(console.log).to.be.called;
      console.log.restore();
    }));

    it('logs a status change', sinon.test(function() {
      let service = this.subject();
      sinon.spy(console, 'log');

      service.onStatusChange('Streaming');
      expect(console.log).to.be.called;
      console.log.restore();
    }));
  }
);
