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

  }

  function btnValues() {

  }

  function btnRange() {

  }

  function btnInterval() {

  }

  function btnTimer() {

  }

  function btnHttp() {

  }
  // #endregion

  // #region ------------------------------------------------------------------ events
  function btnEvent() {

  }
  // #endregion

  // #region ------------------------------------------------------------------ Subject
  function btnCreate() {

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

  }

  function btnMap() {

  }

  function btnTake() {

  }

  function btnDistinct() {

  }

  function btnDistinctUntilChanged() {

  }

  function btnMax() {

  }

  function btnCombined() {

  }

  function btnOwn() {

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

  }

  function btnThrottle() {

  }

  function btnBuffer() {

  }

  function btnCombineLatest() {

  }

  function btnPairwise() {

  }

  function btnConcat() {

  }

  function btnMerge() {

  }

  function btnZip() {

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