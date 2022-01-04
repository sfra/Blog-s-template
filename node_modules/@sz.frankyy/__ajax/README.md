# __ajax

Simple ajax library. It do not require any additional dependencies. Three types of the library are provided:
    - regular js function
    - [require.js](https://requirejs.org/) module
    - supporting internet explorer  >= 8 (tested under [wine](https://www.winehq.org/))


### Installation
#### The first version (usual javaScript file)
Just put 
```html
<script type="text/javascript src="__ajax.js"></script>
```
in your head section or at the bottom of your html file.
#### The second one (Require.js module) 

Complete your main.js file
```javascript
requirejs.config({
    ...
    paths: {
    ...
        __ajax: ['classes/__ajax.require.module'] // path to the file
    ...
    }
    ...
});
```
Details can be found on [require.js](https://requirejs.org/).
### Application

An application of the library looks as follows:
```javascript
    let ajax=new __ajax('[someUrl]',{method: '[some method]'});
    ajax.setParameters([object of parameters]);
    ajax.get().then((data)=>{
        [do something with data]
    },(err)=>{})
```
For example:
```javascript
    let creditCountsNr=[];
    let ajax=new __ajax('mywebpage.php',{method: 'post'});
    ajax.setParameters({name: 'John',surname: 'Malkovich'});
    ajax.get().then((data)=>{
        creditCountsNr.push(data);
    },(err)=>{})
```
### API of __ajax

```javascript
    ajax.setParameters([obj])
```
where ```[obj]``` is js object consisting of parameters (post or get)
sending with query.

```javascript
    ajax.addParameters([obj])
```
adds (with overwriting) parameters to the existing object.

```javascript
    [obj] ajax.getParameters()
```
returns the current parameters of __ajax object.

```javascript
    ajax.setMethod([string])
```
returns the current parameters of __ajax object.

```javascript
    [obj] ajax.getParameters()
```
returns the current parameters of __ajax object.


```javascript
    [Promise] ajax.get()
```
Returns the promise of the query.
```javascript
    [Promise].then([function],[function])
```
handles the the resolving and the rejection of promise.

### The note on ie version
This js file does not use the Promises, so it can work even under internet explorer (>=8).
However, due to the above fact its usage differs than in the versions above.

```javascript
    var persons = new __ajax('data/persons.json');
	persons.get(function(data){
		console.log(JSON.parse(data));
		///do something with the fetched data
	});
```
