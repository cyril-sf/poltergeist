var page = require('webpage').create(),
    loaded = false,
    waitUntil = function( predicate, callback ){
      function _waitUntil( predicate ){
        if( ! page.evaluate.call( page, predicate )){
          setTimeout( function(){ _waitUntil( predicate ); }, 50);
        } else {
          callback();
        }
      };
      _waitUntil( predicate );
    };



phantom.injectJs('underscore.js');

['onConfirm', 'onConsoleMessage', 'onError', 'onInitialized', 'onLoadFinished', 'onLoadStarted', 'onPrompt', 'onUrlChanged', 'onNavigationRequested'].forEach( function( callback ){
  page[ callback ] = function(){
    var args = _(arguments).toArray();
    args.unshift( callback );
    console.log.apply( console, args );

    if( callback === "onLoadFinished" ){
      page.open('http://localhost:5000/users/sign_in#somewhere');
    }
  }
});

page.open('http://localhost:5000/users/sign_in');



/*
page.open('http://localhost:5000', function( status ) {
  if( running ){ return; }

  running = true;

  page.evaluate( function(){
    $('#user_email').val('cyril@verticalresponse.com');
    $('#user_password').val('passw0rd');
  });

  page.render('/tmp/logging-in.png');
  page.evaluate( function(){ $('form').submit(); });

  waitUntil( function(){
    return typeof($) != 'undefined' && $('.dashboard-index').length;
  }, function(){
    page.render('/tmp/dashboard.png');


    var r2 = false;
    page.open('http://localhost:5000/#/connections', function(){
      if( r2 ){ return; }
      r2 = true;

      waitUntil( function(){
        return typeof($) != 'undefined' && $('.contact-lists').length;
      }, function(){
        page.render('/tmp/connections.png');
      });
    });
  });
});
*/
