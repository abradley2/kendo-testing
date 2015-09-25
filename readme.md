# Kendo UI and SPA



### src/app/data..
Create methods that will be exported to the global api namespace. These should
be functions that return instances of either kendo.data.DataSource or
kendo.data.Model.

Each api data-method must be registered in the `src/app/data/index.js` file

### src/app/views..
Create constructor methods for kendo.View instances. These should be functions
which return an object with attributes satisfying the

The reason for these being constructors is to allow the router to pass route
parameters (ex: /article/5) to the view, so the view can then act on them
appropriate (ex: get model with id=5 from the api's article dataSource)

`show`, `hide`, and `init` methods are called in response to these respective
events being triggered on the view.

Each view constructor must be registered in the `src/app/views/index.js` file

### src/app/layouts..
Layouts are extended classes of kendo.View and are similarly structured here.
Layouts should define "regions" for views to be rendering in, inside their
templates and designated by the `id` attribute.

Each layout constructor must be registered in the `src/app/layouts/index.js` file

### src/app/routes...
