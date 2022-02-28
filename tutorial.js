window.onload = () => {
  // #region RxJs imports
  const Rx = rxjs;
  const {
    Observable,
    Subject,
    ReplaySubject,
    BehaviorSubject
  } = rxjs;
  const {
    buffer,
    bufferCount,
    bufferTime,
    combineLatest,
    concat,
    connect,
    count,
    debounce,
    debounceTime,
    delay,
    distinct,
    distinctUntilChanged,
    filter,
    flatMap,
    forkJoin,
    map,
    max,
    merge,
    min,
    pairwise,
    publish,
    reduce,
    refCount,
    skip,
    switchMap,
    take,
    takeWhile,
    tap,
    throttle,
    throttleTime,
  } = rxjs.operators;
  const {
    DrawingSymbol
  } = RxJsVisualizer;
  const {
    draw
  } = RxJsVisualizer.operators;
  // #endregion


  // #region ------------------------------------------------------------------ global observers
  const observer = {
    next: value => console.log(`next: ${value}`),
    error: error => console.error(error),
    complete: () => console.log('Completed')
  };
  const observer2 = {
    next: value => console.log(`next Observer2: ${value}`),
    error: error => console.error(error),
    complete: () => console.log('Completed Observer2')
  };
  // #endregion

  // #region ------------------------------------------------------------------ creation

  function btnArray() {
    const array = [11, 22, 33];
    const observable = Rx.from(array);
    observable.subscribe(RxJsVisualizer.observerForLine(1));
  }

  function btnValues() {
    RxJsVisualizer.prepareCanvas([`Val`]);
    Rx.of(11, 22, 33)
      .subscribe(RxJsVisualizer.observerForLine(0));
  }
  function btnRange() {
    RxJsVisualizer.prepareCanvas([`Val`]);
    Rx.range(5, 3)
      .subscribe(RxJsVisualizer.observerForLine(0))
  }
  function btnInterval() {
    RxJsVisualizer.prepareCanvas([`Val`]);
    Rx.interval(1000)
      .subscribe(RxJsVisualizer.observerForLine(0));
  }

  function btnTimer() {
    RxJsVisualizer.prepareCanvas([`Val`]);
    Rx.timer(1000, 2000)
      .pipe(take(3))
      .subscribe(RxJsVisualizer.observerForLine(0));
  }

  function btnHttp() {
    const getUsers = fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => response.json());
    Rx.from(getUsers)
      .pipe(draw(0, 'http', true, x => JSON.stringify(x).substr(0, 35)))
      .subscribe(x => console.log(JSON.stringify(x)));
  }
  // #endregion

  // #region ------------------------------------------------------------------ events
  function btnEvent() {
    RxJsVisualizer.prepareCanvas([`Event`]);
    const btnProduce = document.querySelector('#btnClick');
    Rx.fromEvent(btnProduce, 'click')
      .subscribe(RxJsVisualizer.observerForLine(0));
  }
  // #endregion

  // #region ------------------------------------------------------------------ Subject
  function btnCreate() {
    const subscription = Observable.create(obs => {
      obs.next('Started');
      btnNext.onclick = ev => obs.next(ev);
      btnError.onclick = _ => obs.error('Error');
      btnComplete.onclick = _ => obs.complete();

    }).subscribe(RxJsVisualizer.observerForLine(0));
  }

  function getObservable() {

  }

  function btnSubjectBestPractice() {

  }

  function btnBehaviorSubject() {

  }

  function btnReplaySubject() {

  }

  function btnReplay() {


  }
  // #endregion

  // #region ------------------------------------------------------------------ operators
  function btnFilter() {
    RxJsVisualizer.prepareCanvas(['values', 'even']);
    const obs = RxJsVisualizer.createStreamFromArraySequence([10, 11, 12, 13, 14]);
    obs.subscribe(RxJsVisualizer.observerForLine(0, '', true));
    obs.pipe(filter(x => x % 2 === 0))
      .subscribe(RxJsVisualizer.observerForLine(1, 'even', true));
  }

  function btnMap() {
    RxJsVisualizer.prepareCanvas(['values', 'times10']);
    RxJsVisualizer.createStreamFromArraySequence([10, 11, 12, 13, 14])
      .pipe(draw(0, '', true),
        map(x => x * 10))
      .subscribe(RxJsVisualizer.observerForLine(1, '*10', true));
  }

  function btnTake() {
    const obs = RxJsVisualizer.createStreamFromArraySequence([10, 11, 12, 13, 14]);
    obs.subscribe(RxJsVisualizer.observerForLine(0));
    obs.pipe(skip(1), take(2))
      .subscribe(RxJsVisualizer.observerForLine(1));
  }

  function btnDistinct() {
    RxJsVisualizer.createStreamFromArraySequence([1, 1, 1, 2, 3, 3, 3, 2, 2, 3, 1, 1], 500, 1000)
      .pipe(draw(0), distinct())
      .subscribe(RxJsVisualizer.observerForLine(1));
  }

  function btnDistinctUntilChanged() {
    RxJsVisualizer.createStreamFromArraySequence([1, 1, 1, 2, 3, 3, 3, 2, 2, 3, 1, 1], 500, 1000)
      .pipe(draw(0), distinctUntilChanged())
      .subscribe(RxJsVisualizer.observerForLine(1));
  }

  function btnMax() {
    const observable = Rx.of(5, 12, 4)
    observable.pipe(max()).subscribe(x => console.log(`max=${x}`));
    observable.pipe(min()).subscribe(x => console.log(`max=${x}`));
    observable.pipe(count()).subscribe(x => console.log(`max=${x}`));
  }

  function btnCombined() {
    RxJsVisualizer.prepareCanvas(['names', 'nr distinct']);
    RxJsVisualizer.createStreamFromArraySequence([
      'Franz Müller',
      'Udo Lehner',
      'Franz Huber',
      'Susi Humer',
      'Tom Kiesl'
    ])
      .pipe(
        draw(0),
        filter(x => x.endsWith('er')),
        map(x => x.split(' ')),
        map(x => x[0]),
        distinct(),
        count()
      )
      .subscribe(RxJsVisualizer.observerForLine(1, 'distinct', true));
  }

  function btnOwn() {
    Rx.of(
      'Franz Müller',
      'Udo Lehner',
      'Franz Huber',
      'Susi Humer',
      'Tom Kiesl')
      .pipe(
        myOperator(3)
      )
      .subscribe(observer);
  }
  function myOperator() {
    return srcObservale => {
      return new Observable(subscriber => {
        srcObservale.subscribe(
          data => {
            const items = data.split(' ');
            const first = items[0];
            const last = items[1].toUpperCase();
            if (first.length > 3) {
              subscriber.next(`${last} ${first.substr(0, 3)}.`);
            }
          },
          err => subscriber.error(err),
          () => subscriber.complete()
        )
      })
    }
  }
  function myOperator(nrChars) {
    return srcObservale => {
      return new Observable(subscriber => {
        srcObservale.subscribe(
          data => {
            const items = data.split(' ');
            const first = items[0];
            const last = items[1].toUpperCase();
            if (first.length > 3) {
              subscriber.next(`${last} ${first.substr(0, nrChars)}.`);
            }
          },
          err => subscriber.error(err),
          () => subscriber.complete()
        )
      })
    }
  }

  // #endregion

  // #region ------------------------------------------------------------------ hot/cold
  function btnParallel() {

  }

  function btnDelayed() {

  }

  function btnPublishConnect() {

  }

  function btnPublishRefcount() {


  }

  function btnHotHttp() {

  }
  // #endregion

  // #region ------------------------------------------------------------------ combinations
  function btnDebounce() {
    const txtInput = document.querySelector('#txtInput');
    Rx.fromEvent(txtInput, 'keyup')
      .pipe(
        map(x => x.currentTarget.value),
        draw(0, 'enter'),
        debounceTime(1000)
      )
      .subscribe(RxJsVisualizer.observerForLine(1, '---->'));
  }

  function btnThrottle() {
    const txtInput = document.querySelector('#txtInput');
    Rx.fromEvent(txtInput, 'keyup')
      .pipe(
        map(x => x.currentTarget.value),
        draw(0, 'enter'),
        throttleTime(1000)
      )
      .subscribe(RxJsVisualizer.observerForLine(1, '---->'));
  }

  function btnBuffer() {
    Rx.interval(600).pipe(take(8))
      .pipe(
        draw(0),
        buffer(Rx.fromEvent(document.querySelector('#btnCollect'), 'click'))
      )
      .subscribe(RxJsVisualizer.observerForLine(1));
  }

  function btnCombineLatest() {
    RxJsVisualizer.prepareCanvas(['A', 'B', 'combined']);
    const items = ['a', 'b', 'c', 'd']
    const timerA = Rx.timer(1000, 1000).pipe(take(3));
    const timerB = Rx.timer(1500, 2000).pipe(map(x => items[x]), take(3));
    timerA.subscribe(RxJsVisualizer.observerForLine(0, 'timerA', true));
    timerB.subscribe(RxJsVisualizer.observerForLine(1, 'timerB', true));
    Rx.combineLatest(timerA, timerB, (a, b) => `${a}+${b}=${a + b}`)
      .subscribe(RxJsVisualizer.observerForLine(2, 'combined', true));
  }

  function btnPairwise() {
    RxJsVisualizer.prepareCanvas(['values', 'pairwise']);
    RxJsVisualizer.createStreamFromArraySequence([1, 3, 5, 7], 1500, 2000)
      .pipe(
        draw(0, 'values'),
        pairwise())
      .subscribe(RxJsVisualizer.observerForLine(1, 'pairwise'));
  }

  function btnConcat() {
    const valuesA = RxJsVisualizer.createStreamFromArraySequence([1, 2, 3], 600, 600)
      .pipe(delay(1500));
    const valuesB = RxJsVisualizer.createStreamFromArraySequence([4, 5, 6], 600, 600);
    valuesA.subscribe(RxJsVisualizer.observerForLine(0, 'A'));
    valuesB.subscribe(RxJsVisualizer.observerForLine(1, 'B'));
    Rx.concat(valuesB, valuesA).subscribe(RxJsVisualizer.observerForLine(2, 'concat'));
  }

  function btnMerge() {
    RxJsVisualizer.prepareCanvas(['A', 'B', 'merge']);

    const valuesA = RxJsVisualizer.createStreamFromArraySequence([1, 2, 3])
    const valuesB = RxJsVisualizer.createStreamFromArraySequence([4, 5, 6])
    valuesA.subscribe(RxJsVisualizer.observerForLine(0, 'A'));
    valuesB.subscribe(RxJsVisualizer.observerForLine(1, 'B'));
    Rx.merge(valuesA, valuesB).subscribe(RxJsVisualizer.observerForLine(2, 'merge'));
  }

  function btnZip() {
    RxJsVisualizer.prepareCanvas(['color','shape','zipped']);
    const obsColors = RxJsVisualizer.createStreamFromArrayRandom(colors, RxJsVisualizer.rnd(3,6));
    const obsLogos = RxJsVisualizer.createStreamFromArrayRandom(shapes, RxJsVisualizer.rnd(3,6));
    obsColors.subscribe(RxJsVisualizer.observerForLine(0, 'color'));
    obsLogos.subscribe(RxJsVisualizer.observerForLine(1, 'shape'));
    Rx.zip(obsColors, obsLogos, (color, logo) => `${color}-${logo}`)
      .subscribe(RxJsVisualizer.observerForLine(2, 'zipped'));
  }

  function btnForkJoin() {

  }

  function requestHttp(resource, id, prop, lineNr, offset) {

  }

  function btnForkJoinHttp() {

  }

  function btnFlatMap() {

  }

  function btnSwitchMap() {

  }

  function btnFlatMapHttp() {

  }
  // #endregion

  // #region ------------------------------------------------------------------ http simulators
  function readUserByName(username, delay = 300) {
    console.log(`readUserByName ${username} with delay ${delay}ms`);
    return Rx.timer(delay)
      .pipe(
        map(_ => {
          if (username === 'hhuber') {
            return {
              username,
              userId: 1,
              firstname: 'Hansi',
              lastname: 'Huber'
            };
          }
          if (username === 'sberger') {
            return {
              username,
              userId: 2,
              firstname: 'Susi',
              lastname: 'Berger'
            };
          }
          if (username === 'fmueller') {
            return {
              username,
              userId: 3,
              firstname: 'Fritzi',
              lastname: 'Müller'
            };
          }
          return {
            username,
            userId: -1
          };
        })
      );

  }

  function readOrdersOfUser(userId, delay = 500) {
    console.log(`readOrdersOfUser ${userId} with delay ${delay}ms`);
    return Rx.timer(delay)
      .pipe(
        map(_ => [{
          orderId: 1001,
          userId,
          customer: 'ALFKI',
          orderDate: new Date(2019, 2, 21)
        }, {
          orderId: 1002,
          userId,
          customer: 'BOTTM',
          orderDate: new Date(2019, 2, 8)
        }, {
          orderId: 1003,
          userId,
          customer: 'CACTU',
          orderDate: new Date(2019, 2, 12)
        }])
      );
  }

  function readOrderDetailsOfOrder(orderId, delay = 500) {
    console.log(`readOrderDetailsOfOrder ${orderId} with delay ${delay}ms`);
    return Rx.timer(delay)
      .pipe(
        map(_ => [{
          id: 10001,
          orderId,
          product: 'Chai',
          amount: 4
        }, {
          id: 10002,
          orderId,
          product: 'Tofu',
          amount: 10
        }, {
          id: 10003,
          orderId,
          product: 'Ikura',
          amount: 2
        }])
      );
  }
  // #endregion

  // #region ------------------------------------------------------------------ best practices
  function btnBestSequence() {

  }

  function btnBestSequenceWithTap() {

  }

  function btnBestWaitForAll() {

  }
  // #endregion

  // #region ------------------------------------------------------------------ initialize
  const symbols = {};
  symbols['[object MouseEvent]'] = new DrawingSymbol({
    imageUrl: 'images/flash.png'
  });
  const colors = ['white', 'black', 'red', 'blue', 'green', 'cyan', 'violet'];
  const shapes = ['square', 'triangle', 'diamond', 'cross'];
  colors.forEach(x => symbols[x] = new DrawingSymbol({
    text: x,
    color: x
  }));
  shapes.forEach(x => symbols[x] = new DrawingSymbol({
    color: 'black',
    shape: x,
    strokeOnly: true
  }));
  colors.forEach(color =>
    shapes.forEach(shape =>
      symbols[`${color} ${shape}`] = new DrawingSymbol({
        color,
        shape
      })
    )
  );

  RxJsVisualizer.init({
    canvasId: 'canvas',
    logDivId: 'logs',
    blockHeight: 50,
    shapeSize: 20,
    maxPeriod: 10000,
    tickPeriod: 1000,
    centerShapes: false,
    symbolMap: symbols,
    addNavigationButtons: true,
    DEBUG: false
  });
  RxJsVisualizer.useRandomSymbolsForNumbers(100);

  function registerClick(id, handler) {
    $(`#${id}`).on('click', _ => {
      RxJsVisualizer.prepareCanvas(['A', 'B']);
      RxJsVisualizer.startVisualize();
      handler();
    });
  }
  // #endregion  

  // #region ------------------------------------------------------------------ register
  registerClick('btnArray', btnArray);
  registerClick('btnValues', btnValues);
  registerClick('btnRange', btnRange);
  registerClick('btnInterval', btnInterval);
  registerClick('btnTimer', btnTimer);
  registerClick('btnHttp', btnHttp);

  registerClick('btnEvent', btnEvent);

  registerClick('btnCreate', btnCreate);
  registerClick('btnSubjectBestPractice', btnSubjectBestPractice);
  registerClick('btnBehaviorSubject', btnBehaviorSubject);
  registerClick('btnReplaySubject', btnReplaySubject);
  registerClick('btnReplay', btnReplay);

  registerClick('btnFilter', btnFilter);
  registerClick('btnMap', btnMap);
  registerClick('btnTake', btnTake);
  registerClick('btnDistinct', btnDistinct);
  registerClick('btnDistinctUntilChanged', btnDistinctUntilChanged);
  registerClick('btnMax', btnMax);
  registerClick('btnCombined', btnCombined);
  registerClick('btnOwn', btnOwn);

  registerClick('btnParallel', btnParallel);
  registerClick('btnDelayed', btnDelayed);
  registerClick('btnPublishConnect', btnPublishConnect);
  registerClick('btnPublishRefcount', btnPublishRefcount);
  registerClick('btnHotHttp', btnHotHttp);

  registerClick('btnDebounce', btnDebounce);
  registerClick('btnThrottle', btnThrottle);
  registerClick('btnBuffer', btnBuffer);
  registerClick('btnCombineLatest', btnCombineLatest);
  registerClick('btnPairwise', btnPairwise);
  registerClick('btnConcat', btnConcat);
  registerClick('btnMerge', btnMerge);
  registerClick('btnZip', btnZip);
  registerClick('btnForkJoin', btnForkJoin);
  registerClick('btnForkJoinHttp', btnForkJoinHttp);
  registerClick('btnFlatMap', btnFlatMap);
  registerClick('btnSwitchMap', btnSwitchMap);
  registerClick('btnFlatMapHttp', btnFlatMapHttp);

  registerClick('btnBestSequence', btnBestSequence);
  registerClick('btnBestSequenceWithTap', btnBestSequenceWithTap);
  registerClick('btnBestWaitForAll', btnBestWaitForAll);
  // #endregion
};