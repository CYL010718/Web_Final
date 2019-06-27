var timeIntervalCoverOrNot = (event1, event2) => {
    var earlierEvent = {};
    var laterEvent = {};
    if ( event1.start.getTime() === event2.start.getTime() ) {
      return true;
    }
    else if (event1.start.getTime() < event2.start.getTime() ) {
      earlierEvent = event1;
      laterEvent = event2;
    }
    else{
      earlierEvent = event2;
      laterEvent = event1;
    }
    if ( earlierEvent.end.getTime() >= laterEvent.end.getTime() ) {
      return true;
    }
    else return false;
  }
export default timeIntervalCoverOrNot