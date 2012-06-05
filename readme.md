# Welcome to vanGoGh Hear HTML5 framework. 
This is vanGoGh brand new html5 app framework.
Brought to you by:

- Federico Weber: [email](mailto:federicoweber@gmail.com), [website](http://federicoweber.com), [twitter](https://twitter.com/#!/FedericoWeber)
- Zulfeekar Cheriyampurath: [email](mailto:zulfeekar.c@gmail.com), [website](http://zulfeekarca.com), [twitter](https://twitter.com/#!/Zulfeekar)

## Dependencies 
This boilerplate is based around to main concept **MVC** and **AMD**, as explaned in this [article](http://backbonetutorials.com/organizing-backbone-using-modules/?a).

In order to make it work the following libs are needed:
* [Modernizer](http://www.modernizr.com/) Browser features check *loaded from index.html*
* [Json2.js](http://www.json.org) JSON for older browsers
* [jQuery](http://jquery.com) DOM manipulation
* [Backbone.js](http://documentcloud.github.com/backbone/) MVC framework
* [Underscore.js](http://documentcloud.github.com/underscore) needed by Backbone
* [Require.js](http://requirejs.org/) AMD module loader *loaded from index.html

## Folder & Files structure
The files are organized with the following structure:
On the root level you will find: 
* vgHear/ *that contain the main framework (Check out from [here](https://vangogh.beanstalkapp.com/vghtml5boilerplate/browse/trunk/_))* 
* app/ for the files specifically developed for the app.
* .htaccess
* index.html
* 404.html

### vgHear/js/main.js
This is the files used to bootstrap the framework.
All the main dependecies for the app are declared in here.

### modules boilerplate
Usually the modules you are going to develop will have the structure highlited in **vgHear/js/boilerplate.js**

### app/js/app.js
This is the entry point of the app. It should **return an init()** function that is automatically executed by the **main.js**.

### app/js/router.js
This is our router.

### boilerplate.zip
This file contain a base project to get you up and running in seconds.

To setup a new project just decompress the boilerplate and copy the **_** folder in it.

## Build
The building function is using require js optimizer.
To use it you need [Node.js](nodejs.org) installed on your machine, and then run the following command.

	 $ r.js -o AppRootFolderPath/vgHear/app.build.js