import CCapture from 'ccapture.js';
import download from 'downloadjs';
import WebMWriter from 'webm-writer';
import GIF from 'gif.js.optimized';

const formats = {
    gif: { format: "gif", workersPath: "./" },
    web: { format: "webm" }
};

// in order to get ccapture working we need to expose the libs to window
function expose() {
    Object.assign(window, {
      WebMWriter,
      download,
      GIF,
      createCrecorder
    })
}
expose();

const createCrecorder = ({
  format = 'gif',
  canvas = window.document.getElementById('canvas'),
  ccaptureSettings
} = {}) => {

  const capturer = new CCapture({ ...formats[format], ...ccaptureSettings});

  return {
    record,
    stop,
    capturer
  };

  function record({ timeLimit } = {}) {
    capturer.start();
    const start = Date.now();

    function render() {
      requestAnimationFrame(render);
      const now = Date.now();
      if( timeLimit && timeLimit < now - start) {
        return stop();
      } else {
        capturer.capture(canvas);
      }
    }

    render();
  }

  function stop() {
    capturer.stop();

    //TODO set custom filename

    // capturer.save( function( blob ) {
    //     download(blob, "images.webm", "video/webm");
    // } );
    capturer.save();
  }
};

window.createCrecorder = createCrecorder;
export default createCrecorder;