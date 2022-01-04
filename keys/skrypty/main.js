let openpgp = require('openpgp');
let fs = require('fs');




fs.readFile('klucz.public', 'utf8', function(err,data){
	if(err) {
		console.log(err);
		return;	
	};
	
	let options = {
		data: 'Wtw',
		publicKeys: openpgp.key.readArmored(data).keys	
	};

	openpgp.encrypt(options).then(function(ciphertext){
		console.log(ciphertext.data);	
	});
});



/*var options, encrypted;

var pubkey = '-----BEGIN PGP PUBLIC KEY BLOCK ... END PGP PUBLIC KEY BLOCK-----';
var privkey = '-----BEGIN PGP PRIVATE KEY BLOCK ... END PGP PRIVATE KEY BLOCK-----'; //encrypted private key
var passphrase = 'secret passphrase'; //what the privKey is encrypted with

var privKeyObj = openpgp.key.readArmored(privkey).keys[0];
privKeyObj.decrypt(passphrase);

options = {
    data: 'Hello, World!',                             // input as String (or Uint8Array)
    publicKeys: openpgp.key.readArmored(pubkey).keys,  // for encryption
    privateKeys: privKeyObj // for signing (optional)
};

openpgp.encrypt(options).then(function(ciphertext) {
    encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
});*/
