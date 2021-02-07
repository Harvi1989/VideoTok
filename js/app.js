// replace these values with those generated in your TokBox Account
var apiKey = "47113114";
var sessionId = "1_MX40NzExMzExNH5-MTYxMjcxNDQ0OTIxOH54UFVPRTM5YzdyUTlBUXFKeDFCOFlBQ29-UH4"
var token ="T1==cGFydG5lcl9pZD00NzExMzExNCZzaWc9MDVkNWMyZjdmZDM0YmMyYzdlMzJlOWQ2YWE0NjUxYmVjYzI5ZTdmMzpzZXNzaW9uX2lkPTFfTVg0ME56RXhNekV4Tkg1LU1UWXhNamN4TkRRME9USXhPSDU0VUZWUFJUTTVZemR5VVRsQlVYRktlREZDT0ZsQlEyOS1VSDQmY3JlYXRlX3RpbWU9MTYxMjcxNDQ4OSZub25jZT0wLjY3MTY2NTY4MjA1OTQ5Nzcmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTYxNTMwNjQ4OCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

// Get SessionID and Token
//https://testvideocalling.herokuapp.com/room/session

//Open this side and click on button 'Request temporary access to the demo server'
//https://cors-anywhere.herokuapp.com/corsdemo

//var proxy  = 'https://cors-anywhere.herokuapp.com/';

// (optional) add server code here
    // var SERVER_BASE_URL = proxy+'https://testvideocalling.herokuapp.com';
    // fetch(SERVER_BASE_URL + '/session').then(function(res) {
      // return res.json()
    // }).then(function(res) {
      // apiKey = res.apiKey;
      // sessionId = res.sessionId;
      // token = res.token;
      // initializeSession();
    // }).catch(handleError);
	
	
// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here
initializeSession();

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
