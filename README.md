React with Flux
====
A demonstration in implementing the Flux architecture with React, using Node, Gulp, Browserify, and Reactify. The target is a generic catalog and shopping cart interface.

### Actions

Actions contain data and an identifying type property:

	var AppActions = {
	  addItem: function(item) {
	    AppDispatcher.handleViewAction({
	      actionType: AppConstants.ADD_ITEM,
	      item: item
	    });
	  },
	  
	  ...
	};
	
### Dispatcher

The dispatcher manages all data flow:

	var AppDispatcher = assign(Dispatcher.prototype, {
	  handleViewAction: function(action) {
	    console.log('action', action);
	
	    this.dispatch({
	      source: 'VIEW_ACTION',
	      action: action
	    });
	  },
	  
	  ...
	});
	
### Stores

Stores contain the application state and logic:

	function _addItem(item) {
	  if (!item.inCart) {
	    item.qty = 1;
	    item.inCart = true;
	    _cartItems.push(item);
	  } else {
	    _cartItems.forEach(function(cartItem, i) {
	      if (cartItem.id === item.id) {
	        _increaseItem(i);
	      }
	    });
	  }
	}
	
	var AppStore = assign(EventEmitter.prototype, {
	  emitChange: function() {
	    this.emit(CHANGE_EVENT);
	  },
	  addChangeListener: function(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },
	  removeChangeListener: function(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	  },
	  getCart: function() {
	    return _cartItems;
	  },
	  getCatalog: function() {
	    return _catalog;
	  },
	
	  dispatcherIndex: AppDispatcher.register(function(payload) {
	    var action = payload.action;
	
	    switch(action.actionType) {
	      case AppConstants.ADD_ITEM:
	        _addItem(payload.action.item);
	        break;
	
		  ...
	    }
	
	    AppStore.emitChange();
	
	    return true
	  })
	});

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
