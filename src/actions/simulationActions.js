import * as Rx from "rx";

class Action {
  static create(name): Rx.Subject {
    var log = (type, data) => console.log("ACTION Event", { name: name, type: type, data: data });
    var subject = new Rx.Subject();
    var observer = Rx.Observer.create(
      param => { log('onNext', param);  subject.onNext(param); },
      error => { log('onError', error); subject.onError(error); },
      () => { log('onCompleted');    subject.onCompleted(); }
    );
    var observable = subject.share();
    return Rx.Subject.create(observer, observable);
  }
}


export default {
  choosePoint: Action.create("choosePoint")
};