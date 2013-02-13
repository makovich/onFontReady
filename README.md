#onFontReady

Stand-alone function that helps to determine if web font loaded or not. This code is based on [Jenny Simonds's](https://github.com/JenniferSimonds/FontDetect) work but it does not use jQuery at all.

##How to use
Works like this:

```javascript
onFontReady(
  'Miss Fajardose', // place here a font name
  function() {
	// onSucces handler
  },
  function() {
	// onFail handler
  }
)
```

You can use some settings:

```javascript
onFontReady(
  'Junge',
  function() {
	$('#loading').hide();
  },
  function() {
	$('#try-later').show();
  },
  { interval: 50,   // interval between checking procedures
    timeout: 1000 } // timeout before onFail calling
)
```
