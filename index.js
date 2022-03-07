window.onload = () => {
  // #region RxJs imports
  const Rx = rxjs;
  const {
    Observable,
    Subject,
    ReplaySubject,
    BehaviorSubject,
  } = rxjs;
  const {
    buffer,
    bufferCount,
    bufferTime,
    combineLatest,
    concat,
    concatAll,
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
    mapTo,
    max,
    merge,
    min,
    pairwise,
    publish,
    reduce,
    refCount,
    scan,
    share,
    skip,
    startWith,
    switchMap,
    take,
    takeUntil,
    takeWhile,
    tap,
    throttle,
    throttleTime,
    withLatestFrom,
  } = rxjs.operators;
  const {
    DrawingSymbol
  } = RxJsVisualizer;
  const {
    draw
  } = RxJsVisualizer.operators;
  // #endregion

  // #region ------------------------------------------------------------------ RxJsVisualizer
  const symbols = {};
  symbols['[object MouseEvent]'] = new DrawingSymbol({
    imageUrl: 'images/flash.png'
  });
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
  // #endregion

  // #region ------------------------------------------------------------------ register
  function registerClick(id, handler) {
    $(`#${id}`).on('click', ev => handler());
    RxJsVisualizer.prepareCanvas(['A','B']);
    RxJsVisualizer.startVisualize();
  }

  registerClick('btnMouseDistance', btnMouseDistance);
  registerClick('btnMovingAverage', btnMovingAverage);
  registerClick('btnMultipleClicks', btnMultipleClicks);
  registerClick('btnFixShare', btnFixShare);
  registerClick('btnWebSequentialList', btnWebSequentialList);
  // #endregion

  // #region ------------------------------------------------------------------ global observers
  const observer = {
    next: value => console.log(`next: ${value}`),
    error: error => console.error(error),
    complete: () => console.log('Completed')
  };
  // #endregion


  // #region ------------------------------------------------------------------ mouse distance
  const clicks = Rx.fromEvent(document.getElementById("btnMouseDistanceFinish"), "click"); 
  function btnMouseDistance() {
    var event = Rx.fromEvent(document, 'mousemove');
    var result = event.pipe(
      debounceTime(500),
      map(e => ({ x: e.clientX, y: e.clientY })),
      pairwise(),
      map(pair => (Math.sqrt(Math.pow(pair[0].x - pair[1].x, 2) + Math.pow(pair[0].y - pair[1].y, 2))).toFixed(2)),
      throttleTime(1000),
      takeUntil(clicks)
    )
    result.subscribe(RxJsVisualizer.observerForLine(1, 'dist',true) );
  }

  // #endregion

  // #region ------------------------------------------------------------------ moving average
  function btnMovingAverage() {
    const numbers = Rx.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const result = numbers.pipe(
      scan((acc,valc) => {
        acc.push(valc);
        return acc.slice(-4);
      }, []),
      map(arr => arr.reduce((a,b) => a + b, 0) / arr.length))
    result.subscribe(RxJsVisualizer.observerForLine(1, 'moving average',true) );
  }
  // #endregion

  // #region ------------------------------------------------------------------ multiple clicks
  function btnMultipleClicks() {
    var event = Rx.fromEvent(document, 'click');
    var result = event.pipe(
      buffer(event.pipe(debounceTime(250))),
      filter(x => x.length > 1),
      map(x => {
        if(x.length == 3){
          return 'triple click';
        }
        if(x.length == 2){
          return 'double click';
        }
        if(x.length > 3){
          return x.length+"-times click";
        }
      })
    )
    result.subscribe(RxJsVisualizer.observerForLine(1, 'clicks',true) );
  }
  // #endregion

  // #region ------------------------------------------------------------------ fix share
  function btnFixShare() {
    console.log('Fix this code so that a and b log the same events at the same time');
    const clock = Rx.interval(1000)
      .pipe(
        take(5),
        map(x => x + 1),
        map(x => `${x} -> ${Math.random()}`),
        share(),
      );
    clock.subscribe(x => console.log(`a: ${x}`));
    clock.subscribe(x => console.log(`b: ${x}`));
  }
  // #endregion


  // #region ------------------------------------------------------------------ web sequential
  function btnWebSequentialList() {
    // https://jsonplaceholder.typicode.com/posts?userId=7 ==> postId 61-70
    // https://jsonplaceholder.typicode.com/comments?postId=61 ==> commentId 301-350
    //invert a binary tree
  }
  // #endregion

};