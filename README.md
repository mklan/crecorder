# crecorder

Record canvas to gif or webm!

This service wraps ccapture.js functionality to enable importing using modules and simple usage on the fly.

## Example

demo: https://mklan.github.io/crecorder/

```bash
# develop
npm run start-example
# http://localhost:1234

# build
npm run build-example
```

## Api

```JavaScript
import createCrecorder from 'crecorder';

// create a recorder
const recorder = createCrecorder({ 
  format: 'webm', // defaults to gif
  canvas: document.getElementById('myCanvas') // defaults to element with id canvas
  ccaptureParams: {} // see https://github.com/spite/ccapture.js for paramaters
});

// start recording
recorder.record();

// stop recording
recorder.stop();

// record for a certain amount of time
recorder.record({ 
    timeLimit: 3000
});

```

`createCrecorder` is exposed to the window object, so you can trigger actions via command line.
After stopping recording the file is downloaded.

## Inject into external webpage

you can inject the script into an external webpage in order to capture some of their canvas elements.

open the dev console and enter the following commands

```JavaScript
function injectScript(attributes){
  const script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
  return Object.assign(script, attributes); 
}
 
injectScript({
  src: '//mklan.github.io/crecorder/lib/crecorder.js',
});

```

the library is now injected and you can use `createCrecorder` via command line.

__pro-tip:__ select the canvas element in the dom, after that you can initalize the recorder using the following snippet

```JavaScript
const recorder = createCrecorder({ 
  format: 'webm',
  canvas: $0
});
```
keep in mind, that the injection does not work with gif, due to the missing `gif.worker.js` script on external webpages
